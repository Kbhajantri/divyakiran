import React, { useEffect, useRef } from 'react';
import { BookOpen, Heart } from 'lucide-react';

export default function LandingPage({ onOpenStory }) {
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

    // Warm golden dust particles
    const dustMotes = Array.from({ length: 65 }, () => ({
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
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

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
      padding: '32px 20px',
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
        padding: '52px 40px',
        borderRadius: '28px',
        background: 'rgba(20, 10, 6, 0.78)',
        backdropFilter: 'blur(20px)',
        border: '2px solid rgba(255, 215, 0, 0.35)',
        boxShadow: '0 25px 70px rgba(0, 0, 0, 0.95), 0 0 40px rgba(177, 18, 38, 0.3)'
      }}>
        {/* Pulsing Crimson Heart Icon */}
        <div style={{ display: 'inline-block', marginBottom: '14px' }}>
          <Heart size={52} color="#B11226" fill="#B11226" className="heart-pulse" />
        </div>

        {/* Heading in Elegant Serif Italic Font (Matching 2nd Image Style) */}
        <h1 className="font-serif gold-text" style={{
          fontSize: 'clamp(2.4rem, 5.2vw, 4.2rem)',
          fontStyle: 'italic',
          fontWeight: '700',
          lineHeight: '1.25',
          marginBottom: '18px',
          letterSpacing: '0.02em',
          filter: 'drop-shadow(0 4px 15px rgba(0,0,0,0.95))'
        }}>
          Happy Girlfriend's Day for My Gorgeous Girl ❤️
        </h1>

        {/* Subtitle Quote */}
        <p className="font-serif" style={{
          fontSize: 'clamp(1.15rem, 2.2vw, 1.45rem)',
          color: '#FFF8DC',
          fontStyle: 'italic',
          lineHeight: '1.6',
          marginBottom: '32px',
          letterSpacing: '0.02em',
          textShadow: '0 2px 12px rgba(0,0,0,0.95)'
        }}>
          "Every page of my life became beautiful because you became my favorite chapter."
        </p>

        {/* High-Contrast Inner Story Box */}
        <div style={{
          backgroundColor: 'rgba(10, 5, 2, 0.75)',
          padding: '28px 32px',
          borderRadius: '18px',
          border: '1.5px solid rgba(255, 215, 0, 0.35)',
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)',
          marginBottom: '40px',
          color: '#FFF8DC',
          fontSize: '1.15rem',
          lineHeight: '1.8',
          fontFamily: "'Cormorant Garamond', serif"
        }}>
          <p style={{ marginBottom: '12px', color: '#FFF8DC', textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}>
            This isn't just a website.
          </p>
          <p style={{ marginBottom: '12px', color: '#FFF8DC', textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}>
            It's a little book filled with the moments, memories, and emotions that I could never express completely with words.
          </p>
          <p style={{ fontWeight: '700', color: '#FFD700', textShadow: '0 2px 8px rgba(0,0,0,0.95)' }}>
            Today I want you to open it, one page at a time.
          </p>
        </div>

        {/* Shimmering Golden Button */}
        <button
          onClick={onOpenStory}
          className="btn-vintage"
          style={{
            fontSize: '1.25rem',
            padding: '18px 48px',
            borderRadius: '50px'
          }}
        >
          <BookOpen size={24} color="#FFF8DC" /> OPEN OUR STORY
        </button>
      </div>

      {/* Footer subtle sign-off */}
      <div style={{
        position: 'absolute',
        bottom: '24px',
        fontSize: '0.85rem',
        color: '#D4AF37',
        letterSpacing: '0.12em',
        fontFamily: "'Cinzel', serif",
        textShadow: '0 2px 8px rgba(0,0,0,0.9)'
      }}>
        FOR DIVYA • WRITTEN BY KIRAN WITH LOVE
      </div>
    </div>
  );
}
