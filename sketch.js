let circles = [];
let mySound;
let hitSound;
let bpm = 160;
let clickTime = 0;
let gameState = "START"
let score = 0;
let combo = 0;
let maxScore = 0;
let timePassed = 0;
function preload() {
    mySound = loadSound('./flowerman.mp3'); 
    hitSound = loadSound('./hit.mp3')
}

function getSecondsFromBeat(bar, beat, semiquaver) {
    let secondsPerBeat = 60 / bpm;
    let totalBeats = ((bar - 1) * 4) + (beat - 1) + ((semiquaver - 1) * 0.25);
    return totalBeats * secondsPerBeat;
}

function mousePressed() {
    userStartAudio();
    if (gameState === "START" && mySound.isLoaded()) {
        clickTime = millis()
        mySound.play(0);
        gameState = "PLAYING";
        
        mySound.onended(gameOver); 
    }
}

function setup() {
    createCanvas(800, 800);

    if (mySound && mySound.isLoaded()) {
        mySound.stop();
        mySound.playMode('restart'); // Wipes playhead memory positions
    }


    let noteChart = [
    // INTRO
    { bar: 1, beat: 3, semiquaver: 1, x: 400},

    { bar: 2, beat: 1, semiquaver: 1, x: 425}, 
    { bar: 2, beat: 1, semiquaver: 2, x: 450},
    { bar: 2, beat: 1, semiquaver: 3, x: 475},
    { bar: 2, beat: 1, semiquaver: 4, x: 500},
    { bar: 2, beat: 2, semiquaver: 2, x: 525},
    { bar: 2, beat: 2, semiquaver: 4, x: 500},
    { bar: 2, beat: 3, semiquaver: 1, x: 400},
    { bar: 2, beat: 4, semiquaver: 1, x: 400},

    { bar: 3, beat: 1, semiquaver: 2, x: 400},
    { bar: 3, beat: 1, semiquaver: 3, x: 375},
    { bar: 3, beat: 1, semiquaver: 4, x: 350},
    { bar: 3, beat: 2, semiquaver: 2, x: 325},
    { bar: 3, beat: 2, semiquaver: 4, x: 300},
    { bar: 3, beat: 3, semiquaver: 1, x: 350},
    { bar: 3, beat: 4, semiquaver: 1, x: 400},

    { bar: 4, beat: 1, semiquaver: 1, x: 300}, // triplet
    { bar: 4, beat: 1, semiquaver: 4, x: 350},
    { bar: 4, beat: 2, semiquaver: 3, x: 400},
    { bar: 4, beat: 3, semiquaver: 1, x: 450},
    { bar: 4, beat: 4, semiquaver: 1, x: 400},

    { bar: 5, beat: 1, semiquaver: 1, x: 100}, // triplet
    { bar: 5, beat: 1, semiquaver: 4, x: 200},
    { bar: 5, beat: 2, semiquaver: 3, x: 200},
    { bar: 5, beat: 3, semiquaver: 1, x: 300},
    { bar: 5, beat: 4, semiquaver: 1, x: 400},

    { bar: 6, beat: 1, semiquaver: 1, x: 400},
    { bar: 6, beat: 2, semiquaver: 3, x: 700},
    { bar: 6, beat: 3, semiquaver: 1, x: 600},
    { bar: 6, beat: 4, semiquaver: 1, x: 500},

    { bar: 7, beat: 1, semiquaver: 1, x: 400},
    { bar: 7, beat: 3, semiquaver: 1, x: 200}, // triplet
    { bar: 7, beat: 3, semiquaver: 4, x: 300},
    { bar: 7, beat: 4, semiquaver: 3, x: 400},

    { bar: 8, beat: 1, semiquaver: 1, x: 400}, // triplet
    { bar: 8, beat: 1, semiquaver: 4, x: 700},
    { bar: 8, beat: 2, semiquaver: 3, x: 700},
    { bar: 8, beat: 3, semiquaver: 1, x: 600},
    { bar: 8, beat: 4, semiquaver: 1, x: 500},

    { bar: 9, beat: 1, semiquaver: 1, x: 400},
    { bar: 9, beat: 1, semiquaver: 3, x: 375},
    { bar: 9, beat: 1, semiquaver: 4, x: 350},
    { bar: 9, beat: 2, semiquaver: 1, x: 375},
    { bar: 9, beat: 2, semiquaver: 3, x: 450},
    { bar: 9, beat: 2, semiquaver: 4, x: 425},
    { bar: 9, beat: 3, semiquaver: 1, x: 400},
    { bar: 9, beat: 4, semiquaver: 1, x: 400},
    
    { bar: 10, beat: 1, semiquaver: 1, x: 300},
    { bar: 10, beat: 1, semiquaver: 3, x: 275},
    { bar: 10, beat: 1, semiquaver: 4, x: 300},
    { bar: 10, beat: 2, semiquaver: 1, x: 300},
    { bar: 10, beat: 2, semiquaver: 3, x: 325},
    { bar: 10, beat: 2, semiquaver: 4, x: 300},
    { bar: 10, beat: 3, semiquaver: 1, x: 300},
    { bar: 10, beat: 4, semiquaver: 1, x: 300},

    { bar: 11, beat: 1, semiquaver: 1, x: 500},
    { bar: 11, beat: 1, semiquaver: 3, x: 475},
    { bar: 11, beat: 1, semiquaver: 4, x: 450},
    { bar: 11, beat: 2, semiquaver: 1, x: 425},
    { bar: 11, beat: 2, semiquaver: 3, x: 450},
    { bar: 11, beat: 2, semiquaver: 4, x: 475},
    { bar: 11, beat: 3, semiquaver: 1, x: 500},
    { bar: 11, beat: 4, semiquaver: 1, x: 500},

    { bar: 12, beat: 1, semiquaver: 1, x: 300}, // triplet
    { bar: 12, beat: 1, semiquaver: 4, x: 350},
    { bar: 12, beat: 2, semiquaver: 3, x: 400},
    { bar: 12, beat: 3, semiquaver: 1, x: 450},
    { bar: 12, beat: 4, semiquaver: 1, x: 400},

    { bar: 13, beat: 1, semiquaver: 1, x: 400},
    { bar: 13, beat: 1, semiquaver: 3, x: 450},
    { bar: 13, beat: 1, semiquaver: 4, x: 475},
    { bar: 13, beat: 2, semiquaver: 1, x: 500},
    { bar: 13, beat: 2, semiquaver: 3, x: 400},
    { bar: 13, beat: 2, semiquaver: 4, x: 350},
    { bar: 13, beat: 3, semiquaver: 1, x: 400},
    { bar: 13, beat: 4, semiquaver: 1, x: 500},
    
    { bar: 14, beat: 1, semiquaver: 1, x: 300},
    { bar: 14, beat: 1, semiquaver: 3, x: 350},
    { bar: 14, beat: 1, semiquaver: 4, x: 375},
    { bar: 14, beat: 2, semiquaver: 1, x: 350},
    { bar: 14, beat: 2, semiquaver: 3, x: 300},
    { bar: 14, beat: 2, semiquaver: 4, x: 250},
    { bar: 14, beat: 3, semiquaver: 1, x: 300},
    { bar: 14, beat: 4, semiquaver: 1, x: 200},

    { bar: 15, beat: 1, semiquaver: 1, x: 500},
    { bar: 15, beat: 1, semiquaver: 3, x: 550},
    { bar: 15, beat: 1, semiquaver: 4, x: 575},
    { bar: 15, beat: 2, semiquaver: 1, x: 600},
    { bar: 15, beat: 2, semiquaver: 3, x: 550},
    { bar: 15, beat: 2, semiquaver: 4, x: 525},
    { bar: 15, beat: 3, semiquaver: 1, x: 500},
    { bar: 15, beat: 4, semiquaver: 1, x: 500},

    { bar: 16, beat: 1, semiquaver: 1, x: 300}, // triplet
    { bar: 16, beat: 1, semiquaver: 4, x: 350},
    { bar: 16, beat: 2, semiquaver: 3, x: 400},
    { bar: 16, beat: 3, semiquaver: 1, x: 450},
    { bar: 16, beat: 4, semiquaver: 1, x: 400},
    // VERSE A
    { bar: 17, beat: 1, semiquaver: 1, x: 300},
    { bar: 17, beat: 2, semiquaver: 1, x: 400},
    { bar: 17, beat: 3, semiquaver: 1, x: 350}, // triplet
    { bar: 17, beat: 3, semiquaver: 4, x: 450},
    { bar: 17, beat: 4, semiquaver: 3, x: 200},

    { bar: 18, beat: 1, semiquaver: 1, x: 100},
    { bar: 18, beat: 2, semiquaver: 1, x: 250},
    { bar: 18, beat: 3, semiquaver: 1, x: 400}, // long note start
    { bar: 18, beat: 3, semiquaver: 2, x: 400},
    { bar: 18, beat: 3, semiquaver: 3, x: 400},
    { bar: 18, beat: 3, semiquaver: 4, x: 400},
    { bar: 18, beat: 4, semiquaver: 1, x: 400},
    { bar: 18, beat: 4, semiquaver: 2, x: 400},
    { bar: 18, beat: 4, semiquaver: 3, x: 400},
    { bar: 18, beat: 4, semiquaver: 4, x: 400},

    { bar: 19, beat: 1, semiquaver: 1, x: 400}, // long note end
    { bar: 19, beat: 2, semiquaver: 1, x: 250},
    { bar: 19, beat: 3, semiquaver: 1, x: 450},
    { bar: 19, beat: 4, semiquaver: 1, x: 600},

    { bar: 20, beat: 1, semiquaver: 1, x: 550},
    { bar: 20, beat: 1, semiquaver: 4, x: 475},
    { bar: 20, beat: 2, semiquaver: 3, x: 400},
    { bar: 20, beat: 3, semiquaver: 3, x: 300},
    { bar: 20, beat: 4, semiquaver: 1, x: 400},

    { bar: 21, beat: 1, semiquaver: 1, x: 400},
    { bar: 21, beat: 3, semiquaver: 1, x: 300}, // triplet
    { bar: 21, beat: 3, semiquaver: 4, x: 375},
    { bar: 21, beat: 4, semiquaver: 3, x: 450},

    { bar: 22, beat: 1, semiquaver: 1, x: 450}, // triplet
    { bar: 22, beat: 2, semiquaver: 1, x: 525},
    { bar: 22, beat: 2, semiquaver: 3, x: 600},
    { bar: 22, beat: 3, semiquaver: 3, x: 300},
    { bar: 22, beat: 4, semiquaver: 1, x: 325},
    { bar: 22, beat: 4, semiquaver: 3, x: 350},

    { bar: 23, beat: 1, semiquaver: 1, x: 375},
    { bar: 23, beat: 3, semiquaver: 1, x: 350},
    { bar: 23, beat: 4, semiquaver: 1, x: 450},

    { bar: 24, beat: 1, semiquaver: 1, x: 350},
    { bar: 24, beat: 2, semiquaver: 1, x: 450},
    { bar: 24, beat: 3, semiquaver: 1, x: 350},
    { bar: 24, beat: 4, semiquaver: 1, x: 450},

    { bar: 25, beat: 1, semiquaver: 1, x: 300},
    { bar: 25, beat: 2, semiquaver: 1, x: 350},
    { bar: 25, beat: 3, semiquaver: 1, x: 400}, // triplet
    { bar: 25, beat: 3, semiquaver: 4, x: 433},
    { bar: 25, beat: 4, semiquaver: 3, x: 467},

    { bar: 26, beat: 1, semiquaver: 1, x: 500},
    { bar: 26, beat: 2, semiquaver: 1, x: 300},
    { bar: 26, beat: 3, semiquaver: 1, x: 400}, // long note start
    { bar: 26, beat: 3, semiquaver: 2, x: 400},
    { bar: 26, beat: 3, semiquaver: 3, x: 400},
    { bar: 26, beat: 3, semiquaver: 4, x: 400},
    { bar: 26, beat: 4, semiquaver: 1, x: 400},
    { bar: 26, beat: 4, semiquaver: 2, x: 400},
    { bar: 26, beat: 4, semiquaver: 3, x: 400},
    { bar: 26, beat: 4, semiquaver: 4, x: 400},

    { bar: 27, beat: 1, semiquaver: 1, x: 400}, // long note end
    { bar: 27, beat: 2, semiquaver: 1, x: 100},
    { bar: 27, beat: 3, semiquaver: 1, x: 200},
    { bar: 27, beat: 4, semiquaver: 1, x: 300},

    { bar: 28, beat: 1, semiquaver: 1, x: 400}, // syn co pa
    { bar: 28, beat: 1, semiquaver: 3, x: 367},
    { bar: 28, beat: 2, semiquaver: 3, x: 333},
    { bar: 28, beat: 3, semiquaver: 3, x: 400},
    { bar: 28, beat: 4, semiquaver: 1, x: 400},

    { bar: 29, beat: 1, semiquaver: 1, x: 400},
    { bar: 29, beat: 3, semiquaver: 1, x: 433}, // triplet
    { bar: 29, beat: 3, semiquaver: 4, x: 467},
    { bar: 29, beat: 4, semiquaver: 3, x: 500},

    { bar: 30, beat: 1, semiquaver: 1, x: 467}, // syn co pa
    { bar: 30, beat: 1, semiquaver: 4, x: 433},
    { bar: 30, beat: 2, semiquaver: 3, x: 400},
    { bar: 30, beat: 3, semiquaver: 3, x: 350},
    { bar: 30, beat: 4, semiquaver: 1, x: 400},
    { bar: 30, beat: 4, semiquaver: 3, x: 450},

    { bar: 31, beat: 1, semiquaver: 1, x: 400},
    { bar: 31, beat: 2, semiquaver: 4, x: 100},
    { bar: 31, beat: 4, semiquaver: 1, x: 200},

    { bar: 32, beat: 1, semiquaver: 1, x: 300},
    { bar: 32, beat: 2, semiquaver: 1, x: 400},
    { bar: 32, beat: 3, semiquaver: 1, x: 500},
    { bar: 32, beat: 4, semiquaver: 1, x: 500},
    // CHORUS
    { bar: 33, beat: 1, semiquaver: 1, x: 400},
    { bar: 33, beat: 3, semiquaver: 1, x: 300},
    { bar: 33, beat: 4, semiquaver: 1, x: 350},

    { bar: 34, beat: 1, semiquaver: 1, x: 400},
    { bar: 34, beat: 3, semiquaver: 1, x: 500}, // triplet
    { bar: 34, beat: 3, semiquaver: 4, x: 450},
    { bar: 34, beat: 4, semiquaver: 3, x: 400},

    { bar: 35, beat: 3, semiquaver: 1, x: 300}, // triplet
    { bar: 35, beat: 3, semiquaver: 4, x: 350},
    { bar: 35, beat: 4, semiquaver: 3, x: 400},

    { bar: 36, beat: 3, semiquaver: 1, x: 450},
    { bar: 36, beat: 4, semiquaver: 1, x: 350},

    { bar: 37, beat: 1, semiquaver: 1, x: 400},
    { bar: 37, beat: 4, semiquaver: 1, x: 100},

    { bar: 38, beat: 1, semiquaver: 1, x: 200},
    { bar: 38, beat: 2, semiquaver: 1, x: 300},
    { bar: 38, beat: 3, semiquaver: 1, x: 333}, // triplet
    { bar: 38, beat: 3, semiquaver: 4, x: 367},
    { bar: 38, beat: 4, semiquaver: 3, x: 400},

    { bar: 39, beat: 3, semiquaver: 3, x: 500},
    { bar: 39, beat: 4, semiquaver: 1, x: 467},
    { bar: 39, beat: 4, semiquaver: 3, x: 433},

    { bar: 40, beat: 3, semiquaver: 1, x: 350},
    { bar: 40, beat: 4, semiquaver: 1, x: 450},

    { bar: 41, beat: 1, semiquaver: 1, x: 400},
    { bar: 41, beat: 3, semiquaver: 1, x: 300},
    { bar: 41, beat: 4, semiquaver: 1, x: 350},

    { bar: 42, beat: 1, semiquaver: 1, x: 400},
    { bar: 42, beat: 3, semiquaver: 1, x: 500}, // triplet
    { bar: 42, beat: 3, semiquaver: 4, x: 450},
    { bar: 42, beat: 4, semiquaver: 3, x: 400},

    { bar: 43, beat: 3, semiquaver: 1, x: 300}, // triplet
    { bar: 43, beat: 3, semiquaver: 4, x: 350},
    { bar: 43, beat: 4, semiquaver: 3, x: 400},

    { bar: 44, beat: 3, semiquaver: 1, x: 500},
    { bar: 44, beat: 4, semiquaver: 1, x: 300},

    { bar: 45, beat: 1, semiquaver: 1, x: 400},
    { bar: 45, beat: 4, semiquaver: 1, x: 700},

    { bar: 46, beat: 1, semiquaver: 1, x: 600},
    { bar: 46, beat: 2, semiquaver: 1, x: 500},
    { bar: 46, beat: 3, semiquaver: 1, x: 400},
    { bar: 46, beat: 4, semiquaver: 1, x: 300},

    { bar: 47, beat: 1, semiquaver: 1, x: 400},
    { bar: 47, beat: 1, semiquaver: 2, x: 400},
    { bar: 47, beat: 1, semiquaver: 3, x: 400},
    { bar: 47, beat: 1, semiquaver: 4, x: 400},
    { bar: 47, beat: 2, semiquaver: 1, x: 400},
    { bar: 47, beat: 2, semiquaver: 2, x: 400},
    { bar: 47, beat: 2, semiquaver: 3, x: 400},
    { bar: 47, beat: 2, semiquaver: 4, x: 400},
    { bar: 47, beat: 3, semiquaver: 1, x: 400},
    { bar: 47, beat: 3, semiquaver: 2, x: 400},
    { bar: 47, beat: 3, semiquaver: 3, x: 400},
    { bar: 47, beat: 3, semiquaver: 4, x: 400},
    { bar: 47, beat: 4, semiquaver: 1, x: 400},
    { bar: 47, beat: 4, semiquaver: 2, x: 400},
    { bar: 47, beat: 4, semiquaver: 3, x: 400},
    { bar: 47, beat: 4, semiquaver: 4, x: 400},

    { bar: 48, beat: 1, semiquaver: 1, x: 100},
    { bar: 48, beat: 3, semiquaver: 1, x: 700},
    { bar: 48, beat: 4, semiquaver: 1, x: 400},
    // BRIDGE
    { bar: 49, beat: 1, semiquaver: 1, x: 400},
    { bar: 49, beat: 1, semiquaver: 2, x: 400},
    { bar: 49, beat: 1, semiquaver: 3, x: 400},
    { bar: 49, beat: 2, semiquaver: 1, x: 400},
    { bar: 49, beat: 2, semiquaver: 3, x: 400},
    { bar: 49, beat: 2, semiquaver: 4, x: 400},
    { bar: 49, beat: 3, semiquaver: 1, x: 400},
    { bar: 49, beat: 3, semiquaver: 3, x: 400},
    { bar: 49, beat: 4, semiquaver: 1, x: 400},
    { bar: 49, beat: 4, semiquaver: 2, x: 400},
    { bar: 49, beat: 4, semiquaver: 3, x: 400},

    { bar: 50, beat: 1, semiquaver: 1, x: 400},
    { bar: 50, beat: 1, semiquaver: 3, x: 400},
    { bar: 50, beat: 1, semiquaver: 4, x: 400},
    { bar: 50, beat: 2, semiquaver: 1, x: 400},
    { bar: 50, beat: 2, semiquaver: 3, x: 400},
    { bar: 50, beat: 3, semiquaver: 1, x: 400},
    { bar: 50, beat: 3, semiquaver: 2, x: 400},
    { bar: 50, beat: 3, semiquaver: 3, x: 400},
    { bar: 50, beat: 4, semiquaver: 1, x: 400},
    { bar: 50, beat: 4, semiquaver: 3, x: 400},
    { bar: 50, beat: 4, semiquaver: 4, x: 400},

    { bar: 51, beat: 1, semiquaver: 1, x: 400}, // triplet
    { bar: 51, beat: 1, semiquaver: 4, x: 400},
    { bar: 51, beat: 2, semiquaver: 3, x: 400},
    { bar: 51, beat: 3, semiquaver: 1, x: 400}, // triplet
    { bar: 51, beat: 3, semiquaver: 4, x: 400},
    { bar: 51, beat: 4, semiquaver: 3, x: 400},

    { bar: 52, beat: 1, semiquaver: 1, x: 400},
    { bar: 52, beat: 2, semiquaver: 1, x: 400},
    { bar: 52, beat: 3, semiquaver: 1, x: 400},
    { bar: 52, beat: 4, semiquaver: 1, x: 400},

    { bar: 53, beat: 1, semiquaver: 1, x: 400},
    { bar: 53, beat: 3, semiquaver: 1, x: 400},

    { bar: 54, beat: 1, semiquaver: 1, x: 400}, // triplet
    { bar: 54, beat: 1, semiquaver: 4, x: 400},
    { bar: 54, beat: 2, semiquaver: 3, x: 400},
    { bar: 54, beat: 3, semiquaver: 1, x: 400}, // triplet
    { bar: 54, beat: 3, semiquaver: 4, x: 400},
    { bar: 54, beat: 4, semiquaver: 3, x: 400},

    { bar: 55, beat: 1, semiquaver: 1, x: 400},
    { bar: 55, beat: 3, semiquaver: 1, x: 400},

    { bar: 56, beat: 1, semiquaver: 1, x: 400},
    { bar: 56, beat: 2, semiquaver: 1, x: 400},
    { bar: 56, beat: 3, semiquaver: 1, x: 400},
    { bar: 56, beat: 4, semiquaver: 1, x: 400},

    { bar: 57, beat: 1, semiquaver: 1, x: 400},
    { bar: 57, beat: 2, semiquaver: 1, x: 400},
    { bar: 57, beat: 2, semiquaver: 3, x: 400},
    { bar: 57, beat: 3, semiquaver: 1, x: 400},
    { bar: 57, beat: 4, semiquaver: 1, x: 400},

    { bar: 58, beat: 1, semiquaver: 1, x: 400}, // triplet
    { bar: 58, beat: 1, semiquaver: 4, x: 400},
    { bar: 58, beat: 2, semiquaver: 3, x: 400},
    { bar: 58, beat: 3, semiquaver: 1, x: 400},
    { bar: 58, beat: 4, semiquaver: 1, x: 400},

    { bar: 59, beat: 1, semiquaver: 1, x: 400},
    { bar: 59, beat: 1, semiquaver: 3, x: 400},
    { bar: 59, beat: 2, semiquaver: 3, x: 400},
    { bar: 59, beat: 3, semiquaver: 1, x: 400},
    { bar: 59, beat: 4, semiquaver: 1, x: 400},

    { bar: 60, beat: 1, semiquaver: 1, x: 400},
    { bar: 60, beat: 2, semiquaver: 1, x: 400},
    { bar: 60, beat: 3, semiquaver: 1, x: 400},
    { bar: 60, beat: 4, semiquaver: 1, x: 400},

    { bar: 61, beat: 1, semiquaver: 1, x: 400},
    { bar: 61, beat: 2, semiquaver: 3, x: 400},
    { bar: 61, beat: 2, semiquaver: 4, x: 400},
    { bar: 61, beat: 3, semiquaver: 1, x: 400},

    { bar: 62, beat: 1, semiquaver: 1, x: 400}, // triplet
    { bar: 62, beat: 1, semiquaver: 4, x: 400},
    { bar: 62, beat: 2, semiquaver: 3, x: 400},
    { bar: 62, beat: 3, semiquaver: 1, x: 400}, // triplet
    { bar: 62, beat: 3, semiquaver: 4, x: 400},
    { bar: 62, beat: 4, semiquaver: 3, x: 400},

    { bar: 63, beat: 1, semiquaver: 1, x: 400},
    { bar: 63, beat: 3, semiquaver: 1, x: 400},
    { bar: 63, beat: 4, semiquaver: 1, x: 400},

    { bar: 64, beat: 1, semiquaver: 1, x: 400},
    { bar: 64, beat: 2, semiquaver: 1, x: 400},
    { bar: 64, beat: 3, semiquaver: 1, x: 400},
    { bar: 64, beat: 4, semiquaver: 1, x: 400},

    // BRIDGE PART B
    { bar: 65, beat: 1, semiquaver: 1, x: 400},
    { bar: 65, beat: 4, semiquaver: 1, x: 400},
    { bar: 65, beat: 4, semiquaver: 3, x: 400},

    { bar: 66, beat: 3, semiquaver: 1, x: 400},
    { bar: 66, beat: 4, semiquaver: 1, x: 400},

    { bar: 67, beat: 1, semiquaver: 1, x: 400},
    { bar: 67, beat: 4, semiquaver: 1, x: 400},
    { bar: 67, beat: 4, semiquaver: 3, x: 400},

    { bar: 68, beat: 1, semiquaver: 3, x: 400},
    { bar: 68, beat: 2, semiquaver: 1, x: 400},
    { bar: 68, beat: 3, semiquaver: 1, x: 400},
    { bar: 68, beat: 4, semiquaver: 1, x: 400},

    { bar: 69, beat: 1, semiquaver: 1, x: 400},
    { bar: 69, beat: 4, semiquaver: 1, x: 400},
    { bar: 69, beat: 4, semiquaver: 3, x: 400},

    { bar: 70, beat: 2, semiquaver: 3, x: 400},
    { bar: 70, beat: 3, semiquaver: 1, x: 400},
    { bar: 70, beat: 4, semiquaver: 1, x: 400},
    { bar: 70, beat: 4, semiquaver: 3, x: 400},

    { bar: 71, beat: 3, semiquaver: 1, x: 400},
    { bar: 71, beat: 4, semiquaver: 1, x: 400},
    { bar: 71, beat: 4, semiquaver: 3, x: 400},

    { bar: 72, beat: 3, semiquaver: 1, x: 400},
    { bar: 72, beat: 4, semiquaver: 1, x: 400},

    { bar: 73, beat: 1, semiquaver: 1, x: 400},
    { bar: 73, beat: 4, semiquaver: 1, x: 400},
    { bar: 73, beat: 4, semiquaver: 3, x: 400},

    { bar: 74, beat: 3, semiquaver: 1, x: 400},
    { bar: 74, beat: 4, semiquaver: 1, x: 400},

    { bar: 75, beat: 1, semiquaver: 1, x: 400},
    { bar: 75, beat: 4, semiquaver: 1, x: 400},
    { bar: 75, beat: 4, semiquaver: 3, x: 400},

    { bar: 76, beat: 1, semiquaver: 3, x: 400},
    { bar: 76, beat: 2, semiquaver: 1, x: 400},
    { bar: 76, beat: 3, semiquaver: 1, x: 400},
    { bar: 76, beat: 4, semiquaver: 1, x: 400},

    { bar: 77, beat: 1, semiquaver: 1, x: 400},
    { bar: 77, beat: 4, semiquaver: 1, x: 400},
    { bar: 77, beat: 4, semiquaver: 3, x: 400},

    { bar: 78, beat: 2, semiquaver: 3, x: 400},
    { bar: 78, beat: 3, semiquaver: 1, x: 400},
    { bar: 78, beat: 4, semiquaver: 1, x: 400},
    { bar: 78, beat: 4, semiquaver: 3, x: 400},

    { bar: 79, beat: 1, semiquaver: 1, x: 400},

    { bar: 80, beat: 3, semiquaver: 1, x: 400},
    { bar: 80, beat: 4, semiquaver: 1, x: 400},

    { bar: 81, beat: 1, semiquaver: 1, x: 400},
    { bar: 81, beat: 4, semiquaver: 1, x: 400},
    { bar: 81, beat: 4, semiquaver: 3, x: 400},

    { bar: 82, beat: 3, semiquaver: 1, x: 400},
    { bar: 82, beat: 4, semiquaver: 1, x: 400},

    { bar: 83, beat: 1, semiquaver: 1, x: 400},
    { bar: 83, beat: 4, semiquaver: 1, x: 400},
    { bar: 83, beat: 4, semiquaver: 3, x: 400},

    { bar: 84, beat: 1, semiquaver: 3, x: 400},
    { bar: 84, beat: 2, semiquaver: 1, x: 400},
    { bar: 84, beat: 3, semiquaver: 1, x: 400},
    { bar: 84, beat: 4, semiquaver: 1, x: 400},

    { bar: 85, beat: 1, semiquaver: 1, x: 400},
    { bar: 85, beat: 4, semiquaver: 1, x: 400},
    { bar: 85, beat: 4, semiquaver: 3, x: 400},

    { bar: 86, beat: 2, semiquaver: 3, x: 400},
    { bar: 86, beat: 3, semiquaver: 1, x: 400},
    { bar: 86, beat: 4, semiquaver: 1, x: 400},
    { bar: 86, beat: 4, semiquaver: 3, x: 400},

    { bar: 87, beat: 3, semiquaver: 1, x: 400},
    { bar: 87, beat: 4, semiquaver: 1, x: 400},
    { bar: 87, beat: 4, semiquaver: 3, x: 400},

    { bar: 88, beat: 3, semiquaver: 1, x: 400},
    { bar: 88, beat: 4, semiquaver: 1, x: 400},

    { bar: 89, beat: 1, semiquaver: 1, x: 400},
    { bar: 89, beat: 4, semiquaver: 1, x: 400},
    { bar: 89, beat: 4, semiquaver: 3, x: 400},

    { bar: 90, beat: 3, semiquaver: 1, x: 400},
    { bar: 90, beat: 4, semiquaver: 1, x: 400},

    { bar: 91, beat: 1, semiquaver: 1, x: 400},
    { bar: 91, beat: 4, semiquaver: 1, x: 400},
    { bar: 91, beat: 4, semiquaver: 3, x: 400},

    { bar: 92, beat: 1, semiquaver: 3, x: 400},
    { bar: 92, beat: 2, semiquaver: 1, x: 400},
    { bar: 92, beat: 3, semiquaver: 1, x: 400},
    { bar: 92, beat: 4, semiquaver: 1, x: 400},

    { bar: 93, beat: 1, semiquaver: 1, x: 400},
    { bar: 93, beat: 4, semiquaver: 1, x: 400},
    { bar: 93, beat: 4, semiquaver: 3, x: 400},

    { bar: 94, beat: 2, semiquaver: 3, x: 400},
    { bar: 94, beat: 3, semiquaver: 1, x: 400},
    { bar: 94, beat: 4, semiquaver: 1, x: 400},
    { bar: 94, beat: 4, semiquaver: 3, x: 400},

    { bar: 95, beat: 1, semiquaver: 1, x: 400},
    { bar: 95, beat: 1, semiquaver: 2, x: 400},
    { bar: 95, beat: 1, semiquaver: 3, x: 400},
    { bar: 95, beat: 3, semiquaver: 1, x: 400},
    { bar: 95, beat: 3, semiquaver: 2, x: 400},
    { bar: 95, beat: 3, semiquaver: 3, x: 400},

    { bar: 96, beat: 1, semiquaver: 1, x: 400},
    { bar: 96, beat: 1, semiquaver: 4, x: 400},
    { bar: 96, beat: 2, semiquaver: 1, x: 400},
    { bar: 96, beat: 2, semiquaver: 3, x: 400},
    { bar: 96, beat: 2, semiquaver: 4, x: 400},
    { bar: 96, beat: 3, semiquaver: 1, x: 400},
    { bar: 96, beat: 4, semiquaver: 1, x: 400},

    // VERSE B
    { bar: 97, beat: 1, semiquaver: 1, x: 300},
    { bar: 97, beat: 2, semiquaver: 1, x: 400},
    { bar: 97, beat: 3, semiquaver: 1, x: 350}, // triplet
    { bar: 97, beat: 3, semiquaver: 4, x: 450},
    { bar: 97, beat: 4, semiquaver: 3, x: 200},

    { bar: 98, beat: 1, semiquaver: 1, x: 100},
    { bar: 98, beat: 2, semiquaver: 1, x: 250},
    { bar: 98, beat: 3, semiquaver: 1, x: 400}, // long note start
    { bar: 98, beat: 3, semiquaver: 2, x: 400},
    { bar: 98, beat: 3, semiquaver: 3, x: 400},
    { bar: 98, beat: 3, semiquaver: 4, x: 400},
    { bar: 98, beat: 4, semiquaver: 1, x: 400},
    { bar: 98, beat: 4, semiquaver: 2, x: 400},
    { bar: 98, beat: 4, semiquaver: 3, x: 400},
    { bar: 98, beat: 4, semiquaver: 4, x: 400},

    { bar: 99, beat: 1, semiquaver: 1, x: 400}, // long note end
    { bar: 99, beat: 2, semiquaver: 1, x: 250},
    { bar: 99, beat: 3, semiquaver: 1, x: 450},
    { bar: 99, beat: 4, semiquaver: 1, x: 600},

    { bar: 100, beat: 1, semiquaver: 1, x: 550},
    { bar: 100, beat: 1, semiquaver: 4, x: 475},
    { bar: 100, beat: 2, semiquaver: 3, x: 400},
    { bar: 100, beat: 3, semiquaver: 3, x: 300},
    { bar: 100, beat: 4, semiquaver: 1, x: 400},

    { bar: 101, beat: 1, semiquaver: 1, x: 400},
    { bar: 101, beat: 3, semiquaver: 1, x: 300}, // triplet
    { bar: 101, beat: 3, semiquaver: 4, x: 375},
    { bar: 101, beat: 4, semiquaver: 3, x: 450},

    { bar: 102, beat: 1, semiquaver: 1, x: 450}, // triplet
    { bar: 102, beat: 2, semiquaver: 1, x: 525},
    { bar: 102, beat: 2, semiquaver: 3, x: 600},
    { bar: 102, beat: 3, semiquaver: 3, x: 300},
    { bar: 102, beat: 4, semiquaver: 1, x: 325},
    { bar: 102, beat: 4, semiquaver: 3, x: 350},

    { bar: 103, beat: 1, semiquaver: 1, x: 375},
    { bar: 103, beat: 3, semiquaver: 1, x: 350},
    { bar: 103, beat: 4, semiquaver: 1, x: 450},

    { bar: 104, beat: 1, semiquaver: 1, x: 350},
    { bar: 104, beat: 2, semiquaver: 1, x: 450},
    { bar: 104, beat: 3, semiquaver: 1, x: 350},
    { bar: 104, beat: 4, semiquaver: 1, x: 450},

    { bar: 105, beat: 1, semiquaver: 1, x: 300},
    { bar: 105, beat: 2, semiquaver: 1, x: 350},
    { bar: 105, beat: 3, semiquaver: 1, x: 400}, // triplet
    { bar: 105, beat: 3, semiquaver: 4, x: 433},
    { bar: 105, beat: 4, semiquaver: 3, x: 467},

    { bar: 106, beat: 1, semiquaver: 1, x: 500},
    { bar: 106, beat: 2, semiquaver: 1, x: 300},
    { bar: 106, beat: 3, semiquaver: 1, x: 400}, // long note start
    { bar: 106, beat: 3, semiquaver: 2, x: 400},
    { bar: 106, beat: 3, semiquaver: 3, x: 400},
    { bar: 106, beat: 3, semiquaver: 4, x: 400},
    { bar: 106, beat: 4, semiquaver: 1, x: 400},
    { bar: 106, beat: 4, semiquaver: 2, x: 400},
    { bar: 106, beat: 4, semiquaver: 3, x: 400},
    { bar: 106, beat: 4, semiquaver: 4, x: 400},

    { bar: 107, beat: 1, semiquaver: 1, x: 400}, // long note end
    { bar: 107, beat: 2, semiquaver: 1, x: 100},
    { bar: 107, beat: 3, semiquaver: 1, x: 200},
    { bar: 107, beat: 4, semiquaver: 1, x: 300},

    { bar: 108, beat: 1, semiquaver: 1, x: 400}, // syn co pa
    { bar: 108, beat: 1, semiquaver: 3, x: 367},
    { bar: 108, beat: 2, semiquaver: 3, x: 333},
    { bar: 108, beat: 3, semiquaver: 3, x: 400},
    { bar: 108, beat: 4, semiquaver: 1, x: 400},

    { bar: 109, beat: 1, semiquaver: 1, x: 400},
    { bar: 109, beat: 3, semiquaver: 1, x: 433}, // triplet
    { bar: 109, beat: 3, semiquaver: 4, x: 467},
    { bar: 109, beat: 4, semiquaver: 3, x: 500},

    { bar: 110, beat: 1, semiquaver: 1, x: 467}, // syn co pa
    { bar: 110, beat: 1, semiquaver: 4, x: 433},
    { bar: 110, beat: 2, semiquaver: 3, x: 400},
    { bar: 110, beat: 3, semiquaver: 3, x: 350},
    { bar: 110, beat: 4, semiquaver: 1, x: 400},
    { bar: 110, beat: 4, semiquaver: 3, x: 450},

    { bar: 111, beat: 1, semiquaver: 1, x: 400},
    { bar: 111, beat: 2, semiquaver: 4, x: 100},
    { bar: 111, beat: 4, semiquaver: 1, x: 200},

    { bar: 112, beat: 1, semiquaver: 1, x: 300},
    { bar: 112, beat: 2, semiquaver: 1, x: 400},
    { bar: 112, beat: 3, semiquaver: 1, x: 500},
    { bar: 112, beat: 4, semiquaver: 1, x: 500},
    // CHORUS
    { bar: 113, beat: 1, semiquaver: 1, x: 400},
    { bar: 113, beat: 3, semiquaver: 1, x: 300},
    { bar: 113, beat: 4, semiquaver: 1, x: 350},

    { bar: 114, beat: 1, semiquaver: 1, x: 400},
    { bar: 114, beat: 3, semiquaver: 1, x: 500}, // triplet
    { bar: 114, beat: 3, semiquaver: 4, x: 450},
    { bar: 114, beat: 4, semiquaver: 3, x: 400},

    { bar: 115, beat: 3, semiquaver: 1, x: 300}, // triplet
    { bar: 115, beat: 3, semiquaver: 4, x: 350},
    { bar: 115, beat: 4, semiquaver: 3, x: 400},

    { bar: 116, beat: 3, semiquaver: 1, x: 450},
    { bar: 116, beat: 4, semiquaver: 1, x: 350},

    { bar: 117, beat: 1, semiquaver: 1, x: 400},
    { bar: 117, beat: 4, semiquaver: 1, x: 100},

    { bar: 118, beat: 1, semiquaver: 1, x: 200},
    { bar: 118, beat: 2, semiquaver: 1, x: 300},
    { bar: 118, beat: 3, semiquaver: 1, x: 333}, // triplet
    { bar: 118, beat: 3, semiquaver: 4, x: 367},
    { bar: 118, beat: 4, semiquaver: 3, x: 400},

    { bar: 119, beat: 3, semiquaver: 3, x: 500},
    { bar: 119, beat: 4, semiquaver: 1, x: 467},
    { bar: 119, beat: 4, semiquaver: 3, x: 433},

    { bar: 120, beat: 3, semiquaver: 1, x: 350},
    { bar: 120, beat: 4, semiquaver: 1, x: 450},

    { bar: 121, beat: 1, semiquaver: 1, x: 400},
    { bar: 121, beat: 3, semiquaver: 1, x: 300},
    { bar: 121, beat: 4, semiquaver: 1, x: 350},

    { bar: 122, beat: 1, semiquaver: 1, x: 400},
    { bar: 122, beat: 3, semiquaver: 1, x: 500}, // triplet
    { bar: 122, beat: 3, semiquaver: 4, x: 450},
    { bar: 122, beat: 4, semiquaver: 3, x: 400},

    { bar: 123, beat: 3, semiquaver: 1, x: 300}, // triplet
    { bar: 123, beat: 3, semiquaver: 4, x: 350},
    { bar: 123, beat: 4, semiquaver: 3, x: 400},

    { bar: 124, beat: 3, semiquaver: 1, x: 500},
    { bar: 124, beat: 4, semiquaver: 1, x: 300},

    { bar: 125, beat: 1, semiquaver: 1, x: 400},
    { bar: 125, beat: 4, semiquaver: 1, x: 700},

    { bar: 126, beat: 1, semiquaver: 1, x: 600},
    { bar: 126, beat: 2, semiquaver: 1, x: 500},
    { bar: 126, beat: 3, semiquaver: 1, x: 400},
    { bar: 126, beat: 4, semiquaver: 1, x: 300},

    { bar: 127, beat: 1, semiquaver: 1, x: 400},
    { bar: 127, beat: 1, semiquaver: 2, x: 400},
    { bar: 127, beat: 1, semiquaver: 3, x: 400},
    { bar: 127, beat: 1, semiquaver: 4, x: 400},
    { bar: 127, beat: 2, semiquaver: 1, x: 400},
    { bar: 127, beat: 2, semiquaver: 2, x: 400},
    { bar: 127, beat: 2, semiquaver: 3, x: 400},
    { bar: 127, beat: 2, semiquaver: 4, x: 400},
    { bar: 127, beat: 3, semiquaver: 1, x: 400},
    { bar: 127, beat: 3, semiquaver: 2, x: 400},
    { bar: 127, beat: 3, semiquaver: 3, x: 400},
    { bar: 127, beat: 3, semiquaver: 4, x: 400},
    { bar: 127, beat: 4, semiquaver: 1, x: 400},
    { bar: 127, beat: 4, semiquaver: 2, x: 400},
    { bar: 127, beat: 4, semiquaver: 3, x: 400},
    { bar: 127, beat: 4, semiquaver: 4, x: 400},

    { bar: 128, beat: 1, semiquaver: 1, x: 100},
    { bar: 128, beat: 3, semiquaver: 1, x: 700},
    ];

    for (let note of noteChart) {
        maxScore++;
        let hitTime = getSecondsFromBeat(note.bar, note.beat, note.semiquaver);
        let fallDuration = 0.9;
        
        circles.push({
            x: note.x,
            y: -20,
            hitTime: hitTime,
            spawnTime: hitTime - fallDuration,
            fallDuration: fallDuration,
            speed: (height - 50) / fallDuration,
            hit: false,
            dead: false
        });
    };
}

function draw() {
    background(0, 200, 255);

    if (gameState === "START") {
        drawStartScreen();
    } else if (gameState === "PLAYING") {
        timePassed = (millis() - clickTime) / 1000; 
        runGame();
    } else if (gameState === "GAMEOVER") {
        drawGameOverScreen();
    }
}

function drawStartScreen() {
    textAlign(CENTER, CENTER);
    fill("black");
    textSize(24);
    text("Click to Start!", width / 2, height / 2);
}

function drawGameOverScreen() {
    textAlign(CENTER, CENTER);
    fill("black");
    textSize(32);
    text("Game Over!", width / 2, height / 2 - 20);
    textSize(20);
    text(`Final Score: ${score}/${maxScore}`, width / 2, height / 2 + 20);
}

function gameOver() {
    gameState = "GAMEOVER";
}

function runGame() {
    background(0, 200, 255);

    fill("red");
    strokeWeight(0);

    fill("grey")
    rect(0, 0, width, 30)

    fill("green")
    rect(0, height - 30, width, 30)

    textAlign(CENTER, CENTER);
    textSize(50);
    text("🧺", mouseX, height - 20);

    fill("black")
    textSize(15);
    textAlign(LEFT, BOTTOM);
    text(`Score: ${score}`, 30, height - 10)
    textAlign(LEFT, RIGHT);
    text(`Combo: ${combo}`, width - 100, height - 10)

    for (let c of circles) {
        if (c.hit || c.dead) continue;

        if (timePassed >= c.spawnTime) {
            let timeProgress = timePassed - c.spawnTime;
            c.y = map(timeProgress, 0, c.fallDuration, -20, height - 30);
            fill("red");
            strokeWeight(0);
            circle(c.x, c.y, 20);
            let d = dist(c.x, c.y, mouseX, height - 30);

            // catch circle
            if (d < 30) {
                c.hit = true;
                hitSound.play(0);
                score++;
                combo++;
            }
            // miss circle
            else if (c.y > height + 20) {
                c.dead = true;
                combo = 0;
            } 
        }
    }
}
