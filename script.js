const canvas = document.getElementById('rippleCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ripples = [];

class Ripple {
    constructor(x, y) {
        this.x = x; this.y = y;
        this.radius = 0; this.opacity = 0.4;
    }
    update() { this.radius += 2; this.opacity -= 0.01; }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 0, 0, ${this.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
    }
}

const trigger = (e) => {
    const x = e.clientX || (e.touches && e.touches[0].clientX);
    const y = e.clientY || (e.touches && e.touches[0].clientY);
    if (x && y) ripples.push(new Ripple(x, y));
};

window.addEventListener('mousemove', trigger);
window.addEventListener('touchmove', trigger);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ripples.forEach((r, i) => {
        r.update(); r.draw();
        if (r.opacity <= 0) ripples.splice(i, 1);
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

animate();
