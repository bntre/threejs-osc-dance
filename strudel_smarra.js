// @title Smarra · GoGo Penguin @url https://www.youtube.com/watch?v=L99BQ3Nvsz4
// Incomplete and crude arrangement made for https://github.com/bntre/threejs-osc-dance

setcpm(72.3/4)

const drums = stack( s("oh -, hh:4!16"), s("sd").beat("5,6?, 9?,14, 20?,21,22, 28", 32),
                                         s("bd").beat("0,3,  8,11,12,    24,26,29", 32),
                                         s("bd:1").beat("                 25",      32) )

const bass = note("[c3 g2*2 g2 c3]*4").s("gm_acoustic_bass")

const echo = cat("Cm", "-", "Gm", "Dm".late("<.125 0>")).voicing().s("gm_epiano1").decay(1).echo(10, 1/10, .7)

const piano1 = n("<[11 7 4 9] [8 7 4 7] [6 8 4 3] [2 1 2 0]>").s("piano")
const piano2 = n("<[[4,11] 9 8 7] [4 8 7 6] [[4,8] [1,6] 4 3] [[1,6] [-4,1] [3,7] 4]>").scale("C4:minor").s("piano")
const bass2 = n("<[[9@3 9@3 9@2] 9]!4 [4 4]!2 [6 6]!2>*2").scale("C1:minor").s("gm_acoustic_bass")

const pulse = note("g4*10").s("piano")
const outro = n("<[[2,9] [0,7]@3] [-]>").scale("C4:minor").s("piano")

$:arrange( [2, drums],
           [4, stack( drums, bass )],
           [16, stack( echo, drums.gain("<1!7 0>"), 
                             bass.gain("<1!7 <[0 1] 0>>") )],
           [2, drums],
           [4, stack( drums, piano1.scale("C5:harmonic:minor") )],
           [4, stack( drums, piano2, bass2 )],
           [4, stack( drums, piano2, bass2, piano1.scale("C5:minor") )],
           [4, stack( drums, bass, pulse.gain("<.4 .6 .8 1>") )],
           [2, stack( drums, bass, pulse, outro ).gain(saw.slow(2).range(1, 0))], )

// Dance script
$:stack( n("2").as("speed"),      // set global speed
         n("<0>/1").as("add"),    // additive moves: reset weight each cycle
         n("<0>/2").as("phase"),  // additive moves: reset phase every 2nd cycle
       ).osc()
const stand = s("stand").as("base")
$:arrange( [2, s("<stand idle@3>").as("base")],
           [4, stack( stand, s("hands").n("<.4 .6 .8 1>").as("add") )],
           [8, s("<sway hands>").as("base")],
           [8, stack( stand, s("handsTop").n("<.5!4 1!3 .2>").as("add"),
                             s("swayLegs").n("<.8!3 .5!5>")  .as("add") )],
           [2, stack( stand, s("idleTop") .n("<1.5>")        .as("add"),
                             s("idleLegs").n("<.8 1.8>")     .as("add") )],
           [4, stack( n("1").as("speed"), stand, s("sway") .n("<1 .6>/2")              .as("add") )],
           [8, stack(                     stand, s("sway") .n("<1 .8 .6 .4 .2 .1 0 0>").as("add"),
                                                 s("hands").n("<0 0 .1 .2 .4 .6 .8 1>").as("add") )],
           [4, stack( n("5").as("speed"), stand, s("hands").n("<.2 .4 .6 .8>")         .as("add") )],
           [2, stack(                     stand, n("<[1 .4@3] [.2 .1]>").s("jump")     .as("add") )],
         ).osc()