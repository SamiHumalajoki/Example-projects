var game = document.getElementById("game");
var p = document.getElementById("p");
var n = 4;
var grid = [];
var blockSize = 100;
const pow2color = ["darkslategray", "snow","#e6ffe6","#99ff99","chartreuse","#66cc00","#4d9900","#008080","#5cd6d6", "#00a3cc", "#1a53ff", "#008ae6"];
game.style.backgroundColor = "#243d3d";
gameSetup();

function gameSetup() {
	for(let i=0;i<n;i++) {
		grid[i] = [];
		for (let j=0;j<n;j++) {
			let block = new Object;
			block.pow = 0;
			block.div = document.createElement("div");
			block.notDoubled = true;
			block.text = document.createTextNode("");
			block.div.appendChild(block.text);
			block.div.style.fontSize = blockSize/2+"px";
			block.div.style.width = blockSize;
			block.div.style.height = blockSize;
			block.div.style.position = "absolute";
			block.div.style.top = blockSize*i;
			block.div.style.left = blockSize*j;
			block.div.style.border = "thick solid #243d3d";
			block.div.style.borderRadius = blockSize/4 + "px";
			game.appendChild(block.div);
			grid[i][j] = block;
		}
	}
	addTwo();
	addTwo();
	gameUpdate();
}

function left() {
	let again;
	let moved=false;
	do {
		again=false;
		for(let i=0;i<n;i++) {
			for(let j=1;j<n;j++) {
				if(grid[i][j-1].pow==0) {
					grid[i][j-1].pow = grid[i][j].pow;
					grid[i][j-1].notDoubled = grid[i][j].notDoubled;
					if(grid[i][j].pow != 0) {
						grid[i][j].pow = 0;
						again = true;
						moved = true;
					}	
				}
				else if(grid[i][j-1].pow == grid[i][j].pow && grid[i][j].notDoubled && grid[i][j-1].notDoubled) {
					grid[i][j-1].pow++;
					grid[i][j-1].notDoubled = false;
					grid[i][j].pow = 0;
					grid[i][j].notDoubled = true;
					again = true;
					moved = true;
				}
			}
		}
	}
	while(again)
	if (moved) addTwo();
	gameUpdate();
}

function right() {
	let again;
	let moved=false;
	do {
		again=false;
		for(let i=0;i<n;i++) {
			for(let j=n-2;j>-1;j--) {
				if(grid[i][j+1].pow==0) {
					grid[i][j+1].pow = grid[i][j].pow;
					grid[i][j+1].notDoubled = grid[i][j].notDoubled;
					if(grid[i][j].pow != 0) {
						grid[i][j].pow = 0;
						again = true;
						moved = true;
					}	
				}
				else if(grid[i][j+1].pow == grid[i][j].pow && grid[i][j].notDoubled && grid[i][j+1].notDoubled) {
					grid[i][j+1].pow++;
					grid[i][j+1].notDoubled = false;
					grid[i][j].pow = 0;
					grid[i][j].notDoubled = true;
					again = true;
					moved = true;
				}
			}
		}
	}
	while(again)
	if (moved) addTwo();
	gameUpdate();
}

function up() {
	let again;
	let moved=false;
	do {
		again=false;
		for(let i=1;i<n;i++) {
			for(let j=0;j<n;j++) {
				if(grid[i-1][j].pow==0) {
					grid[i-1][j].pow = grid[i][j].pow;
					grid[i-1][j].notDoubled = grid[i][j].notDoubled;
					if(grid[i][j].pow != 0) {
						grid[i][j].pow = 0;
						again = true;
						moved = true;
					}	
				}
				else if(grid[i-1][j].pow == grid[i][j].pow && grid[i][j].notDoubled && grid[i-1][j].notDoubled) {
					grid[i-1][j].pow++;
					grid[i-1][j].notDoubled = false;
					grid[i][j].pow = 0;
					grid[i][j].notDoubled = true;
					again = true;
					moved = true;
				}
			}
		}
	}
	while(again)
	if (moved) addTwo();
	gameUpdate();
}

function down() {
	let again;
	let moved=false;
	do {
		again=false;
		for(let i=n-2;i>-1;i--) {
			for(let j=0;j<n;j++) {
				if(grid[i+1][j].pow==0) {
					grid[i+1][j].pow = grid[i][j].pow;
					grid[i+1][j].notDoubled = grid[i][j].notDoubled;
					if(grid[i][j].pow != 0) {
						grid[i][j].pow = 0;
						again = true;
						moved = true;
					}	
				}
				else if(grid[i+1][j].pow == grid[i][j].pow && grid[i][j].notDoubled && grid[i+1][j].notDoubled) {
					grid[i+1][j].pow++;
					grid[i+1][j].notDoubled = false;
					grid[i][j].pow = 0;
					grid[i][j].notDoubled = true;
					again = true;
					moved = true;
				}
			}
		}
	}
	while(again)
	if (moved) addTwo();
	gameUpdate();
}

function getKey(event) {
	p.innerHTML = event.key;
	if(event.key == "ArrowLeft") left();
	if(event.key == "ArrowRight") right();
	if(event.key == "ArrowUp") up();
	if(event.key == "ArrowDown") down();
}

function addTwo() {
	let blocks = [];
	for (let i=0;i<n;i++) {
		for(let j=0;j<n;j++) {
			let block = grid[i][j];
			if(block.pow == 0) blocks.push(block);
		}
	}
	let i = Math.floor(Math.random()*blocks.length);
	blocks[i].pow = 1;
}

function gameUpdate() {
	for(let i=0;i<n;i++) {
		for(let j=0;j<n;j++) {
			let block = grid[i][j];
			block.div.style.backgroundColor = pow2color[block.pow];
			block.div.removeChild(block.text);
			if (block.pow != 0) block.text = document.createTextNode(Math.pow(2,block.pow));
			else block.text = document.createTextNode("");
			block.div.appendChild(block.text);
			block.notDoubled = true;
		}
	}
}
