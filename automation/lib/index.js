/**
 * Galactic Fruit Automation Framework - Main Entry Point
 * 
 * Exports all modules for easy access in test specs
 */

const overlay = require('./overlay');
const input = require('./input');
const screen = require('./screen');
const game = require('./game');
const utils = require('./utils');

module.exports = {
    overlay,
    input,
    screen,
    game,
    utils,
    // Re-export commonly used items at top level for convenience
    Key: input.Key,
    Button: input.Button,
};
