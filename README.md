# threejs-osc-dance

This is a web-based proof-of-concept for controlling character dance animations using OSC-like messages.  
It is designed with livecoding workflows in mind.

**Demo video**: https://www.youtube.com/watch?v=AAAAAAAAAAA

**Try it live**: https://bntre.github.io/threejs-osc-dance/

---

## Core idea

The main idea of this project is to control character dancing by mixing small animation fragments in real time.

Character animations are split into short, named segments and converted into seamless loops.

There are two types of moves:

1. **Base moves**
   - Can be triggered at any moment
   - Smoothly crossfaded from the previous base move
   - Define the main body motion

2. **Additive moves**
   - All additive animations are played continuously
   - Each move has a controllable weight
   - Additive moves are blended on top of the current base move

Dancing is controlled via **Strudel** (https://strudel.cc)

Animation retargeting to a custom **Ready Player Me** avatar is supported

Character setup and animation configuration are defined in a separate `.js` file (e.g. [setup_michelle.js](setup_michelle.js))

---

## Control modes / branches

The project has two main branches with different control setups.

### 1. `main` branch

- The **Strudel REPL** is embedded directly into the Three.js scene page
- `@strudel/repl` does not provide native OSC support, so a custom OSC handler is implemented and handled directly inside the Three.js scene

This mode is fully self-contained in the browser.

### 2. `separate` branch

- The Three.js scene runs on a standalone page (without Strudel)
- An external **https://strudel.cc** page can be used for control
- Native OSC support from Strudel is used
- A **WebSocket broadcast server** (Node.js or Python) is required to forward OSC messages to the Three.js page

This mode is closer to a real OSC-based livecoding setup.

---

## Links and credits

### Three.js examples

The Three.js code is based on the following official examples:

- Additive animation blending  
  https://threejs.org/examples/#webgl_animation_skinning_additive_blending

- Ready Player Me retargeting  
  https://threejs.org/examples/#webgpu_animation_retargeting_readyplayer

### Animations

- Mixamo - Samba Dance  
  https://www.mixamo.com/#/?type=Motion&query=Samba+Dance+Olodum+Variation+Two

  The Samba Dance animation is loaded at runtime from the Three.js examples package and is not included in this repository.

### Character

- A custom **Ready Player Me** avatar is used (custom-made, referenced via URL)

### Music

- "Smarra" by GoGo Penguin  
  Original: https://www.youtube.com/watch?v=L99BQ3Nvsz4

  A rough and incomplete arrangement is used for the dance demonstration.

---

## Status

This project is experimental and intended for exploration, prototyping, and livecoding experiments.
