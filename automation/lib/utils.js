/**
 * Utility functions for the automation framework
 */

const { sleep } = require('@nut-tree-fork/nut-js');

/**
 * Format milliseconds to human readable time
 * @param {number} ms - Milliseconds
 * @returns {string} Formatted time string
 */
function formatTime(ms) {
    const seconds = ms / 1000;
    return `${seconds.toFixed(1)}s`;
}

/**
 * Generate timestamp for file names
 * @returns {string} ISO timestamp safe for filenames
 */
function getTimestamp() {
    return new Date().toISOString().replace(/[:.]/g, '-');
}

/**
 * Wait for specified milliseconds
 * @param {number} ms - Milliseconds to wait
 */
async function wait(ms) {
    await sleep(ms);
}

module.exports = {
    formatTime,
    getTimestamp,
    wait,
    sleep,
};
