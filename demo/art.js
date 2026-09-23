
// Simulim canvas i "Happy Diwali" me turtle (origjinali .py) — nga Erion Nezha, © 2026
(function(){
const cv=document.getElementById('art'),ctx=cv.getContext('2d');
const W=cv.width,H=cv.height;
let fireworks=[],t0=performance.now(),raf=null;
function rangoli(cx,cy){
  const cols=['#ffd75c','#ff5c8a','#2ea8ff','#2ed97b','#ff9d2e','#c77dff'];
  for(let ring=0;ring<4;ring++){
    const r=40+ring*34;
    ctx.strokeStyle=cols[ring%cols.length];ctx.lineWidth=3;
    ctx.beginPath();ctx.arc(cx,cy,r,0,7);ctx.stroke();
    const petals=10+ring*4;
    for(let i=0;i<petals;i++){
      const a=(i/petals)*Math.PI*2+ring*0.3;
      const x1=cx+r*Math.cos(a),y1=cy+r*Math.sin(a);
      const x2=cx+(r+22)*Math.cos(a),y2=cy+(r+22)*Math.sin(a);
      ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();
      ctx.beginPath();ctx.arc(x2,y2,5,0,7);ctx.stroke();
    }
  }
  ctx.fillStyle='#ffd75c';
  for(let i=0;i<12;i++){const a=i/12*Math.PI*2;ctx.beginPath();ctx.arc(cx+18*Math.cos(a),cy+18*Math.sin(a),6,0,7);ctx.fill();}
}
function diya(cx,cy,s){
  ctx.fillStyle='#b3540a';
  ctx.beginPath();ctx.ellipse(cx,cy,70*s,26*s,0,0,7);ctx.fill();
  ctx.fillStyle='#8a3c06';
  ctx.beginPath();ctx.moveTo(cx-70*s,cy);ctx.quadraticCurveTo(cx,cy+64*s,cx+70*s,cy);ctx.closePath();ctx.fill();
  ctx.fillStyle='#ffd75c';
  ctx.beginPath();ctx.ellipse(cx,cy-6*s,44*s,12*s,0,0,7);ctx.fill();
}
function flame(x,y,t){
  const f=Math.sin(t/90)*4+Math.sin(t/37)*2;
  const g=ctx.createRadialGradient(x,y+f,2,x,y+f,34);
  g.addColorStop(0,'rgba(255,240,180,.95)');g.addColorStop(.4,'rgba(255,180,60,.8)');g.addColorStop(1,'rgba(255,120,20,0)');
  ctx.fillStyle=g;
  ctx.beginPath();ctx.ellipse(x,y-24+f,20,34,0,0,7);ctx.fill();
}
function burst(){
  const cols=['#ffd75c','#ff5c8a','#2ea8ff','#2ed97b','#ff9d2e','#fff'];
  const x=80+Math.random()*(W-160),y=60+Math.random()*(H/2);
  const c=cols[Math.floor(Math.random()*cols.length)];
  for(let i=0;i<46;i++){
    const a=Math.random()*Math.PI*2,sp=1.5+Math.random()*3.5;
    fireworks.push({x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,life:1,c});
  }
}
function step(t){
  ctx.fillStyle='#050505';ctx.fillRect(0,0,W,H);
  // fishekzjarrë
  if(Math.random()<0.05&&fireworks.length<400)burst();
  fireworks=fireworks.filter(p=>p.life>0);
  for(const p of fireworks){
    p.x+=p.vx;p.y+=p.vy;p.vy+=0.03;p.life-=0.012;
    ctx.globalAlpha=Math.max(0,p.life);ctx.fillStyle=p.c;
    ctx.beginPath();ctx.arc(p.x,p.y,2.4,0,7);ctx.fill();
  }
  ctx.globalAlpha=1;
  // rangoli rrotulluese
  ctx.save();ctx.translate(W/2,300);ctx.rotate((t-t0)/9000);
  ctx.shadowColor='#ffd75c';ctx.shadowBlur=14;rangoli(0,0);ctx.restore();
  ctx.shadowBlur=0;
  // diya
  diya(W/2,560,1);flame(W/2,552,t);
  diya(W/2-260,600,0.7);flame(W/2-260,596,t+500);
  diya(W/2+260,600,0.7);flame(W/2+260,596,t+1100);
  // teksti
  ctx.textAlign='center';
  ctx.font='bold 52px Georgia,serif';
  ctx.shadowColor='#ffd75c';ctx.shadowBlur=24;ctx.fillStyle='#ffd75c';
  ctx.fillText('Happy Diwali',W/2,110);
  ctx.shadowBlur=0;ctx.fillStyle='#a8894a';ctx.font='20px system-ui';
  ctx.fillText('Gëzuar Diwalin 🪔 — Festa e Dritave',W/2,146);
  raf=requestAnimationFrame(step);
}
document.getElementById('replay').addEventListener('click',()=>{fireworks=[];t0=performance.now();});
raf=requestAnimationFrame(step);
})();
