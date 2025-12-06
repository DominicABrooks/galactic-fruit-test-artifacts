const fs = require('fs');
const path = require('path');

const genDir = 'c:\\Projects\\Testing-EoE\\public\\data\\testCases\\general-tests';
try {
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

    fs.writeFileSync('c:\\Projects\\Testing-EoE\\gen_tests_mapping.json', JSON.stringify(mapping, null, 2));
} catch (e) {
    fs.writeFileSync('c:\\Projects\\Testing-EoE\\error.txt', e.toString());
}
