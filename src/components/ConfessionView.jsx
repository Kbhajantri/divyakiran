import React, { useState, useEffect, useRef } from 'react';
import { Heart, Sparkles, X, ChevronRight, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ConfessionView({ onClose, onComplete }) {
  const [step, setStep] = useState(1);
  const [isYesClicked, setIsYesClicked] = useState(false);
  const canvasRef = useRef(null);

  // Soft slow fireworks & blooming petals when YES is clicked
  useEffect(() => {
    if (!isYesClicked) return;

    const count = 220;
    const defaults = { origin: { y: 0.65 } };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 30,
      startVelocity: 55,
      colors: ['#B11226', '#FF4D4D', '#E8C77A']
    });
    fire(0.2, {
      spread: 70,
      colors: ['#E8C77A', '#FFFFFF', '#B11226']
    });
    fire(0.35, {
      spread: 110,
      decay: 0.92,
      scalar: 0.85,
      colors: ['#B11226', '#E8C77A']
    });
    fire(0.1, {
      spread: 130,
      startVelocity: 30,
      colors: ['#FFFFFF', '#FF1E27']
    });

    const interval = setInterval(() => {
      confetti({
        particleCount: 20,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
        colors: ['#B11226', '#E8C77A']
      });
      confetti({
        particleCount: 20,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
        colors: ['#B11226', '#E8C77A']
      });
    }, 1400);

    return () => clearInterval(interval);
  }, [isYesClicked]);

  // Starfield background canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const stars = Array.from({ length: 140 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.02 + 0.005
    }));

    let animId;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((star) => {
        star.alpha += star.speed;
        if (star.alpha > 1 || star.alpha < 0.2) {
          star.speed = -star.speed;
        }
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(star.alpha)})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
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
      zIndex: 9995,
      backgroundColor: '#0B0B0B',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      overflow: 'hidden'
    }}>
      {/* Starfield Canvas */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

      {/* Floating Bloom Light when YES is clicked */}
      {isYesClicked && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle, rgba(232,199,122,0.2) 0%, rgba(177,18,38,0.3) 50%, rgba(11,11,11,0.95) 100%)',
          pointerEvents: 'none',
          animation: 'fadeIn 1s ease'
        }} />
      )}

      {/* Floating Petals */}
      {isYesClicked && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="floating-petal"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s`,
                fontSize: `${16 + Math.random() * 14}px`
              }}
            >
              🌸
            </div>
          ))}
        </div>
      )}

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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }}
      >
        <X size={20} />
      </button>

      {/* Main Experience Glass Panel */}
      <div className="glass-panel" style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '740px',
        width: '100%',
        padding: '44px 36px',
        borderRadius: '24px',
        textAlign: 'center',
        boxShadow: '0 25px 70px rgba(177, 18, 38, 0.4)',
        border: '1px solid rgba(232, 199, 122, 0.3)'
      }}>
        {/* Heartbeat pulse icon */}
        <div style={{ display: 'inline-block', marginBottom: '16px' }}>
          <Heart size={48} fill="#B11226" color="#B11226" className="pulse-heart" />
        </div>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <span style={{
            fontSize: '0.8rem',
            color: '#B11226',
            fontWeight: '700',
            letterSpacing: '0.12em',
            textTransform: 'uppercase'
          }}>
            EPISODE 06 • THE CONFESSION
          </span>
          <h2 className="font-cinzel gold-gradient-text" style={{ fontSize: '2.4rem', fontWeight: '800', marginTop: '6px' }}>
            28 June 2026 — 3:07 AM
          </h2>
        </div>

        {/* Step 1: 27 June Prelude */}
        {step === 1 && (
          <div>
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              padding: '24px 28px',
              borderRadius: '16px',
              borderLeft: '4px solid #E8C77A',
              textAlign: 'left',
              marginBottom: '36px'
            }}>
              <span style={{ fontSize: '0.85rem', color: '#E8C77A', fontWeight: '600' }}>27 June 2026</span>
              <p style={{ fontSize: '1.2rem', color: '#FFF', marginTop: '8px', lineHeight: '1.6' }}>
                Told one-sided love story.
              </p>
              <p style={{ fontSize: '1.2rem', color: '#9CA3AF', marginTop: '4px' }}>
                Never revealed the girl's name.
              </p>
            </div>

            <button
              onClick={() => setStep(2)}
              className="btn-cinematic"
              style={{ fontSize: '1.1rem', padding: '16px 36px' }}
            >
              Advance to 3:07 AM <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Step 2: The Reveal: "The girl was you." */}
        {step === 2 && (
          <div>
            <div style={{
              backgroundColor: 'rgba(177, 18, 38, 0.18)',
              padding: '30px',
              borderRadius: '18px',
              border: '1px solid rgba(177, 18, 38, 0.6)',
              marginBottom: '36px'
            }}>
              <span style={{ fontSize: '0.9rem', color: '#FF4D4D', fontWeight: '700', letterSpacing: '0.08em' }}>
                28 June 2026 – 3:07 AM
              </span>
              <h3 className="font-cinzel red-gradient-text" style={{
                fontSize: '2.4rem',
                marginTop: '12px',
                fontWeight: '900'
              }}>
                "The girl was you."
              </h3>
            </div>

            <button
              onClick={() => setStep(3)}
              className="btn-cinematic"
              style={{ fontSize: '1.1rem', padding: '16px 36px' }}
            >
              See My Confession <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Step 3: Confession Line */}
        {step === 3 && (
          <div>
            <div style={{
              padding: '30px 32px',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, rgba(232, 199, 122, 0.15), rgba(177, 18, 38, 0.18))',
              border: '1px solid rgba(232, 199, 122, 0.4)',
              marginBottom: '36px'
            }}>
              <p className="font-cinzel" style={{
                fontSize: '1.45rem',
                color: '#FFF',
                fontStyle: 'italic',
                lineHeight: '1.6'
              }}>
                "Before you become someone else's forever... Can I at least try to be yours?"
              </p>
            </div>

            <button
              onClick={() => setStep(4)}
              className="btn-cinematic"
              style={{ fontSize: '1.1rem', padding: '16px 36px' }}
            >
              Her Question... <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Step 4: She asks & My reply */}
        {step === 4 && (
          <div>
            {/* Her Question */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              padding: '22px 26px',
              borderRadius: '14px',
              textAlign: 'left',
              marginBottom: '20px',
              borderLeft: '4px solid #A1A1AA'
            }}>
              <span style={{ fontSize: '0.8rem', color: '#9CA3AF', fontWeight: '600' }}>Divya asked:</span>
              <p style={{ fontSize: '1.25rem', color: '#FFF', marginTop: '4px', fontStyle: 'italic' }}>
                "What if things go wrong?"
              </p>
            </div>

            {/* My Reply */}
            <div style={{
              backgroundColor: 'rgba(177, 18, 38, 0.18)',
              padding: '24px 26px',
              borderRadius: '14px',
              textAlign: 'left',
              marginBottom: '36px',
              borderLeft: '4px solid #B11226'
            }}>
              <span style={{ fontSize: '0.8rem', color: '#FF4D4D', fontWeight: '600' }}>My reply:</span>
              <p style={{ fontSize: '1.2rem', color: '#FFF', marginTop: '6px', lineHeight: '1.6' }}>
                "No one knows the future. Today's efforts decide tomorrow. Let's build something beautiful... slowly and honestly."
              </p>
            </div>

            {!isYesClicked ? (
              <button
                onClick={() => {
                  setIsYesClicked(true);
                  if (onComplete) onComplete();
                }}
                className="btn-cinematic"
                style={{
                  fontSize: '1.5rem',
                  padding: '18px 52px',
                  borderRadius: '50px',
                  boxShadow: '0 0 40px rgba(177, 18, 38, 0.9)'
                }}
              >
                YES ❤️
              </button>
            ) : (
              <div style={{ marginTop: '20px' }}>
                <h1 className="red-gradient-text font-cinzel" style={{ fontSize: '3.6rem', fontWeight: '900' }}>
                  YES ❤️
                </h1>
                <p className="gold-gradient-text" style={{ fontSize: '1.3rem', marginTop: '8px' }}>
                  Our Story Truly Began ✨
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
