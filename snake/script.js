var canvas = document.getElementById("snake");
var canvas2d = canvas.getContext("2d");

var gameEnded = false;
canvas.width = 400;
canvas.height = 400;

var snakeSegments = [];
var snakeLength = 1;

var snakeX = Math.floor(Math.random() * canvas.width/10)*10;
var snakeY = Math.floor(Math.random() * canvas.height/10)*10;

var directionX = 0;
var directionY = 0;

var dots = [];
var score = 0;


function moveSnake() {
  snakeSegments.unshift({ x: snakeX, y: snakeY });
  
  snakeX += directionX;
  snakeY += directionY;
  
  while (snakeSegments.length > snakeLength) {
    snakeSegments.pop();
  }
}

function drawSnake() {
  canvas2d.clearRect(0, 0, canvas.width, canvas.height);
  canvas2d.fillStyle = "black"; 
  for (var i = 0; i < snakeSegments.length; i++) {
    canvas2d.fillRect(snakeSegments[i].x, snakeSegments[i].y, 10, 10);
  }
}

function gameLoop() {
  moveSnake();
  drawSnake();
  spawnDots();
  checkCollision();
  if(!gameEnded) {
    setTimeout(gameLoop, 100);
  }
  
}
gameLoop();

document.onkeydown = function(event) {
  switch (event.keyCode) {
    case 37: // Left arrow
      if (directionX !== 10) { 
        directionX = -10;
        directionY = 0;
      }
      break;
    case 38: // Up arrow
      if (directionY !== 10) { 
        directionX = 0;
        directionY = -10;
      }
      break;
    case 39: // Right arrow
      if (directionX !== -10) { 
        directionX = 10;
        directionY = 0;
      }
      break;
    case 40: // Down arrow
      if (directionY !== -10) { 
        directionX = 0;
        directionY = 10;
      }
      break;
  }
};


function spawnDots() {
  if(dots.length < 1) {
    var dotX = Math.floor(Math.random() * canvas.width/10)*10;
    var dotY = Math.floor(Math.random() * canvas.height/10)*10;
    dots.push({ x: dotX, y: dotY });
  }
  for (var i = 0; i < dots.length; i++) {
    canvas2d.fillStyle = "red";
    canvas2d.fillRect(dots[i].x, dots[i].y, 10, 10);
  }
}

function checkCollision() {
  for (var i = 0; i < dots.length; i++) {
    if (snakeX < dots[i].x + 10 && 
      snakeX + 10 > dots[i].x && 
      snakeY < dots[i].y + 10 && 
      snakeY + 10 > dots[i].y) {
        snakeLength++;
        dots.splice(i, 1);
        increaseScore();
    }
  }
  if (snakeX < 0 || 
    snakeY < 0 || 
    snakeX > canvas.width ||
    snakeY > canvas.height) {
      gameOver();
  }
  for (var i = 1; i < snakeSegments.length; i++) {
    if (snakeX === snakeSegments[i].x && snakeY === snakeSegments[i].y) {
      gameOver();
    }
  }
}

function gameOver() {
  setTimeout(function() {
    alert("Game over! Final score: " +score);
  }, 500); 
  gameEnded = true

  var scoreDisplay = document.getElementById("scoreDisplay");
  scoreDisplay.innerText="Final Score: "+score;
}
function increaseScore(){
  score++;
  var scoreDisplay = document.getElementById("scoreDisplay");
  scoreDisplay.innerText = "Score: "+score;
  console.log("Score: "+score);
}
