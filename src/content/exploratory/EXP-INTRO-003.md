---
id: "EXP-INTRO-003"
title: "Camera and Map Terminals"
category: "General"
author: "Dominic Brooks"
derivedFeatures: ["Camera System", "Map Terminal"]
---

## Session Overview
- Build/Platform: 20951743
- Area Under Test: Ship introduction sequence (left terminal [camera], right terminal [map])

## Observations & Findings

### 1. Terminal Availability After Manual
- Following completion of exploratory session INTRO-002, a third terminal was added on the left side.
- This terminal corresponds to the Camera system mentioned in the Operations Manual.
- Right terminal (Map) was available since initially boarding the ship.

### 2. Map Terminal Exploration
- Interacted with the map terminal.
- Display showed two squads: [1] and [0].
- Operations Manual states map is relative to System 23 (current destination).
- No additional information provided beyond system reference.
- **Observation:** Limited information available; recommended to developer to either:
  - Provide more detailed map information, or
  - Disable map terminal until more context is available.

### 3. Camera Terminal Initial View
- Interacted with the camera terminal.
- Three UI elements immediately visible:
  - Top left: "0/0" text overlay
  - Bottom center: "[Set Course: E]" text overlay
  - Center: Crosshair overlay
- Planet visible to the right of the crosshair.

### 4. Camera Movement Controls
- Camera controls using [WASD]:
  - [W] moves camera up
  - [S] moves camera down
  - [A] moves camera left
  - [D] moves camera right
- Movement is smooth and responsive.

### 5. Camera Boundary Behavior
- Moving too far in any direction triggers boundary limit:
  - Camera stops moving in that direction
  - Red line appears as visual indicator
  - Sound effect plays to signal boundary reached

### 6. Planet Interaction & Course Selection
- Hovered over the planet.
- Clicked [E] or [LMB] to interact.
- Prompt appeared: "[X] SET COURSE [C]"
- Interaction options:
  - [X] to cancel
  - [C] or [LMB] to confirm course

### 7. Course Confirmation
- Clicked [C] or [LMB] to set course.
- Display showed: "Expected Duration: 22 Weeks"
- Camera terminal automatically turned off after confirmation.
- Sequence progression triggered.

## Session Conclusion
Exploratory session complete. Successfully explored Map and Camera terminals. Map terminal shows limited information requiring developer clarification. Camera system functions as expected with clear boundaries, movement controls, and planet selection mechanics. Course successfully set to destination with 22-week duration displayed. Continuation planned in INTRO-004.