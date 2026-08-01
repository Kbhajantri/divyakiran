import React, { useState } from 'react';
import { BookOpen, Sparkles, Heart } from 'lucide-react';

export default function BookCoverView({ onOpenCover }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpenCover();
    }, 900);
  };

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      width: '100%',
      backgroundColor: '#1A0E08',
      backgroundImage: 'radial-gradient(circle at 50% 40%, rgba(255, 209, 102, 0.15) 0%, rgba(44, 26, 14, 0.95) 75%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px',
      overflow: 'hidden'
    }}>
      {/* Candlelight Warm Glow Overlay */}
      <div className="candle-glow" style={{
        position: 'absolute',
        top: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255, 209, 102, 0.2) 0%, rgba(0, 0, 0, 0) 70%)',
        pointerEvents: 'none'
      }} />

      {/* Antique Wooden Table Backdrop Container */}
      <div className="book-perspective" style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '520px',
        width: '100%',
        margin: '0 auto'
      }}>
        {/* Leather-Bound Book Cover Card */}
        <div
          className="leather-cover"
          style={{
            position: 'relative',
            width: '100%',
            minHeight: '620px',
            padding: '48px 36px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            textAlign: 'center',
            transform: isOpening ? 'rotateY(-90deg) scale(0.95)' : 'rotateY(0deg) scale(1)',
            transformOrigin: 'left center',
            transition: 'transform 0.9s cubic-bezier(0.645, 0.045, 0.355, 1)',
            userSelect: 'none'
          }}
        >
          {/* Gold Embossed Corner Ornaments */}
          <div style={{
            position: 'absolute',
            top: '18px',
            left: '18px',
            fontSize: '1.8rem',
            color: '#D4AF37'
          }}>
            ❧
          </div>
          <div style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            fontSize: '1.8rem',
            color: '#D4AF37',
            transform: 'scaleX(-1)'
          }}>
            ❧
          </div>
          <div style={{
            position: 'absolute',
            bottom: '18px',
            left: '18px',
            fontSize: '1.8rem',
            color: '#D4AF37',
            transform: 'scaleY(-1)'
          }}>
            ❧
          </div>
          <div style={{
            position: 'absolute',
            bottom: '18px',
            right: '18px',
            fontSize: '1.8rem',
            color: '#D4AF37',
            transform: 'scale(-1)'
          }}>
            ❧
          </div>

          {/* Inner Golden Border Line */}
          <div style={{
            position: 'absolute',
            inset: '24px',
            border: '2px double #D4AF37',
            borderRadius: '6px',
            pointerEvents: 'none'
          }} />

          {/* Top Vintage Crest */}
          <div style={{ marginTop: '20px' }}>
            <span style={{ fontSize: '1.4rem', color: '#D4AF37' }}>❦</span>
            <div style={{
              fontSize: '0.85rem',
              color: '#F5E5C9',
              letterSpacing: '0.2em',
              fontFamily: "'Cinzel', serif",
              marginTop: '6px'
            }}>
              VOL. I • HANDCRAFTED EDITION
            </div>
          </div>

          {/* Book Title */}
          <div style={{ margin: '30px 0' }}>
            <h1 className="font-title gold-foil-text" style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.6rem)',
              fontWeight: '900',
              letterSpacing: '0.06em',
              lineHeight: '1.2',
              textTransform: 'uppercase',
              marginBottom: '14px'
            }}>
              Our Love Story
            </h1>

            <div style={{
              width: '80px',
              height: '2px',
              backgroundColor: '#D4AF37',
              margin: '0 auto 16px auto',
              boxShadow: '0 0 8px #D4AF37'
            }} />

            <p className="font-script" style={{
              fontSize: '1.8rem',
              color: '#F5E5C9',
              lineHeight: '1.4'
            }}>
              For the most beautiful girl in my world ❤️
            </p>
          </div>

          {/* Wax Seal & Open Action */}
          <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            {/* Wax Seal Graphic */}
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#8B0000',
              border: '3px solid #D4AF37',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(0,0,0,0.8), inset 0 0 10px rgba(0,0,0,0.6)'
            }}>
              <Heart size={28} fill="#D4AF37" color="#D4AF37" />
            </div>

            <button
              onClick={handleOpen}
              className="btn-vintage"
              style={{
                fontSize: '1.1rem',
                padding: '14px 38px'
              }}
            >
              <BookOpen size={20} color="#F5E5C9" /> Open Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
