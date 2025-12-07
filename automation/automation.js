/**
 * Nut.js Automation Script
 * 
 * Launches the specified game executable and performs automated inputs.
 * 
 * Usage: node automation.js "C:\Path\To\Game.exe"
 * Example: node automation.js "C:\Program Files (x86)\Steam\steamapps\common\Echoes of Exile\Echoes of Exile.exe"
 */

const { exec } = require('child_process');
const { keyboard, Key, screen, sleep } = require('@nut-tree-fork/nut-js');
const path = require('path');
const fs = require('fs');
const readline = require('readline');

// Configure nut.js settings
keyboard.config.autoDelayMs = 50;

// Overlay state
let overlayWindow = null;

// Temp directory for screenshots
const tempDir = process.env.TEMP;

/**
 * Create and show an overlay window using PowerShell with WPF
 */
async function showOverlay() {
    const overlayScript = `
Add-Type -AssemblyName PresentationFramework
Add-Type -AssemblyName PresentationCore
Add-Type -AssemblyName WindowsBase

$xaml = @"
<Window xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        Title="Galactic Fruit Automation" 
        Height="180" Width="420"
        WindowStyle="None" 
        AllowsTransparency="True"
        Background="Transparent"
        Topmost="True"
        ShowInTaskbar="False"
        WindowStartupLocation="Manual"
        Left="20" Top="20">
    <Border Background="#DD1a1a2e" CornerRadius="15" Padding="20" BorderBrush="#00d4ff" BorderThickness="2">
        <StackPanel>
            <TextBlock x:Name="Title" Text="Galactic Fruit Automation" 
                       Foreground="#00d4ff" FontSize="20" FontWeight="Bold" 
                       HorizontalAlignment="Center" Margin="0,0,0,8"/>
            <TextBlock x:Name="Status" Text="Initializing..." 
                       Foreground="White" FontSize="14" 
                       HorizontalAlignment="Center" TextWrapping="Wrap" Margin="0,0,0,10"/>
            <Grid>
                <ProgressBar x:Name="Progress" Height="20" Minimum="0" Maximum="100" Value="0"
                             Background="#333355" Foreground="#00d4ff" />
                <TextBlock x:Name="Timer" Text="" Foreground="White" FontSize="12" FontWeight="Bold"
                           HorizontalAlignment="Center" VerticalAlignment="Center"/>
            </Grid>
        </StackPanel>
    </Border>
</Window>
"@

$reader = [System.Xml.XmlReader]::Create([System.IO.StringReader]::new($xaml))
$window = [System.Windows.Markup.XamlReader]::Load($reader)
$statusBlock = $window.FindName("Status")
$progressBar = $window.FindName("Progress")
$timerBlock = $window.FindName("Timer")

# Read status from temp file
$statusFile = "$env:TEMP\\Galactic Fruit_automation_status.txt"
$progressFile = "$env:TEMP\\Galactic Fruit_automation_progress.txt"

$timer = New-Object System.Windows.Threading.DispatcherTimer
$timer.Interval = [TimeSpan]::FromMilliseconds(50)
$timer.Add_Tick({
    # Update status
    if (Test-Path $statusFile) {
        $newStatus = Get-Content $statusFile -Raw -ErrorAction SilentlyContinue
        if ($newStatus) {
            $newStatus = $newStatus.Trim()
            if ($newStatus -match "EXIT_OVERLAY") {
                $window.Close()
                return
            }
            if ($newStatus -ne $statusBlock.Text) {
                $statusBlock.Text = $newStatus
            }
        }
    }
    
    # Update progress and timer
    if (Test-Path $progressFile) {
        $progressData = Get-Content $progressFile -Raw -ErrorAction SilentlyContinue
        if ($progressData) {
            $parts = $progressData.Trim() -split ","
            if ($parts.Count -ge 3) {
                $progressBar.Value = [double]$parts[0]
                $timerBlock.Text = $parts[1]
                
                # Change color based on action
                switch ($parts[2]) {
                    "loading" { $progressBar.Foreground = "#ffa500" }
                    "forward" { $progressBar.Foreground = "#00ff00" }
                    "right"   { $progressBar.Foreground = "#ff00ff" }
                    "screenshot" { $progressBar.Foreground = "#ffff00" }
                    "complete" { $progressBar.Foreground = "#00d4ff" }
                    "verify" { $progressBar.Foreground = "#00ffff" }
                    default   { $progressBar.Foreground = "#00d4ff" }
                }
            }
        }
    }
})
$timer.Start()

$window.ShowDialog() | Out-Null
`;

    // Start overlay in background
    const psPath = path.join(process.env.TEMP, 'Galactic Fruit_overlay.ps1');
    fs.writeFileSync(psPath, overlayScript, 'utf8');

    overlayWindow = exec(`powershell -ExecutionPolicy Bypass -File "${psPath}"`, (error) => {
        if (error && !error.killed) {
            console.error('Overlay error:', error.message);
        }
    });

    await sleep(800); // Give overlay time to start
}

/**
 * Show verification dialog with screenshot preview
 * @param {string} screenshotPath - Path to the screenshot
 * @param {string} contextMessage - Context message to display
 * @returns {Promise<boolean>} - True if user confirms, false otherwise
 */
async function showVerificationDialog(screenshotPath, contextMessage) {
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
            
            <TextBlock Grid.Row="2" x:Name="Context" Text="CONTEXT_PLACEHOLDER" 
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

# Load screenshot
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

# Write result to file
$resultFile = "$env:TEMP\\Galactic Fruit_verify_result.txt"
$result | Out-File -FilePath $resultFile -Encoding utf8 -NoNewline
`;

        const psPath = path.join(tempDir, 'Galactic Fruit_verify.ps1');
        fs.writeFileSync(psPath, verifyScript, 'utf8');

        const resultFile = path.join(tempDir, 'Galactic Fruit_verify_result.txt');
        // Clean up any existing result file
        try { fs.unlinkSync(resultFile); } catch (e) { }

        const verifyProcess = exec(`powershell -ExecutionPolicy Bypass -File "${psPath}"`, (error) => {
            if (error && !error.killed) {
                console.error('Verify dialog error:', error.message);
                resolve(false);
                return;
            }

            // Read result
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
 * Update the overlay status text
 * @param {string} status - Status message to display
 */
async function updateStatus(status) {
    const statusFile = path.join(process.env.TEMP, 'Galactic Fruit_automation_status.txt');
    fs.writeFileSync(statusFile, status, 'utf8');
    console.log(`[Status] ${status}`);
}

/**
 * Update the progress bar and timer
 * @param {number} percent - Progress percentage (0-100)
 * @param {string} timerText - Timer text to display
 * @param {string} actionType - Type of action for color coding
 */
function updateProgress(percent, timerText, actionType = 'default') {
    const progressFile = path.join(process.env.TEMP, 'Galactic Fruit_automation_progress.txt');
    fs.writeFileSync(progressFile, `${percent},${timerText},${actionType}`, 'utf8');
}

/**
 * Close the overlay window
 */
async function closeOverlay() {
    await updateStatus('EXIT_OVERLAY');
    await sleep(500);
    if (overlayWindow) {
        overlayWindow.kill();
    }
    // Cleanup temp files
    try {
        fs.unlinkSync(path.join(process.env.TEMP, 'Galactic Fruit_automation_status.txt'));
        fs.unlinkSync(path.join(process.env.TEMP, 'Galactic Fruit_automation_progress.txt'));
    } catch (e) { }
}

/**
 * Launch the executable at the given path
 * @param {string} exePath - Full path to the executable
 */
async function launchExe(exePath) {
    await updateStatus('Launching game...');
    updateProgress(0, 'Starting...', 'loading');

    return new Promise((resolve, reject) => {
        const { spawn } = require('child_process');

        const child = spawn('cmd', ['/c', 'start', '""', `"${exePath}"`], {
            shell: true,
            detached: true,
            stdio: 'ignore'
        });

        child.unref();

        // Give it a moment to start, then resolve
        setTimeout(() => {
            updateStatus('Game launched!');
            updateProgress(5, 'Loading...', 'loading');
            resolve();
        }, 1000);

        child.on('error', (error) => {
            updateStatus('Failed to launch!');
            reject(error);
        });
    });
}

/**
 * Hold a key down for a specified duration with live countdown
 * @param {Key} key - The key to hold
 * @param {number} durationMs - Duration in milliseconds
 * @param {string} keyName - Display name for the key
 * @param {string} actionType - Type of action for color coding
 */
async function holdKeyWithCountdown(key, durationMs, keyName, actionType) {
    const updateInterval = 50; // Update every 50ms for smooth countdown
    const totalSteps = durationMs / updateInterval;

    await updateStatus(`Holding ${keyName}...`);
    await keyboard.pressKey(key);

    for (let step = 0; step <= totalSteps; step++) {
        const elapsed = step * updateInterval;
        const remaining = (durationMs - elapsed) / 1000;
        const percent = (elapsed / durationMs) * 100;

        updateProgress(percent, `${remaining.toFixed(1)}s remaining`, actionType);

        if (step < totalSteps) {
            await sleep(updateInterval);
        }
    }

    await keyboard.releaseKey(key);
    updateProgress(100, 'Done!', actionType);
    await updateStatus(`Released ${keyName}`);
}

/**
 * Capture screenshot using PowerShell (more reliable on Windows)
 * @param {string} outputPath - Path to save the screenshot
 */
async function captureScreenshot(outputPath) {
    return new Promise((resolve, reject) => {
        const psScript = `
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

# Get primary screen only
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
 * Take a screenshot, verify with user, and save if confirmed
 * @param {string} contextMessage - Context message for verification
 * @returns {Promise<{path: string, verified: boolean}>}
 */
async function takeAndVerifyScreenshot(contextMessage) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const tempScreenshotPath = path.join(tempDir, `Galactic Fruit_temp_screenshot.png`);
    const finalScreenshotPath = path.join(__dirname, `screenshot_${timestamp}.png`);

    await updateStatus('Taking screenshot...');
    updateProgress(50, 'Capturing...', 'screenshot');

    // Capture the screen using PowerShell
    await captureScreenshot(tempScreenshotPath);

    updateProgress(100, 'Verifying...', 'verify');
    await updateStatus('Awaiting verification...');

    // Show verification dialog
    const isCorrect = await showVerificationDialog(tempScreenshotPath, contextMessage);

    if (isCorrect) {
        // Move to final location
        fs.copyFileSync(tempScreenshotPath, finalScreenshotPath);
        fs.unlinkSync(tempScreenshotPath);
        await updateStatus('Screenshot confirmed!');
        return { path: finalScreenshotPath, verified: true };
    } else {
        // Clean up temp file
        try { fs.unlinkSync(tempScreenshotPath); } catch (e) { }
        await updateStatus('Screenshot rejected');
        return { path: null, verified: false };
    }
}

/**
 * Countdown with live timer display
 * @param {number} seconds - Number of seconds to count down
 * @param {string} message - Message to display during countdown
 * @param {string} actionType - Type of action for color coding
 */
async function countdownWithProgress(seconds, message, actionType) {
    const updateInterval = 50; // Update every 50ms
    const totalMs = seconds * 1000;
    const totalSteps = totalMs / updateInterval;

    await updateStatus(message);

    for (let step = 0; step <= totalSteps; step++) {
        const elapsed = step * updateInterval;
        const remaining = (totalMs - elapsed) / 1000;
        const percent = (elapsed / totalMs) * 100;

        updateProgress(percent, `${remaining.toFixed(1)}s`, actionType);

        if (step < totalSteps) {
            await sleep(updateInterval);
        }
    }
}

/**
 * Main automation script
 */
async function runAutomation(exePath) {
    try {
        // Start overlay
        await showOverlay();
        await updateStatus('Starting Automation...');
        updateProgress(0, 'Ready', 'default');
        await sleep(1000);

        // Step 1: Launch the executable
        await launchExe(exePath);

        // Wait for the game to load with countdown
        await countdownWithProgress(10, 'Waiting for game to load...', 'loading');

        // Step 2: Press W for 2 seconds (move forward)
        await updateStatus('Moving FORWARD');
        await holdKeyWithCountdown(Key.W, 2000, 'W', 'forward');

        // Small delay between inputs
        await sleep(300);

        // Step 3: Press D for 2 seconds (move right)  
        await updateStatus('Moving RIGHT');
        await holdKeyWithCountdown(Key.D, 2000, 'D', 'right');

        // Small delay before screenshot
        await sleep(300);

        // Step 4: Take a screenshot and verify
        const result = await takeAndVerifyScreenshot(
            'The character should have moved forward and to the right from the starting position.'
        );

        if (result.verified) {
            // Complete!
            await updateStatus('Automation Complete!');
            updateProgress(100, 'Success!', 'complete');
            await sleep(2000);
            console.log(`\nScreenshot saved: ${result.path}`);
        } else {
            await updateStatus('Test Failed - Screenshot not verified');
            updateProgress(0, 'Failed', 'default');
            await sleep(2000);
            console.log('\nTest failed: Screenshot was not verified as correct.');
        }

        // Close overlay
        await closeOverlay();

    } catch (error) {
        await updateStatus(`Error: ${error.message}`);
        updateProgress(0, 'Failed!', 'default');
        console.error('Automation error:', error);
        await sleep(3000);
        await closeOverlay();
        process.exit(1);
    }
}

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length === 0) {
    console.log('Usage: node automation.js "<path-to-exe>"');
    console.log('Example: node automation.js "C:\\Program Files (x86)\\Steam\\steamapps\\common\\Echoes of Exile\\Echoes of Exile.exe"');
    process.exit(1);
}

const exePath = args[0];

// Validate the exe path
if (!exePath.toLowerCase().endsWith('.exe')) {
    console.warn('Warning: The provided path does not end with .exe');
}

// Run the automation
runAutomation(exePath);
