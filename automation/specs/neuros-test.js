/**
 * Neuros Terminal Test Suite
 * 
 * Tests the functionality of the Neuros terminal, including:
 * - Activation/Setup (Pre-condition)
 * - CLI Commands
 * - Lore Entries
 */

const { input, screen, utils } = require('../lib');
const overlay = require('../lib/overlay');

module.exports = {
    name: 'Neuros Terminal Tests',
    description: 'Validate Neuros terminal CLI and Lore entries',

    // Optional: Override config settings
    // exePath: "C:\\Path\\To\\Game.exe", 

    steps: [
        {
            name: 'Pre-condition: Open Neuros',
            action: async () => {
                // Ensure overlay is shown
                await overlay.show();

                let isReady = false;
                while (!isReady) {
                    overlay.setStatus('Waiting for Pre-conditions');

                    // Show Precondition Dialog first
                    await screen.showPreconditionDialog(
                        'This test requires the Neuros terminal to be OPEN.\n\nPlease manually open the Neuros terminal in the game.'
                    );

                    overlay.setStatus('Verifying Neuros...');

                    // Then Verify
                    const result = await screen.captureAndVerify(
                        'Is the Neuros terminal successfully OPEN?',
                        'neuros-setup-check'
                    );

                    if (result.verified) {
                        isReady = true;
                        overlay.setStatus('Neuros Confirmed Open');
                    } else {
                        overlay.setStatus('Retry setup...');
                        await utils.wait(1000);
                    }
                }
            }
        },
        {
            name: 'Test "help" command',
            action: async () => {
                await input.type('help');
                await input.pressKey(input.Key.Enter);
                await utils.wait(1000); // Wait for text to print

                const result = await screen.captureAndVerify(
                    'Did the terminal list the available topics?\n- Galactic Fruit\n- Fabrica\n- Ladagocia\n- Mesodion',
                    'neuros-help-output'
                );

                if (!result.verified) throw new Error('Help command failed verification');
            }
        },
        {
            name: 'Test "Galactic Fruit" command',
            action: async () => {
                await input.type('Galactic Fruit');
                await input.pressKey(input.Key.Enter);
                await utils.wait(1000);

                const result = await screen.captureAndVerify(
                    'Is the "Galactic Fruit" lore text displayed correctly?',
                    'neuros-galactic-fruit'
                );

                if (!result.verified) throw new Error('Galactic Fruit lore failed verification');
            }
        },
        {
            name: 'Test "Fabrica" command',
            action: async () => {
                await input.type('Fabrica');
                await input.pressKey(input.Key.Enter);
                await utils.wait(1000);

                const result = await screen.captureAndVerify(
                    'Is the "Fabrica" lore text displayed correctly?',
                    'neuros-fabrica'
                );

                if (!result.verified) throw new Error('Fabrica lore failed verification');
            }
        },
        {
            name: 'Test "Ladagocia" command',
            action: async () => {
                await input.type('Ladagocia');
                await input.pressKey(input.Key.Enter);
                await utils.wait(1000);

                const result = await screen.captureAndVerify(
                    'Is the "Ladagocia" lore text displayed correctly?\n(Note: A typo "Their they found" is expected)',
                    'neuros-ladagocia'
                );

                if (!result.verified) throw new Error('Ladagocia lore failed verification');
            }
        },
        {
            name: 'Test "Mesodion" command',
            action: async () => {
                await input.type('Mesodion');
                await input.pressKey(input.Key.Enter);
                await utils.wait(1000);

                const result = await screen.captureAndVerify(
                    'Is the "Mesodion" lore text displayed correctly?',
                    'neuros-mesodion'
                );

                if (!result.verified) throw new Error('Mesodion lore failed verification');
            }
        }
    ]
};
