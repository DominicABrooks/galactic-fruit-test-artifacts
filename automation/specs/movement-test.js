/**
 * Enter Ship Test
 * 
 * Tests the character's ability to enter the ship after picking up the suit.
 */

const { input, screen, utils } = require('../lib');

module.exports = {
    // Test metadata
    name: 'Enter Ship Test',
    description: 'Verify character can enter the ship after picking up the suit',

    // Optional: Override config settings
    // exePath: "C:\\Path\\To\\Game.exe",
    // loadWaitTime: 15,

    // Test steps
    steps: [
        {
            name: 'Look at monitor',
            action: async () => {
                await input.turnRight(90, 1000);
            }
        },
        {
            name: 'Brief Pause',
            action: async () => {
                await input.delay(500);
            }
        },
        {
            name: 'Move Forward',
            action: async () => {
                await input.holdKey(input.Key.W, 1000, 'W');
            }
        },
        {
            name: 'Brief Pause',
            action: async () => {
                await input.delay(300);
            }
        },
        {
            name: 'Move Right',
            action: async () => {
                await input.holdKey(input.Key.D, 1500, 'D');
            }
        },
        {
            name: 'Look at Suit',
            action: async () => {
                await input.turnRight(180, 1000);
            }
        },
        {
            name: 'Pick Up Suit',
            action: async () => {
                await input.pressKey(input.Key.E);
            }
        },
        {
            name: 'Brief Pause',
            action: async () => {
                await input.delay(300);
            }
        },
        {
            name: 'Move Left briefly',
            action: async () => {
                await input.holdKey(input.Key.A, 1000, 'A');
            }
        },
        {
            name: 'Brief Pause',
            action: async () => {
                await input.delay(300);
            }
        },
        {
            name: 'Interact with Ladder',
            action: async () => {
                await input.pressKey(input.Key.E);
            }
        },
        {
            name: 'Wait for Ship Entry',
            action: async () => {
                await utils.wait(8000);
            }
        },
        {
            name: 'Verify In Ship',
            action: async () => {
                const result = await screen.captureAndVerify(
                    'Are you inside the ship?',
                    'ship-entry-result'
                );

                if (!result.verified) {
                    throw new Error('Ship entry verification failed');
                }

                console.log(`Screenshot saved: ${result.path}`);
            }
        }
    ]
};
