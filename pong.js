var animate = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
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
  this.radius = 5;
}

Ball.prototype.render = function() {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
  context.fillStyle = "#ffffff";
  context.fill();
};

//initial game requestAnimationFrame
var player = new Player();
var computer = new Computer();
var ball = new Ball(400, 300);
