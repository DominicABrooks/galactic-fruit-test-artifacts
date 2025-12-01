---
id: "EXP-INTRO-001"
title: "Initial Game Launch & Introduction"
category: "General"
author: "Dominic Brooks"
derivedFeatures: ["Introduction", "Interaction System", "Door / Button Interaction", "Suit Interaction", "Ladder Interaction", "Ship Transition", "Audio Feedback"]
---

## Session Overview
- Build/Platform: 20951743
- Area Under Test: Game introduction sequence (projector video, initial interactions, ladder, suit, ship room)

## Observations & Findings

### 1. Game Launch & Intro Video
- Launched the game through the Steam Client.
- A video immediately began playing through a projector and covered the wall.
- Attempted to interact with the projector; no interaction occurred.
- Waited for the video to end to verify looping behavior:
  - Video did not loop.
  - Final frame displayed the message: “Galactic Fruit thanks you for your sacrifice.”

### 2. Wall-Embedded Items
- Identified two interactable-looking objects embedded in the wall:
  - A glowing suit.
  - A ladder.
- Interacted with the suit first, followed by the ladder.

### 3. Suit Dependency Check
- Rebooted the game to test ladder access without the suit.
- Confirmed the ladder cannot be climbed without obtaining the suit.

### 4. Transition to Ship
- After entering the ladder, the player is transitioned to the ship, facing the door.
- Observation: The required interaction button is located behind the player.
  - Unsure if this facing orientation is intended; recording for developer review.

### 5. Door Interaction Behavior
- Clicking the button on the locked door produced no observable effect.
- Pressing E on non-interactable objects plays a disabled sound.
- Pressing E specifically on the door button plays no sound at all.
  - Potential issue: Inconsistent audio feedback for invalid interactions.

### 6. Unexpected NullReferenceException
- Pressing G while interacting with the door displayed:  
  > NullReferenceException: Object reference not set to an instance of an object
- This action also moved the player into a drone view.
- Based on prior developer communication, this feature is unrelated to the intro sequence.
  - Marking this as a defect.

## Session Conclusion
Exploratory session complete. Multiple interaction inconsistencies observed, including missing audio feedback, questionable player orientation, and an unintended NullReferenceException leading to a mode switch.