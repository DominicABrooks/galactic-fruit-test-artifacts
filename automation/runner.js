/**
 * Test Runner - Executes test specs with proper setup and teardown
 */

const path = require('path');
const fs = require('fs');
const { overlay, game, utils } = require('./lib');
const config = require('./config');

/**
 * Run a single test spec
 * @param {object} spec - Test specification object
 */
async function runSpec(spec) {
    const results = {
        name: spec.name,
        description: spec.description,
        steps: [],
        passed: true,
        error: null,
    };

    try {
        // Show overlay
        await overlay.show();
        overlay.setStatus(`Running: ${spec.name}`);
        overlay.setProgress(0, 'Starting...', 'default');
        await utils.sleep(500);

        // Launch game if spec requires it
        if (spec.launchGame !== false) {
            await game.launch(spec.exePath || config.game.exePath);
            await game.waitForLoad(spec.loadWaitTime || config.game.launchWaitTime / 1000);
        }

        // Run test steps
        for (let i = 0; i < spec.steps.length; i++) {
            const step = spec.steps[i];
            overlay.setStatus(`Step ${i + 1}/${spec.steps.length}: ${step.name}`);

            try {
                await step.action();
                results.steps.push({ name: step.name, passed: true });
            } catch (error) {
                results.steps.push({ name: step.name, passed: false, error: error.message });
                results.passed = false;
                throw error;
            }

            await utils.sleep(config.timing.inputDelayMs);
        }

        // Success!
        overlay.setStatus('Test Complete!');
        overlay.setProgress(100, 'Success!', 'complete');
        await utils.sleep(2000);

    } catch (error) {
        results.passed = false;
        results.error = error.message;
        overlay.setStatus(`Error: ${error.message}`);
        overlay.setProgress(0, 'Failed!', 'error');
        console.error('Test error:', error);
        await utils.sleep(3000);
    } finally {
        // Close the game
        await game.close();
        await overlay.close();
    }

    return results;
}

/**
 * Run all specs in the specs directory
 */
async function runAllSpecs() {
    const specsDir = path.join(__dirname, 'specs');
    const specFiles = fs.readdirSync(specsDir).filter(f => f.endsWith('.js'));

    const allResults = [];

    for (const file of specFiles) {
        const specPath = path.join(specsDir, file);
        const spec = require(specPath);

        console.log(`\n${'='.repeat(50)}`);
        console.log(`Running: ${spec.name}`);
        console.log('='.repeat(50));

        const results = await runSpec(spec);
        allResults.push(results);

        console.log(`Result: ${results.passed ? 'PASSED' : 'FAILED'}`);
    }

    // Summary
    console.log(`\n${'='.repeat(50)}`);
    console.log('TEST SUMMARY');
    console.log('='.repeat(50));

    const passed = allResults.filter(r => r.passed).length;
    const failed = allResults.filter(r => !r.passed).length;

    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${failed}`);
    console.log(`Total: ${allResults.length}`);

    return allResults;
}

/**
 * Run a specific spec file
 * @param {string} specFile - Spec filename (without path, e.g., 'movement-test.js')
 */
async function runSpecFile(specFile) {
    const specPath = path.join(__dirname, 'specs', specFile);

    if (!fs.existsSync(specPath)) {
        console.error(`Spec file not found: ${specPath}`);
        process.exit(1);
    }

    const spec = require(specPath);
    const results = await runSpec(spec);

    console.log(`\nResult: ${results.passed ? 'PASSED' : 'FAILED'}`);

    if (!results.passed) {
        process.exit(1);
    }

    return results;
}

// CLI handling
if (require.main === module) {
    const args = process.argv.slice(2);

    if (args.length === 0) {
        console.log('Usage:');
        console.log('  node runner.js <spec-file.js>  - Run a specific spec');
        console.log('  node runner.js --all           - Run all specs');
        process.exit(0);
    }

    if (args[0] === '--all') {
        runAllSpecs().catch(console.error);
    } else {
        runSpecFile(args[0]).catch(console.error);
    }
}

module.exports = {
    runSpec,
    runSpecFile,
    runAllSpecs,
};
