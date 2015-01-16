
var part;
var tempo = 120;
var ticSound;
var pattern = [1, 0, 0, 0];
var ac, lastTic = 0;

var ticked = false;
var playing = false;

function preload() {
    // ticSound = loadSound('sounds/seiko-high.wav');
}

function setup() {
    var p5Canvas = createCanvas(50, 50);
    p5Canvas.parent('p5-canvas-container');

    // prepare the noise and env used by playTic()
    ticSound = new p5.Noise();
    ticSound.start();

    // ticSound.loop(1);
    // ticSound.amp(0);
    noiseEnv = new p5.Env(0.01, 1, 0.1, 0);
    noiseEnv.setInput(ticSound);

    // create a part with 8 spaces, where each space represents 1/16th note (default)
    part = new p5.Part(8, 1 / 16);
    // add phrases, with a name, a callback, and an array of values that will be passed to the callback if > 0
    part.addPhrase('tic', playTic, pattern);
    // set tempo (Beats Per Minute) of the part and tell it to loop
    part.setBPM(tempo);
    ac = getAudioContext();
}

function playTic(params, time) {
    noiseEnv.play(ticSound, time);
    var nextTic = ac.currentTime + time;
    console.log(nextTic - lastTic);
    lastTic = nextTic;
    ticked = true;
    window.setTimeout(function () {
        ticked = false;
    }, 80);
}

// draw a ball (called every 1/60 s due to FPS settings) 
function draw() {
    background(255);
    strokeWeight(2);
    stroke(0);
    if (ticked)
        fill(255, 0, 0);
    ellipse(width / 2, height / 2, 20, 20);
}

function updateTempo() {

}

function start() {
    playing = !playing;
    part.loop();
}

function stop() {
    playing = !playing;
    part.stop();
}



/**
 *  Create a sequence using a Part.
 *  Add two Phrases to the part, and tell the part to loop.
 */
/*
 var osc, env; // used by playNote
 var noise, noiseEnv; // used by playSnare
 var part; // a part we will loop
 var currentBassNote = 47;
 
 function setup() {
 // prepare the osc and env used by playNote()
 env = new p5.Env(0.01, 0.8, 0.2, 0);
 osc = new p5.TriOsc(); // connects to master output by default
 osc.start(0);
 osc.connect();
 env.setInput(osc);
 
 // prepare the noise and env used by playSnare()
 noise = new p5.Noise();
 // noise.amp(0.0);
 noise.start();
 noiseEnv = new p5.Env(0.01, 0.5, 0.1, 0);
 noiseEnv.setInput(noise);
 // create a part with 8 spaces, where each space represents 1/16th note (default)
 part = new p5.Part(8, 1/16);
 
 // add phrases, with a name, a callback, and
 // an array of values that will be passed to the callback if > 0
 part.addPhrase('snare', playSnare, [0, 0, 1, 0]);
 //part.addPhrase('bass', playBass, [47, 42, 45, 47, 45,42, 40, 42]);
 
 // // set tempo (Beats Per Minute) of the part and tell it to loop
 part.setBPM(240);
 part.loop();
 
 ac = getAudioContext();
 }
 
 var ac, lastHit = 0;
 
 function playBass(params, time) {
 currentBassNote = params;
 osc.freq(midiToFreq(params), 0, time);
 env.play(osc, time);
 }
 
 function playSnare(params, time) {
 noiseEnv.play(noise, time);
 var nextHit = ac.currentTime + time;
 console.log(nextHit - lastHit);
 lastHit = nextHit;
 }
 
 // draw a ball mapped to current note height
 function draw() {
 background(255);
 fill(255, 0, 0);
 var noteHeight = map(currentBassNote, 40, 50, height, 0);
 ellipse(width/2, noteHeight, 30, 30);
 }*/