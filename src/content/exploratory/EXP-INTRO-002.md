---
id: "EXP-INTRO-002"
title: "Ship Introduction Sequence"
category: "General"
author: "Dominic Brooks"
derivedFeatures: ["Introduction", "Terminal System", "File System", "Authentication Minigame", "Video Playback", "Operations Manual", "UI Interaction", "Power System", "Tutorial Progression"]
---

## Session Overview
- Build/Platform: 20951743
- Area Under Test: Ship introduction sequence (power activation, terminal system, authentication, operations manual)

## Observations & Findings

### 1. Ship Entry & Initial Environment
- Started the game from Steam, obtained the suit, and climbed the ladder into the ship.
- Initial room was very dark.
- Attempted to interact with the door button; it was disabled.
- Located a hanging button in front of the terminals.

### 2. Power Activation Sequence
- Clicked the hanging button.
- Button raised slowly with animation and sound effect.
- Terminal lights turned on.
- Loading bar appeared on the terminal.

### 3. Terminal System Discovery
- Two terminals became interactable after power activation.
- Terminal Controls:
  - [E] or [LMB] opens the middle terminal.
  - [RMB] closes the terminal.

### 4. Middle Terminal Structure
- Terminal displayed three sections:
  - **Section 1 (Header):** Label showing "Power: 5"
  - **Section 2 (Left - Temp):** Contains temporary files
    - Initially showed highlighted "Authentication.kp4" file
  - **Section 3 (Right - Disk):** Dark green background

### 5. Authentication Process
- Clicked [E] or [LMB] on a file to open modal.
- Modal displayed:
  - Title: "Authentication"
  - [Run] button
  - [X] close option
- Clicking [X] closed the modal.
- Clicking [E] on Authentication modal launched a minigame.

### 6. Authentication Minigame
- Minigame prompt: Click [E] when a face is displayed.
- Waited for face to appear.
- Successfully clicked [E] when face was displayed.
- Minigame ended and modal closed.
- Notification: New file "Next Steps.kp4" was available.

### 7. Tutorial Progression
- New file "Next Steps.kp4" appeared in Temp section.
- Clicked [E] on Next Steps file.
- Clicked [E] on "Run" button.
- Opened and played a video.

### 8. Operations Manual Discovery
- After video completion, new file "Operations Manual.b" was added to Temp.
- Interacted with file and clicked Run.
- Opened Operations Manual with 13 pages.

### 9. Operations Manual Navigation
- Page Controls:
  - [A] moved page to the left (previous page)
  - [D] moved page to the right (next page)
- Manual Contents:
  1. Operations Manual (pages 1-2)
  2. File System (page 3)
  3. Map (page 4)
  4. Camera (pages 5-6)
  5. Sending Report (pages 7-10)
  6. Moving On (pages 11-12)
  7. End text displayed (page 13)

### 10. Additional Terminal Activation
- After reading the manual, a third terminal was added to the left.
- Left terminal and right terminal exploration deferred to next session.

## Session Conclusion
Exploratory session complete. Successfully navigated ship introduction sequence including power activation, terminal interaction, authentication minigame, tutorial video, and operations manual. Discovered file system UI, power system, and tutorial progression mechanics. Additional terminals await exploration.