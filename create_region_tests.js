const fs = require('fs');
const path = require('path');

const region0bDir = 'c:\\Projects\\Testing-EoE\\public\\data\\testCases\\region-0b';
const region2Dir = 'c:\\Projects\\Testing-EoE\\public\\data\\testCases\\region-2';
const conditionsDir = 'c:\\Projects\\Testing-EoE\\src\\data\\analysis\\conditions';

// Region 0b New Tests
const tc0b006 = {
    id: "TC-0B-006",
    name: "Verify Region Transition to 0b",
    description: "Validates that the player transitions correctly from Intro to Region 0b.",
    testObjective: "Ensure correct region loading.",
    priority: "High",
    type: "Functional",
    author: "Dominic Brooks",
    derivedFeature: "Region Transition",
    steps: [
        { step: 1, action: "Complete Intro Hibernation", expected: "Transition to 0b" }
    ],
    createdDate: "2025-12-06", lastModified: "2025-12-06", estimatedExecutionTime: "2 minutes", environment: "Steam Client Build 20951743", preconditions: ["Intro Complete"], testData: {}, postconditions: ["In Region 0b"], tags: ["region-0b", "transition"]
};

const tc0b007 = {
    id: "TC-0B-007",
    name: "Verify Hibernation Transition to Region 1",
    description: "Validates that the player transitions correctly from Region 0b to Region 1.",
    testObjective: "Ensure correct region loading.",
    priority: "Critical",
    type: "Functional",
    author: "Dominic Brooks",
    derivedFeature: "Hibernation",
    steps: [
        { step: 1, action: "Enter Hibernation in 0b", expected: "Transition to Region 1" }
    ],
    createdDate: "2025-12-06", lastModified: "2025-12-06", estimatedExecutionTime: "2 minutes", environment: "Steam Client Build 20951743", preconditions: ["Region 0b Complete"], testData: {}, postconditions: ["In Region 1"], tags: ["region-0b", "hibernation"]
};

// Region 2 New Test
const tc2011 = {
    id: "TC-2-011",
    name: "Verify Region Transition to Region 2",
    description: "Validates that the player transitions correctly from Region 1 to Region 2.",
    testObjective: "Ensure correct region loading.",
    priority: "High",
    type: "Functional",
    author: "Dominic Brooks",
    derivedFeature: "Region Transition",
    steps: [
        { step: 1, action: "Complete Region 1 Hibernation", expected: "Transition to Region 2" }
    ],
    createdDate: "2025-12-06", lastModified: "2025-12-06", estimatedExecutionTime: "2 minutes", environment: "Steam Client Build 20951743", preconditions: ["Region 1 Complete"], testData: {}, postconditions: ["In Region 2"], tags: ["region-2", "transition"]
};

// Write Files
fs.writeFileSync(path.join(region0bDir, 'TC-0B-006.json'), JSON.stringify(tc0b006, null, 4));
fs.writeFileSync(path.join(region0bDir, 'TC-0B-007.json'), JSON.stringify(tc0b007, null, 4));
fs.writeFileSync(path.join(region2Dir, 'TC-2-011.json'), JSON.stringify(tc2011, null, 4));

// Update Manifests
const man0b = JSON.parse(fs.readFileSync(path.join(region0bDir, 'manifest.json'), 'utf8'));
if (!man0b.includes('TC-0B-006.json')) man0b.push('TC-0B-006.json');
if (!man0b.includes('TC-0B-007.json')) man0b.push('TC-0B-007.json');
fs.writeFileSync(path.join(region0bDir, 'manifest.json'), JSON.stringify(man0b, null, 4));

const man2 = JSON.parse(fs.readFileSync(path.join(region2Dir, 'manifest.json'), 'utf8'));
if (!man2.includes('TC-2-011.json')) man2.push('TC-2-011.json');
fs.writeFileSync(path.join(region2Dir, 'manifest.json'), JSON.stringify(man2, null, 4));

// Update Conditions
const cond0b = JSON.parse(fs.readFileSync(path.join(conditionsDir, 'EXP-0B-001.json'), 'utf8'));
cond0b.push({
    id: "TC-COND-011A",
    category: "Region Transition",
    condition: "Verify transition to Region 0b",
    priority: "High",
    linkedTestCases: ["TC-0B-006"],
    exploratoryNoteId: "EXP-0B-001"
});
cond0b.push({
    id: "TC-COND-015A",
    category: "Hibernation",
    condition: "Verify hibernation transition to Region 1",
    priority: "Critical",
    linkedTestCases: ["TC-0B-007"],
    exploratoryNoteId: "EXP-0B-001"
});
fs.writeFileSync(path.join(conditionsDir, 'EXP-0B-001.json'), JSON.stringify(cond0b, null, 4));

const cond2 = JSON.parse(fs.readFileSync(path.join(conditionsDir, 'EXP-2-001.json'), 'utf8'));
cond2.push({
    id: "TC-COND-026A",
    category: "Region Transition",
    condition: "Verify transition to Region 2",
    priority: "High",
    linkedTestCases: ["TC-2-011"],
    exploratoryNoteId: "EXP-2-001"
});
fs.writeFileSync(path.join(conditionsDir, 'EXP-2-001.json'), JSON.stringify(cond2, null, 4));
