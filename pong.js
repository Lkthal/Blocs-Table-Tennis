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
  drawField();
  update();
  render();
  animate(step);
};

//draw out element

function drawField() {
  context.beginPath();
  context.moveTo((width/2), 0);
  context.lineTo((width/2), 600);
  context.strokeStyle = 'white';
  context.lineWidth = 8;
  context.stroke();
}

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

//creating the player and computer
  function Player(){
    this.paddle = new Paddle(10, 200, 20, 125);
  }

  function Computer() {
    this.paddle = new Paddle(970, 250, 20, 125);
}


//render method for player and computer
  Player.prototype.render = function() {
    context.fillStyle = "#0080FF";
    this.paddle.render();
};

  Computer.prototype.render = function() {
    context.fillStyle = "#CC3300";
    this.paddle.render();
};

// creating the Ball
function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.x_speed = -1;
  this.y_speed = 3;
  this.radius = 10;
}

//render out the Ball

Ball.prototype.render = function() {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
  context.fillStyle = "#ffffff";
  context.fill();
};

///////game assets


var update = function() {
  player.update();
  computer.update(ball)
  ball.update(player.paddle, computer.paddle);
};

// controller function
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
};

//logic for computer ai

Computer.prototype.update = function() {
  var y_pos = ball.y;
  var diff = -((this.paddle.y + (this.paddle.height / 2)) - y_pos);
  if(diff < 0 && diff < -4) {//max speed down
    diff = -5;
  } else if(diff > 0 && diff > 4){ // max speed up
    diff = 5;
  }
  this.paddle.move(0, diff);
  
  if(this.paddle.y < 0 ) {
    this.paddle.y = 0;
  } else if (this.paddle.y + this.paddle.height  > 600) {
    this.paddle.y = 600 - this.paddle.height;
  }
};

//logic for ball collision and movement

Ball.prototype.update = function(paddle1, paddle2) {
  this.x += this.x_speed;
  this.y += this.y_speed;
  var top_x = this.x - this.radius;
	var top_y = this.y - this.radius;
	var bottom_x = this.x + this.radius;
	var bottom_y = this.y + this.radius;
  //
  if(this.y - this.radius < 0 ) { //hitting top of the wall
    this.y = this.radius;
    this.y_speed = -this.y_speed;
  } else if(this.y + this.radius > 600) {
    this.y = 600 - this.radius;
    this.y_speed = -this.y_speed;
  }

  if(this.x < 0 || this.x > 1000) {
    this.x_speed = Math.random() >= .5 ? .5*this.radius : -.5*this.radius;
    this.y_speed = 0;
    this.x = canvas.width/2 - this.radius;
    this.y = canvas.height/2 - this.radius;
  }
  //
  if(top_x > (canvas.width / 2)) {
			if(top_x < (paddle2.x + paddle2.width) && bottom_x > paddle2.x && top_y < (paddle2.y + paddle2.height) && bottom_y > (paddle2.y)) {
				// hitting computers paddle
				this.x_speed = -this.radius;
				this.y_speed += (paddle2.y_speed/2);
				this.x += this.x_speed;
			}
		} else {
			if(bottom_x > (paddle1.x + paddle1.width) && top_x < (paddle1.x + paddle1.width) && top_y < (paddle1.y + paddle1.height) && bottom_y > (paddle1.y)) {
				// hitting players paddle
				this.x_speed = this.radius;
				this.y_speed += (paddle1.y_speed/2);
				this.x += this.x_speed;
			}
		}
};

var keysDown = {};

window.addEventListener("keydown", function(event) {
  keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event) {
  delete keysDown[event.keyCode];
});

//initial game state
var player = new Player();
var computer = new Computer();
var ball = new Ball(400, 300);

var render = function() {
  context.fillStyle = "#0B6623";
  context.fillRect(0, 0, width, height);
  player.render();
  computer.render();
  ball.render();
  drawField();
};
