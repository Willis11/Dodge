//canvas with 2D context
var canvas = document.getElementById("cubeCanvas");
var ctx = canvas.getContext("2d");

//set cube width and height
var cubeWidth = 25;
var cubeHeight = 25;

//set x and y
var x = canvas.width/2;
var y = canvas.height-250;

var dx = 0;
var dy = 0;

//------------
//Main Cube Drawing and Control
//------------

//draws cube
function drawCube(){
  ctx.beginPath();
  ctx.rect(x, y, cubeWidth, cubeHeight);
  ctx.fillStyle = "#5b34eb";
  ctx.fill();
  ctx.closePath();
}

function updateCube(){
  drawCube();
  x += dx;
  y += dy;

  if(x == 0 || x + cubeWidth == canvas.width){
    x += -dx;
  }

  if(y == 0 || y + cubeHeight == canvas.height){
    y += -dy;
  }

  if(rightPressed == false || leftPressed == false || upPressed == false || downPressed == false){
    dx = 0;
    dy = 0;
  }

  if(rightPressed){
    dx = 2;
  }

  if(leftPressed){
    dx = -2;
  }

  if(upPressed){
    dy = -2;
  }

  if(downPressed){
    dy = 2;
  }

}

//------------
//Game
//------------
function updateGame(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updateCube();
  updateEnemyCube();
  checkCollision();
  increaseDifficulty();
  ifGameEnds();
}

//update time
var gameInterval = setInterval(updateGame, 10);

//keyboard control
var upPressed = false;
var downPressed = false;
var rightPressed = false;
var leftPressed = false;

//keyboardEventListeners
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e){
  if(e.key == "Right" || e.key == "ArrowRight"){
    rightPressed = true;
  }
  else if(e.key == "Left" || e.key == "ArrowLeft"){
    leftPressed = true;
  }
  else if(e.key == "Up" || e.key == "ArrowUp"){
    upPressed = true;
  }
  else if(e.key == "Down" || e.key == "ArrowDown"){
    downPressed = true;
  }
}

function keyUpHandler(e){
  if(e.key == "Right" || e.key == "ArrowRight"){
    rightPressed = false;
  }
  else if(e.key == "Left" || e.key == "ArrowLeft"){
    leftPressed = false;
  }
  else if(e.key == "Up" || e.key == "ArrowUp"){
    upPressed = false;
  }
  else if(e.key == "Down" || e.key == "ArrowDown"){
    downPressed = false;
  }
}


//-------------------
//Enemy Cube Movement
//-------------------
function createEnemyCubeObject(width, height, xPos, yPos, speed){
    this.enemyCubeWidth = width;
    this.enemyCubeHeight = height;
    this.enemyCubeX = xPos;
    this.enemyCubeY = yPos;
    this.enemyCubeSpeed = speed;
}

let enemies = [];
for(var f = 0; f < 5; f++){
  var enemy =  new createEnemyCubeObject(10, 10, 0, generatePositionEnemyCube(canvas.height), generateRandomSpeed());
  enemies.push(enemy);
}

var drawCubeNumber;

function drawEnemyCube(){

     drawCubeNumber = enemies.length;

    for(var x = 0; x < drawCubeNumber; x++){
      ctx.beginPath();
      ctx.rect(enemies[x].enemyCubeX, enemies[x].enemyCubeY, enemies[x].enemyCubeWidth, enemies[x].enemyCubeHeight);
      ctx.fillStyle = "#f54242";
      ctx.fill();
      ctx.closePath();
    }
  }

function updateEnemyCube(){
  drawEnemyCube();
  for(var h = 0; h < drawCubeNumber; h++){
    if(enemies[h].enemyCubeX == 600){
      enemies[h].enemyCubeX = 0;
      enemies[h].enemyCubeY = generatePositionEnemyCube(canvas.height);
      enemies[h].enemyCubeSpeed = generateRandomSpeed();
    }
      enemies[h].enemyCubeX += enemies[h].enemyCubeSpeed;
  }

  }

function generatePositionEnemyCube(canvasHeight){
  var randomNumber = Math.floor(Math.random() * canvasHeight - 10) + 1;
  return randomNumber;
}

function generateRandomSpeed(){
  var randomSpeed = Math.floor(Math.random() * 2) + 2;
  return randomSpeed;
}
//-------------------
//Collision Detection
//-------------------
var collision = false;

function checkCollision(){
  for(var j = 0; j < drawCubeNumber; j++){
    if(x + 25 > enemies[j].enemyCubeX && x < enemies[j].enemyCubeX + 10 && y + 25 > enemies[j].enemyCubeY && y < enemies[j].enemyCubeY + 10){
      collision = true;
    }
  }
}

//-------------------
//Game Timer
//-------------------
var gameTickCounter = 0;
var gameTimer = 0;
var gameTimerX = canvas.width - 40;
var gameTimerY = 30;

function gameTimeCounter(){
  gameTickCounter += 1;
  if(gameTickCounter == 100){
    gameTimer += 1;
    gameTickCounter = 0;
  }
  ctx.font = "20px Arial";
  ctx.fillText(gameTimer, gameTimerX, gameTimerY);
}

setInterval(gameTimeCounter, 10);

//-----------------
//Game Difficulty
//-----------------
var hasIncreased = false;

function increaseDifficulty(){
  if(gameTimer == 10 && hasIncreased == false){
    hasIncreased = true;
    for(var l = 0; l < 3; l++){
      var enemy2 =  new createEnemyCubeObject(10, 10, 0, generatePositionEnemyCube(canvas.height), generateRandomSpeed());
      enemies.push(enemy2);
    }
  }

  if(gameTimer == 30 && hasIncreased == true){
    hasIncreased = false;
    for(var w = 0; w < 4; w++){
      var enemy2 =  new createEnemyCubeObject(10, 10, 0, generatePositionEnemyCube(canvas.height), generateRandomSpeed());
      enemies.push(enemy2);
    }
  }

  if(gameTimer == 50 && hasIncreased == false){
    hasIncreased = true;
    for(var r = 0; r < 5; r++){
      var enemy2 =  new createEnemyCubeObject(10, 10, 0, generatePositionEnemyCube(canvas.height), generateRandomSpeed());
      enemies.push(enemy2);
    }
  }
}


//-------------------
//Finish Game
//-------------------
function ifGameEnds(){
  if(collision == true){
    collision = false;
    var gameOver1 = "Game Over - Time of "
    var gameOver2 = gameOver1.concat('', gameTimer);
    var gameOver3 = gameOver2.concat(' ', "Seconds");
    alert(gameOver3);
    document.location.reload();
    clearInterval(gameInterval);
  }
}
