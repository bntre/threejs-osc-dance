import { ThreeJsUrl, HEAD,ARMS,LEGS } from './constants.js';


export function createSetup() {
	return {
		url: ThreeJsUrl + 'examples/models/gltf/Xbot.glb',
		type: 'gltf',
		scale: 1.0,
		baseMoves: {
			idle:   { clip: 'idle', },
			walk:   { clip: 'walk', },
			run:    { clip: 'run', },
		},
		additiveMoves: {
			sneak:        { clip: 'sneak_pose', cut: [0.05, 0.1], },
			sad:          { clip: 'sad_pose',   cut: [0.05, 0.1], },
			agree:        { clip: 'agree', },
			headShake:    { clip: 'headShake', },
		},
	};
}
