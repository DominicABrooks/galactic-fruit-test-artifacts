const fs = require('fs');
const path = require('path');

const testCasesDir = path.join(__dirname, 'public/data/testCases');
const dirs = fs.readdirSync(testCasesDir, { withFileTypes: true }).filter(d => d.isDirectory());

let withDerived = 0;
let withoutDerived = [];

dirs.forEach(dir => {
    const dirPath = path.join(testCasesDir, dir.name);
    const files = fs.readdirSync(dirPath).filter(f => f.startsWith('TC-') && f.endsWith('.json'));

    files.forEach(file => {
        const content = fs.readFileSync(path.join(dirPath, file), 'utf8');
        if (content.includes('"derivedFeature"')) {
            withDerived++;
        } else {
            withoutDerived.push(`${dir.name}/${file}`);
        }
    });
});

console.log('Test cases WITH derivedFeature:', withDerived);
console.log('Test cases WITHOUT derivedFeature:', withoutDerived.length);
if (withoutDerived.length > 0) {
    console.log('\nMissing derivedFeature in:');
    withoutDerived.forEach(f => console.log('  -', f));
}
