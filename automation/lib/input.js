/**
 * Input Manager - Keyboard and mouse input automation
 */

const { keyboard, Key, mouse, Button, sleep } = require('@nut-tree-fork/nut-js');
const overlay = require('./overlay');
const config = require('../config');

// Configure nut.js
keyboard.config.autoDelayMs = 50;

/**
 * Hold a key down for a specified duration with live countdown
 * @param {Key} key - The key to hold
 * @param {number} durationMs - Duration in milliseconds
 * @param {string} keyName - Display name for the key
 */
async function holdKey(key, durationMs = config.timing.defaultKeyHoldMs, keyName = null) {
    const displayName = keyName || key.toString();
    const updateInterval = config.timing.updateIntervalMs;
    const totalSteps = durationMs / updateInterval;

    overlay.setStatus(`Holding ${displayName}...`);
    await keyboard.pressKey(key);

    for (let step = 0; step <= totalSteps; step++) {
        const elapsed = step * updateInterval;
        const remaining = (durationMs - elapsed) / 1000;
        const percent = (elapsed / durationMs) * 100;

        overlay.setProgress(percent, `${remaining.toFixed(1)}s`, 'input');

        if (step < totalSteps) {
            await sleep(updateInterval);
        }
    }

    await keyboard.releaseKey(key);
    overlay.setProgress(100, 'Done!', 'input');
    overlay.setStatus(`Released ${displayName}`);
}

/**
 * Press a key briefly
 * @param {Key} key - The key to press
 */
async function pressKey(key) {
    await keyboard.pressKey(key);
    await sleep(50);
    await keyboard.releaseKey(key);
}

/**
 * Type a string
 * @param {string} text - Text to type
 */
async function type(text) {
    await keyboard.type(text);
}

/**
 * Move mouse to coordinates
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 */
async function moveMouse(x, y) {
    await mouse.setPosition({ x, y });
}

/**
 * Click at current position or specified coordinates
 * @param {number} [x] - Optional X coordinate
 * @param {number} [y] - Optional Y coordinate
 */
async function click(x, y) {
    if (x !== undefined && y !== undefined) {
        await mouse.setPosition({ x, y });
    }
    await mouse.click(Button.LEFT);
}

/**
 * Right click at current position or specified coordinates
 * @param {number} [x] - Optional X coordinate
 * @param {number} [y] - Optional Y coordinate
 */
async function rightClick(x, y) {
    if (x !== undefined && y !== undefined) {
        await mouse.setPosition({ x, y });
    }
    await mouse.click(Button.RIGHT);
}

// Screen dimensions (adjust in config if needed)
const SCREEN_WIDTH = 1920;
const SCREEN_HEIGHT = 1080;

const moveCamera = {
    to: {
        center: async () => {
            await moveToCenter();
        },

        left: async (yPercent = 50) => {
            await moveToLeft(yPercent);
        },

        right: async (yPercent = 50) => {
            await moveToRight(yPercent);
        },

        top: async (xPercent = 50) => {
            await moveToTop(xPercent);
        },

        bottom: async (xPercent = 50) => {
            await moveToBottom(xPercent);
        },

        percent: async (xPercent, yPercent) => {
            await moveMouse(
                px(xPercent, SCREEN_WIDTH),
                px(yPercent, SCREEN_HEIGHT),
                `${xPercent}% / ${yPercent}%`
            );
        },

        corner: async (corner) => {
            const corners = {
                topLeft: { x: 100, y: 100 },
                topRight: { x: SCREEN_WIDTH - 100, y: 100 },
                bottomLeft: { x: 100, y: SCREEN_HEIGHT - 100 },
                bottomRight: { x: SCREEN_WIDTH - 100, y: SCREEN_HEIGHT - 100 },
            };

            const pos = corners[corner];
            if (!pos) throw new Error(`Invalid corner: ${corner}`);

            await mouse.setPosition({ x: pos.x, y: pos.y });
        },
    },
};

/**
 * Move mouse to center
 */
async function moveToCenter() {
    await mouse.setPosition({ x: SCREEN_WIDTH / 2, y: SCREEN_HEIGHT / 2 });
    overlay.setStatus('Mouse: Center');
}

/**
 * Move mouse to left side of screen
 * @param {number} [yPercent=50] - Vertical position as percentage (0=top, 100=bottom)
 */
async function moveToLeft(yPercent = 50) {
    const y = (yPercent / 100) * SCREEN_HEIGHT;
    await mouse.setPosition({ x: 100, y: Math.round(y) });
    overlay.setStatus('Mouse: Left');
}

/**
 * Move mouse to right side of screen
 * @param {number} [yPercent=50] - Vertical position as percentage (0=top, 100=bottom)
 */
async function moveToRight(yPercent = 50) {
    const y = (yPercent / 100) * SCREEN_HEIGHT;
    await mouse.setPosition({ x: SCREEN_WIDTH - 100, y: Math.round(y) });
    overlay.setStatus('Mouse: Right');
}

/**
 * Move mouse to top of screen
 * @param {number} [xPercent=50] - Horizontal position as percentage (0=left, 100=right)
 */
async function moveToTop(xPercent = 50) {
    const x = (xPercent / 100) * SCREEN_WIDTH;
    await mouse.setPosition({ x: Math.round(x), y: 100 });
    overlay.setStatus('Mouse: Top');
}

/**
 * Move mouse to bottom of screen
 * @param {number} [xPercent=50] - Horizontal position as percentage (0=left, 100=right)
 */
async function moveToBottom(xPercent = 50) {
    const x = (xPercent / 100) * SCREEN_WIDTH;
    await mouse.setPosition({ x: Math.round(x), y: SCREEN_HEIGHT - 100 });
    overlay.setStatus('Mouse: Bottom');
}

/**
 * Move mouse to a screen corner
 * @param {'topLeft'|'topRight'|'bottomLeft'|'bottomRight'} corner - Corner to move to
 */
async function moveToCorner(corner) {
    const positions = {
        topLeft: { x: 100, y: 100 },
        topRight: { x: SCREEN_WIDTH - 100, y: 100 },
        bottomLeft: { x: 100, y: SCREEN_HEIGHT - 100 },
        bottomRight: { x: SCREEN_WIDTH - 100, y: SCREEN_HEIGHT - 100 },
    };
    const pos = positions[corner] || positions.topLeft;
    await mouse.setPosition(pos);
    overlay.setStatus(`Mouse: ${corner}`);
}

/**
 * Move mouse by percentage of screen
 * @param {number} xPercent - X position as percentage (0-100)
 * @param {number} yPercent - Y position as percentage (0-100)
 */
async function moveToPercent(xPercent, yPercent) {
    const x = (xPercent / 100) * SCREEN_WIDTH;
    const y = (yPercent / 100) * SCREEN_HEIGHT;
    await mouse.setPosition({ x: Math.round(x), y: Math.round(y) });
}

/**
 * Drag the mouse a relative distance (for camera rotation)
 * Centers mouse first to ensure consistent behavior
 * @param {number} deltaX - Horizontal distance to move
 * @param {number} deltaY - Vertical distance to move (optional)
 * @param {number} durationMs - Duration of the drag in milliseconds
 */
async function dragMouse(deltaX, deltaY = 0, durationMs = 500) {
    const updateInterval = config.timing.updateIntervalMs;
    const steps = Math.floor(durationMs / updateInterval);

    const stepX = deltaX / steps;
    const stepY = deltaY / steps;

    const center = await mouse.getPosition();

    overlay.setStatus(`Rotating camera...`);

    for (let i = 0; i <= steps; i++) {
        const newX = center.x + (stepX * i);
        const newY = center.y + (stepY * i);

        await mouse.setPosition({ x: Math.round(newX), y: Math.round(newY) });

        const percent = (i / steps) * 100;
        overlay.setProgress(percent, `${((steps - i) * updateInterval / 1000).toFixed(1)}s`, 'input');

        if (i < steps) {
            await sleep(updateInterval);
        }
    }

    overlay.setProgress(100, 'Done!', 'input');
    overlay.setStatus('Camera rotated');
}

/**
 * Turn the camera right by moving the mouse
 * @param {number} degrees - Approximate degrees to turn (90 = quarter turn)
 * @param {number} durationMs - Duration of the turn
 */
async function turnRight(degrees = 90, durationMs = 1000) {
    const pixelsPerDegree = config.camera?.pixelsPerDegree || 3;
    const deltaX = degrees * pixelsPerDegree;
    await dragMouse(deltaX, 0, durationMs);
}

/**
 * Turn the camera left by moving the mouse
 * @param {number} degrees - Approximate degrees to turn (90 = quarter turn)
 * @param {number} durationMs - Duration of the turn
 */
async function turnLeft(degrees = 90, durationMs = 1000) {
    const pixelsPerDegree = config.camera?.pixelsPerDegree || 3;
    const deltaX = -(degrees * pixelsPerDegree);
    await dragMouse(deltaX, 0, durationMs);
}

/**
 * Nudge camera right by a small amount (for fine adjustments)
 * @param {number} pixels - Pixels to move (default 50)
 * @param {number} durationMs - Duration of the nudge
 */
async function nudgeRight(pixels = 50, durationMs = 200) {
    await dragMouse(pixels, 0, durationMs);
}

/**
 * Nudge camera left by a small amount (for fine adjustments)
 * @param {number} pixels - Pixels to move (default 50)
 * @param {number} durationMs - Duration of the nudge
 */
async function nudgeLeft(pixels = 50, durationMs = 200) {
    await dragMouse(-pixels, 0, durationMs);
}

/**
 * Delay between inputs
 * @param {number} ms - Milliseconds to wait (defaults to config value)
 */
async function delay(ms = config.timing.inputDelayMs) {
    await sleep(ms);
}

// Export Key enum for convenience
module.exports = {
    moveCamera,
    holdKey,
    pressKey,
    type,
    moveMouse,
    click,
    rightClick,
    dragMouse,
    turnRight,
    turnLeft,
    nudgeRight,
    nudgeLeft,
    delay,
    Key,
    Button,
};
