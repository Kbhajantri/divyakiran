import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, Heart, Maximize2, Minimize2 } from 'lucide-react';

export default function JourneyViewer({ pages }) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isCloseViewOn, setIsCloseViewOn] = useState(true); // Close View Mode (Default ON)

  const totalPages = pages.length;
  const currentPage = pages[currentPageIndex];
  const isCoverPage = currentPageIndex === 0;

  const handleNext = () => {
    if (!isCloseViewOn) return;
    if (currentPageIndex < totalPages - 1 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPageIndex((prev) => prev + 1);
        setIsFlipping(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 250);
    }
  };

  const handlePrev = () => {
    if (!isCloseViewOn) return;
    if (currentPageIndex > 0 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPageIndex((prev) => prev - 1);
        setIsFlipping(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 250);
    }
  };

  const handleRestart = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPageIndex(0);
      setIsFlipping(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 250);
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      backgroundColor: '#070709',
      backgroundImage: 'radial-gradient(circle at 50% 25%, rgba(177, 18, 38, 0.18) 0%, rgba(7, 7, 9, 0.98) 75%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '30px 16px 60px 16px',
      overflowX: 'hidden',
      position: 'relative'
    }}>
      {/* Top Header — Title, Close View Button & Page Counter */}
      <div style={{
        width: isCloseViewOn ? '75vw' : '55vw',
        maxWidth: '1100px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        transition: 'width 0.4s ease'
      }}>
        <div>
          <span style={{ fontSize: '0.85rem', color: '#B11226', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            OUR JOURNEY • PAGE {currentPageIndex + 1} OF {totalPages}
          </span>
          <h1 className="font-cinzel gold-text" style={{ fontSize: '1.9rem', fontWeight: '800', marginTop: '2px' }}>
            {currentPage.chapterTitle || `Page ${currentPageIndex + 1}`}
          </h1>
        </div>

        {/* Close View Button & Page Counter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={() => setIsCloseViewOn(!isCloseViewOn)}
            className="btn-vintage"
            style={{
              padding: '8px 20px',
              fontSize: '0.9rem',
              background: isCloseViewOn
                ? 'linear-gradient(135deg, #B11226 0%, #7A0A18 100%)'
                : 'rgba(18, 18, 22, 0.85)',
              borderColor: isCloseViewOn ? '#FFF' : '#D4AF37',
              boxShadow: isCloseViewOn ? '0 0 20px rgba(177,18,38,0.7)' : 'none'
            }}
          >
            {isCloseViewOn ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            {isCloseViewOn ? 'Close View ON' : 'Close View'}
          </button>

          <span className="font-serif" style={{ color: '#E8C77A', fontSize: '1.05rem', fontWeight: '600' }}>
            Page {currentPageIndex + 1} / {totalPages}
          </span>
        </div>
      </div>

      {/* Main Container — Dynamically resizes when Close View is ON */}
      <div style={{
        position: 'relative',
        width: isCloseViewOn ? '75vw' : '55vw',
        maxWidth: isCloseViewOn ? '1100px' : '900px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'width 0.4s ease, max-width 0.4s ease'
      }}>
        {/* Floating Left Side Navigation Button (Enabled ONLY when Close View is ON) */}
        {currentPageIndex > 0 && (
          <button
            disabled={!isCloseViewOn}
            onClick={handlePrev}
            style={{
              position: 'fixed',
              left: isCloseViewOn ? 'calc(12.5vw - 65px)' : 'calc(22.5vw - 65px)',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 90,
              backgroundColor: isCloseViewOn ? 'rgba(18, 18, 22, 0.92)' : 'rgba(18, 18, 22, 0.4)',
              border: isCloseViewOn ? '1.5px solid rgba(232, 199, 122, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)',
              color: isCloseViewOn ? '#FFF' : '#6B7280',
              padding: '14px 20px',
              borderRadius: '50px',
              cursor: isCloseViewOn ? 'pointer' : 'not-allowed',
              opacity: isCloseViewOn ? 1 : 0.3,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: isCloseViewOn ? '0 8px 30px rgba(0, 0, 0, 0.85), 0 0 15px rgba(232, 199, 122, 0.25)' : 'none',
              backdropFilter: 'blur(12px)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onMouseEnter={(e) => {
              if (isCloseViewOn) {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
                e.currentTarget.style.borderColor = '#FFF';
                e.currentTarget.style.backgroundColor = 'rgba(177, 18, 38, 0.95)';
              }
            }}
            onMouseLeave={(e) => {
              if (isCloseViewOn) {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                e.currentTarget.style.borderColor = 'rgba(232, 199, 122, 0.4)';
                e.currentTarget.style.backgroundColor = 'rgba(18, 18, 22, 0.92)';
              }
            }}
            title={isCloseViewOn ? 'Previous Page' : 'Turn Close View ON to enable navigation'}
          >
            <ChevronLeft size={22} color={isCloseViewOn ? '#E8C77A' : '#6B7280'} />
            <span className="font-serif" style={{ fontSize: '0.95rem', fontWeight: '600' }}>
              Previous
            </span>
          </button>
        )}

        {/* Parchment Card Container */}
        <div style={{
          width: '100%',
          opacity: isFlipping ? 0.25 : 1,
          transform: isFlipping ? 'scale(0.985)' : 'scale(1)',
          transition: 'opacity 0.25s ease, transform 0.25s ease',
          display: 'flex',
          justifyContent: 'center'
        }}>
          {currentPage.exactImage ? (
            <div style={{
              borderRadius: '16px',
              border: isCloseViewOn ? '2.5px solid rgba(232, 199, 122, 0.6)' : '1.5px solid rgba(232, 199, 122, 0.3)',
              boxShadow: isCloseViewOn ? '0 30px 90px rgba(0,0,0,0.95), 0 0 35px rgba(177,18,38,0.3)' : '0 20px 60px rgba(0,0,0,0.85)',
              overflow: 'hidden',
              backgroundColor: '#160D08',
              transition: 'all 0.4s ease',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              maxHeight: isCoverPage ? '76vh' : 'none'
            }}>
              <div style={{
                position: 'relative',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                overflow: 'hidden'
              }}>
                <img
                  src={currentPage.exactImage}
                  alt={`Page ${currentPageIndex + 1}`}
                  style={{
                    width: isCoverPage ? 'auto' : '100%',
                    maxHeight: isCoverPage ? '76vh' : 'auto',
                    maxWidth: '100%',
                    objectFit: 'contain',
                    display: 'block',
                    imageRendering: '-webkit-optimize-contrast',
                    filter: 'contrast(1.05) brightness(1.02)'
                  }}
                />
              </div>
            </div>
          ) : (
            /* Refined High-Contrast Retro Vintage Finale Card */
            <div className="parchment-paper deckled-edge" style={{
              padding: '60px 48px',
              borderRadius: '20px',
              border: '3px solid #D4C3A3',
              boxShadow: '0 25px 70px rgba(0,0,0,0.9)',
              background: 'linear-gradient(135deg, #FAF3E0 0%, #F5E8D0 100%)',
              textAlign: 'center',
              width: '100%'
            }}>
              <span className="font-serif" style={{ fontSize: '1rem', color: '#721B29', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                {currentPage.seasonInfo || 'Finale'}
              </span>

              <h2 className="font-script" style={{
                fontSize: 'clamp(2.8rem, 5vw, 3.8rem)',
                color: '#721B29',
                marginTop: '8px',
                marginBottom: '20px',
                lineHeight: '1.2'
              }}>
                The Best Chapter Is Still Being Written ❤️
              </h2>

              <p className="font-serif" style={{
                fontSize: 'clamp(1.15rem, 2vw, 1.4rem)',
                color: '#3D2214',
                fontStyle: 'italic',
                lineHeight: '1.7',
                maxWidth: '700px',
                margin: '0 auto 28px auto'
              }}>
                "Every day with you becomes another beautiful page. And I promise... I'll keep writing our story forever."
              </p>

              <div style={{ display: 'inline-block', margin: '12px 0 20px 0' }}>
                <Heart size={64} color="#721B29" fill="#721B29" className="heart-pulse" />
              </div>

              <h1 className="font-script" style={{
                fontSize: 'clamp(2.5rem, 4.5vw, 3.2rem)',
                color: '#721B29',
                fontWeight: '700',
                marginBottom: '32px'
              }}>
                Forever Yours, Kiran ❤️
              </h1>

              <button onClick={handleRestart} className="btn-vintage">
                <RotateCcw size={20} /> Restart Journey
              </button>
            </div>
          )}
        </div>

        {/* Floating Right Side Navigation Button (Enabled ONLY when Close View is ON) */}
        {currentPageIndex < totalPages - 1 && (
          <button
            disabled={!isCloseViewOn}
            onClick={handleNext}
            style={{
              position: 'fixed',
              right: isCloseViewOn ? 'calc(12.5vw - 65px)' : 'calc(22.5vw - 65px)',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 90,
              backgroundColor: isCloseViewOn ? 'rgba(177, 18, 38, 0.92)' : 'rgba(18, 18, 22, 0.4)',
              border: isCloseViewOn ? '1.5px solid #D4AF37' : '1px solid rgba(255, 255, 255, 0.1)',
              color: isCloseViewOn ? '#FFF' : '#6B7280',
              padding: '14px 22px',
              borderRadius: '50px',
              cursor: isCloseViewOn ? 'pointer' : 'not-allowed',
              opacity: isCloseViewOn ? 1 : 0.3,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: isCloseViewOn ? '0 8px 30px rgba(177, 18, 38, 0.75), 0 0 20px rgba(212, 175, 55, 0.45)' : 'none',
              backdropFilter: 'blur(12px)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onMouseEnter={(e) => {
              if (isCloseViewOn) {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
                e.currentTarget.style.borderColor = '#FFF';
                e.currentTarget.style.backgroundColor = '#B11226';
              }
            }}
            onMouseLeave={(e) => {
              if (isCloseViewOn) {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                e.currentTarget.style.borderColor = '#D4AF37';
                e.currentTarget.style.backgroundColor = 'rgba(177, 18, 38, 0.92)';
              }
            }}
            title={isCloseViewOn ? 'Next Page' : 'Turn Close View ON to enable navigation'}
          >
            <span className="font-serif" style={{ fontSize: '1rem', fontWeight: '700', letterSpacing: '0.04em' }}>
              Next Page
            </span>
            <ChevronRight size={22} color={isCloseViewOn ? '#FFF' : '#6B7280'} />
          </button>
        )}
      </div>
    </div>
  );
}
