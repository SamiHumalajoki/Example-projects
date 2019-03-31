var t = setInterval(render,50);
var c=document.getElementById("canvas");
var ctx=c.getContext("2d");
var snake = [];
var bs = 10;
var vx = 0;
var vy = 1;
var fruitX = 0;
var fruitY = 0;
var score;
var xMax = 60;
var yMax = 60;
addFruit();
start();



function block(x,y) {
    this.x = x;
    this.y = y;
    this.xPrev = x;
    this.yPrev = y;
}

function start() {
    score = 0;
    snake = [new block(Math.floor(xMax/2),Math.floor(yMax/2))];
    document.getElementById("score").innerHTML = score;
}

function render() {
    ctx.clearRect(0,0,600,600);
    ctx.fillStyle = "red";
    ctx.fillRect(fruitX*bs, fruitY*bs, bs, bs);

    snake[0].xPrev = snake[0].x;
    snake[0].yPrev = snake[0].y;
    snake[0].x += vx;
    snake[0].y += vy;
    ctx.fillStyle = "blue";
    ctx.fillRect(snake[0].x*bs, snake[0].y*bs, bs, bs);

    for (var i=1;i<snake.length;i++) {
        snake[i].xPrev = snake[i].x;
        snake[i].yPrev = snake[i].y;
        snake[i].x = snake[i-1].xPrev;
        snake[i].y = snake[i-1].yPrev;
        ctx.fillStyle = "blue";
        ctx.fillRect(snake[i].x*bs, snake[i].y*bs, bs, bs);
    }

    for (var i=1;i<snake.length;i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            start();
        }
    }

    if (snake[0].x < 0 || snake[0].x > xMax-1 || snake[0].y < 0 || snake[0].y > yMax-1) {
        start();
    }
    
    if(snake[0].x == fruitX && snake[0].y == fruitY) {
        var lastBlock = snake[snake.length-1];
        snake.push(new block(lastBlock.xPrev, lastBlock.yPrev));
        addFruit();
        score++;
        document.getElementById("score").innerHTML = score;
    } 
}

function addFruit() {
    fruitX = Math.floor(Math.random()*60);
    fruitY = Math.floor(Math.random()*60);
}

function move(event) {
    var key = event.which;                
            switch(key) {
              case 37:
                  if(vx == 0) {
                    vx = -1;
                    vy = 0;
                  }
                  // Key left.
                  break;
              case 38:
                if(vy == 0) {
                    vy = -1;
                    vx = 0;
                }
                  // Key up.
                  break;
              case 39:
                if(vx == 0) {
                    vx = 1;
                    vy = 0;
                }
                  // Key right.
                  break;
              case 40:
                if(vy == 0) {
                    vy = 1;
                    vx = 0;
                }
                  // Key down.
                  break;
        }   
    
}