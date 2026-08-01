import React, { useEffect, useRef, useState } from 'react';
import { Heart, Play, Music } from 'lucide-react';

export default function OpeningScreen({ onBegin }) {
  const canvasRef = useRef(null);
  const [isFadingOut, setIsFadingOut] = useState(false);

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

    // Heart parametric curve line drawing
    let progress = 0;
    const maxProgress = 1;

    // Ambient floating particles
    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.8 + 0.5,
      alpha: Math.random() * 0.6 + 0.2,
      vy: Math.random() * 0.3 + 0.1
    }));

    let animId;

    const getHeartPoint = (t, scale = 14) => {
      // Parametric heart formula: x = 16 sin^3(t), y = 13 cos(t) - 5 cos(2t) - 2 cos(3t) - cos(4t)
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      return {
        x: width / 2 + x * scale,
        y: height / 2 - 140 + y * scale
      };
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw background ambient particles
      particles.forEach((p) => {
        p.y -= p.vy;
        if (p.y < 0) p.y = height;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 199, 122, ${p.alpha})`;
        ctx.fill();
      });

      // Slowly trace glowing crimson red line heart
      if (progress < maxProgress) {
        progress += 0.006;
      }

      ctx.beginPath();
      ctx.lineWidth = 3.5;
      ctx.strokeStyle = '#B11226';
      ctx.shadowColor = '#B11226';
      ctx.shadowBlur = 20;

      const totalPoints = 300;
      const pointsToDraw = Math.floor(progress * totalPoints);

      for (let i = 0; i <= pointsToDraw; i++) {
        const t = (i / totalPoints) * Math.PI * 2;
        const pt = getHeartPoint(t);
        if (i === 0) {
          ctx.moveTo(pt.x, pt.y);
        } else {
          ctx.lineTo(pt.x, pt.y);
        }
      }
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleClickBegin = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onBegin();
    }, 1000); // 1s movie transition fade to black
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: '#0B0B0B',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      textAlign: 'center',
      opacity: isFadingOut ? 0 : 1,
      transition: 'opacity 1s cubic-bezier(0.4, 0, 0.2, 1)',
      pointerEvents: isFadingOut ? 'none' : 'auto',
      overflow: 'hidden'
    }}>
      {/* Canvas for heart drawing line & dust particles */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

      {/* Main Container */}
      <div style={{ position: 'relative', zIndex: 10, marginTop: '120px' }}>
        {/* Title */}
        <h1 className="font-cinzel gold-gradient-text" style={{
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          fontWeight: '900',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: '16px',
          textShadow: '0 0 40px rgba(177, 18, 38, 0.5)'
        }}>
          A Love Story by Kiran
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: 'clamp(1.05rem, 2.2vw, 1.4rem)',
          color: '#E5E7EB',
          fontStyle: 'italic',
          maxWidth: '660px',
          margin: '0 auto 46px auto',
          lineHeight: '1.6',
          fontWeight: '300',
          letterSpacing: '0.02em',
          textShadow: '0 2px 10px rgba(0,0,0,0.9)'
        }}>
          "Some stories begin with a hello. Ours began with a silent smile."
        </p>

        {/* Button */}
        <button
          onClick={handleClickBegin}
          className="btn-cinematic"
          style={{
            fontSize: '1.2rem',
            padding: '18px 42px',
            borderRadius: '50px',
            letterSpacing: '0.06em'
          }}
        >
          <Play size={24} fill="white" /> Begin Our Journey
        </button>
      </div>

      {/* Subtle Bottom Credit */}
      <div style={{
        position: 'absolute',
        bottom: '24px',
        fontSize: '0.85rem',
        color: '#6B7280',
        letterSpacing: '0.12em',
        textTransform: 'uppercase'
      }}>
        Kiran & Divya • A Romantic Documentary
      </div>
    </div>
  );
}
