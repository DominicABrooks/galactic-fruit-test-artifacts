const fs = require('fs');
const path = require('path');

const genDir = 'c:\\Projects\\Testing-EoE\\public\\data\\testCases\\general-tests';
const files = fs.readdirSync(genDir).filter(f => f.endsWith('.json') && f !== 'manifest.json');

const mapping = [];

files.forEach(file => {
    const content = JSON.parse(fs.readFileSync(path.join(genDir, file), 'utf8'));
    mapping.push({
        id: content.id,
        name: content.name,
        description: content.description
    });
});

console.log(JSON.stringify(mapping, null, 2));
