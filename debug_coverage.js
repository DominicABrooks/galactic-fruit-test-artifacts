const fs = require('fs');
const path = require('path');

// 1. Load Expected Features from Exploratory Notes
const exploratoryDir = path.join(process.cwd(), 'src', 'content', 'exploratory');
const allDerivedFeatures = new Set();
const featureSources = {}; // map feature -> filename

console.log("--- Loading Features from Exploratory Notes ---");
if (fs.existsSync(exploratoryDir)) {
    const files = fs.readdirSync(exploratoryDir);
    files.forEach(file => {
        if (file.endsWith('.md')) {
            const content = fs.readFileSync(path.join(exploratoryDir, file), 'utf8');
            // Simple regex to extract derivedFeatures list from frontmatter
            // Looks for "derivedFeatures:" followed by list items
            const match = content.match(/derivedFeatures:\s*([\s\S]*?)(?:\n\w|---)/);
            if (match) {
                const listBlock = match[1];
                const items = listBlock.split('\n').map(line => line.trim()).filter(line => line.startsWith('-'));
                items.forEach(item => {
                    // Remove "- " and quotes
                    let feature = item.replace(/^-\s*/, '').replace(/^['"](.*)['"]$/, '$1');
                    allDerivedFeatures.add(feature);
                    featureSources[feature] = file;
                });
            }
        }
    });
}
console.log(`Found ${allDerivedFeatures.size} unique features.`);

// 2. Load Test Cases
const testCasesDir = path.join(process.cwd(), 'public', 'data', 'testCases');
const testCaseFeatures = new Set();
const testCaseMap = {}; // feature -> [tcId]

console.log("\n--- Loading Test Cases ---");
function scanTestCases(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            scanTestCases(fullPath);
        } else if (file.endsWith('.json') && file !== 'manifest.json') {
            try {
                const content = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
                if (content.derivedFeature) {
                    testCaseFeatures.add(content.derivedFeature);
                    if (!testCaseMap[content.derivedFeature]) {
                        testCaseMap[content.derivedFeature] = [];
                    }
                    testCaseMap[content.derivedFeature].push(content.id);
                }
            } catch (e) {
                console.error(`Error reading ${file}:`, e.message);
            }
        }
    });
}
scanTestCases(testCasesDir);
console.log(`Found ${testCaseFeatures.size} unique features referenced in Test Cases.`);

// 3. Compare and Report
console.log("\n--- Coverage Report ---");
let coveredCount = 0;
const missingFeatures = [];

Array.from(allDerivedFeatures).sort().forEach(feature => {
    // Check for exact match
    if (testCaseMap[feature]) {
        coveredCount++;
    } else {
        // Check for case-insensitive match
        const lowerFeature = feature.toLowerCase();
        const match = Object.keys(testCaseMap).find(k => k.toLowerCase() === lowerFeature);
        if (match) {
            console.log(`[MISMATCH] Feature '${feature}' matches '${match}' (Case difference)`);
            coveredCount++;
        } else {
            missingFeatures.push({ feature, source: featureSources[feature] });
        }
    }
});

console.log(`\nTotal Coverage: ${coveredCount} / ${allDerivedFeatures.size} (${Math.round(coveredCount / allDerivedFeatures.size * 100)}%)`);

if (missingFeatures.length > 0) {
    console.log("\n--- Missing Coverage (Features with no matching Test Case) ---");
    missingFeatures.forEach(m => {
        console.log(`Feature: "${m.feature}" (from ${m.source})`);
    });
}

// 4. Check for Orphaned Test Cases (Features in TC that don't exist in Notes)
console.log("\n--- Orphaned Test Cases (Features in TC not in Notes) ---");
testCaseFeatures.forEach(tcFeature => {
    let found = false;
    for (const f of allDerivedFeatures) {
        if (f.toLowerCase() === tcFeature.toLowerCase()) {
            found = true;
            break;
        }
    }
    if (!found) {
        console.log(`Orphan: "${tcFeature}" (Used in ${testCaseMap[tcFeature].join(', ')})`);
    }
});
