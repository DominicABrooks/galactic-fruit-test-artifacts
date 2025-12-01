// generate-manifests.js
import fs from "fs";
import path from "path";

const baseDir = path.resolve("public/data/testCases");

function generateManifests() {
    if (!fs.existsSync(baseDir)) {
        console.error("Directory not found:", baseDir);
        process.exit(1);
    }

    const suites = fs.readdirSync(baseDir);

    for (const suite of suites) {
        const suitePath = path.join(baseDir, suite);
        const manifestPath = path.join(suitePath, "manifest.json");

        // Skip non-directories
        if (!fs.statSync(suitePath).isDirectory()) continue;

        // Read all files inside the suite
        const files = fs
            .readdirSync(suitePath)
            .filter(f => f.endsWith(".json") && f !== "manifest.json");

        // Write manifest.json
        fs.writeFileSync(manifestPath, JSON.stringify(files, null, 4));
        console.log(`✓ Manifest created for ${suite}: ${files.length} files`);
    }
}

generateManifests();