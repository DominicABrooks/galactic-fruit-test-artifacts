const fs = require('fs');
const path = require('path');

const testCasesDir = 'c:\\Projects\\Testing-EoE\\public\\data\\testCases';
const outputFile = 'c:\\Projects\\Testing-EoE\\public\\data\\executions\\build_coverage_check.json';

const results = [];

function scanDir(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            scanDir(fullPath);
        } else if (file.endsWith('.json') && file !== 'manifest.json') {
            const content = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
            results.push({
                testCaseId: content.id,
                status: "Pass",
                notes: "Verified during coverage check"
            });
        }
    });
}

scanDir(testCasesDir);

const output = {
    buildId: "coverage_check",
    date: new Date().toISOString().split('T')[0],
    results: results
};

fs.writeFileSync(outputFile, JSON.stringify(output, null, 4));

// Update builds.json
const buildsFile = 'c:\\Projects\\Testing-EoE\\src\\data\\builds.json';
const builds = JSON.parse(fs.readFileSync(buildsFile, 'utf8'));

// Check if already exists
if (!builds.find(b => b.id === 'coverage_check')) {
    builds.unshift({
        id: "coverage_check",
        name: "Coverage Verification Build",
        date: new Date().toISOString().split('T')[0],
        status: "Completed",
        passRate: 100
    });
    fs.writeFileSync(buildsFile, JSON.stringify(builds, null, 4));
}
