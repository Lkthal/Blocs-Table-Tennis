var animate = window.requestAnimationFrame ||
  function(callback) { window.setTimeout(callback, 1000/60) };

var canvas = document.createElement('canvas');
var width = 1000;
var height = 600;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');

window.onload = function() {
  document.body.appendChild(canvas);
  animate(step);
};

var step = function() {
  update();
  render();
  animate(step);
};

var update = function() {
};

var render = function() {
  context.fillStyle = "#0B6623";
  context.fillRect(0, 0, width, height);
  player.render();
  computer.render();
  ball.render();
};

function Paddle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.x_speed = 0;
  this.y_speed = 0;
}

  Paddle.prototype.render = function(){
    context.fillRect(this.x, this.y, this.width, this.height);
  };

//creating the player
  function Player(){
    this.paddle = new Paddle(10, 200, 10, 100);
  }

  Player.prototype.render = function() {
    context.fillStyle = "#0080FF";
    this.paddle.render();
};

//creating the AI
  function Computer() {
    this.paddle = new Paddle(980, 250, 10, 100);
}

  Computer.prototype.render = function() {
    context.fillStyle = "#CC3300";
    this.paddle.render();
};

// creating the Ball
function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.x_speed = 0;
  this.y_speed = 3;
  this.radius = 5;
}

Ball.prototype.render = function() {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
  context.fillStyle = "#ffffff";
  context.fill();
};

//initial game state
var player = new Player();
var computer = new Computer();
var ball = new Ball(400, 300);

// controller function

var keysDown = {};

window.addEventListener("keydown", function(event) {
  keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event) {
  delete keysDown[event.keyCode];
});

var update = function() {
  player.update();
  // ball.update(player.paddle, computer.paddle);
};

Player.prototype.update = function() {
  for(var key in keysDown){
    var value = Number(key);
    if(value == 38) {
      this.paddle.move(0, -4);
    } else if (value == 40){
      this.paddle.move(0,4)
    } else {
      this.paddle.move(0,0);
    }
  }
};

Paddle.prototype.move = function(x,y) {
  this.x += x;
  this.y += y;
  this.x_speed = x;
  this.y_speed = y;
  if(this.y < 0) {
    this.y = 0;
    this.y_speed = 0;
  }else if (this.y + this.height > 600) {
    this.y = 600 - this.height;
    this.y_speed = 0;
  }
}
