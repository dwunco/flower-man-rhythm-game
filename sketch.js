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
    { bar: 9, beat: 1, semiquaver: 3, x: 350},
    { bar: 9, beat: 1, semiquaver: 4, x: 300},
    { bar: 9, beat: 2, semiquaver: 1, x: 400},
    { bar: 9, beat: 2, semiquaver: 3, x: 450},
    { bar: 9, beat: 2, semiquaver: 4, x: 500},
    { bar: 9, beat: 3, semiquaver: 1, x: 400},
    { bar: 9, beat: 4, semiquaver: 1, x: 400},
    
    { bar: 10, beat: 1, semiquaver: 1, x: 300},
    { bar: 10, beat: 1, semiquaver: 3, x: 250},
    { bar: 10, beat: 1, semiquaver: 4, x: 300},
    { bar: 10, beat: 2, semiquaver: 1, x: 300},
    { bar: 10, beat: 2, semiquaver: 3, x: 350},
    { bar: 10, beat: 2, semiquaver: 4, x: 200},
    { bar: 10, beat: 3, semiquaver: 1, x: 300},
    { bar: 10, beat: 4, semiquaver: 1, x: 300},

    { bar: 11, beat: 1, semiquaver: 1, x: 500},
    { bar: 11, beat: 1, semiquaver: 3, x: 450},
    { bar: 11, beat: 1, semiquaver: 4, x: 400},
    { bar: 11, beat: 2, semiquaver: 1, x: 400},
    { bar: 11, beat: 2, semiquaver: 3, x: 450},
    { bar: 11, beat: 2, semiquaver: 4, x: 400},
    { bar: 11, beat: 3, semiquaver: 1, x: 500},
    { bar: 11, beat: 4, semiquaver: 1, x: 500},

    { bar: 12, beat: 1, semiquaver: 1, x: 300}, // triplet
    { bar: 12, beat: 1, semiquaver: 4, x: 350},
    { bar: 12, beat: 2, semiquaver: 3, x: 400},
    { bar: 12, beat: 3, semiquaver: 1, x: 450},
    { bar: 12, beat: 4, semiquaver: 1, x: 400},

    { bar: 13, beat: 1, semiquaver: 1, x: 400},
    { bar: 13, beat: 1, semiquaver: 3, x: 450},
    { bar: 13, beat: 1, semiquaver: 4, x: 500},
    { bar: 13, beat: 2, semiquaver: 1, x: 550},
    { bar: 13, beat: 2, semiquaver: 3, x: 400},
    { bar: 13, beat: 2, semiquaver: 4, x: 300},
    { bar: 13, beat: 3, semiquaver: 1, x: 400},
    { bar: 13, beat: 4, semiquaver: 1, x: 500},
    
    { bar: 14, beat: 1, semiquaver: 1, x: 300},
    { bar: 14, beat: 1, semiquaver: 3, x: 350},
    { bar: 14, beat: 1, semiquaver: 4, x: 400},
    { bar: 14, beat: 2, semiquaver: 1, x: 350},
    { bar: 14, beat: 2, semiquaver: 3, x: 300},
    { bar: 14, beat: 2, semiquaver: 4, x: 200},
    { bar: 14, beat: 3, semiquaver: 1, x: 300},
    { bar: 14, beat: 4, semiquaver: 1, x: 200},

    { bar: 15, beat: 1, semiquaver: 1, x: 500},
    { bar: 15, beat: 1, semiquaver: 3, x: 550},
    { bar: 15, beat: 1, semiquaver: 4, x: 600},
    { bar: 15, beat: 2, semiquaver: 1, x: 650},
    { bar: 15, beat: 2, semiquaver: 3, x: 500},
    { bar: 15, beat: 2, semiquaver: 4, x: 400},
    { bar: 15, beat: 3, semiquaver: 1, x: 500},
    { bar: 15, beat: 4, semiquaver: 1, x: 500},

    { bar: 16, beat: 1, semiquaver: 1, x: 300}, // triplet
    { bar: 16, beat: 1, semiquaver: 4, x: 350},
    { bar: 16, beat: 2, semiquaver: 3, x: 400},
    { bar: 16, beat: 3, semiquaver: 1, x: 450},
    { bar: 16, beat: 4, semiquaver: 1, x: 400},
    // VERSE A
    { bar: 17, beat: 1, semiquaver: 1, x: 400},
    { bar: 17, beat: 2, semiquaver: 1, x: 400},
    { bar: 17, beat: 3, semiquaver: 1, x: 400}, // triplet
    { bar: 17, beat: 3, semiquaver: 4, x: 400},
    { bar: 17, beat: 4, semiquaver: 3, x: 400},

    { bar: 18, beat: 1, semiquaver: 1, x: 400},
    { bar: 18, beat: 2, semiquaver: 1, x: 400},
    { bar: 18, beat: 3, semiquaver: 1, x: 400}, // long note start
    { bar: 18, beat: 3, semiquaver: 2, x: 400},
    { bar: 18, beat: 3, semiquaver: 3, x: 400},
    { bar: 18, beat: 3, semiquaver: 4, x: 400},
    { bar: 18, beat: 4, semiquaver: 1, x: 400},
    { bar: 18, beat: 4, semiquaver: 2, x: 400},
    { bar: 18, beat: 4, semiquaver: 3, x: 400},
    { bar: 18, beat: 4, semiquaver: 4, x: 400},

    { bar: 19, beat: 1, semiquaver: 1, x: 400}, // long note end
    { bar: 19, beat: 2, semiquaver: 1, x: 400},
    { bar: 19, beat: 3, semiquaver: 1, x: 400},
    { bar: 19, beat: 4, semiquaver: 1, x: 400},

    { bar: 20, beat: 1, semiquaver: 1, x: 400},
    { bar: 20, beat: 1, semiquaver: 4, x: 400},
    { bar: 20, beat: 2, semiquaver: 3, x: 400},
    { bar: 20, beat: 3, semiquaver: 3, x: 400},
    { bar: 20, beat: 4, semiquaver: 1, x: 400},

    { bar: 21, beat: 1, semiquaver: 1, x: 400},
    { bar: 21, beat: 3, semiquaver: 1, x: 400}, // triplet
    { bar: 21, beat: 3, semiquaver: 4, x: 400},
    { bar: 21, beat: 4, semiquaver: 3, x: 400},

    { bar: 22, beat: 1, semiquaver: 1, x: 400}, // triplet
    { bar: 22, beat: 2, semiquaver: 1, x: 400},
    { bar: 22, beat: 2, semiquaver: 3, x: 400},
    { bar: 22, beat: 3, semiquaver: 3, x: 400},
    { bar: 22, beat: 4, semiquaver: 1, x: 400},
    { bar: 22, beat: 4, semiquaver: 3, x: 400},

    { bar: 23, beat: 1, semiquaver: 1, x: 400},
    { bar: 23, beat: 3, semiquaver: 1, x: 400},
    { bar: 23, beat: 4, semiquaver: 1, x: 400},

    { bar: 24, beat: 1, semiquaver: 1, x: 400},
    { bar: 24, beat: 2, semiquaver: 1, x: 400},
    { bar: 24, beat: 3, semiquaver: 1, x: 400},
    { bar: 24, beat: 4, semiquaver: 1, x: 400},

    { bar: 25, beat: 1, semiquaver: 1, x: 400},
    { bar: 25, beat: 2, semiquaver: 1, x: 400},
    { bar: 25, beat: 3, semiquaver: 1, x: 400}, // triplet
    { bar: 25, beat: 3, semiquaver: 4, x: 400},
    { bar: 25, beat: 4, semiquaver: 3, x: 400},

    { bar: 26, beat: 1, semiquaver: 1, x: 400},
    { bar: 26, beat: 2, semiquaver: 1, x: 400},
    { bar: 26, beat: 3, semiquaver: 1, x: 400}, // long note start
    { bar: 26, beat: 3, semiquaver: 2, x: 400},
    { bar: 26, beat: 3, semiquaver: 3, x: 400},
    { bar: 26, beat: 3, semiquaver: 4, x: 400},
    { bar: 26, beat: 4, semiquaver: 1, x: 400},
    { bar: 26, beat: 4, semiquaver: 2, x: 400},
    { bar: 26, beat: 4, semiquaver: 3, x: 400},
    { bar: 26, beat: 4, semiquaver: 4, x: 400},

    { bar: 27, beat: 1, semiquaver: 1, x: 400}, // long note end
    { bar: 27, beat: 2, semiquaver: 1, x: 400},
    { bar: 27, beat: 3, semiquaver: 1, x: 400},
    { bar: 27, beat: 4, semiquaver: 1, x: 400},

    { bar: 28, beat: 1, semiquaver: 1, x: 400}, // syn co pa
    { bar: 28, beat: 1, semiquaver: 3, x: 400},
    { bar: 28, beat: 2, semiquaver: 3, x: 400},
    { bar: 28, beat: 3, semiquaver: 3, x: 400},
    { bar: 28, beat: 4, semiquaver: 1, x: 400},

    { bar: 29, beat: 1, semiquaver: 1, x: 400},
    { bar: 29, beat: 3, semiquaver: 1, x: 400}, // triplet
    { bar: 29, beat: 3, semiquaver: 4, x: 400},
    { bar: 29, beat: 4, semiquaver: 3, x: 400},

    { bar: 30, beat: 1, semiquaver: 1, x: 400}, // syn co pa
    { bar: 30, beat: 1, semiquaver: 4, x: 400},
    { bar: 30, beat: 2, semiquaver: 3, x: 400},
    { bar: 30, beat: 3, semiquaver: 3, x: 400},
    { bar: 30, beat: 4, semiquaver: 1, x: 400},
    { bar: 30, beat: 4, semiquaver: 3, x: 400},

    { bar: 31, beat: 1, semiquaver: 1, x: 400},
    { bar: 31, beat: 2, semiquaver: 4, x: 400},
    { bar: 31, beat: 4, semiquaver: 1, x: 400},

    { bar: 32, beat: 1, semiquaver: 1, x: 400},
    { bar: 32, beat: 2, semiquaver: 1, x: 400},
    { bar: 32, beat: 3, semiquaver: 1, x: 400},
    { bar: 32, beat: 4, semiquaver: 1, x: 400},
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

    textSize(50);
    text("🧺", mouseX, height - 20);

    fill("black")
    textSize(15);
    text(`Score: ${score}`, 30, height - 20)
    text(`Combo: ${combo}`, width - 50, height - 20)

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
