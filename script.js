/* WATER RIPPLE */
const canvas = document.getElementById("rippleCanvas");
const ctx = canvas.getContext("2d");

let w = canvas.width = innerWidth;
let h = canvas.height = innerHeight;
let ripples = [];

class Ripple{
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.r=0;
        this.a=.08;
    }
    update(){
        this.r+=1.6;
        this.a-=.002;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
        ctx.strokeStyle=`rgba(0,0,0,${this.a})`;
        ctx.lineWidth=1;
        ctx.stroke();
    }
}

addEventListener("mousemove",e=>{
    ripples.push(new Ripple(e.clientX,e.clientY));
});

function animate(){
    ctx.clearRect(0,0,w,h);
    ripples.forEach((r,i)=>{
        r.update();
        r.draw();
        if(r.a<=0) ripples.splice(i,1);
    });
    requestAnimationFrame(animate);
}
addEventListener("resize",()=>{
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
});
animate();

/* DARK MODE */
document.getElementById("themeToggle").onclick = () => {
    document.body.classList.toggle("dark");
};

/* SCROLL REVEAL */
const reveals = document.querySelectorAll(".reveal");
const revealOnScroll = () => {
    reveals.forEach(el=>{
        if(el.getBoundingClientRect().top < innerHeight*0.85){
            el.classList.add("active");
        }
    });
};
addEventListener("scroll",revealOnScroll);
revealOnScroll();
