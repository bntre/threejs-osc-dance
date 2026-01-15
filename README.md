# threejs-osc-dance

This is a web-based proof-of-concept for controlling character dance animations using OSC-like messages.  
It is designed with livecoding workflows in mind.

**Demo video**: https://www.youtube.com/watch?v=24Vd_2r3LPM

**Try it live**: https://bntre.github.io/threejs-osc-dance/

---

## Core idea

The main idea of this project is to control character dancing by mixing small animation fragments in real time.

Character animations are split into short, named segments and converted into seamless loops.

Dancing is controlled via **Strudel** (https://strudel.cc).

Animation retargeting to a custom **Ready Player Me** avatar is supported.

## Moves and scene setup

Character setup and animation configuration are defined in a separate `.js` file (see [setup_michelle.js](setup_michelle.js)).

There are two types of moves:

1. **Base moves**
   - Can be triggered at any moment
   - Smoothly crossfaded from the previous base move
   - Define the main body motion

2. **Additive moves**
   - All additive animations are played continuously
   - Each move has a controllable weight
   - Additive moves are blended on top of the current base move

Moves can also be split by **animation tracks**, allowing partial-body control (e.g. HEAD, ARMS, LEGS).  
This makes it possible to combine different motions across body parts in a modular way.

Moves are created using the utility function [`subclipLoop`](index.html#L638) that:
- resamples animation clips to a specified FPS
- applies crossfading at the clip edges, resulting in seamless looping motion segments


## Live control from Strudel

Moves and global parameters are controlled using Strudel calls:

 * ```s("sway").as("base")``` - start a base move

 * ```s("hands").n("<.4 .6 .8 1>").as("add")``` - control additive move weights (using a mask, e.g. "hands*")

 * ```n("2").as("speed")``` - change global animation speed

 * ```n("0").as("phase")``` - change phase of all additive moves (primarily used for reset)

 * ```setcpm(80)``` - tempo control also affects animation playback

See demo dance script as example: [strudel_smarra.js#L32](strudel_smarra.js#L32)

## Control modes / branches

The project has two main branches with different control setups.

### 1. `main` branch

- The **Strudel REPL** is embedded directly into the Three.js scene page
- `@strudel/repl` does not provide native OSC support, so a custom OSC handler is implemented and handled directly inside the Three.js scene
- This mode is fully self-contained in the browser.

### 2. `separate` branch

- The Three.js scene runs on a standalone page (without Strudel)
- An external **https://strudel.cc** page can be used for control
- Native OSC support from Strudel is used
- A **WebSocket broadcast server** (Node.js or Python) is required to forward OSC messages to the Three.js page

In both control modes, OSC messages handled by the animation scene are not using the binary OSC format defined by the official protocol  
(see: https://en.wikipedia.org/wiki/Open_Sound_Control). Instead, messages are currently exchanged as JSON-based structures that resemble OSC semantics but are not yet encoded or decoded into binary OSC packets.  
This approach simplifies experimentation and browser-side handling and may be replaced by full binary OSC support in the future.

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
