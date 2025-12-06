const fs = require('fs');
const path = require('path');

const conditionsDir = 'c:\\Projects\\Testing-EoE\\src\\data\\analysis\\conditions';

const conditions = [
    { id: "TC-COND-GEN-001", category: "Control Onboarding", condition: "Verify control onboarding works", priority: "High", linkedTestCases: ["TC-GEN-001"], exploratoryNoteId: "EXP-GENE-001" },
    { id: "TC-COND-GEN-002", category: "Environmental Interaction", condition: "Verify environmental interaction", priority: "High", linkedTestCases: ["TC-GEN-002"], exploratoryNoteId: "EXP-GENE-001" },
    { id: "TC-COND-GEN-003", category: "Visual Rendering", condition: "Verify visual rendering", priority: "Medium", linkedTestCases: ["TC-GEN-003", "TC-GEN-013"], exploratoryNoteId: "EXP-GENE-001" },
    { id: "TC-COND-GEN-004", category: "Ladder Transition", condition: "Verify ladder transition", priority: "High", linkedTestCases: ["TC-GEN-004"], exploratoryNoteId: "EXP-GENE-001" },
    { id: "TC-COND-GEN-005", category: "Ship Control System", condition: "Verify ship control system", priority: "High", linkedTestCases: ["TC-GEN-005"], exploratoryNoteId: "EXP-GENE-001" },
    { id: "TC-COND-GEN-006", category: "Screen Interaction", condition: "Verify screen interaction", priority: "Medium", linkedTestCases: ["TC-GEN-006"], exploratoryNoteId: "EXP-GENE-001" },
    { id: "TC-COND-GEN-007", category: "Progression Logic", condition: "Verify progression logic", priority: "High", linkedTestCases: ["TC-GEN-007"], exploratoryNoteId: "EXP-GENE-001" },
    { id: "TC-COND-GEN-008", category: "Door System", condition: "Verify door system", priority: "Medium", linkedTestCases: ["TC-GEN-008"], exploratoryNoteId: "EXP-GENE-001" },
    { id: "TC-COND-GEN-009", category: "Collision Handling", condition: "Verify collision handling", priority: "High", linkedTestCases: ["TC-GEN-009"], exploratoryNoteId: "EXP-GENE-001" },
    { id: "TC-COND-GEN-010", category: "Audio Settings", condition: "Verify audio settings", priority: "Medium", linkedTestCases: ["TC-GEN-010"], exploratoryNoteId: "EXP-GENE-001" },
    { id: "TC-COND-GEN-011", category: "UI Settings Persistence", condition: "Verify UI settings persistence", priority: "Medium", linkedTestCases: ["TC-GEN-011"], exploratoryNoteId: "EXP-GENE-001" },
    { id: "TC-COND-GEN-012", category: "Language Localization", condition: "Verify language localization", priority: "Low", linkedTestCases: ["TC-GEN-012"], exploratoryNoteId: "EXP-GENE-001" }
];

fs.writeFileSync(path.join(conditionsDir, 'EXP-GENE-001.json'), JSON.stringify(conditions, null, 4));
