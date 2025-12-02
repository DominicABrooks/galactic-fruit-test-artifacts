---
id: "EXP-GENE-001"
title: "General Exploration"
category: "General"
author: "Christopher Rojas"
derivedFeatures: [
  "Introduction",
  "Control Onboarding",
  "Environmental Interaction",
  "Visual Rendering",
  "Ladder Transition",
  "Ship Control System",
  "Screen Interaction",
  "Progression Logic",
  "Door System",
  "Collision Handling",
  "Audio Settings",
  "UI Settings Persistence",
  "Language Localization"
]

---

**Area Under Test:** Game introduction, lobby room, ship control area, UI/system interactions  
**Session Length:** 30–45 minutes  
**PC System Model:** ROG Strix G513RW_G513RW  

---

## 1. Observations

### 1.1 Game Launch & Intro
- Launching the game loads directly into gameplay.
- A voice-over explanation plays immediately, giving narrative context about investigating planets and receiving a monetary bonus.
- The intro does not provide information about the player’s character beyond the brief job explanation.

### 1.2 Lobby Room Interactions
- A shiny suit with a green rectangular outline appears interactable.
- Interacting with the suit using **E** causes it to visually disappear.
- No controls or onboarding tutorial is presented; movement and interaction controls must be inferred (**WASD + E**).
- A persistent large pixel square follows behind the player at all times (visual). This appears every time the game launches. *(img. 1)*

### 1.3 Navigation & Movement
- Movement uses WASD + mouse by default.
- Interaction works with **E** or left mouse click.
- No UI hints appear to confirm these controls.

### 1.4 Ladder Transition
- Approaching the ladder and interacting with it transitions the player to the next stage/level.
- No UI prompt or explanation appears before transition.

### 1.5 Ship Control Panel
- The ship panel contains a red **power** button that activates the system when pressed using **E** or left mouse click.
- Interacting with the left screen places the player in a “screen view” showing numbers (0, 7).
- There is no prompt explaining how to exit panel view; right mouse button appears to exit by player assumption.
- A newer build now provides guidance from the central panel when selecting planets, which did not exist in the previous version.

### 1.6 Progression Behavior
- Based on prior testing, it was possible to “complete” the game by only performing the safety check examination without exploring any planets.
- Retested in this build — behavior still appears possible. *(vid. 1)*  
  https://drive.google.com/file/d/1vtmNLVe67LOq0v0-142fxx48PJtHJ_Qp/view?usp=sharing

### 1.7 Door Behavior
- The main door opens and closes consistently using the interact button.
- Other doors (not the main one) open with interaction but do not close again using the same button. *(vid. 2)*  
  https://drive.google.com/file/d/1W05bO1I0GGi3Eb2saU_hbyo7nCrH095E/view?usp=sharing
- Standing between a door and its interact button allows the player to close the door through their body, visually clipping through the door interior.
- Camera view temporarily shows inside of the door mesh. *(vid. 3)*  
  https://drive.google.com/file/d/1XKtmRtExZXW_vMa4hA_KwqeUzpZKm4sT/view?usp=sharing

### 1.8 UI/Audio Issues
- **UI saving issue:** settings appear persistent even when not saved, but are only applied when pressing **Save**. *(vid. 4)*  
  https://drive.google.com/file/d/1WjrKSpgpAGPcR2NIJPylC04tFn2y2gWM/view?usp=sharing
- **Audio sliders do not fully mute** the game: some sound effects still play even if all audio options are disabled. *(vid. 5)*  
  https://drive.google.com/file/d/1ajuC_n1aeuuG2bHZx6YmA6sPsEByptMY/view?usp=sharing
- **Language translation** is incorrect, inconsistent, or non-functional. *(img. 2, img. 3)*

---

## 2. Inferences
- The game likely intends to show a main menu before gameplay (standard FPS/horror convention).
- Interactable objects should visually disappear only if picked up intentionally — suit behavior may be correct but needs confirmation.
- The pixel square behind the player is likely a rendering/visual bug rather than a game mechanic.
- Control prompts are probably intended but not implemented yet.
- Ladder transition appears intended but should ideally give feedback or confirmation before loading the next area.
- Only the main door is fully implemented; secondary doors likely missing closing logic or animation state management.
- Player should not clip through doors — collision should push the player aside.
- Audio sliders should mute all sounds, including interactions.
- Language setting should apply to UI text consistently.

---

## 3. Questions
1. Is the game meant to bypass the main menu entirely, or is this a missing screen?
2. Should the player receive onboarding prompts for controls (WASD, E, mouse)?
3. Is the pixel square behind the player intended as an in-game effect or a rendering issue?
4. Should interaction prompts (e.g., “Press E”) appear on interactable objects?
5. Are players intended to exit panel screens with Right Mouse Button, or should a prompt appear?
6. Is the ability to complete the game without visiting any planets intended or a progression oversight?
7. Should all doors be able to open **and** close, or only the main door?
8. Is door clipping intended, or should the player be pushed aside when a door closes?
9. Should audio sliders fully mute all sounds, including panel and interaction effects?
10. Is language selection intended to function in this build?

---

## 5. Raw Defect Notes
- Pixel square artifact following the player every session.
- Missing control prompts (new-player usability issue).
- Secondary doors cannot be closed after opening.
- Player can clip through door when standing between button + door.
- Audio still plays even when all audio sliders are off.
- UI settings appear persistent even when not saved.
- Language selection not functioning.
- Ability to complete game without performing planet exploration (possible progression bug).

---

## 6. Session Summary
Today’s exploratory session focused on re-testing the introduction, the lobby, door behaviors, and the ship control panel. Several repeated behavior patterns were observed, particularly around UI settings, audio settings, and door interactions. New UI behavior was identified in the planet selection system. Multiple areas require clarification from the developer to properly document intended behavior and derive test conditions.