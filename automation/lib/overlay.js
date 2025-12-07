/**
 * Overlay Manager - Displays status overlay during automation
 */

const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const config = require('../config');

const tempDir = process.env.TEMP;
let overlayWindow = null;

/**
 * Create and show the status overlay
 */
async function show() {
    if (!config.overlay.enabled) return;

    const { left, top } = config.overlay.position;
    const { width, height } = config.overlay.size;

    const overlayScript = `
Add-Type -AssemblyName PresentationFramework
Add-Type -AssemblyName PresentationCore
Add-Type -AssemblyName WindowsBase

$xaml = @"
<Window xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        Title="Galactic Fruit Automation" 
        Height="${height}" Width="${width}"
        WindowStyle="None" 
        AllowsTransparency="True"
        Background="Transparent"
        Topmost="True"
        ShowInTaskbar="False"
        WindowStartupLocation="Manual"
        Left="${left}" Top="${top}">
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

$statusFile = "$env:TEMP\\Galactic Fruit_automation_status.txt"
$progressFile = "$env:TEMP\\Galactic Fruit_automation_progress.txt"

$timer = New-Object System.Windows.Threading.DispatcherTimer
$timer.Interval = [TimeSpan]::FromMilliseconds(50)
$timer.Add_Tick({
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
    
    if (Test-Path $progressFile) {
        $progressData = Get-Content $progressFile -Raw -ErrorAction SilentlyContinue
        if ($progressData) {
            $parts = $progressData.Trim() -split ","
            if ($parts.Count -ge 3) {
                $progressBar.Value = [double]$parts[0]
                $timerBlock.Text = $parts[1]
                
                switch ($parts[2]) {
                    "loading" { $progressBar.Foreground = "#ffa500" }
                    "input" { $progressBar.Foreground = "#00ff00" }
                    "screenshot" { $progressBar.Foreground = "#ffff00" }
                    "verify" { $progressBar.Foreground = "#00ffff" }
                    "complete" { $progressBar.Foreground = "#00d4ff" }
                    "error" { $progressBar.Foreground = "#ff3333" }
                    default { $progressBar.Foreground = "#00d4ff" }
                }
            }
        }
    }
})
$timer.Start()

$window.ShowDialog() | Out-Null
`;

    const psPath = path.join(tempDir, 'Galactic Fruit_overlay.ps1');
    fs.writeFileSync(psPath, overlayScript, 'utf8');

    overlayWindow = exec(`powershell -ExecutionPolicy Bypass -File "${psPath}"`, (error) => {
        if (error && !error.killed) {
            console.error('Overlay error:', error.message);
        }
    });

    // Wait for overlay to initialize
    await new Promise(resolve => setTimeout(resolve, 800));
}

/**
 * Update the status text on the overlay
 * @param {string} status - Status message
 */
function setStatus(status) {
    const statusFile = path.join(tempDir, 'Galactic Fruit_automation_status.txt');
    fs.writeFileSync(statusFile, status, 'utf8');
    console.log(`[Status] ${status}`);
}

/**
 * Update the progress bar
 * @param {number} percent - Progress percentage (0-100)
 * @param {string} timerText - Timer text to display
 * @param {string} actionType - Action type for color coding
 */
function setProgress(percent, timerText, actionType = 'default') {
    const progressFile = path.join(tempDir, 'Galactic Fruit_automation_progress.txt');
    fs.writeFileSync(progressFile, `${percent},${timerText},${actionType}`, 'utf8');
}

/**
 * Close the overlay
 */
async function close() {
    setStatus('EXIT_OVERLAY');
    await new Promise(resolve => setTimeout(resolve, 500));
    if (overlayWindow) {
        overlayWindow.kill();
    }
    // Cleanup temp files
    try {
        fs.unlinkSync(path.join(tempDir, 'Galactic Fruit_automation_status.txt'));
        fs.unlinkSync(path.join(tempDir, 'Galactic Fruit_automation_progress.txt'));
    } catch (e) { }
}

module.exports = {
    show,
    close,
    setStatus,
    setProgress,
};
