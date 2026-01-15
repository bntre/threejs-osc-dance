import { ThreeJsUrl, HEAD,ARMS,LEGS } from './constants.js';

/*
Scene setup structure:

Setup : ModelSetup
	defaultBaseMove: string
	baseMoves: string -> BaseMove
	defaultReference: Time
	additiveMoves: string -> AdditiveMove
	retarget: Retarget
ModelSetup
	url: string
	type: string          # gltf | fbx
	scale: float
Retarget : ModelSetup
	options: RetargetOptions   # options for SkeletonUtils.retargetClip https://github.com/mrdoob/three.js/blob/master/examples/jsm/utils/SkeletonUtils.js

Move
	name: string
	clip: string          # name of AnimationClip
	beats: float          # length of the move in beats; default is _currentBpc
	loop: string          # once | repeat | pingpong (default 'repeat' for full, 'pingpong' for slice)
	phase: float          # starting phase 0..1
	cut: int[2|3]         # [from, to] | [from, to, denominator] - helper for subclip
	tracks: int|string    # track filter: integer constants or strings like 'Hips|*Leg|*Foot|*Toe*'
	_clip: AnimationClip  # internal
	_startTime: float     # internal: phase * duration
	_control: GUI button or slider
BaseMove : Move           # always played with weight 1; using crossfade (it changes .enable)
	_actions: AnimationAction[2]        # internal: two layers
AdditiveMove : Move       # always played and enabled; changing weight (weight > 0)
	ref: Time             # time | [time, denominator] - reference time to make additive (default 0)
	_action: AnimationAction            # internal
Time : int|int[2]       # time | [time, denominator] - time reference
*/

export function createSetup() {
	return {
		url: ThreeJsUrl + 'examples/models/gltf/Michelle.glb',
		type: 'gltf',
		scale: 1.0,
		defaultBaseMove: 'stand',
		baseMoves: {
			//fullDance: { clip: 'SambaDance', beats: 8*4*4, }, // full length 18.233333587646484
			_dance0:     { clip: 'SambaDance', cut: [0, 1, 8], beats: 8, }, // 0/8..1/8 of full duration; moves started with '_' are available in dev mode only
			hands:       { clip: 'SambaDance', cut: [-0.1, 0.4, 8], beats: 4, loop: 'repeat', },
			jump:        { clip: 'SambaDance', cut: [0.9, 1.9, 8], phase: 0.7, beats: 8, loop: 'repeat', },
			_dance1:     { clip: 'SambaDance', cut: [1, 2, 8], beats: 8, },
			_dance2:     { clip: 'SambaDance', cut: [2, 3, 8], beats: 8, },
			_dance3:     { clip: 'SambaDance', cut: [3, 4, 8], beats: 8, },
			_dance4:     { clip: 'SambaDance', cut: [4, 5, 8], beats: 8, },
			_dance5:     { clip: 'SambaDance', cut: [5, 6, 8], beats: 8, },
			sway:        { clip: 'SambaDance', cut: [5.3, 6.3, 8], phase: 0.6, beats: 8, loop: 'repeat', },
			_dance6:     { clip: 'SambaDance', cut: [6, 7, 8], beats: 8, },
			_dance7:     { clip: 'SambaDance', cut: [7, 8, 8], beats: 8, },
			idle:        { clip: 'SambaDance', cut: [7.325, 7.525, 8], beats: 2, },
			stand:       { clip: 'SambaDance', cut: [7.515, 7.525, 8], beats: 4, },
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
			url: 'https://models.readyplayer.me/6953d570452afe2bbf4328ee.glb', // Michelle's fan, with yellow glasses
			type: 'gltf',
			options: { // for SkeletonUtils.retargetClip
				hip: 'mixamorigHips',
				//hipInfluence: new THREE.Vector3( 0, 1, 0 ), // use ( 0, 1, 0 ) to ignore xz hip movement.
				//hipInfluence: new THREE.Vector3( 0.5, 1, 0.5 ),
				getBoneName: ( bone ) => 'mixamorig' + bone.name, // target bone -> source bone name
			},
		},
	};
}
