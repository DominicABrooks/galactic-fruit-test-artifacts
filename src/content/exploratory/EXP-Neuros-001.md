---
id: "EXP-Neuros-001"
title: "Exploration of Neuros"
category: "Neuros"
author: "Dominic Brooks"
derivedFeatures: [
  "Neuros Terminal Interaction",
  "Neuros Lore Entries",
  "CLI Functionality"
]
---

## Session Overview
- **Date**: DEC/07/2025
- **Build**: 3049470
- **Area Under Test**: Neuros
- **Session Length**: 30–45 minutes

## Observations & Findings

### 1. Neuros Terminal Activation
- **Context**: Located on the left of the cabin after entering region 0b.
- **Interaction**: Interacting with screen using [LMB] or [E] opens the Neuros terminal.
- **Visuals**: Displays "Neuros" in red text with a "301E" subtext in white. A crudely drawn star spins every second or so above it.
- **CLI Access**: Clicking [LMB] again opens the command line interface, printing "NEUROS ONLINE" in green text.

### 2. CLI Functionality
- **Prompt**: There is no visible prompt cursor initially.
- **Help Command**: Typing "help" prints a list of available topics:
    - Galactic Fruit
    - Fabrica
    - Ladagocia
    - Mesodion
- **Exit**: Clicking [RMB] exits the Neuros terminal.

### 3. Lore Entries & Content
- **Galactic Fruit**: Prints text details about the Intergalactic Corporation, their monopoly, and wealth compared to the Fabrican Royal Family.
- **Fabrica**: Prints text identifying it as the homeworld of the Fabricans and a trade hub.
- **Ladagocia**: Prints text describing a lush forest planet where Fabricans found "Pimta" fruit.

### 4. Typo in Ladagocia Entry
- **Issue**: The text for Ladagocia contains a grammatical error.
- **Text**: "Their they found a fruit the locals called Pimta."
- **Correction**: Should be "There they found..."
- **Action**: Defect ticket to be created.

## Inferences

### 1. Lore Distribution
- The Neuros terminal appears to be a primary mechanism for world-building and distributing background lore to the player.

### 2. Mesodion Command
- Although "Mesodion" is listed in the help response, it was not explicitly tested in this session (or the output wasn't recorded), implying it likely follows the same pattern as the other lore entries.

## Questions
1. Are the commands case-sensitive?
2. Does the "Mesodion" command function similarly to the others?
3. Are there hidden commands not listed in "help"?

## Raw Defect Notes
- Typo in `Ladagocia` lore text: "Their they found" should be "There they found".

## Session Summary
Explored the Neuros terminal mechanics and content. Verified activation via [LMB]/[E] and CLI access. Documented the `help` command outputs and the specific lore text provided for Galactic Fruit, Fabrica, and Ladagocia. Identified a spelling/grammar error in the Ladagocia entry ("Their" instead of "There"). Confirmed [RMB] functionality to exit the terminal.
