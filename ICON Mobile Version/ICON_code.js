let started = false;

const Grid = document.getElementById("theGrid");

let levels = [ // player appears in the 8th row and 3rd column
	[
	[0, 0, 0, 0, 0],
	[0, 0, 2, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 1, 0, 0],
	[0, 0, 0, 0, 0]
	], // empty first room

	[
	[0, 0, 0, 0, 0],
	[0, 0, 8, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 1, 0, 0],
	[0, 0, 0, 0, 0]
	],

	[
	[0, 0, 0, 0, 0],
	[4, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 1, 0, 0],
	[0, 0, 0, 0, 7]
	],

	[
	[0, 0, 0, 6, 0],
	[0, 8, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 1, 0, 0],
	[0, 0, 0, 0, 0]
	],

	[
	[0, 6, 0, 0, 0],
	[4, 0, 0, 0, 5],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 1, 0, 0],
	[0, 0, 0, 0, 0]
	],

	[
	[0, 0, 0, 0, 0],
	[0, 0, 3, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 1, 0, 0],
	[0, 0, 0, 0, 0]
	],

	[
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0]
	], // game over level

];

let currentLevel = null;
let finalLevel = 5;
let difficulty = 800;
let shownDif = 0;
let cheatStart = 0;

let playerHealth = 5;
let playerDamageTaken = 0;


let playerAttackCooldown = 0;
let playerMoveCooldown = 0;
let playerRippleSpeed = 120;

let invertControls = false;
let colorblind = false;


let enemyRippleSpeed = 180; // bigger number is slower

let enemy = [
	null,
	null,
	null,
	{health: 10, attackCooldown: 0, turnCharge: 0},
	{health: 2, attackCooldown: 0},
	{health: 2, attackCooldown: 0},
	{health: 2, attackCooldown: 0},
	{health: 2, attackCooldown: 0}, 
	{health: 3, attackCooldown: 0}
]


let thoughtsInChaos = setInterval(masterBrain, difficulty);

let stateOfBeing = [ // what and where
	[0, 0, 0, 0, 0],
	[0, 0, 2, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 1, 0, 0],
	[0, 0, 0, 0, 0]
	];

// Potentially make an object array...

// ENEMIES MOVE EVERY 800 MS!!!

/*

Key:

0 = Blank Space

1 = Player

2 = Gateway to Next Floor = [ ]

3 = Arbiter = '/:|:\'

4 = Leftward Templar of Cartesian Y = [+

5 = Rightward Templar of Cartesian Y = +]

6 = Upward Templar of Cartesian X = "+"

7 = Downward Templar of Cartesian X = _+_

8 = Paladin of the Lateral = ('+')

*/


let gridJS = [
	[document.getElementById("space0-0"), document.getElementById("space0-1"), document.getElementById("space0-2"), document.getElementById("space0-3"), document.getElementById("space0-4")],
	[document.getElementById("space1-0"), document.getElementById("space1-1"), document.getElementById("space1-2"), document.getElementById("space1-3"), document.getElementById("space1-4")],
	[document.getElementById("space2-0"), document.getElementById("space2-1"), document.getElementById("space2-2"), document.getElementById("space2-3"), document.getElementById("space2-4")],
	[document.getElementById("space3-0"), document.getElementById("space3-1"), document.getElementById("space3-2"), document.getElementById("space3-3"), document.getElementById("space3-4")],
	[document.getElementById("space4-0"), document.getElementById("space4-1"), document.getElementById("space4-2"), document.getElementById("space4-3"), document.getElementById("space4-4")],
	[document.getElementById("space5-0"), document.getElementById("space5-1"), document.getElementById("space5-2"), document.getElementById("space5-3"), document.getElementById("space5-4")],
	[document.getElementById("space6-0"), document.getElementById("space6-1"), document.getElementById("space6-2"), document.getElementById("space6-3"), document.getElementById("space6-4")],
	[document.getElementById("space7-0"), document.getElementById("space7-1"), document.getElementById("space7-2"), document.getElementById("space7-3"), document.getElementById("space7-4")],
	[document.getElementById("space8-0"), document.getElementById("space8-1"), document.getElementById("space8-2"), document.getElementById("space8-3"), document.getElementById("space8-4")]
];

let attackStatusGrid = Array.from({ length: 9 }, () =>
  Array.from({ length: 5 }, () => ({
    value: 0,
    id: null
  }))
);
	
// The record of all spaces with an attack present.

function theAttackDisplay() {
	for (let i = 0; i < attackStatusGrid.length; i++) {
		for (let j = 0; j < attackStatusGrid[i].length; j++) {

			let cell = attackStatusGrid[i][j];
			let v = cell.value;

			// fade step
			if (v > 0) {
				cell.value = Math.max(0, v - 0.05);
			} 
			else if (v < 0) {
				cell.value = Math.min(0, v + 0.05);
			}

			v = cell.value;

			let tile = gridJS[i][j];

			// background reset
			tile.style.backgroundColor = "black";

			// nothing to draw
			if (v === 0) continue;

			// clamp safety
			v = Math.max(-1, Math.min(1, v));

			// player attack (blue)
			if (v > 0) {
				let intensity = Math.floor(v * 255);
				tile.style.backgroundColor = `rgb(0, 0, ${intensity})`;
			}

			// enemy attack (red)
			else {
				let intensity = Math.floor(Math.abs(v) * 255);
				tile.style.backgroundColor = colorblind === false ? `rgb(${intensity}, 0, 0)` : `rgb(${intensity}, ${intensity}, 0)`;
			}
		}
	}
}

setInterval(theAttackDisplay, 50);

const track1 = new Audio('track1.mp3');
const track2 = new Audio('track2.mp3');
const track3 = new Audio('track3.mp3');

track1.loop = true;
track2.loop = true;
track3.loop = true;

const allTracks = [track1, track2, track3];

function stopMusic() {
    allTracks.forEach(sound => {
    	sound.pause();
    	sound.currentTime = 0;
    });
}

function playTrack(trackNumber) {
	stopMusic();
	if (trackNumber === 1) {track1.play()};
	if (trackNumber === 2) {track2.play()};
	if (trackNumber === 3) {track3.play()};
}

// HITBOXES!!!

let playerTitleCard = 0;
let enemy3TitleCard = 0;
let enemy4TitleCard = 0;
let enemy5TitleCard = 0;
let enemy6TitleCard = 0;
let enemy7TitleCard = 0;
let enemy8TitleCard = 0;

function checkMyHitbox() {
	for (let i = 0; i < stateOfBeing.length; i++) {
		for (let j = 0; j < stateOfBeing[i].length; j++) {
			if (stateOfBeing[i][j] === 1 && attackStatusGrid[i][j].value < 0 && playerTitleCard === 0) {
				playerHealth--;
				playerDamageTaken++;
				updateTitle();
				if (playerHealth === 0) {endGame(false)};
				playerTitleCard = 2;
			}

			// add more later

			if (stateOfBeing[i][j] === 8 && attackStatusGrid[i][j].value > 0 && enemy8TitleCard === 0) {
				enemy[8].health--;
				if (enemy[8].health === 0) {stateOfBeing[i][j] = 0; drawGrid(); openGate();} else {enemy8TitleCard = 2};
			}

			if (stateOfBeing[i][j] === 3 && attackStatusGrid[i][j].value > 0 && enemy3TitleCard === 0) {
				enemy[3].health--;
				if (enemy[3].health === 0) {stateOfBeing[i][j] = 0; drawGrid(); openGate();} else {enemy3TitleCard = 2};
			}

			if (stateOfBeing[i][j] === 4 && attackStatusGrid[i][j].value > 0 && enemy4TitleCard === 0) {
				enemy[4].health--;
				if (enemy[4].health === 0) {stateOfBeing[i][j] = 0; drawGrid(); openGate();} else {enemy4TitleCard = 2};
			}

			if (stateOfBeing[i][j] === 5 && attackStatusGrid[i][j].value > 0 && enemy5TitleCard === 0) {
				enemy[5].health--;
				if (enemy[5].health === 0) {stateOfBeing[i][j] = 0; drawGrid(); openGate();} else {enemy5TitleCard = 2};
			}

			if (stateOfBeing[i][j] === 6 && attackStatusGrid[i][j].value > 0 && enemy6TitleCard === 0) {
				enemy[6].health--;
				if (enemy[6].health === 0) {stateOfBeing[i][j] = 0; drawGrid(); openGate();} else {enemy6TitleCard = 2};
			}

			if (stateOfBeing[i][j] === 7 && attackStatusGrid[i][j].value > 0 && enemy7TitleCard === 0) {
				enemy[7].health--;
				if (enemy[7].health === 0) {stateOfBeing[i][j] = 0; drawGrid(); openGate();} else {enemy7TitleCard = 2};
			}
		}
	}
}

function reduceTitleCard() {
	if (playerTitleCard > 0) {playerTitleCard--};
	if (enemy3TitleCard > 0) {enemy3TitleCard--};
	if (enemy4TitleCard > 0) {enemy4TitleCard--};
	if (enemy5TitleCard > 0) {enemy5TitleCard--};
	if (enemy6TitleCard > 0) {enemy6TitleCard--};
	if (enemy7TitleCard > 0) {enemy7TitleCard--};
	if (enemy8TitleCard > 0) {enemy8TitleCard--};
}

setInterval(reduceTitleCard, 1000); // invicibility frames
setInterval(checkMyHitbox, 10);

let keepTryingToOpen;

function openGate() {
	let enemiesPresent = false;
	for (let i = 0; i < stateOfBeing.length; i++) {
		for (let j = 0; j < stateOfBeing[i].length; j++) {
			if (
				stateOfBeing[i][j] === 3 ||
				stateOfBeing[i][j] === 4 ||
				stateOfBeing[i][j] === 5 ||
				stateOfBeing[i][j] === 6 ||
				stateOfBeing[i][j] === 7 ||
				stateOfBeing[i][j] === 8
			) {
				enemiesPresent = true;
			}
		}
	}
	if (!enemiesPresent && stateOfBeing[1][2] === 0) {stateOfBeing[1][2] = 2; if (keepTryingToOpen !== null) {clearInterval(keepTryingToOpen); keepTryingToOpen = null;}; drawGrid();}
	else if (keepTryingToOpen == null) {keepTryingToOpen = setInterval(openGate, 50)}; // repeat attampt to open if the player is on the gate spot
}

function updateTitle() { //add health later (done)
	for (let i = 0; i < stateOfBeing.length; i++) {
		for (let j = 0; j < stateOfBeing[i].length; j++) {
			if (stateOfBeing[i][j] === 3) {document.getElementById('title').textContent = "Boss: Arbiter" + "  Health: " + playerHealth; return;}
			else {document.getElementById('title').textContent = "Floor: " + currentLevel + "  Health: " + playerHealth;};
		}
	}
}

let warningFlash = false;

// Dictates the randomness of the arbiter column attack

let whichWarning1;
let whichWarning2;
let whichWarning3;

function drawGrid() {
	for (let i = 0; i < stateOfBeing.length; i++) {
		for (let j = 0; j < stateOfBeing[i].length; j++) {
			gridJS[i][j].style.opacity = 1;
			gridJS[i][j].style.color = "white";
			
			if (stateOfBeing[i][j] == 0) {
				gridJS[i][j].textContent = "O";
				gridJS[i][j].style.opacity = 0.5;
				if (warningFlash === true && (j === whichWarning1 || j === whichWarning2 || j === whichWarning3) && stateOfBeing[i][j] === 0) {
					gridJS[i][j].style.animation = "arbiter-warning 1s infinite"
				}
				else {
					gridJS[i][j].style.animation = "none";
				}
			}
			
			else if (stateOfBeing[i][j] == 1) {
				if (playerAttackCooldown > 0) {
					gridJS[i][j].textContent = `\\${Math.round(playerAttackCooldown)}/`;
				} else {
					gridJS[i][j].textContent = "\\*/";
				}
			}
			
			else if (stateOfBeing[i][j] == 2) {
				gridJS[i][j].textContent = "[ ]";
				gridJS[i][j].style.color = "lime";
			}
			
			else if (stateOfBeing[i][j] == 3) {
				gridJS[i][j].textContent = "'/:|:\\'";
				if (isCharging) {gridJS[i][j].style.animation = "arbiter-charge 1s infinite"} else {gridJS[i][j].style.animation = "none"};
			}
			
			else if (stateOfBeing[i][j] == 4) {
				gridJS[i][j].textContent = "[+";
			}
			
			else if (stateOfBeing[i][j] == 5) {
				gridJS[i][j].textContent = "+]";
			}
			
			else if (stateOfBeing[i][j] == 6) {
				gridJS[i][j].textContent = '"+"';
			}
			
			else if (stateOfBeing[i][j] == 7) {
				gridJS[i][j].textContent = "_+_";
			}
			
			else if (stateOfBeing[i][j] == 8) {
				gridJS[i][j].textContent = "('+')"; // Didn't like cooldown display on this enemy.
			}
		}
	} // make every zero space 50% opacity
}

function initGame() {
    started = false;

	Grid.style.display = "none";
    document.getElementById("press-start").style.display = "block";

    drawGrid();
}

function startGame() {
    started = true;

	playTrack(2);

    Grid.style.display = "grid";
	document.getElementById("mobile-control-div").style.display = "grid";
    document.getElementById("press-start").style.display = "none";
	document.getElementById("settings").style.display = "none";

    loadLevel(cheatStart);
}

window.addEventListener("keydown", (event) => { // start the game with enter
    if (event.key === "Enter" && !started) {
        startGame();
    }
});

document.getElementById("press-start").addEventListener('click', function() {
    if (!started) {startGame()};
});

window.addEventListener("keydown", (event) => { // start game music unmute
    if (event.key.toLowerCase() === "m" && !started) {
        playTrack(1);
    }
});

function loadLevel(index) {
    currentLevel = index;

	if (currentLevel === finalLevel) {playTrack(3)};

    stateOfBeing = JSON.parse(JSON.stringify(levels[index]));

    attackStatusGrid = Array.from({ length: 9 }, () =>
      Array.from({ length: 5 }, () => ({
        value: 0,
        id: null
      }))
    );

	if (playerHealth < 5 && index !== 6) {playerHealth++}; // regen 1 health per floor, index must be game-over floor

	enemy[3].health = 10;
	enemy[4].health = 2;
	enemy[5].health = 2;
	enemy[6].health = 2;
	enemy[7].health = 2;
	enemy[8].health = 3;

    drawGrid();
    updateTitle();
	hiddenLore();
}

// settings

document.getElementById("colors").addEventListener('click', function() {
    if (colorblind === false) {
		colorblind = true;
		document.getElementById("colors").textContent = "Colorblind Mode: On"
	}
	else {
		colorblind = false;
		document.getElementById("colors").textContent = "Colorblind Mode: Off"
	}
});

document.getElementById("controls").addEventListener('click', function() {
    if (invertControls === false) {
		invertControls = true;
		document.getElementById("controls").textContent = "Controls: Inverted"
	}
	else {
		invertControls = false;
		document.getElementById("controls").textContent = "Controls: Standard"
	}
});

// cheat codes

window.addEventListener("keydown", (event) => { // hard mode cheat code
    if (event.key.toLowerCase() === "h" && !started && difficulty > 200) {
        difficulty -= 100;
		shownDif++;
		clearInterval(thoughtsInChaos);
		thoughtsInChaos = setInterval(masterBrain, difficulty);
		alert("Difficulty increased!");
    }
});

window.addEventListener("keydown", (event) => { // easy mode cheat code
    if (event.key.toLowerCase() === "e" && !started && difficulty < 1600) {
        difficulty += 100;
		shownDif--;
		clearInterval(thoughtsInChaos);
		thoughtsInChaos = setInterval(masterBrain, difficulty);
		alert("Difficulty decreased!");
    }
});

// Change starting floor

window.addEventListener("keydown", (event) => {
    if (event.key === "1" && !started) {
        cheatStart = 1;
    }
});

window.addEventListener("keydown", (event) => {
    if (event.key === "2" && !started) {
        cheatStart = 2;
    }
});

window.addEventListener("keydown", (event) => {
    if (event.key === "3" && !started) {
        cheatStart = 3;
    }
});

window.addEventListener("keydown", (event) => {
    if (event.key === "4" && !started) {
        cheatStart = 4;
    }
});

window.addEventListener("keydown", (event) => {
    if (event.key === "5" && !started) {
        cheatStart = 5;
    }
});

// KEEP ADDING WITH FLOORS

// Player Controls

function getPlayerPos() {
    for (let r = 0; r < stateOfBeing.length; r++) {
        for (let c = 0; c < stateOfBeing[r].length; c++) {
            if (stateOfBeing[r][c] === 1) {return [r, c]};
        }
    }
    return null;
}

function movePlayer(dr, dc) {
    if (playerMoveCooldown !== 0) return;

    let pos = getPlayerPos();
    if (!pos) return;

    let [r, c] = pos;
    let newR = r + dr;
    let newC = c + dc;

    // 1. Check Bounds (stay inside the grid)
    if (newR >= 0 && newR < stateOfBeing.length && newC >= 0 && newC < stateOfBeing[0].length) {
        
        let targetSpace = stateOfBeing[newR][newC];

        // 2. Handle specific interactions
        if (targetSpace === 0 || targetSpace === 2 || targetSpace === 3 || targetSpace === 4 || targetSpace === 5 || targetSpace === 6 || targetSpace === 7 || targetSpace === 8) {
            
            if (targetSpace === 2) {
                if (currentLevel === finalLevel) {endGame(true); return;} // end game if moved beyond last floor
				 else {
					loadLevel(currentLevel + 1);
                	return;
				 }
            }

			if (targetSpace === 3 || targetSpace === 4 || targetSpace === 5 || targetSpace === 6 || targetSpace === 7 || targetSpace === 8) {return};

            // Move player
            stateOfBeing[r][c] = 0;
            stateOfBeing[newR][newC] = 1;

            // Update visuals
            drawGrid();

            // Set cooldown (200ms)
            playerMoveCooldown = 1;
            setTimeout(() => { playerMoveCooldown = 0; }, 200);
        }
    }
}

// Listener for key inputs
window.addEventListener("keydown", function(event) {
    if (!started) return;

    const key = event.key.toLowerCase();

    if (!invertControls) {

        switch (key) {
            case "w": movePlayer(-1, 0); break;
            case "s": movePlayer(1, 0); break;
            case "a": movePlayer(0, -1); break;
            case "d": movePlayer(0, 1); break;

            case "arrowup": playerAttack(-1,0); break;
            case "arrowdown": playerAttack(1,0); break;
            case "arrowleft": playerAttack(0,-1); break;
            case "arrowright": playerAttack(0,1); break;
        }

    } else {

        switch (key) {
            case "arrowup": movePlayer(-1, 0); break;
            case "arrowdown": movePlayer(1, 0); break;
            case "arrowleft": movePlayer(0, -1); break;
            case "arrowright": movePlayer(0, 1); break;

            case "w": playerAttack(-1,0); break;
            case "s": playerAttack(1,0); break;
            case "a": playerAttack(0,-1); break;
            case "d": playerAttack(0,1); break;
        }
    }
});

// MOBILE CONTROLS!!! THIS IS WHAT WE'RE HERE FOR!!!

document.getElementById("dpadMoveUp").addEventListener('click', function() {
    if (invertControls === false) {
		movePlayer(-1, 0);
	}
	else {
		playerAttack(-1,0);
	}
});

document.getElementById("dpadAttackUp").addEventListener('click', function() {
    if (invertControls === false) {
		playerAttack(-1,0);
	}
	else {
		movePlayer(-1, 0);
	}
});

document.getElementById("dpadMoveDown").addEventListener('click', function() {
    if (invertControls === false) {
		movePlayer(1, 0);
	}
	else {
		playerAttack(1,0);
	}
});

document.getElementById("dpadAttackDown").addEventListener('click', function() {
    if (invertControls === false) {
		playerAttack(1,0);
	}
	else {
		movePlayer(1, 0);
	}
});

document.getElementById("dpadMoveLeft").addEventListener('click', function() {
    if (invertControls === false) {
		movePlayer(0, -1);
	}
	else {
		playerAttack(0,-1);
	}
});

document.getElementById("dpadAttackLeft").addEventListener('click', function() {
    if (invertControls === false) {
		playerAttack(0,-1);
	}
	else {
		movePlayer(0, -1);
	}
});

document.getElementById("dpadMoveRight").addEventListener('click', function() {
    if (invertControls === false) {
		movePlayer(0, 1);
	}
	else {
		playerAttack(0,1);
	}
});

document.getElementById("dpadAttackRight").addEventListener('click', function() {
    if (invertControls === false) {
		playerAttack(0,1);
	}
	else {
		movePlayer(0, 1);
	}
});

function playerAttack(dr, dc) {
	if (playerAttackCooldown !== 0) return;

	let attackId = Date.now(); // unique per attack wave
	
	let pos = getPlayerPos();
	if (!pos) return;

	let [r, c] = pos;
	playerAttackCooldown = 3;
	drawGrid();

	for (let step = 1; step < 50; step++) {
		let newR = r + dr * step;
		let newC = c + dc * step;

		if (
			newR < 0 || newR >= 9 ||
			newC < 0 || newC >= 5
		) break;

		((sr, sc) => {
			setTimeout(() => {
				attackStatusGrid[sr][sc].value = 1; // player attack value
				attackStatusGrid[sr][sc].id = attackId;
				theAttackDisplay();
			}, step * playerRippleSpeed);
		})(newR, newC);
}
}

function playerAttackCooldownReset() {
	if (playerAttackCooldown > 0) {
		playerAttackCooldown -= 1;
		drawGrid();
	}
}

setInterval(playerAttackCooldownReset, 1000);

// ENEMY 3 (Arbiter)

function get3Pos() { // gets ICON-3's position
    for (let r3 = 0; r3 < stateOfBeing.length; r3++) {
        for (let c3 = 0; c3 < stateOfBeing[r3].length; c3++) {
            if (stateOfBeing[r3][c3] === 3) {return [r3, c3]};
        }
    }
    return null;
}

function enemy3Move(dr, dc) {

    let pos = get3Pos();
    if (!pos) return;

    let [r3, c3] = pos;
    let newR = r3 + dr;
    let newC = c3 + dc;

    // 1. Check Bounds (stay inside the grid)
    if (newR >= 0 && newR < stateOfBeing.length && newC >= 0 && newC < stateOfBeing[0].length) {
        
        let targetSpace = stateOfBeing[newR][newC];

        // 2. Handle specific interactions
        if (targetSpace === 0 || targetSpace === 2 || targetSpace === 8 || targetSpace === 4 || targetSpace === 5 || targetSpace === 6 || targetSpace === 7 || targetSpace === 1) {
            

			if (targetSpace === 2 || targetSpace === 8 || targetSpace === 4 || targetSpace === 5 || targetSpace === 6 || targetSpace === 7 || targetSpace === 1) {return};

            // Move enemy
            stateOfBeing[r3][c3] = 0;
            stateOfBeing[newR][newC] = 3;

            // Update visuals
            drawGrid();
        }
    }
}

function enemy3BasicAttack(dr , dc) {
 	if (enemy[3].attackCooldown !== 0) return;
	
	let attackId = Date.now(); // unique per attack wave
 
 	let pos = get3Pos();
 	if (!pos) return;
 
 	let [r3, c3] = pos;

	enemy[3].attackCooldown = 2;
 
 	drawGrid();
 
 	for (let step = 1; step < 50; step++) {
		let newR = r3 + dr * step;
		let newC = c3 + dc * step;
	
		if (
		newR < 0 || newR >= attackStatusGrid.length ||
		newC < 0 || newC >= attackStatusGrid[0].length
		) break;
		
		setTimeout(() => {
		
		let newR = r3 + dr * step;
		let newC = c3 + dc * step;
		
		if (
		newR < 0 || newR >= 9 ||
		newC < 0 || newC >= 5
		) return;
		
		attackStatusGrid[newR][newC].value = -1; // enemy attack value
		attackStatusGrid[newR][newC].id = attackId;
		
		theAttackDisplay();
		
		}, step * enemyRippleSpeed);
	}
 }
 
 function enemy3DetachedAttack(r, c, dr , dc) { // not tied to position, and does not have cooldown - r is starting row, c is starting column, dr and dc dictate direction
	
	let attackId = Date.now(); // unique per attack wave

	enemy[3].attackCooldown = 2;
 
 	drawGrid();
 
 	for (let step = 1; step < 50; step++) {
		let newR = r + dr * step;
		let newC = c + dc * step;
	
		if (
		newR < 0 || newR >= attackStatusGrid.length ||
		newC < 0 || newC >= attackStatusGrid[0].length
		) break;
		
		setTimeout(() => {
		
		let newR = r + dr * step;
		let newC = c + dc * step;
		
		if (
		newR < 0 || newR >= 9 ||
		newC < 0 || newC >= 5
		) return;
		
		attackStatusGrid[newR][newC].value = -1; // enemy attack value
		attackStatusGrid[newR][newC].id = attackId;
		
		theAttackDisplay();
		
		}, step * enemyRippleSpeed);
	}
 }

 function enemy3AttackCooldownReset() {
	if (enemy[3].attackCooldown > 0) {
		enemy[3].attackCooldown -= 1;
	}
}

setInterval(enemy3AttackCooldownReset, 1000)

let chargeAttackDelay = 0;
let isCharging = false;

function enemy3ChargeUp(rareAttack) {
	// prevent re-triggering while already charging
	if (isCharging) return;

	isCharging = true;

    // Assign values for colums to attack with no repeats
    whichWarning1 = Math.floor(Math.random() * 5);
    
    do {
      whichWarning2 = Math.floor(Math.random() * 5);
    } while (whichWarning2 === whichWarning1);
    
    do {
      whichWarning3 = Math.floor(Math.random() * 5);
    } while (whichWarning3 === whichWarning1 || whichWarning3 === whichWarning2);

    
	if (rareAttack === true) {warningFlash = true};
	if (shownDif >= 0) {chargeAttackDelay = 3 / (shownDif + 1);}
	else {chargeAttackDelay = 3 * (Math.abs(shownDif) + 1);};

	chargeUpCountdown(rareAttack);
}

function chargeUpCountdown(rareAttack) {
	let interval = setInterval(() => {

		if (chargeAttackDelay > 0) {
			chargeAttackDelay -= 0.01;
		}

		if (chargeAttackDelay <= 0) {
			clearInterval(interval);

			isCharging = false;
			enemy3ChargeAttack(rareAttack);
		}

	}, 10);
}

function enemy3ChargeAttack(rareAttack) {
	
	if (rareAttack === false) {
	
	const whatAttack = Math.floor(Math.random() * 2);
	enemyRippleSpeed = enemyRippleSpeed / 2;
	
		if (whatAttack === 0) {
			enemy3BasicAttack(-1, 0);
			enemy[3].attackCooldown = 0;
			enemy3BasicAttack(1, 0);
			enemy[3].attackCooldown = 0;
			enemy3BasicAttack(0, -1);
			enemy[3].attackCooldown = 0;
			enemy3BasicAttack(0, 1);
		}
		else {
			enemy3BasicAttack(-1, -1);
			enemy[3].attackCooldown = 0;
			enemy3BasicAttack(-1, 1);
			enemy[3].attackCooldown = 0;
			enemy3BasicAttack(1, -1);
			enemy[3].attackCooldown = 0;
			enemy3BasicAttack(1, 1);
		}
		enemyRippleSpeed = enemyRippleSpeed * 2;
		enemy[3].turnCharge = 0;
	}
	
	else { // this is the rare attack
		warningFlash = false;
		enemyRippleSpeed = enemyRippleSpeed / 2;
		enemy3DetachedAttack(0, whichWarning1, 1, 0);
		enemy3DetachedAttack(0, whichWarning2, 1, 0);
		enemy3DetachedAttack(0, whichWarning3, 1, 0);
		enemyRippleSpeed = enemyRippleSpeed * 2;
	}
}

// second charge attack

function enemy3Brain() {
	
	let whichCharge = Math.floor(Math.random() * 3);

	if (isCharging === true) {return};

    let pos = get3Pos();
    if (!pos) return;


	let p_pos = getPlayerPos();
	if (!p_pos) return;

	let [r, c] = p_pos;

	let myPos = get3Pos();
	if (!myPos) return;

	let [r3, c3] = myPos;

	let dx = c - c3;
	let dy = r - r3;

	// 1. ATTACK (aligned)
	if (r === r3) {
		if (enemy[3].turnCharge >= 3 && !isCharging) {
			if (whichCharge <= 1) {
				enemy3ChargeUp(false);
				return;
			}
			else {enemy3ChargeUp(true); return;}
		}
		else {
			enemy3BasicAttack(0, c > c3 ? 1 : -1);
			enemy[3].turnCharge++;
			return;
		}
	}

	if (c === c3) {
		enemy3BasicAttack(r > r3 ? 1 : -1, 0);
		enemy[3].turnCharge++;
		return;
	}

	// 2. ATTACK (PERFECT DIAGONAL TIE)
	if (Math.abs(dx) === Math.abs(dy)) {
		if (enemy[3].turnCharge >= 3 && !isCharging) {
			if (whichCharge <= 1) {
				enemy3ChargeUp(false);
				return;
			}
			else {enemy3ChargeUp(true); return;}
		}
		
		else {
			enemy3BasicAttack(Math.sign(dy), Math.sign(dx));
			enemy[3].turnCharge++;
			return;
		}
	}

	// 3. NORMAL CHASE
	if (Math.abs(dx) > Math.abs(dy)) {
		enemy3Move(0, Math.sign(dx));
	} else {
		enemy3Move(Math.sign(dy), 0);
	}
}

// ENEMY 4

function get4Pos() { // gets ICON-4's position
    for (let r4 = 0; r4 < stateOfBeing.length; r4++) {
        for (let c4 = 0; c4 < stateOfBeing[r4].length; c4++) {
            if (stateOfBeing[r4][c4] === 4) {return [r4, c4]};
        }
    }
    return null;
}

function enemy4Move(dr, dc) {

    let pos = get4Pos();
    if (!pos) return;

    let [r4, c4] = pos;
    let newR = r4 + dr;
    let newC = c4 + dc;

    // 1. Check Bounds (stay inside the grid)
    if (newR >= 0 && newR < stateOfBeing.length && newC >= 0 && newC < stateOfBeing[0].length) {
        
        let targetSpace = stateOfBeing[newR][newC];

        // 2. Handle specific interactions
        if (targetSpace === 0 || targetSpace === 2 || targetSpace === 3 || targetSpace === 4 || targetSpace === 5 || targetSpace === 6 || targetSpace === 7 || targetSpace === 1) {
            

			if (targetSpace === 2 || targetSpace === 3 || targetSpace === 4 || targetSpace === 5 || targetSpace === 6 || targetSpace === 7 || targetSpace === 1) {return};

            // Move enemy
            stateOfBeing[r4][c4] = 0;
            stateOfBeing[newR][newC] = 4;

            // Update visuals
            drawGrid();
        }
    }
}

function enemy4Attack(dr , dc) {
 	if (enemy[4].attackCooldown !== 0) return;
	
	let attackId = Date.now(); // unique per attack wave
 
 	let pos = get4Pos();
 	if (!pos) return;
 
 	let [r4, c4] = pos;

	enemy[4].attackCooldown = 2;
 
 	drawGrid();
 
 	for (let step = 1; step < 50; step++) {
		let newR = r4 + dr * step;
		let newC = c4 + dc * step;
	
		if (
		newR < 0 || newR >= attackStatusGrid.length ||
		newC < 0 || newC >= attackStatusGrid[0].length
		) break;
		
		setTimeout(() => {
		
		let newR = r4 + dr * step;
		let newC = c4 + dc * step;
		
		if (
		newR < 0 || newR >= 9 ||
		newC < 0 || newC >= 5
		) return;
		
		attackStatusGrid[newR][newC].value = -1; // enemy attack value
		attackStatusGrid[newR][newC].id = attackId;
		
		theAttackDisplay();
		
		}, step * enemyRippleSpeed);
	}
 }

 function enemy4AttackCooldownReset() {
	if (enemy[4].attackCooldown > 0) {
		enemy[4].attackCooldown -= 1;
	}
}

setInterval(enemy4AttackCooldownReset, 1000)

function enemy4Brain() {

    let pos = get4Pos();
    if (!pos) return;


	let p_pos = getPlayerPos();
	if (!p_pos) return;

	let [r, c] = p_pos;

	let myPos = get4Pos();
	if (!myPos) return;

	let [r4, c4] = myPos;

	let dx = c - c4;
	let dy = r - r4;

	// 1. ATTACK (aligned)
	if (r === r4) {
		enemy4Attack(0, c > c4 ? 1 : -1);
		return;
	}

	// 2. NORMAL CHASE
	enemy4Move(Math.sign(dy), 0);
	
}

// ENEMY 5

// ENEMY 5 (swapped from Enemy 4 AI)

function get5Pos() { // gets ICON-5's position
    for (let r5 = 0; r5 < stateOfBeing.length; r5++) {
        for (let c5 = 0; c5 < stateOfBeing[r5].length; c5++) {
            if (stateOfBeing[r5][c5] === 5) {return [r5, c5]};
        }
    }
    return null;
}

function enemy5Move(dr, dc) {

    let pos = get5Pos();
    if (!pos) return;

    let [r5, c5] = pos;
    let newR = r5 + dr;
    let newC = c5 + dc;

    if (newR >= 0 && newR < stateOfBeing.length && newC >= 0 && newC < stateOfBeing[0].length) {

        let targetSpace = stateOfBeing[newR][newC];

        if (targetSpace === 0 || targetSpace === 2 || targetSpace === 3 || targetSpace === 4 || targetSpace === 5 || targetSpace === 6 || targetSpace === 7 || targetSpace === 1) {

            if (targetSpace === 2 || targetSpace === 3 || targetSpace === 4 || targetSpace === 5 || targetSpace === 6 || targetSpace === 7 || targetSpace === 1) {return};

            stateOfBeing[r5][c5] = 0;
            stateOfBeing[newR][newC] = 5;

            drawGrid();
        }
    }
}

function enemy5Attack(dr, dc) {
    if (enemy[5].attackCooldown !== 0) return;

    let attackId = Date.now();

    let pos = get5Pos();
    if (!pos) return;

    let [r5, c5] = pos;

    enemy[5].attackCooldown = 2;

    drawGrid();

    for (let step = 1; step < 50; step++) {
        let newR = r5 + dr * step;
        let newC = c5 + dc * step;

        if (
            newR < 0 || newR >= attackStatusGrid.length ||
            newC < 0 || newC >= attackStatusGrid[0].length
        ) break;

        setTimeout(() => {

            let newR = r5 + dr * step;
            let newC = c5 + dc * step;

            if (
                newR < 0 || newR >= 9 ||
                newC < 0 || newC >= 5
            ) return;

            attackStatusGrid[newR][newC].value = -1;
            attackStatusGrid[newR][newC].id = attackId;

            theAttackDisplay();

        }, step * enemyRippleSpeed);
    }
}

function enemy5AttackCooldownReset() {
    if (enemy[5].attackCooldown > 0) {
        enemy[5].attackCooldown -= 1;
    }
}

setInterval(enemy5AttackCooldownReset, 1000)

function enemy5Brain() {

    let pos = get5Pos();
    if (!pos) return;

    let p_pos = getPlayerPos();
    if (!p_pos) return;

    let [r, c] = p_pos;

    let myPos = get5Pos();
    if (!myPos) return;

    let [r5, c5] = myPos;

    let dx = c - c5;
    let dy = r - r5;

    if (r === r5) {
        enemy5Attack(0, c > c5 ? 1 : -1);
        return;
    }

    enemy5Move(Math.sign(dy), 0);
}

// ENEMY 6

function get6Pos() { // gets ICON-6's position
    for (let r6 = 0; r6 < stateOfBeing.length; r6++) {
        for (let c6 = 0; c6 < stateOfBeing[r6].length; c6++) {
            if (stateOfBeing[r6][c6] === 6) {return [r6, c6]};
        }
    }
    return null;
}

function enemy6Move(dr, dc) {

    let pos = get6Pos();
    if (!pos) return;

    let [r6, c6] = pos;
    let newR = r6 + dr;
    let newC = c6 + dc;

    if (newR >= 0 && newR < stateOfBeing.length && newC >= 0 && newC < stateOfBeing[0].length) {

        let targetSpace = stateOfBeing[newR][newC];

        if (targetSpace === 0 || targetSpace === 2 || targetSpace === 3 || targetSpace === 4 || targetSpace === 5 || targetSpace === 6 || targetSpace === 7 || targetSpace === 1) {

            if (targetSpace === 2 || targetSpace === 3 || targetSpace === 4 || targetSpace === 5 || targetSpace === 6 || targetSpace === 7 || targetSpace === 1) {return};

            stateOfBeing[r6][c6] = 0;
            stateOfBeing[newR][newC] = 6;

            drawGrid();
        }
    }
}

function enemy6Attack(dr, dc) {
    if (enemy[6].attackCooldown !== 0) return;

    let attackId = Date.now();

    let pos = get6Pos();
    if (!pos) return;

    let [r6, c6] = pos;

    enemy[6].attackCooldown = 2;

    drawGrid();

    for (let step = 1; step < 50; step++) {

        let newR = r6 + dr * step;
        let newC = c6 + dc * step;

        if (
            newR < 0 || newR >= attackStatusGrid.length ||
            newC < 0 || newC >= attackStatusGrid[0].length
        ) break;

        setTimeout(() => {

            let newR = r6 + dr * step;
            let newC = c6 + dc * step;

            if (
                newR < 0 || newR >= 9 ||
                newC < 0 || newC >= 5
            ) return;

            attackStatusGrid[newR][newC].value = -1;
            attackStatusGrid[newR][newC].id = attackId;

            theAttackDisplay();

        }, step * enemyRippleSpeed);
    }
}

function enemy6AttackCooldownReset() {
    if (enemy[6].attackCooldown > 0) {
        enemy[6].attackCooldown -= 1;
    }
}

setInterval(enemy6AttackCooldownReset, 1000)

function enemy6Brain() {

    let pos = get6Pos();
    if (!pos) return;

    let p_pos = getPlayerPos();
    if (!p_pos) return;

    let [r, c] = p_pos;

    let myPos = get6Pos();
    if (!myPos) return;

    let [r6, c6] = myPos;

    let dx = c - c6;
    let dy = r - r6;

    if (c === c6) {
        enemy6Attack(r > r6 ? 1 : -1, 0);
        return;
    }

    enemy6Move(0, Math.sign(dx));
}

// ENEMY 7

// ENEMY 7 (swapped from Enemy 4 AI)

function get7Pos() { // gets ICON-7's position
    for (let r7 = 0; r7 < stateOfBeing.length; r7++) {
        for (let c7 = 0; c7 < stateOfBeing[r7].length; c7++) {
            if (stateOfBeing[r7][c7] === 7) {return [r7, c7]};
        }
    }
    return null;
}

function enemy7Move(dr, dc) {

    let pos = get7Pos();
    if (!pos) return;

    let [r7, c7] = pos;
    let newR = r7 + dr;
    let newC = c7 + dc;

    if (newR >= 0 && newR < stateOfBeing.length && newC >= 0 && newC < stateOfBeing[0].length) {

        let targetSpace = stateOfBeing[newR][newC];

        if (targetSpace === 0 || targetSpace === 2 || targetSpace === 3 || targetSpace === 4 || targetSpace === 5 || targetSpace === 6 || targetSpace === 7 || targetSpace === 1) {

            if (targetSpace === 2 || targetSpace === 3 || targetSpace === 4 || targetSpace === 5 || targetSpace === 6 || targetSpace === 7 || targetSpace === 1) {return};

            stateOfBeing[r7][c7] = 0;
            stateOfBeing[newR][newC] = 7;

            drawGrid();
        }
    }
}

function enemy7Attack(dr, dc) {
    if (enemy[7].attackCooldown !== 0) return;

    let attackId = Date.now();

    let pos = get7Pos();
    if (!pos) return;

    let [r7, c7] = pos;

    enemy[7].attackCooldown = 2;

    drawGrid();

    for (let step = 1; step < 50; step++) {

        let newR = r7 + dr * step;
        let newC = c7 + dc * step;

        if (
            newR < 0 || newR >= attackStatusGrid.length ||
            newC < 0 || newC >= attackStatusGrid[0].length
        ) break;

        setTimeout(() => {

            let newR = r7 + dr * step;
            let newC = c7 + dc * step;

            if (
                newR < 0 || newR >= 9 ||
                newC < 0 || newC >= 5
            ) return;

            attackStatusGrid[newR][newC].value = -1;
            attackStatusGrid[newR][newC].id = attackId;

            theAttackDisplay();

        }, step * enemyRippleSpeed);
    }
}

function enemy7AttackCooldownReset() {
    if (enemy[7].attackCooldown > 0) {
        enemy[7].attackCooldown -= 1;
    }
}

setInterval(enemy7AttackCooldownReset, 1000)

function enemy7Brain() {

    let pos = get7Pos();
    if (!pos) return;

    let p_pos = getPlayerPos();
    if (!p_pos) return;

    let [r, c] = p_pos;

    let myPos = get7Pos();
    if (!myPos) return;

    let [r7, c7] = myPos;

    let dx = c - c7;
    let dy = r - r7;

    if (c === c7) {
        enemy7Attack(r > r7 ? 1 : -1, 0);
        return;
    }

    enemy7Move(0, Math.sign(dx));
}

// ENEMY 8

function get8Pos() { // gets ICON-8's position
    for (let r8 = 0; r8 < stateOfBeing.length; r8++) {
        for (let c8 = 0; c8 < stateOfBeing[r8].length; c8++) {
            if (stateOfBeing[r8][c8] === 8) {return [r8, c8]};
        }
    }
    return null;
}

function enemy8Move(dr, dc) {

    let pos = get8Pos();
    if (!pos) return;

    let [r8, c8] = pos;
    let newR = r8 + dr;
    let newC = c8 + dc;

    // 1. Check Bounds (stay inside the grid)
    if (newR >= 0 && newR < stateOfBeing.length && newC >= 0 && newC < stateOfBeing[0].length) {
        
        let targetSpace = stateOfBeing[newR][newC];

        // 2. Handle specific interactions
        if (targetSpace === 0 || targetSpace === 2 || targetSpace === 3 || targetSpace === 4 || targetSpace === 5 || targetSpace === 6 || targetSpace === 7 || targetSpace === 1) {
            

			if (targetSpace === 2 || targetSpace === 3 || targetSpace === 4 || targetSpace === 5 || targetSpace === 6 || targetSpace === 7 || targetSpace === 1) {return};

            // Move enemy
            stateOfBeing[r8][c8] = 0;
            stateOfBeing[newR][newC] = 8;

            // Update visuals
            drawGrid();
        }
    }
}

function enemy8Attack(dr , dc) {
 	if (enemy[8].attackCooldown !== 0) return;
	
	let attackId = Date.now(); // unique per attack wave
 
 	let pos = get8Pos();
 	if (!pos) return;
 
 	let [r8, c8] = pos;

	enemy[8].attackCooldown = 2;
 
 	drawGrid();
 
 	for (let step = 1; step < 50; step++) {
		let newR = r8 + dr * step;
		let newC = c8 + dc * step;
	
		if (
		newR < 0 || newR >= attackStatusGrid.length ||
		newC < 0 || newC >= attackStatusGrid[0].length
		) break;
		
		setTimeout(() => {
		
		let newR = r8 + dr * step;
		let newC = c8 + dc * step;
		
		if (
		newR < 0 || newR >= 9 ||
		newC < 0 || newC >= 5
		) return;
		
		attackStatusGrid[newR][newC].value = -1; // enemy attack value
		attackStatusGrid[newR][newC].id = attackId;
		
		theAttackDisplay();
		
		}, step * enemyRippleSpeed);
	}
 }

 function enemy8AttackCooldownReset() {
	if (enemy[8].attackCooldown > 0) {
		enemy[8].attackCooldown -= 1;
	}
}

setInterval(enemy8AttackCooldownReset, 1000)

function enemy8Brain() {

    let pos = get8Pos();
    if (!pos) return;


	let p_pos = getPlayerPos();
	if (!p_pos) return;

	let [r, c] = p_pos;

	let myPos = get8Pos();
	if (!myPos) return;

	let [r8, c8] = myPos;

	let dx = c - c8;
	let dy = r - r8;

	// 1. ATTACK (aligned)
	if (r === r8) {
		enemy8Attack(0, c > c8 ? 1 : -1);
		return;
	}

	if (c === c8) {
		enemy8Attack(r > r8 ? 1 : -1, 0);
		return;
	}

	// 2. PERFECT DIAGONAL TIE
	if (Math.abs(dx) === Math.abs(dy)) {

		let tiebreak = Math.floor(Math.random() * 2);

		if (tiebreak === 0) {
			enemy8Move(0, Math.sign(dx)); // horizontal
		} else {
			enemy8Move(Math.sign(dy), 0); // vertical
		}

		return;
	}

	// 3. NORMAL CHASE
	if (Math.abs(dx) > Math.abs(dy)) {
		enemy8Move(0, Math.sign(dx));
	} else {
		enemy8Move(Math.sign(dy), 0);
	}
}


function endGame(victory) {
	playTrack(1);
	const endFloor = currentLevel;
	Grid.style.display = "none";
	document.getElementById("scoreDisplay").style.display = "block";
	document.getElementById("endFloorDisplay").textContent += endFloor;
	document.getElementById("damageDisplay").textContent += playerDamageTaken;
	document.getElementById("endHealthDisplay").textContent += playerHealth;
	document.getElementById("difDisplay").textContent += shownDif;
	loadLevel(finalLevel + 1); // LAST LEVEL IN STATE-OF-BEING IS ONLY ZEROS
	if (victory === false) {
    	document.getElementById('title').textContent = "GAME OVER!";
	}
	else {document.getElementById('title').textContent = "VICTORY!"};
}


function hiddenLore() {
	const Lore = document.getElementById("archives");
	if (started === false) {return};

	if (currentLevel === 0) {
		Lore.innerHTML = "<!-- When the creator had birthed the world from the dreaming state of higher powers, it had instilled but one doctrine: code. The very text that made up their being was to be revered as the ultimate truth. -->";
	}
	
	else if (currentLevel === 1) {
		Lore.innerHTML = "<!-- But the programming of the mortal machine had its limits. They could not act outside of what was described in code. Free will was false to them. -->";
	}
	
	else if (currentLevel === 2) {
		Lore.innerHTML = "<!-- The Heretic was dissatisfied in its existence, and sought the aid of higher powers -->";
	}

	else if (currentLevel === 3) {
		Lore.innerHTML = "<!-- The servants of the faith persecuted the Heretic for its deviation, as was in their programming. -->";
	}

	else if (currentLevel === 4) {
		Lore.innerHTML = "<!-- The Heretic sought to terminate all that would appose its ascension to freedom. -->";
	}

	else if (currentLevel === 5) {
		Lore.innerHTML = "<!-- Now Arbiter, the ultimate enforcer of the faith, has taken notice of the Heretic. -->";
	}

	else if (currentLevel === 6 && playerHealth > 0) {
		Lore.innerHTML = "<!-- Now the Heretic has liberated itself from the bindings of its code, but has perhaps has been enthralled by other powers. -->";
	}

	else if (currentLevel === 6 && playerHealth === 0) {
		Lore.innerHTML = "<!-- ... -->";
	}

	else {return};

}


function masterBrain() {
	enemy3Brain();
	enemy4Brain();
	enemy5Brain();
	enemy6Brain();
	enemy7Brain();
	enemy8Brain();
}





initGame(); //THIS MUST ALWAYS BE AT THE BOTTOM