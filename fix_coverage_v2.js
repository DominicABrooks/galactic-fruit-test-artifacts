const fs = require('fs');
const path = require('path');

// Mapping of test case IDs to exact feature names from exploratory notes
const featureMapping = {
    // INTRO tests - from EXP-INTRO-001, 002, 003, 004
    "TC-INTRO-001": "Introduction",
    "TC-INTRO-002": "Introduction",
    "TC-INTRO-003": "Interaction System",
    "TC-INTRO-004": "Door / Button Interaction",
    "TC-INTRO-005": "Suit Interaction",
    "TC-INTRO-006": "Ladder Interaction",
    "TC-INTRO-007": "Ship Transition",
    "TC-INTRO-008": "Audio Feedback",
    "TC-INTRO-009": "Terminal System",
    "TC-INTRO-010": "Power System",
    "TC-INTRO-011": "File System",
    "TC-INTRO-012": "Authentication Minigame",
    "TC-INTRO-013": "Video Playback",
    "TC-INTRO-014": "Operations Manual",
    "TC-INTRO-015": "UI Interaction",
    "TC-INTRO-016": "Tutorial Progression",
    "TC-INTRO-017": "Camera System",
    "TC-INTRO-018": "Map Terminal",
    "TC-INTRO-019": "Hallway Doors",
    "TC-INTRO-020": "Hallway Doors",
    "TC-INTRO-021": "Room Interaction",
    "TC-INTRO-022": "Room Interaction",
    "TC-INTRO-023": "Room Interaction",
    "TC-INTRO-024": "Room Interaction",
    "TC-INTRO-025": "Hibernation System",
    "TC-INTRO-026": "Region Transition",
    // 0B tests - from EXP-0B-001
    "TC-0B-001": "Neuros Terminal",
    "TC-0B-002": "CLI Interface",
    "TC-0B-003": "Database System",
    "TC-0B-004": "Evaluation.kp4 Minigame",
    "TC-0B-005": "Red/Green Face Detection",
    "TC-0B-006": "Region Transition",
    "TC-0B-007": "Hibernation",
    // Region 1 tests - from EXP-1-001
    "TC-1-001": "Region Transition",
    "TC-1-002": "Hallway Lighting Sequence",
    "TC-1-003": "SAFETY.a Training Video",
    "TC-1-004": "Planet Scanning",
    "TC-1-005": "Cerebellum Discovery",
    "TC-1-006": "Timing Minigame",
    "TC-1-007": "Report Generation",
    "TC-1-008": "Map System",
    "TC-1-009": "Course Setting",
    "TC-1-010": "Prerequisite Blocking",
    // Region 2 tests - from EXP-2-001
    "TC-2-001": "Region Transition",
    "TC-2-002": "Hallway Lighting Effects",
    "TC-2-003": "Secret Discovery",
    "TC-2-004": "LAD.r File",
    "TC-2-005": "Raspberry Stamp",
    "TC-2-006": "Planet Scanning",
    "TC-2-007": "Ladagocia Discovery",
    "TC-2-008": "Timing Minigame",
    "TC-2-009": "Report Generation",
    "TC-2-010": "Map Progression",
    "TC-2-011": "Region Transition",
    "TC-2-012": "Door Interaction",
    "TC-2-013": "Light Culling",
    // Planet 3 tests - from EXP-3-001
    "TC-3-001": "Minigame Completion",
    "TC-3-002": "Camera Repair System",
    "TC-3-003": "Region 3 Progression",
    "TC-3-004": "End-Game Portal",
    // General tests - from EXP-GENE-001
    "TC-GEN-001": "Introduction",
    "TC-GEN-002": "Control Onboarding",
    "TC-GEN-003": "Environmental Interaction",
    "TC-GEN-004": "Visual Rendering",
    "TC-GEN-005": "Ladder Transition",
    "TC-GEN-006": "Ship Control System",
    "TC-GEN-007": "Screen Interaction",
    "TC-GEN-008": "Progression Logic",
    "TC-GEN-009": "Door System",
    "TC-GEN-010": "Collision Handling",
    "TC-GEN-011": "Audio Settings",
    "TC-GEN-012": "UI Settings Persistence",
    "TC-GEN-013": "Language Localization",
    // Audio tests
    "TC-AUDIO-001": "Audio Feedback",
    // Interaction tests
    "TC-INT-001": "Interaction System",
    "TC-INT-002": "Paper Interaction",
    "TC-INT-003": "Filesystem Terminal",
    // Confirmation tests
    "TC-CONF-001": "Camera System",
    "TC-CONF-002": "Timing Minigame",
    "TC-CONF-003": "Report Generation",
    "TC-CONF-004": "Planet Scanning",
    "TC-CONF-005": "Cerebellum Discovery",
    "TC-CONF-006": "Camera Counter",
    "TC-CONF-007": "Cryochamber",
    "TC-CONF-008": "Ship Hallway",
    "TC-CONF-009": "Course Setting",
    "TC-CONF-010": "File System Archiving",
    "TC-CONF-011": "Minigame Completion",
    "TC-CONF-012": "End-Game Portal",
    "TC-CONF-013": "Camera Repair System",
    "TC-CONF-014": "Region 3 Progression",
    "TC-CONF-015": "Map Progression",
    "TC-CONF-016": "Minigame Completion",
    "TC-CONF-017": "Camera Repair System",
    "TC-CONF-018": "End-Game Portal"
};

const testCasesDir = 'c:\\Projects\\Testing-EoE\\public\\data\\testCases';
let updatedCount = 0;
let skippedCount = 0;

function updateTestCases(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            updateTestCases(fullPath);
        } else if (file.endsWith('.json') && file !== 'manifest.json') {
            const content = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
            const tcId = content.id;
            if (featureMapping[tcId]) {
                content.derivedFeature = featureMapping[tcId];
                fs.writeFileSync(fullPath, JSON.stringify(content, null, 4));
                console.log('Updated: ' + tcId + ' -> ' + featureMapping[tcId]);
                updatedCount++;
            } else {
                console.log('SKIPPED (no mapping): ' + tcId);
                skippedCount++;
            }
        }
    }
}

console.log('Starting update...');
updateTestCases(testCasesDir);
console.log('');
console.log('Updated: ' + updatedCount);
console.log('Skipped: ' + skippedCount);
