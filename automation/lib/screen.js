/**
 * Screen Manager - Screenshots and visual verification
 */

const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const overlay = require('./overlay');
const config = require('../config');

const tempDir = process.env.TEMP;

/**
 * Capture a screenshot of the primary monitor
 * @param {string} outputPath - Path to save the screenshot
 */
async function capture(outputPath) {
    return new Promise((resolve, reject) => {
        const psScript = `
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

$screen = [System.Windows.Forms.Screen]::PrimaryScreen
$bounds = $screen.Bounds

$bitmap = New-Object System.Drawing.Bitmap($bounds.Width, $bounds.Height)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.CopyFromScreen($bounds.X, $bounds.Y, 0, 0, [System.Drawing.Size]::new($bounds.Width, $bounds.Height))
$bitmap.Save("${outputPath.replace(/\\/g, '\\\\')}")
$graphics.Dispose()
$bitmap.Dispose()
`;

        const psPath = path.join(tempDir, 'Galactic Fruit_screenshot.ps1');
        fs.writeFileSync(psPath, psScript, 'utf8');

        exec(`powershell -ExecutionPolicy Bypass -File "${psPath}"`, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

/**
 * Show verification dialog with screenshot
 * @param {string} screenshotPath - Path to the screenshot
 * @param {string} contextMessage - Context message for verification
 * @returns {Promise<boolean>} - True if verified, false otherwise
 */
async function showVerifyDialog(screenshotPath, contextMessage) {
    return new Promise((resolve) => {
        const verifyScript = `
Add-Type -AssemblyName PresentationFramework
Add-Type -AssemblyName PresentationCore
Add-Type -AssemblyName WindowsBase

$result = "none"

$xaml = @"
<Window xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        Title="Verification" 
        Height="600" Width="800"
        WindowStyle="None" 
        AllowsTransparency="True"
        Background="Transparent"
        Topmost="True"
        ShowInTaskbar="True"
        WindowStartupLocation="CenterScreen">
    <Border Background="#EE1a1a2e" CornerRadius="15" Padding="20" BorderBrush="#00d4ff" BorderThickness="3">
        <Grid>
            <Grid.RowDefinitions>
                <RowDefinition Height="Auto"/>
                <RowDefinition Height="*"/>
                <RowDefinition Height="Auto"/>
                <RowDefinition Height="Auto"/>
            </Grid.RowDefinitions>
            
            <TextBlock Grid.Row="0" Text="Is this correct?" 
                       Foreground="#00d4ff" FontSize="28" FontWeight="Bold" 
                       HorizontalAlignment="Center" Margin="0,0,0,10"/>
            
            <Border Grid.Row="1" Background="#333355" CornerRadius="10" Margin="0,0,0,15">
                <Image x:Name="Screenshot" Stretch="Uniform" Margin="10"/>
            </Border>
            
            <TextBlock Grid.Row="2" x:Name="Context" Text="" 
                       Foreground="#aaaaaa" FontSize="14" FontStyle="Italic"
                       HorizontalAlignment="Center" TextWrapping="Wrap" Margin="0,0,0,15"/>
            
            <StackPanel Grid.Row="3" Orientation="Horizontal" HorizontalAlignment="Center">
                <Button x:Name="YesBtn" Width="150" Height="50" Margin="10" Cursor="Hand">
                    <Button.Template>
                        <ControlTemplate TargetType="Button">
                            <Border Background="#22aa22" CornerRadius="10" BorderBrush="#33ff33" BorderThickness="2">
                                <StackPanel Orientation="Horizontal" HorizontalAlignment="Center" VerticalAlignment="Center">
                                    <TextBlock Text="&#x2714;" Foreground="White" FontSize="24" Margin="0,0,10,0"/>
                                    <TextBlock Text="Yes" Foreground="White" FontSize="20" FontWeight="Bold"/>
                                </StackPanel>
                            </Border>
                        </ControlTemplate>
                    </Button.Template>
                </Button>
                <Button x:Name="NoBtn" Width="150" Height="50" Margin="10" Cursor="Hand">
                    <Button.Template>
                        <ControlTemplate TargetType="Button">
                            <Border Background="#aa2222" CornerRadius="10" BorderBrush="#ff3333" BorderThickness="2">
                                <StackPanel Orientation="Horizontal" HorizontalAlignment="Center" VerticalAlignment="Center">
                                    <TextBlock Text="&#x2718;" Foreground="White" FontSize="24" Margin="0,0,10,0"/>
                                    <TextBlock Text="No" Foreground="White" FontSize="20" FontWeight="Bold"/>
                                </StackPanel>
                            </Border>
                        </ControlTemplate>
                    </Button.Template>
                </Button>
            </StackPanel>
        </Grid>
    </Border>
</Window>
"@

$reader = [System.Xml.XmlReader]::Create([System.IO.StringReader]::new($xaml))
$window = [System.Windows.Markup.XamlReader]::Load($reader)

$screenshotImg = $window.FindName("Screenshot")
$contextBlock = $window.FindName("Context")
$yesBtn = $window.FindName("YesBtn")
$noBtn = $window.FindName("NoBtn")

$imagePath = "${screenshotPath.replace(/\\/g, '\\\\')}"
if (Test-Path $imagePath) {
    $bitmap = New-Object System.Windows.Media.Imaging.BitmapImage
    $bitmap.BeginInit()
    $bitmap.UriSource = New-Object System.Uri($imagePath)
    $bitmap.CacheOption = [System.Windows.Media.Imaging.BitmapCacheOption]::OnLoad
    $bitmap.EndInit()
    $screenshotImg.Source = $bitmap
}

$contextBlock.Text = "${contextMessage}"

$yesBtn.Add_Click({
    $script:result = "yes"
    $window.Close()
})

$noBtn.Add_Click({
    $script:result = "no"
    $window.Close()
})

$window.ShowDialog() | Out-Null

$resultFile = "$env:TEMP\\Galactic Fruit_verify_result.txt"
$result | Out-File -FilePath $resultFile -Encoding utf8 -NoNewline
`;

        const psPath = path.join(tempDir, 'Galactic Fruit_verify.ps1');
        fs.writeFileSync(psPath, verifyScript, 'utf8');

        const resultFile = path.join(tempDir, 'Galactic Fruit_verify_result.txt');
        try { fs.unlinkSync(resultFile); } catch (e) { }

        exec(`powershell -ExecutionPolicy Bypass -File "${psPath}"`, (error) => {
            if (error && !error.killed) {
                console.error('Verify dialog error:', error.message);
                resolve(false);
                return;
            }

            try {
                const result = fs.readFileSync(resultFile, 'utf8').trim();
                resolve(result === 'yes');
            } catch (e) {
                resolve(false);
            }
        });
    });
}

/**
 * Take a screenshot and verify with user
 * @param {string} contextMessage - Explanation of what to verify
 * @param {string} [filename] - Optional filename (without extension)
 * @returns {Promise<{path: string|null, verified: boolean}>}
 */
async function captureAndVerify(contextMessage, filename = null) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const screenshotDir = path.resolve(__dirname, '..', config.screenshot.outputDir);

    // Ensure screenshot directory exists
    if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir, { recursive: true });
    }

    const tempScreenshotPath = path.join(tempDir, 'Galactic Fruit_temp_screenshot.png');
    const finalFilename = filename ? `${filename}.png` : `screenshot_${timestamp}.png`;
    const finalScreenshotPath = path.join(screenshotDir, finalFilename);

    overlay.setStatus('Taking screenshot...');
    overlay.setProgress(50, 'Capturing...', 'screenshot');

    await capture(tempScreenshotPath);

    overlay.setProgress(100, 'Verifying...', 'verify');
    overlay.setStatus('Awaiting verification...');

    const isCorrect = await showVerifyDialog(tempScreenshotPath, contextMessage);

    if (isCorrect) {
        fs.copyFileSync(tempScreenshotPath, finalScreenshotPath);
        fs.unlinkSync(tempScreenshotPath);
        overlay.setStatus('Screenshot confirmed!');
        return { path: finalScreenshotPath, verified: true };
    } else {
        try { fs.unlinkSync(tempScreenshotPath); } catch (e) { }
        overlay.setStatus('Screenshot rejected');
        return { path: null, verified: false };
    }
}

module.exports = {
    capture,
    captureAndVerify,
    showVerifyDialog,
};
