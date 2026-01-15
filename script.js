const canvas = document.getElementById('rippleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ripples = [];

class Ripple {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 0;
        this.opacity = 0.4;
    }
    update() {
        this.radius += 1.5;
        this.opacity -= 0.008;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 0, 0, ${this.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
    }
}

window.addEventListener('mousemove', (e) => {
    ripples.push(new Ripple(e.clientX, e.clientY));
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < ripples.length; i++) {
        ripples[i].update();
        ripples[i].draw();
        if (ripples[i].opacity <= 0) {
            ripples.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animate);
}

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

animate();
