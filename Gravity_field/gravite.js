// Constants
//const initial_speed = 20; // m/s
var initial_speed = 0;
var initial_angle = Math.PI/3;
const GRAVITY = 9.81;
const SCALE = 30;
var start=false;
var time = 0;

function deg2rad(deg) {
	return deg * Math.PI / 180;
}

function startGame() {	// Game initialisation
	myGameArea.start();
	myGamePiece = new component(30, 30, "red", 0, 576-30);	// Red square creation
}

function reset() {
	myGamePiece.x = 0;
	myGamePiece.y = 576-30;
	myGamePiece.speedX = 0;
	myGamePiece.speedY = 0;
	time = 0;
	initial_speed = document.getElementById("initial_speed").value;
	initial_angle = document.getElementById("initial_angle").value; 
}

(function updateValues() {
	var speed_slider = document.getElementById("initial_speed");
	var speed_output = document.getElementById("initial_speed_value");
	var angle_slider = document.getElementById("initial_angle");
	var angle_output = document.getElementById("initial_angle_value");
	speed_output.innerHTML = speed_slider.value + " m/s";
	speed_slider.oninput = function() {
		speed_output.innerHTML = this.value + " m/s";
	}
	angle_output.innerHTML = angle_slider.value + " °";
	angle_slider.oninput = function() {
		angle_output.innerHTML = this.value + "°";
	}
})();

var myGameArea = {
	canvas : document.getElementById("simulation_canvas"),
	start : function() {
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.interval = setInterval(updateGameArea, 20);
	},
	clear : function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
}

function component(width, height, color, x, y) {
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.speedX = 0;
	this.speedY = 0;
	this.update = function() {
		ctx = myGameArea.context;
		ctx.fillStyle = color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	},
	this.newPos = function() {
		if (this.x <= myGameArea.canvas.width - 30) {
			this.x += initial_speed * Math.cos(deg2rad(initial_angle)) * 0.5;
		}
		if (this.y < myGameArea.canvas.height - 29) {
			this.y += GRAVITY * time - (initial_speed * Math.sin(deg2rad(initial_angle))) * 0.5;
		} 
		document.getElementById("coord").innerHTML = `Coordonnées : (${Math.floor(this.x)}; ${Math.floor(this.y)})`;
	}
}

function updateGameArea() {
	if (start) {
		time += 0.02;
		myGameArea.clear();
	//	myGamePiece.x = (initial_speed * Math.cos(initial_angle)) * time;
	//	myGamePiece.y = -1/2 * GRAVITY * time ** 2 - (initial_speed * Math.sin(initial_angle)) * time + (576-30);
		myGamePiece.newPos();
		myGamePiece.update();
	}
}

