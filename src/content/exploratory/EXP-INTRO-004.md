---
id: "EXP-INTRO-004"
title: "Conclusion of Intro Sequence"
category: "General"
author: "Dominic Brooks"
derivedFeatures: ["Hallway Doors", "Ship Hallway", "Room Interaction", "Hibernation System", "Cryochamber", "Region Transition"]
---

## Session Overview
- Build/Platform: 20951743
- Area Under Test: Ship introduction sequence (ship hallway, room exploration, hibernation)

## Observations & Findings

### 1. Post-Course Setting State
- Following completion of exploratory session INTRO-003, after setting course to the first planet:
  - All terminals were disabled
  - Lights were turned off
  - Ship entered transit state

### 2. Main Door Interaction
- Interacted with the door button using [E].
- Door played slow opening animation with sound effect.
- After door was fully open, clicking [E] on the button started closing the door.
- **Defect Identified:** Clicking [E] on the door button multiple times rapidly skipped the animation.
  - Expected: Animation should play completely regardless of input spam
  - Actual: Animation can be skipped with rapid inputs

### 3. Ship Hallway Layout
- Large hallway revealed with corridor containing multiple rooms.
- Room layout (first to last):
  - **Electrical** (right side)
  - **Administration** (left side)
  - **Lounge** (right side)
  - **Waste** (left side)
  - **Hibernation** (end of hallway)

### 4. Intersection Discovery
- Hallway contains an intersection between Administration and Lounge rooms.
- Intersection features:
  - Can walk left or right at the intersection
  - Each direction ends with a ramp (going up or down)
  - Ramps are blocked by invisible walls
  - Camera present in each section of the intersection (left & right)

### 5. Side Room Door Mechanics
- Side room doors use unique opening animation:
  - Door slides completely from right to left (not meeting in middle)
  - Doors automatically close after approximately 2 seconds
  - Different behavior from main ship door

### 6. Room Exploration Results
- **Electrical Room:**
  - Door opens successfully
  - Small room containing:
    - Camera
    - Electrical object (not interactable at this time)
- **Administration Room:**
  - Unable to interact with door
  - Room remains locked
- **Lounge Room:**
  - Unable to interact with door
  - Room remains locked
- **Waste Room:**
  - Door opens successfully
  - Small empty room with red tint
  - No interactable objects

### 7. Hibernation Room & Cryochamber
- Interacted with Hibernation door at end of hallway.
- Room opened revealing:
  - Camera
  - Interactable Cryochamber object
- Clicked [E] or [LMB] on Cryochamber.
- Screen immediately faded to black.
- Display showed: "..."

### 8. Hibernation Sequence & Region Transition
- After period of time in hibernation, sound effect played.
- Player character exited cryochamber.
- Using dev tools, confirmed region changed from initial to **0b**.
- This marks the conclusion of the ship introduction sequence.

## Session Conclusion
Exploratory session complete. Successfully explored ship hallway and accessible rooms (Electrical, Waste, Hibernation). Identified defect with door animation skipping. Discovered locked rooms (Administration, Lounge) suggesting future content. Successfully entered hibernation and completed region transition to 0b, concluding the introduction sequence.
