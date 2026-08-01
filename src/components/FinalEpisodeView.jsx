import React, { useEffect, useState, useRef } from 'react';
import { Heart, Sparkles, X, Play, Music, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FinalEpisodeView({ onClose, episode }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [showGrandEnding, setShowGrandEnding] = useState(false);
  const canvasRef = useRef(null);

  const memoryPolaroids = [
    { src: '/assets/ep1.png', title: 'First Semester', date: '2022', caption: 'The First Time I Saw You • Silent Smile' },
    { src: '/assets/ep2.png', title: 'Second Year', date: '2023', caption: 'The Waiting • Rohit Sir Presentation' },
    { src: '/assets/ep3.png', title: 'Third Year', date: '2024', caption: 'The First Words • DBMS Lab & Black Kurta' },
    { src: '/assets/ep4.png', title: 'Internship', date: '6 April 2025', caption: 'Distance • First Message at 7:57 PM' },
    { src: '/assets/ep5.png', title: 'Scooty & Trips', date: 'May–June 2026', caption: 'Delta Falls, Hubballi Ride, KFC & Kunda' },
    { src: '/assets/ep6.png', title: 'The Confession', date: '28 June 2026', caption: '3:07 AM • "The girl was you."' },
    { src: '/assets/ep7.png', title: 'Our Story Begins', date: 'July 2026', caption: 'Yallur Fort & Birthday Surprise Video' },
    { src: '/assets/ep_final.png', title: 'Forever', date: 'Forever', caption: 'Happy Girlfriend\'s Day, My Love ❤️' }
  ];

  // Auto carousel slide transition
  useEffect(() => {
    if (showGrandEnding) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => {
        if (prev >= memoryPolaroids.length - 1) {
          setShowGrandEnding(true);
          return prev;
        }
        return prev + 1;
      });
    }, 4500);
    return () => clearInterval(timer);
  }, [showGrandEnding]);

  // Cosmic starry canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const stars = Array.from({ length: 160 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 0.5,
      a: Math.random() * 0.8 + 0.2,
      sa: (Math.random() - 0.5) * 0.02
    }));

    let animId;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((s) => {
        s.a += s.sa;
        if (s.a > 1 || s.a < 0.2) s.sa = -s.sa;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(s.a)})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      backgroundColor: '#0B0B0B',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflowY: 'auto',
      padding: '40px 24px'
    }}>
      {/* Starry canvas background */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '24px',
          right: '24px',
          zIndex: 100,
          background: 'rgba(255,255,255,0.1)',
          border: 'none',
          color: '#FFF',
          width: '42px',
          height: '42px',
          borderRadius: '50%',
          cursor: 'pointer'
        }}
      >
        <X size={20} />
      </button>

      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '860px',
        width: '100%',
        textAlign: 'center'
      }}>
        {!showGrandEnding ? (
          <>
            {/* Pulsing Red Heart */}
            <div style={{ display: 'inline-block', marginBottom: '16px' }}>
              <Heart size={64} fill="#B11226" color="#B11226" className="pulse-heart" />
            </div>

            <h1 className="font-cinzel gold-gradient-text" style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              fontWeight: '900',
              marginBottom: '12px'
            }}>
              Happy Girlfriend's Day, My Love ❤️
            </h1>

            <p style={{
              fontSize: '1.15rem',
              color: '#E5E7EB',
              marginBottom: '36px',
              fontStyle: 'italic'
            }}>
              Cinematic Polaroid Memories (Playing Kiran's Guitar Audio 🎸)
            </p>

            {/* Polaroid Memory Frame with Ken Burns Zoom */}
            <div className="polaroid-card" style={{
              maxWidth: '680px',
              margin: '0 auto 36px auto'
            }}>
              <div style={{ height: '380px', overflow: 'hidden', borderRadius: '6px', position: 'relative' }}>
                <img
                  src={memoryPolaroids[activeSlide].src}
                  alt="Polaroid Memory"
                  className="ken-burns"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(11,11,11,0.9) 100%)'
                }} />
              </div>

              <div style={{ padding: '16px 10px 0 10px', textAlign: 'center' }}>
                <h3 className="font-cinzel" style={{ fontSize: '1.3rem', color: '#FFF', fontWeight: '700' }}>
                  {memoryPolaroids[activeSlide].title} • {memoryPolaroids[activeSlide].date}
                </h3>
                <p style={{ color: '#E8C77A', fontSize: '0.9rem', marginTop: '4px' }}>
                  {memoryPolaroids[activeSlide].caption}
                </p>
              </div>
            </div>

            {/* Slide Navigation dots */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
              {memoryPolaroids.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  style={{
                    width: activeSlide === i ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '50px',
                    backgroundColor: activeSlide === i ? '#B11226' : 'rgba(255,255,255,0.2)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => setShowGrandEnding(true)}
              className="btn-cinematic"
              style={{ fontSize: '1rem', padding: '12px 30px' }}
            >
              Reveal Grand Finale Message ✨
            </button>
          </>
        ) : (
          /* Grand Finale Ending Sequence */
          <div className="glass-panel" style={{
            padding: '48px 36px',
            borderRadius: '24px',
            border: '1px solid rgba(232, 199, 122, 0.4)',
            background: 'linear-gradient(135deg, rgba(177, 18, 38, 0.2), rgba(232, 199, 122, 0.15))'
          }}>
            {/* Ending Quote */}
            <p className="font-cinzel" style={{
              fontSize: '1.5rem',
              color: '#FFF',
              lineHeight: '1.8',
              marginBottom: '28px',
              fontStyle: 'italic',
              whiteSpace: 'pre-line'
            }}>
              "Every love story has a beginning.{"\n"}
              Ours began with a silent smile in the first semester...{"\n"}
              and it's still being written. ❤️"
            </p>

            <h3 className="font-cinzel gold-gradient-text" style={{
              fontSize: '1.8rem',
              fontWeight: '700',
              marginBottom: '32px'
            }}>
              Happy Girlfriend's Day, My Love
            </h3>

            {/* Red Heart Slowly Beats */}
            <div style={{ display: 'inline-block', marginBottom: '32px' }}>
              <Heart size={72} fill="#B11226" color="#B11226" className="pulse-heart" />
            </div>

            {/* Final Signoff */}
            <h1 className="font-cinzel red-gradient-text" style={{
              fontSize: '2.8rem',
              fontWeight: '900',
              letterSpacing: '0.06em'
            }}>
              Forever Yours, Kiran ❤️
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}
