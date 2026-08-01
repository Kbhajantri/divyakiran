import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, Heart, Maximize2, Minimize2 } from 'lucide-react';

export default function JourneyViewer({ pages }) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isCloseViewOn, setIsCloseViewOn] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      padding: isMobile ? '70px 10px 80px 10px' : '30px 16px 60px 16px',
      overflowX: 'hidden',
      position: 'relative'
    }}>
      {/* Top Header — Title, Close View Button & Page Counter */}
      <div style={{
        width: isMobile ? '96vw' : (isCloseViewOn ? '75vw' : '55vw'),
        maxWidth: '1100px',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'flex-start' : 'center',
        marginBottom: isMobile ? '14px' : '20px',
        gap: isMobile ? '10px' : '0',
        transition: 'width 0.4s ease'
      }}>
        <div>
          <span style={{ fontSize: isMobile ? '0.75rem' : '0.85rem', color: '#B11226', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            OUR JOURNEY • PAGE {currentPageIndex + 1} OF {totalPages}
          </span>
          <h1 className="font-cinzel gold-text" style={{ fontSize: isMobile ? '1.35rem' : '1.9rem', fontWeight: '800', marginTop: '2px' }}>
            {currentPage.chapterTitle || `Page ${currentPageIndex + 1}`}
          </h1>
        </div>

        {/* Close View Button & Page Counter */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: isMobile ? 'space-between' : 'flex-end',
          width: isMobile ? '100%' : 'auto',
          gap: '12px'
        }}>
          <button
            onClick={() => setIsCloseViewOn(!isCloseViewOn)}
            className="btn-vintage"
            style={{
              padding: isMobile ? '6px 14px' : '8px 20px',
              fontSize: isMobile ? '0.8rem' : '0.9rem',
              width: 'auto',
              background: isCloseViewOn
                ? 'linear-gradient(135deg, #B11226 0%, #7A0A18 100%)'
                : 'rgba(18, 18, 22, 0.85)',
              borderColor: isCloseViewOn ? '#FFF' : '#D4AF37',
              boxShadow: isCloseViewOn ? '0 0 15px rgba(177,18,38,0.7)' : 'none'
            }}
          >
            {isCloseViewOn ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            {isCloseViewOn ? 'Close View ON' : 'Close View'}
          </button>

          <span className="font-serif" style={{ color: '#E8C77A', fontSize: isMobile ? '0.95rem' : '1.05rem', fontWeight: '600' }}>
            Page {currentPageIndex + 1} / {totalPages}
          </span>
        </div>
      </div>

      {/* Main Container — Dynamically resizes */}
      <div style={{
        position: 'relative',
        width: isMobile ? '96vw' : (isCloseViewOn ? '75vw' : '55vw'),
        maxWidth: isMobile ? '100%' : (isCloseViewOn ? '1100px' : '900px'),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'width 0.4s ease, max-width 0.4s ease'
      }}>
        {/* Left Navigation Button */}
        {currentPageIndex > 0 && (
          <button
            disabled={!isCloseViewOn}
            onClick={handlePrev}
            style={{
              position: 'fixed',
              left: isMobile ? '12px' : (isCloseViewOn ? 'calc(12.5vw - 65px)' : 'calc(22.5vw - 65px)'),
              top: isMobile ? 'auto' : '50%',
              bottom: isMobile ? '16px' : 'auto',
              transform: isMobile ? 'none' : 'translateY(-50%)',
              zIndex: 99,
              backgroundColor: isCloseViewOn ? 'rgba(18, 18, 22, 0.94)' : 'rgba(18, 18, 22, 0.4)',
              border: isCloseViewOn ? '1.5px solid rgba(232, 199, 122, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
              color: isCloseViewOn ? '#FFF' : '#6B7280',
              padding: isMobile ? '10px 16px' : '14px 20px',
              borderRadius: '50px',
              cursor: isCloseViewOn ? 'pointer' : 'not-allowed',
              opacity: isCloseViewOn ? 1 : 0.3,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: isCloseViewOn ? '0 8px 25px rgba(0, 0, 0, 0.9), 0 0 15px rgba(232, 199, 122, 0.3)' : 'none',
              backdropFilter: 'blur(12px)'
            }}
            title="Previous Page"
          >
            <ChevronLeft size={isMobile ? 18 : 22} color={isCloseViewOn ? '#E8C77A' : '#6B7280'} />
            <span className="font-serif" style={{ fontSize: isMobile ? '0.85rem' : '0.95rem', fontWeight: '600' }}>
              Prev
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
              borderRadius: isMobile ? '12px' : '16px',
              border: isCloseViewOn ? '2px solid rgba(232, 199, 122, 0.6)' : '1.5px solid rgba(232, 199, 122, 0.3)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.95)',
              overflow: 'hidden',
              backgroundColor: '#160D08',
              transition: 'all 0.4s ease',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              maxHeight: isCoverPage ? (isMobile ? '70vh' : '76vh') : 'none'
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
                    maxHeight: isCoverPage ? (isMobile ? '70vh' : '76vh') : 'auto',
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
            /* Refined Retro Vintage Finale Card */
            <div className="parchment-paper deckled-edge" style={{
              padding: isMobile ? '36px 20px' : '60px 48px',
              borderRadius: '20px',
              border: '3px solid #D4C3A3',
              boxShadow: '0 25px 70px rgba(0,0,0,0.9)',
              background: 'linear-gradient(135deg, #FAF3E0 0%, #F5E8D0 100%)',
              textAlign: 'center',
              width: '100%'
            }}>
              <span className="font-serif" style={{ fontSize: '0.9rem', color: '#721B29', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                {currentPage.seasonInfo || 'Finale'}
              </span>

              <h2 className="font-script" style={{
                fontSize: isMobile ? '2.4rem' : '3.8rem',
                color: '#721B29',
                marginTop: '8px',
                marginBottom: '16px',
                lineHeight: '1.2'
              }}>
                The Best Chapter Is Still Being Written ❤️
              </h2>

              <p className="font-serif" style={{
                fontSize: isMobile ? '1.05rem' : '1.35rem',
                color: '#3D2214',
                fontStyle: 'italic',
                lineHeight: '1.6',
                margin: '0 auto 24px auto'
              }}>
                "Every day with you becomes another beautiful page. And I promise... I'll keep writing our story forever."
              </p>

              <div style={{ display: 'inline-block', margin: '10px 0 16px 0' }}>
                <Heart size={isMobile ? 48 : 64} color="#721B29" fill="#721B29" className="heart-pulse" />
              </div>

              <h1 className="font-script" style={{
                fontSize: isMobile ? '2.2rem' : '3.2rem',
                color: '#721B29',
                fontWeight: '700',
                marginBottom: '28px'
              }}>
                Forever Yours, Kiran ❤️
              </h1>

              <button onClick={handleRestart} className="btn-vintage">
                <RotateCcw size={18} /> Restart Journey
              </button>
            </div>
          )}
        </div>

        {/* Right Navigation Button */}
        {currentPageIndex < totalPages - 1 && (
          <button
            disabled={!isCloseViewOn}
            onClick={handleNext}
            style={{
              position: 'fixed',
              right: isMobile ? '12px' : (isCloseViewOn ? 'calc(12.5vw - 65px)' : 'calc(22.5vw - 65px)'),
              top: isMobile ? 'auto' : '50%',
              bottom: isMobile ? '16px' : 'auto',
              transform: isMobile ? 'none' : 'translateY(-50%)',
              zIndex: 99,
              backgroundColor: isCloseViewOn ? 'rgba(177, 18, 38, 0.94)' : 'rgba(18, 18, 22, 0.4)',
              border: isCloseViewOn ? '1.5px solid #D4AF37' : '1px solid rgba(255, 255, 255, 0.1)',
              color: isCloseViewOn ? '#FFF' : '#6B7280',
              padding: isMobile ? '10px 18px' : '14px 22px',
              borderRadius: '50px',
              cursor: isCloseViewOn ? 'pointer' : 'not-allowed',
              opacity: isCloseViewOn ? 1 : 0.3,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: isCloseViewOn ? '0 8px 25px rgba(177, 18, 38, 0.8), 0 0 20px rgba(212, 175, 55, 0.5)' : 'none',
              backdropFilter: 'blur(12px)'
            }}
            title="Next Page"
          >
            <span className="font-serif" style={{ fontSize: isMobile ? '0.9rem' : '1rem', fontWeight: '700' }}>
              Next Page
            </span>
            <ChevronRight size={isMobile ? 18 : 22} color={isCloseViewOn ? '#FFF' : '#6B7280'} />
          </button>
        )}
      </div>
    </div>
  );
}
