// Lightweight particles for header background
(function(){
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let w = canvas.width = window.innerWidth;
  const header = document.querySelector('.site-header');
  let h = canvas.height = header ? header.offsetHeight : 480;

  const particles = [];
  const COUNT = Math.max(40, Math.floor(w/36));

  function rand(min,max){ return Math.random()*(max-min)+min; }

  function init(){
    particles.length = 0;
    for (let i=0;i<COUNT;i++){
      particles.push({
        x: Math.random()*w,
        y: Math.random()*h,
        r: rand(0.6,2.6),
        vx: rand(-0.2,0.2),
        vy: rand(0.2,0.9),
        a: rand(0.06,0.28)
      });
    }
  }
  init();

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = header ? header.offsetHeight : 480;
  }
  window.addEventListener('resize', resize);

  function draw(){
    ctx.clearRect(0,0,w,h);
    // subtle overlay so particles are visible
    ctx.fillStyle = 'rgba(0,0,0,0.06)';
    ctx.fillRect(0,0,w,h);

    for (let p of particles){
      p.x += p.vx;
      p.y += p.vy;
      if (p.y > h + 6) { p.y = -6; p.x = Math.random()*w; }
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(255,255,255,${p.a})`;
      ctx.shadowColor = 'rgba(255,255,255,0.65)';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    requestAnimationFrame(draw);
  }

  draw();
})();
