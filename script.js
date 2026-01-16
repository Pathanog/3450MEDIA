const canvas = document.getElementById("rippleCanvas");
const ctx = canvas.getContext("2d");
const glow = document.getElementById("cursorGlow");
const reveals = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll(".nav-link");
const sections = [...navLinks].map(link =>
  document.querySelector(link.getAttribute("href"))
);

let w = canvas.width = innerWidth;
let h = canvas.height = innerHeight;
let ripples = [];
let lx = 0, ly = 0;

/* RIPPLE */
class Ripple {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 0;
    this.a = .08;
  }
  update() {
    this.r += 1.4;
    this.a -= .002;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(0,0,0,${this.a})`;
    ctx.stroke();
  }
}

addEventListener("mousemove", e => {
  const dx = e.clientX - lx;
  const dy = e.clientY - ly;
  const speed = Math.hypot(dx, dy);
  lx = e.clientX;
  ly = e.clientY;

  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
  glow.style.width = 240 + speed * 3 + "px";
  glow.style.height = 240 + speed * 3 + "px";

  ripples.push(new Ripple(e.clientX, e.clientY));
});

/* REVEAL + NAV ACTIVE */
function onScroll() {
  reveals.forEach(el => {
    if (el.getBoundingClientRect().top < innerHeight * .85) {
      el.classList.add("active");
    }
  });

  sections.forEach((sec, i) => {
    const r = sec.getBoundingClientRect();
    if (r.top < 200 && r.bottom > 200) {
      navLinks.forEach(n => n.classList.remove("active"));
      navLinks[i].classList.add("active");
    }
  });
}

addEventListener("scroll", onScroll);
onScroll();

/* ANIMATE */
function animate() {
  ctx.clearRect(0, 0, w, h);
  ripples.forEach((r, i) => {
    r.update();
    r.draw();
    if (r.a <= 0) ripples.splice(i, 1);
  });
  requestAnimationFrame(animate);
}
animate();

addEventListener("resize", () => {
  w = canvas.width = innerWidth;
  h = canvas.height = innerHeight;
});
