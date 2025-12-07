/**
 * Galactic Fruit Automation Framework Configuration
 */

module.exports = {
    // Game configuration
    game: {
        exePath: "C:\\Program Files (x86)\\Steam\\steamapps\\common\\Echoes of Exile\\Echoes of Exile.exe",
        launchWaitTime: 6000, // ms to wait for game to load
    },

    // Overlay settings
    overlay: {
        enabled: true,
        position: { left: 20, top: 20 },
        size: { width: 420, height: 180 },
    },

    // Screenshot settings
    screenshot: {
        outputDir: './screenshots',
        captureMonitor: 'primary', // 'primary' or 'all'
    },

    // Camera/mouse settings
    camera: {
        pixelsPerDegree: 7, // Lower = less sensitive turns. Adjust based on game sensitivity.
    },

    // Timing settings
    timing: {
        defaultKeyHoldMs: 2000,
        inputDelayMs: 300,
        updateIntervalMs: 50,
    },
};
