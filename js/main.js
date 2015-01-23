var part, env, ticSound;
var tempo = 120;
var pattern = [1, 0, 0, 0];
var ac, lastTic = 0;
var ticked = false;

function preload() {
    ticSound = loadSound('sounds/seiko-high.wav');
}

function setup() {
    var p5Canvas = createCanvas(50, 50);
    p5Canvas.parent('p5-canvas-container');

    ticSound.loop(1);
    ticSound.amp(0);
    env = new p5.Env(0.01, 1, 0.1, 0);
    env.setInput(ticSound);

    // create a part with 8 spaces, where each space represents 1/16th note (default)
    part = new p5.Part(8, 1 / 16);
    // add phrases, with a name, a callback, and an array of values that will be passed to the callback if > 0
    part.addPhrase('tic', playTic, pattern);
    // set tempo (Beats Per Minute) of the part and tell it to loop
    part.setBPM(tempo);
    ac = getAudioContext();
}

function playTic(params, time) {
    env.play(ticSound, time);
    var nextTic = ac.currentTime + time;
    console.log(nextTic - lastTic);
    lastTic = nextTic;
    ticked = true;
    window.setTimeout(function () {
        ticked = false;
    }, 80);
}

// native p5 function
function draw() {
    background(255);
    strokeWeight(2);
    stroke(0);
    if (ticked)
        fill(255, 0, 0);
    ellipse(width / 2, height / 2, 20, 20);
}

function start() {
    console.log('start');
    //console.log(part);
    part.loop();
    //playTic(null,0);
    
}

function stop() {
    part.isPlaying = false;
    part.partStep = 0;
    part.stop();
    //env.stop();
}

function changeTempo() {
    tempo = document.getElementById("tempo-input").value;
    console.log(tempo);
    part.setBPM(tempo);
}