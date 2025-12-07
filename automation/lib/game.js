/**
 * Game Controller - Launch and manage the game process
 */

const { spawn, exec } = require('child_process');
const path = require('path');
const overlay = require('./overlay');
const { sleep } = require('./utils');
const config = require('../config');

let gameName = null;

/**
 * Launch the game executable
 * @param {string} [exePath] - Path to executable (uses config default if not provided)
 */
async function launch(exePath = config.game.exePath) {
    overlay.setStatus('Launching game...');
    overlay.setProgress(0, 'Starting...', 'loading');

    // Store the game name for later termination
    gameName = path.basename(exePath);

    return new Promise((resolve, reject) => {
        const child = spawn('cmd', ['/c', 'start', '""', `"${exePath}"`], {
            shell: true,
            detached: true,
            stdio: 'ignore'
        });

        child.unref();

        setTimeout(() => {
            overlay.setStatus('Game launched!');
            overlay.setProgress(5, 'Loading...', 'loading');
            resolve();
        }, 1000);

        child.on('error', (error) => {
            overlay.setStatus('Failed to launch!');
            reject(error);
        });
    });
}

/**
 * Wait for game to load with countdown
 * @param {number} [seconds] - Seconds to wait (uses config default if not provided)
 */
async function waitForLoad(seconds = config.game.launchWaitTime / 1000) {
    const updateInterval = config.timing.updateIntervalMs;
    const totalMs = seconds * 1000;
    const totalSteps = totalMs / updateInterval;

    overlay.setStatus('Waiting for game to load...');

    for (let step = 0; step <= totalSteps; step++) {
        const elapsed = step * updateInterval;
        const remaining = (totalMs - elapsed) / 1000;
        const percent = (elapsed / totalMs) * 100;

        overlay.setProgress(percent, `${remaining.toFixed(1)}s`, 'loading');

        if (step < totalSteps) {
            await sleep(updateInterval);
        }
    }

    overlay.setStatus('Game ready!');
}

/**
 * Close the game by killing the process
 */
async function close() {
    if (!gameName) return;

    overlay.setStatus('Closing game...');

    return new Promise((resolve) => {
        // Use taskkill to force close the game process
        exec(`taskkill /F /IM "${gameName}"`, (error) => {
            if (error) {
                console.log(`Note: Could not kill ${gameName} (may have already closed)`);
            } else {
                console.log(`Closed ${gameName}`);
            }
            gameName = null;
            resolve();
        });
    });
}

module.exports = {
    launch,
    waitForLoad,
    close,
};
