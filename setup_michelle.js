import { ThreeJsUrl, HEAD,ARMS,LEGS } from './constants.js';


export function createSetup() {
	return {
		url: ThreeJsUrl + 'examples/models/gltf/Michelle.glb',
		type: 'gltf',
		scale: 1.0,
		defaultBaseMove: 'stand',
		//defaultBaseMove: '_dance0',
		baseMoves: {
			//fullDance: { clip: 'SambaDance', beats: 8*4*4, }, // full length 18.233333587646484
			_dance0:     { clip: 'SambaDance', cut: [0, 1, 8], beats: 8, },
			hands:       { clip: 'SambaDance', cut: [-0.1, 0.4, 8], beats: 4, loop: 'repeat', },
			jump:        { clip: 'SambaDance', cut: [0.9, 1.9, 8], phase: 0.7, beats: 8, loop: 'repeat', },
			_dance1:     { clip: 'SambaDance', cut: [1, 2, 8], beats: 8, },
			_dance4:     { clip: 'SambaDance', cut: [4, 5, 8], beats: 8, },
			_dance5:     { clip: 'SambaDance', cut: [5, 6, 8], beats: 8, },
			sway:        { clip: 'SambaDance', cut: [5.3, 6.3, 8], phase: 0.6, beats: 8, loop: 'repeat', },
			_dance6:     { clip: 'SambaDance', cut: [6, 7, 8], beats: 8, },
			_dance7:     { clip: 'SambaDance', cut: [7, 8, 8], beats: 8, },
			idle:        { clip: 'SambaDance', cut: [7.325, 7.525, 8], beats: 2, },
			stand:       { clip: 'SambaDance', cut: [7.515, 7.525, 8], beats: 4, },
			//stand:       { clip: 'SambaDance', cut: [7.515, 7.535, 8], beats: 4, }, // 2 frames
		},
		defaultReference: [7.525, 8], // 'stand' move frame
		additiveMoves: {
			handsTop:      { clip: 'SambaDance', cut: [-0.1, 0.4, 8], beats: 4, loop: 'repeat', tracks: HEAD|ARMS, },
			handsLegs:     { clip: 'SambaDance', cut: [-0.1, 0.4, 8], beats: 4, loop: 'repeat', tracks: LEGS, },
			jumpTop:       { clip: 'SambaDance', cut: [0.9, 1.9, 8], phase: 0.6, beats: 8, loop: 'repeat', tracks: HEAD|ARMS, },
			jumpLegs:      { clip: 'SambaDance', cut: [0.9, 1.9, 8], phase: 0.6, beats: 8, loop: 'repeat', tracks: LEGS, },
			waveTop:       { clip: 'SambaDance', cut: [1.25, 1.75, 8], beats: 4, loop: 'repeat', tracks: HEAD|ARMS, },
			swayHead:      { clip: 'SambaDance', cut: [5.3, 6.3, 8], phase: 0.6, beats: 8, loop: 'repeat', tracks: HEAD, },
			swayArms:      { clip: 'SambaDance', cut: [5.3, 6.3, 8], phase: 0.6, beats: 8, loop: 'repeat', tracks: ARMS, },
			swayLegs:      { clip: 'SambaDance', cut: [5.3, 6.3, 8], phase: 0.6, beats: 8, loop: 'repeat', tracks: LEGS, },
			idleTop:       { clip: 'SambaDance', cut: [7.325, 7.525, 8], beats: 2, tracks: HEAD|ARMS, },
			idleLegs:      { clip: 'SambaDance', cut: [7.325, 7.525, 8], beats: 2, tracks: LEGS, },
		},
		retarget: {
			//url: 'https://models.readyplayer.me/69428487d314d68f633f2565.glb',
			url: 'https://models.readyplayer.me/6953d570452afe2bbf4328ee.glb',
			type: 'gltf',
			options: { // for SkeletonUtils.retargetClip
				hip: 'mixamorigHips',
				//scale: .01, // preserve the scale of the target model
				//hipInfluence: new THREE.Vector3( 0, 1, 0 ), // use ( 0, 1, 0 ) to ignore xz hip movement.
				//hipInfluence: new THREE.Vector3( 0.5, 1, 0.5 ),
				getBoneName: ( bone ) => 'mixamorig' + bone.name, // target bone -> source bone name
			},
		},
	};
}
