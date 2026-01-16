const canvas = document.getElementById("rippleCanvas");
const ctx = canvas.getContext("2d");

let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

let ripples = [];

class Ripple {
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.r=0;
        this.alpha=0.12;
    }
    update(){
        this.r+=1.8;
        this.alpha-=0.003;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
        ctx.strokeStyle=`rgba(0,0,0,${this.alpha})`;
        ctx.lineWidth=1;
        ctx.stroke();
    }
}

window.addEventListener("mousemove",e=>{
    ripples.push(new Ripple(e.clientX,e.clientY));
});

function animate(){
    ctx.clearRect(0,0,w,h);
    ripples.forEach((r,i)=>{
        r.update();
        r.draw();
        if(r.alpha<=0) ripples.splice(i,1);
    });
    requestAnimationFrame(animate);
}

window.addEventListener("resize",()=>{
    w=canvas.width=window.innerWidth;
    h=canvas.height=window.innerHeight;
});

animate();
