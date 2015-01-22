var part, noiseEnv;
var tempo = 120;
var ticSound;
var pattern = [1, 0, 0, 0];
var ac, lastTic = 0;
var ticked = false;

function setup() {
    var p5Canvas = createCanvas(50, 50);
    p5Canvas.parent('p5-canvas-container');

    // prepare the noise and env used by playTic()
    ticSound = new p5.Noise();
    ticSound.start();
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

function start() {
    part.loop();
}

function stop() {
    part.stop();
}

function changeTempo() {
    tempo = document.getElementById("tempo-input").value;
    console.log(tempo);
    part.setBPM(tempo);
}