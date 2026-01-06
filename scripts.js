/* scripts.js
   - Particle animation for hero
   - Basic interactivity: current year and small logo glow pulse
*/

/* ====== helper: set year in footer ====== */
document.addEventListener('DOMContentLoaded', () => {
  const y = new Date().getFullYear();
  const ids = ['year','year-plugins','year-info'];
  ids.forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.textContent = y;
  });

  // small pulse on logo (non-critical)
  const logos = document.querySelectorAll('.logo');
  logos.forEach(l=>{
    l.animate([
      {filter:'drop-shadow(0 8px 24px rgba(0,0,0,0.6))'},
      {filter:'drop-shadow(0 14px 40px rgba(211,59,59,0.28))'}
    ],{
      duration:4000, direction:'alternate', iterations:Infinity, easing:'ease-in-out'
    });
  });
});

/* ====== Particle system for header (canvas) ====== */
function initParticles(canvasId){
  const canvas = document.getElementById(canvasId);
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w=canvas.width=canvas.offsetWidth;
  let h=canvas.height=canvas.offsetHeight;
  const particles = [];
  const COUNT = Math.floor(w/40);

  function rand(min,max){ return Math.random()*(max-min)+min; }

  function make(){
    for(let i=0;i<COUNT;i++){
      particles.push({
        x: Math.random()*w,
        y: Math.random()*h,
        r: rand(0.6,2.4),
        vx: rand(-0.1,0.1),
        vy: rand(0.2,0.9),
        alpha: rand(0.08,0.35)
      });
    }
  }
  make();

  function resize(){
    w=canvas.width=canvas.offsetWidth;
    h=canvas.height=canvas.offsetHeight;
  }
  window.addEventListener('resize', resize);

  function draw(){
    ctx.clearRect(0,0,w,h);
    // subtle moving gradient overlay
    const g = ctx.createLinearGradient(0,0,w,h);
    g.addColorStop(0,'rgba(0,0,0,0.18)');
    g.addColorStop(1,'rgba(0,0,0,0.4)');
    ctx.fillStyle = g;
    ctx.fillRect(0,0,w,h);

    particles.forEach(p=>{
      p.x += p.vx;
      p.y += p.vy;
      if(p.y > h + 10) { p.y = -10; p.x = Math.random()*w; }
      if(p.x < -20) p.x = w + 20;
      if(p.x > w + 20) p.x = -20;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }
  draw();
}

/* initialize particles on multiple canvases used in pages */
window.addEventListener('load', () => {
  initParticles('hero-canvas');
  initParticles('hero-canvas-2');
  initParticles('hero-canvas-3');
});
