import React, { useEffect, useRef, useState } from 'react';
import { BookOpen } from 'lucide-react';

export default function LandingPage({ onOpenStory }) {
  const canvasRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleWindowResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleWindowResize);

    // Warm golden dust particles
    const dustMotes = Array.from({ length: isMobile ? 35 : 65 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.6,
      alpha: Math.random() * 0.7 + 0.3,
      vy: Math.random() * 0.25 + 0.05,
      vx: (Math.random() - 0.5) * 0.15
    }));

    let animId;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Light Rays Gradient
      const grad = ctx.createRadialGradient(
        width / 2, height * 0.3, 10,
        width / 2, height * 0.3, width * 0.75
      );
      grad.addColorStop(0, 'rgba(255, 215, 0, 0.14)');
      grad.addColorStop(0.5, 'rgba(177, 18, 38, 0.06)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Render dust motes
      dustMotes.forEach((p) => {
        p.y -= p.vy;
        p.x += p.vx;
        if (p.y < 0) p.y = height;
        if (p.x < 0 || p.x > width) p.x = Math.random() * width;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 215, 0, ${p.alpha})`;
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleWindowResize);
      cancelAnimationFrame(animId);
    };
  }, [isMobile]);

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      width: '100%',
      backgroundColor: '#0D0704',
      backgroundImage: 'radial-gradient(ellipse at center, rgba(177,18,38,0.25) 0%, rgba(13,7,4,0.98) 80%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '60px 14px 40px 14px' : '32px 20px',
      textAlign: 'center',
      overflow: 'hidden'
    }}>
      {/* Background Dust & Glow Canvas */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

      {/* Main Glassmorphism Card */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '820px',
        width: '100%',
        padding: isMobile ? '40px 16px' : '64px 48px',
        borderRadius: isMobile ? '20px' : '28px',
        background: 'rgba(20, 10, 6, 0.82)',
        backdropFilter: 'blur(20px)',
        border: '2px solid rgba(255, 215, 0, 0.35)',
        boxShadow: '0 25px 70px rgba(0, 0, 0, 0.95), 0 0 40px rgba(177, 18, 38, 0.3)'
      }}>
        {/* Heading: Welcome to Our Journey From 1st Sem to Forever */}
        <h1 className="font-serif gold-text" style={{
          fontSize: 'clamp(1.9rem, 6.2vw, 4.4rem)',
          fontStyle: 'italic',
          fontWeight: '700',
          lineHeight: '1.25',
          marginBottom: isMobile ? '28px' : '44px',
          letterSpacing: '0.01em',
          filter: 'drop-shadow(0 4px 15px rgba(0,0,0,0.95))'
        }}>
          Welcome to Our Journey From 1st Sem to Forever
        </h1>

        {/* Shimmering Golden Button — Fully responsive across Desktop, Laptop, Tablet & Mobile */}
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <button
            onClick={onOpenStory}
            className="btn-vintage"
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
              padding: isMobile ? '14px 28px' : '18px 52px',
              borderRadius: '50px',
              width: isMobile ? '92%' : 'auto',
              maxWidth: '440px',
              justifyContent: 'center',
              whiteSpace: 'nowrap',
              boxSizing: 'border-box'
            }}
          >
            <BookOpen size={isMobile ? 20 : 26} color="#FFF8DC" style={{ flexShrink: 0 }} />
            <span>OPEN OUR STORY</span>
          </button>
        </div>
      </div>

      {/* Footer subtle sign-off */}
      <div style={{
        position: isMobile ? 'relative' : 'absolute',
        bottom: isMobile ? 'auto' : '24px',
        marginTop: isMobile ? '24px' : '0',
        fontSize: isMobile ? '0.75rem' : '0.85rem',
        color: '#D4AF37',
        letterSpacing: '0.1em',
        fontFamily: "'Cinzel', serif",
        textShadow: '0 2px 8px rgba(0,0,0,0.9)'
      }}>
        FOR DIVYA • WRITTEN BY KIRAN WITH LOVE
      </div>
    </div>
  );
}
