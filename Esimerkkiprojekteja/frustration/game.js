
var deck = [];
var deckCanvas = document.createElement("CANVAS");
deckCanvas.width = 5500;
deckCanvas.height = 540;
var deckContext = deckCanvas.getContext("2d");

var suits = ["clubs", "hearts", "diamonds", "spades"];
var ranks = ["2","3","4","5","6","7","8","9","10","jack","queen","king","ace"];
var board = document.getElementById("board");
var context = board.getContext("2d");
var imgData;
var cardWidth = 360;
var cardHeight = 540;
var scale = 1;
var xPosition = -5100;
var count = 1;
var failed = false;
var xMin = -5100;
var xMax = 0;
function setup(){
    
    setSizes();
    for(i=0;i<suits.length;i++) {
        for(j=0;j<ranks.length;j++) {
            var fileName = "kortit/English_pattern_"+ranks[j]+"_of_"+suits[i]+".svg";
            var img = new Image(cardWidth, cardHeight);
            img.src = fileName;
            deck.push({rank:ranks[j], suit:suits[i], image:img});
        }
    }
    draw();
}

function resetCanvas() {
    context.fillStyle = '#fff';
    context.fillRect(0,0, board.width, board.height);
  }

function setSizes() {
    var windowHeight = window.innerHeight;
    var windowWidth = window.innerWidth;
    cardHeight = windowHeight / 2;
    cardWidth = cardHeight / 1.5;
    
    
}

function draw() {
    resetCanvas();
    document.getElementById("score").innerHTML = "";
    shuffle();
    context.setTransform(scale,0,0,scale,0,0);
    for(i=0;i<deck.length;i++) {
        deckContext.drawImage(deck[i].image, 100*i, 0);
    }
    imgData = deckContext.getImageData(0, 0, deckCanvas.width, deckCanvas.height);
    xPosition = -5100;
    context.putImageData(imgData,xPosition ,0);
}

function shuffle() {
    for(var i=deck.length-1;i>0;i--) {
        var j = Math.floor((Math.random() * i) + 1);
        var temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

function gameUpdate() {
    if(xPosition < xMin) xPosition = xMin;
    if(xPosition > xMax) xPosition = xMax;
    count = Math.floor(xPosition/100)+52;
        document.getElementById("p2").innerHTML = xPosition;
        //document.getElementById("p3").innerHTML = clientX;
        document.getElementById("count").innerHTML = "count:" + count;
        document.getElementById("card").innerHTML = "rank:" + deck[52-count].rank;
        resetCanvas();
        context.putImageData(imgData,xPosition ,0);
	if(count == 52) {
            document.getElementById("score").innerHTML = "SUCCES";
	    document.getElementById("score").style.color = "green";
        }
        else if(deck[52-count].rank===deck[52-count-1].rank) {
            document.getElementById("score").innerHTML = "FAILED";
            document.getElementById("score").style.color = "red";
        }
}


board.onmousedown = function(event) {
 
    var shiftX = event.clientX;
    document.getElementById("p1").innerHTML = shiftX;
    var previousXPosition = xPosition;

    function moveAt(clientX) {
        xPosition = previousXPosition + (clientX - shiftX);
        gameUpdate();
    }
    
    function onMouseMove(event) {

        moveAt(event.clientX);
    }

    // (3) move the board on mousemove
    board.addEventListener('mousemove', onMouseMove);

    // (4) drop the board, remove unneeded handlers
    board.onmouseup = function() {
        board.removeEventListener('mousemove', onMouseMove);
        board.onmouseup = null;
    };

    board.onmouseleave = function() {
        board.removeEventListener('mousemove', onMouseMove);
        board.onmouseup = null;
    };

};



board.ontouchstart = function(event) {
 
    var shiftX = event.touches[0].clientX;
    document.getElementById("p1").innerHTML = shiftX;
    var previousXPosition = xPosition;

    function moveAt(clientX) {
        xPosition = previousXPosition + (clientX - shiftX);
        gameUpdate();
    }
    
    function onTouchMove(event) {

        moveAt(event.touches[0].clientX);
    }

    // (3) move the board on mousemove
    board.addEventListener('touchmove', onTouchMove);

    // (4) drop the board, remove unneeded handlers
    board.ontouchend = function() {
        board.removeEventListener('touchmove', onTouchMove);
        board.ontouchend = null;
    };

    board.ontouchcancel = function() {
        board.removeEventListener('touchmove', onTouchMove);
        board.ontouchcancel = null;
    };

};

board.ondragstart = function() {
    return false;
};
