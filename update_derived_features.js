const fs = require('fs');
const path = require('path');

const testCasesDir = 'c:\\Projects\\Testing-EoE\\public\\data\\testCases';

const mapping = {
    "TC-0B-001": "Neuros Terminal",
    "TC-0B-002": "CLI Interface",
    "TC-0B-003": "Paper Interaction",
    "TC-0B-004": "Evaluation.kp4 Minigame",
    "TC-0B-005": "Camera System",
    "TC-0B-006": "Region Transition",
    "TC-0B-007": "Hibernation",
    "TC-1-001": "Hallway Lighting Sequence",
    "TC-1-002": "SAFETY.a Training Video",
    "TC-1-003": "Camera Counter",
    "TC-1-004": "Prerequisite Blocking",
    "TC-1-005": "Planet Scanning",
    "TC-1-006": "Timing Minigame",
    "TC-1-007": "Report Generation",
    "TC-1-008": "Map System",
    "TC-1-009": "Course Setting",
    "TC-1-010": "Region Transition",
    "TC-2-001": "Hallway Lighting Effects",
    "TC-2-002": "Secret Discovery",
    "TC-2-003": "LAD.r File",
    "TC-2-004": "Ladagocia Discovery",
    "TC-2-005": "Timing Minigame",
    "TC-2-006": "Report Generation",
    "TC-2-007": "Map Progression",
    "TC-2-008": "Course Setting",
    "TC-2-009": "Door Interaction",
    "TC-2-010": "Light Culling",
    "TC-2-011": "Region Transition",
    "TC-INTRO-001": "Introduction",
    "TC-INTRO-002": "Introduction",
    "TC-INTRO-003": "Suit Interaction",
    "TC-INTRO-004": "Ship Transition",
    "TC-INTRO-005": "Door / Button Interaction",
    "TC-INTRO-006": "Interaction System",
    "TC-INTRO-007": "Power System",
    "TC-INTRO-008": "Terminal System",
    "TC-INTRO-009": "Terminal System",
    "TC-INTRO-010": "Authentication Minigame",
    "TC-INTRO-011": "Tutorial Progression",
    "TC-INTRO-012": "Operations Manual",
    "TC-INTRO-013": "Camera System",
    "TC-INTRO-014": "Map Terminal",
    "TC-INTRO-015": "Camera System",
    "TC-INTRO-016": "Camera System",
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
    "TC-GEN-001": "Control Onboarding",
    "TC-GEN-002": "Environmental Interaction",
    "TC-GEN-003": "Visual Rendering",
    "TC-GEN-004": "Ladder Transition",
    "TC-GEN-005": "Ship Control System",
    "TC-GEN-006": "Screen Interaction",
    "TC-GEN-007": "Progression Logic",
    "TC-GEN-008": "Door System",
    "TC-GEN-009": "Collision Handling",
    "TC-GEN-010": "Audio Settings",
    "TC-GEN-011": "UI Settings Persistence",
    "TC-GEN-012": "Language Localization",
    "TC-GEN-013": "Visual Rendering"
};

function updateFiles(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            updateFiles(fullPath);
        } else if (file.endsWith('.json') && file !== 'manifest.json') {
            const content = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
            if (mapping[content.id]) {
                content.derivedFeature = mapping[content.id];
                fs.writeFileSync(fullPath, JSON.stringify(content, null, 4));
            }
        }
    });
}

updateFiles(testCasesDir);
