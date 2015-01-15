var tic, myPart;
var pattern = [1, 0, 0, 0, 1, 0, 0, 0];

function preload() {
    tic = loadSound('sounds/woodblock.wav');
}

function setup() {
    var metronomePhrase = new p5.Phrase('tic', play, pattern);
    myPart = new p5.Part();
    myPart.addPhrase(metronomePhrase);
    myPart.setBPM(120);
}

function play(playbackRate) {
    tic.play(playbackRate);
}

function playPattern() {
    myPart.loop();
}

function stopPattern() {
    myPart.stop();
}
