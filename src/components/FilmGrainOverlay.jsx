import React, { useEffect, useRef } from 'react';

export default function FilmGrainOverlay() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Floating dust particles (cinematic dust motes)
    const dustParticles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
      speedX: (Math.random() - 0.5) * 0.15,
      speedY: Math.random() * 0.2 + 0.05
    }));

    let animId;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render floating golden/white dust motes
      dustParticles.forEach((p) => {
        p.x += p.speedX;
        p.y -= p.speedY;

        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0 || p.x > width) {
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 199, 122, ${p.alpha})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      {/* Floating dust motes canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 8000
        }}
      />

      {/* Subtle Lens Flare Light Ray Overlay */}
      <div style={{
        position: 'fixed',
        top: '-20%',
        right: '-10%',
        width: '60vw',
        height: '60vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(232,199,122,0.06) 0%, rgba(177,18,38,0.03) 40%, rgba(0,0,0,0) 70%)',
        pointerEvents: 'none',
        zIndex: 7999
      }} />
    </>
  );
}
