const fs = require('fs');
const path = require('path');

const introDir = 'c:\\Projects\\Testing-EoE\\public\\data\\testCases\\intro-tests';
const conditionsDir = 'c:\\Projects\\Testing-EoE\\src\\data\\analysis\\conditions';

const newTestCases = [
    {
        id: "TC-INTRO-019",
        name: "Verify Main Door Interaction",
        description: "Validates that the main hallway door opens and closes correctly with animation.",
        testObjective: "Ensure main door functions as expected.",
        priority: "High",
        type: "Functional",
        author: "Dominic Brooks",
        derivedFeature: "Hallway Doors",
        steps: [
            { step: 1, action: "Interact with main door button", expected: "Door opens with animation" },
            { step: 2, action: "Interact with button again", expected: "Door closes with animation" }
        ]
    },
    {
        id: "TC-INTRO-020",
        name: "Verify Door Animation Skipping Defect",
        description: "Validates that rapid interaction with the door button does not skip the animation (Defect check).",
        testObjective: "Verify defect fix or reproduce issue.",
        priority: "Medium",
        type: "Defect Verification",
        author: "Dominic Brooks",
        derivedFeature: "Hallway Doors",
        steps: [
            { step: 1, action: "Interact with door button", expected: "Animation starts" },
            { step: 2, action: "Rapidly press interaction button again", expected: "Animation should continue smoothly, not skip" }
        ]
    },
    {
        id: "TC-INTRO-021",
        name: "Verify Side Room Door Animation",
        description: "Validates that side room doors use the correct sliding animation.",
        testObjective: "Ensure side doors behave differently from main door.",
        priority: "Medium",
        type: "Visual",
        author: "Dominic Brooks",
        derivedFeature: "Room Interaction",
        steps: [
            { step: 1, action: "Interact with a side room door", expected: "Door slides from right to left" }
        ]
    },
    {
        id: "TC-INTRO-022",
        name: "Verify Side Room Door Auto-Close",
        description: "Validates that side room doors automatically close after a delay.",
        testObjective: "Ensure auto-close logic works.",
        priority: "Medium",
        type: "Functional",
        author: "Dominic Brooks",
        derivedFeature: "Room Interaction",
        steps: [
            { step: 1, action: "Open a side room door", expected: "Door opens" },
            { step: 2, action: "Wait for 2-3 seconds", expected: "Door closes automatically" }
        ]
    },
    {
        id: "TC-INTRO-023",
        name: "Verify Accessible Rooms",
        description: "Validates that Electrical and Waste rooms can be entered.",
        testObjective: "Ensure accessible rooms are unlocked.",
        priority: "High",
        type: "Functional",
        author: "Dominic Brooks",
        derivedFeature: "Room Interaction",
        steps: [
            { step: 1, action: "Try to enter Electrical room", expected: "Door opens, room accessible" },
            { step: 2, action: "Try to enter Waste room", expected: "Door opens, room accessible" }
        ]
    },
    {
        id: "TC-INTRO-024",
        name: "Verify Locked Rooms",
        description: "Validates that Administration and Lounge rooms are locked.",
        testObjective: "Ensure locked rooms cannot be entered.",
        priority: "High",
        type: "Functional",
        author: "Dominic Brooks",
        derivedFeature: "Room Interaction",
        steps: [
            { step: 1, action: "Try to enter Administration room", expected: "Door does not open" },
            { step: 2, action: "Try to enter Lounge room", expected: "Door does not open" }
        ]
    },
    {
        id: "TC-INTRO-025",
        name: "Verify Cryochamber Interaction",
        description: "Validates that interacting with the cryochamber triggers the hibernation sequence.",
        testObjective: "Ensure hibernation sequence starts.",
        priority: "Critical",
        type: "Functional",
        author: "Dominic Brooks",
        derivedFeature: "Hibernation System",
        steps: [
            { step: 1, action: "Enter Hibernation room", expected: "Room accessible" },
            { step: 2, action: "Interact with Cryochamber", expected: "Screen fades to black, sequence starts" }
        ]
    },
    {
        id: "TC-INTRO-026",
        name: "Verify Region Transition to 0b",
        description: "Validates that the game transitions to Region 0b after hibernation.",
        testObjective: "Ensure correct region loading.",
        priority: "Critical",
        type: "Functional",
        author: "Dominic Brooks",
        derivedFeature: "Region Transition",
        steps: [
            { step: 1, action: "Complete hibernation sequence", expected: "Player wakes up" },
            { step: 2, action: "Check current region", expected: "Region is 0b" }
        ]
    }
];

// Write Test Cases
newTestCases.forEach(tc => {
    const content = {
        id: tc.id,
        name: tc.name,
        description: tc.description,
        testObjective: tc.testObjective,
        priority: tc.priority,
        type: tc.type,
        author: tc.author,
        createdDate: "2025-12-06",
        lastModified: "2025-12-06",
        estimatedExecutionTime: "3 minutes",
        environment: "Steam Client Build 20951743",
        derivedFeature: tc.derivedFeature,
        preconditions: ["Player is in Intro Ship Hallway"],
        testData: {},
        steps: tc.steps,
        postconditions: ["Test complete"],
        tags: ["intro", "hallway", "functional"]
    };
    fs.writeFileSync(path.join(introDir, `${tc.id}.json`), JSON.stringify(content, null, 4));
});

// Update Manifest
const manifestPath = path.join(introDir, 'manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
newTestCases.forEach(tc => {
    if (!manifest.includes(`${tc.id}.json`)) {
        manifest.push(`${tc.id}.json`);
    }
});
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 4));

// Update Condition File
const conditionPath = path.join(conditionsDir, 'EXP-INTRO-004.json');
const conditions = JSON.parse(fs.readFileSync(conditionPath, 'utf8'));

conditions.forEach(c => {
    if (c.id === 'TC-COND-031') c.linkedTestCases = ['TC-INTRO-019'];
    if (c.id === 'TC-COND-032') c.linkedTestCases = ['TC-INTRO-020'];
    if (c.id === 'TC-COND-033') c.linkedTestCases = ['TC-INTRO-021'];
    if (c.id === 'TC-COND-034') c.linkedTestCases = ['TC-INTRO-022'];
    if (c.id === 'TC-COND-035') c.linkedTestCases = ['TC-INTRO-023'];
    if (c.id === 'TC-COND-036') c.linkedTestCases = ['TC-INTRO-024'];
    if (c.id === 'TC-COND-037') c.linkedTestCases = ['TC-INTRO-025'];
    if (c.id === 'TC-COND-038') c.linkedTestCases = ['TC-INTRO-026'];
});

fs.writeFileSync(conditionPath, JSON.stringify(conditions, null, 4));
