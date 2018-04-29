const canvas = document.querySelector('#canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');

let mouse = {
	x: undefined,
	y: undefined
}

document.addEventListener('mousemove', function(e) {
	mouse.x = e.clientX;
	mouse.y = e.clientY;
});

window.onmouseout = () => {
	mouse.x = undefined;
	mouse.y = undefined;
}

window.onresize = () => {
	balls = [];
	for (var i = 0; i < amount; i++) {
		let radius = Math.ceil(Math.random() * rr);

		balls.push(new Ball(Math.floor(Math.random() * (canvas.width - radius * 2) + radius), Math.floor(Math.random() * (canvas.height - radius * 2) + radius), radius));
	}
}

function getRandomRgb() {
    let num = Math.round(0xffffff * Math.random());
    let r = num >> 16;
    let g = num >> 8 & 255;
    let b = num & 255;
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

const Ball = function(x, y, r) {
	this.x = x;
	this.y = y;
	this.r = r;
	this.color = getRandomRgb();
	this.dx = (Math.random() - 0.5) * Math.random() * 2;
	this.dy = (Math.random() - 0.5) * Math.random() * 2;
	this.dr = this.r;

	this.render = () => {
		this.draw();
		this.move();
	}

	this.move = () => {
		if (this.x + this.r >= canvas.width || this.x - this.r <= 0) {
			this.dx = -this.dx;
		}

		if (this.y + this.r >= canvas.height || this.y - this.r <= 0) {
			this.dy = -this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;

		if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
			if (this.r <= 30) {
				this.r++;
			}
		} else if (this.r > this.dr) {
			this.r--;
		}
	}

	this.draw = () => {
		c.beginPath();
		c.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
		c.strokeStyle = this.color;
		c.stroke();
		c.closePath();
	}
}

// Create objects
let balls = [];
let amount = 200;
let rr = 5;

for (var i = 0; i < amount; i++) {
	let radius = Math.ceil(Math.random() * rr);
	balls.push(new Ball(Math.floor(Math.random() * (canvas.width - radius * 2) + radius), Math.floor(Math.random() * (canvas.height - radius * 2) + radius), radius));
}

function draw() {
	balls.forEach(ball => {
		ball.render();
	});
}

function render() {
	c.globalAlpha = 0.3;
	c.clearRect(0, 0, canvas.width, canvas.height);
	draw();
	requestAnimationFrame(render);
}

render();