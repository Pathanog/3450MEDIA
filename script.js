const canvas=document.getElementById("rippleCanvas");
const ctx=canvas.getContext("2d");
const glow=document.getElementById("cursorGlow");
const reveals=document.querySelectorAll(".reveal");
const hoverTargets=document.querySelectorAll(".hover-target");
const navLinks=document.querySelectorAll(".nav-link");
const sections=[...navLinks].map(l=>document.querySelector(l.getAttribute("href")));

let w=canvas.width=innerWidth;
let h=canvas.height=innerHeight;
let ripples=[];
let lx=0,ly=0;
let isDark=false;

/* RIPPLE */
class Ripple{
  constructor(x,y){this.x=x;this.y=y;this.r=0;this.a=.08}
  update(){this.r+=1.4;this.a-=.002}
  draw(){
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
    const c=isDark?"255,255,255":"0,0,0";
    ctx.strokeStyle=`rgba(${c},${this.a})`;
    ctx.stroke();
  }
}

/* CURSOR */
addEventListener("mousemove",e=>{
  const dx=e.clientX-lx;
  const dy=e.clientY-ly;
  const speed=Math.hypot(dx,dy);

  lx=e.clientX;ly=e.clientY;

  glow.style.left=e.clientX+"px";
  glow.style.top=e.clientY+"px";
  glow.style.width=240+speed*3+"px";
  glow.style.height=240+speed*3+"px";

  document.querySelectorAll(".magnetic").forEach(btn=>{
    const r=btn.getBoundingClientRect();
    const mx=e.clientX-(r.left+r.width/2);
    const my=e.clientY-(r.top+r.height/2);
    btn.style.transform=`translate(${mx*.05}px,${my*.05}px)`;
  });

  ripples.push(new Ripple(e.clientX,e.clientY));
});

/* HOVER BOOST */
hoverTargets.forEach(el=>{
  el.onmouseenter=()=>{glow.style.width="420px";glow.style.height="420px";}
  el.onmouseleave=()=>{glow.style.width="240px";glow.style.height="240px";}
});

/* REVEAL + NAV ACTIVE */
function onScroll(){
  reveals.forEach(el=>{
    if(el.getBoundingClientRect().top<innerHeight*.85)
      el.classList.add("active");
  });

  sections.forEach((sec,i)=>{
    const rect=sec.getBoundingClientRect();
    if(rect.top<200 && rect.bottom>200){
      navLinks.forEach(n=>n.classList.remove("active"));
      navLinks[i].classList.add("active");
    }
  });
}
addEventListener("scroll",onScroll);
onScroll();

/* ANIMATE */
function animate(){
  ctx.clearRect(0,0,w,h);
  ripples.forEach((r,i)=>{
    r.update();r.draw();
    if(r.a<=0)ripples.splice(i,1);
  });
  requestAnimationFrame(animate);
}
animate();

/* RESIZE */
addEventListener("resize",()=>{
  w=canvas.width=innerWidth;
  h=canvas.height=innerHeight;
});

/* DARK MODE */
document.getElementById("themeToggle").onclick=()=>{
  document.body.classList.toggle("dark");
  isDark=document.body.classList.contains("dark");
};
