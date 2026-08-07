import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

export default function JourneyViewer({ pages }) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1100;

  const totalPages = pages.length;
  const currentPage = pages[currentPageIndex];
  // Size the 1st page (Cover), 18th page (Portrait), and 19th page (Finale) with exact identical portrait dimensions
  const isCoverPage = currentPageIndex === 0 || currentPageIndex === totalPages - 2 || currentPageIndex === totalPages - 1 || !!currentPage?.isPortraitPage;

  const handleNext = () => {
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

  // Compute manuscript card width dynamically so 1st, 18th, and 19th pages are identical in size on all screens
  const getCardWidth = () => {
    if (isCoverPage) {
      return isMobile ? '92vw' : (isTablet ? 'min(62vw, 620px)' : 'min(48vw, 560px)');
    }
    if (isMobile) return '96vw';
    if (isTablet) return 'calc(100vw - 260px)';
    return 'min(72vw, 1000px)';
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
      {/* Top Header — Title & Page Counter */}
      <div style={{
        width: getCardWidth(),
        maxWidth: isCoverPage ? '560px' : '1000px',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'flex-start' : 'center',
        marginBottom: isMobile ? '14px' : '20px',
        gap: isMobile ? '8px' : '0',
        transition: 'width 0.3s ease, max-width 0.3s ease'
      }}>
        <div>
          <span style={{ fontSize: isMobile ? '0.75rem' : '0.85rem', color: '#B11226', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            OUR JOURNEY • PAGE {currentPageIndex + 1} OF {totalPages}
          </span>
          <h1 className="font-cinzel gold-text" style={{ fontSize: isMobile ? '1.35rem' : '1.9rem', fontWeight: '800', marginTop: '2px' }}>
            {currentPage.chapterTitle || `Page ${currentPageIndex + 1}`}
          </h1>
        </div>

        {/* Clean Page Counter */}
        <span className="font-serif" style={{ color: '#E8C77A', fontSize: isMobile ? '0.95rem' : '1.05rem', fontWeight: '600' }}>
          Page {currentPageIndex + 1} / {totalPages}
        </span>
      </div>

      {/* Main Container */}
      <div style={{
        position: 'relative',
        width: getCardWidth(),
        maxWidth: isCoverPage ? '560px' : '1000px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'width 0.3s ease, max-width 0.3s ease'
      }}>
        {/* Floating Left Side Navigation Button — Positioned safely outside manuscript card */}
        {currentPageIndex > 0 && (
          <button
            onClick={handlePrev}
            style={{
              position: 'fixed',
              left: isMobile ? '12px' : (isTablet ? '16px' : '24px'),
              top: isMobile ? 'auto' : '50%',
              bottom: isMobile ? '16px' : 'auto',
              transform: isMobile ? 'none' : 'translateY(-50%)',
              zIndex: 99,
              backgroundColor: 'rgba(18, 18, 22, 0.94)',
              border: '1.5px solid rgba(232, 199, 122, 0.5)',
              color: '#FFF',
              padding: isMobile ? '10px 16px' : '14px 20px',
              borderRadius: '50px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.9), 0 0 15px rgba(232, 199, 122, 0.3)',
              backdropFilter: 'blur(12px)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = isMobile ? 'scale(1.05)' : 'translateY(-50%) scale(1.08)';
              e.currentTarget.style.borderColor = '#FFF';
              e.currentTarget.style.backgroundColor = 'rgba(177, 18, 38, 0.95)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = isMobile ? 'none' : 'translateY(-50%) scale(1)';
              e.currentTarget.style.borderColor = 'rgba(232, 199, 122, 0.5)';
              e.currentTarget.style.backgroundColor = 'rgba(18, 18, 22, 0.94)';
            }}
            title="Previous Page"
          >
            <ChevronLeft size={isMobile ? 18 : 22} color="#E8C77A" />
            <span className="font-serif" style={{ fontSize: isMobile ? '0.85rem' : '0.95rem', fontWeight: '600' }}>
              Prev
            </span>
          </button>
        )}

        {/* Parchment Card Container with Dark Black Shade Background & Matching Thin Gold Border */}
        <div style={{
          width: '100%',
          opacity: isFlipping ? 0.25 : 1,
          transform: isFlipping ? 'scale(0.985)' : 'scale(1)',
          transition: 'opacity 0.25s ease, transform 0.25s ease',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div style={{
            borderRadius: isMobile ? '12px' : '16px',
            border: '1.5px solid rgba(232, 199, 122, 0.35)',
            boxShadow: '0 25px 70px rgba(0,0,0,0.98), 0 0 25px rgba(177,18,38,0.2)',
            overflow: 'hidden',
            backgroundColor: '#050508',
            padding: isMobile ? '4px' : '6px',
            transition: 'all 0.3s ease',
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
              overflow: 'hidden',
              backgroundColor: '#050508'
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
        </div>

        {/* Floating Right Side Navigation Button: Next Page (Pages 1..18) or Restart Journey (Page 19) */}
        {currentPageIndex < totalPages - 1 ? (
          <button
            onClick={handleNext}
            style={{
              position: 'fixed',
              right: isMobile ? '12px' : (isTablet ? '16px' : '24px'),
              top: isMobile ? 'auto' : '50%',
              bottom: isMobile ? '16px' : 'auto',
              transform: isMobile ? 'none' : 'translateY(-50%)',
              zIndex: 99,
              backgroundColor: 'rgba(177, 18, 38, 0.94)',
              border: '1.5px solid #D4AF37',
              color: '#FFF',
              padding: isMobile ? '10px 18px' : '14px 22px',
              borderRadius: '50px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 8px 25px rgba(177, 18, 38, 0.8), 0 0 20px rgba(212, 175, 55, 0.5)',
              backdropFilter: 'blur(12px)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = isMobile ? 'scale(1.05)' : 'translateY(-50%) scale(1.08)';
              e.currentTarget.style.borderColor = '#FFF';
              e.currentTarget.style.backgroundColor = '#B11226';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = isMobile ? 'none' : 'translateY(-50%) scale(1)';
              e.currentTarget.style.borderColor = '#D4AF37';
              e.currentTarget.style.backgroundColor = 'rgba(177, 18, 38, 0.94)';
            }}
            title="Next Page"
          >
            <span className="font-serif" style={{ fontSize: isMobile ? '0.9rem' : '1rem', fontWeight: '700' }}>
              Next Page
            </span>
            <ChevronRight size={isMobile ? 18 : 22} color="#FFF" />
          </button>
        ) : (
          <button
            onClick={handleRestart}
            style={{
              position: 'fixed',
              right: isMobile ? '12px' : (isTablet ? '16px' : '24px'),
              top: isMobile ? 'auto' : '50%',
              bottom: isMobile ? '16px' : 'auto',
              transform: isMobile ? 'none' : 'translateY(-50%)',
              zIndex: 99,
              backgroundColor: 'rgba(177, 18, 38, 0.94)',
              border: '1.5px solid #D4AF37',
              color: '#FFF',
              padding: isMobile ? '10px 18px' : '14px 22px',
              borderRadius: '50px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 8px 25px rgba(177, 18, 38, 0.8), 0 0 20px rgba(212, 175, 55, 0.5)',
              backdropFilter: 'blur(12px)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = isMobile ? 'scale(1.05)' : 'translateY(-50%) scale(1.08)';
              e.currentTarget.style.borderColor = '#FFF';
              e.currentTarget.style.backgroundColor = '#B11226';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = isMobile ? 'none' : 'translateY(-50%) scale(1)';
              e.currentTarget.style.borderColor = '#D4AF37';
              e.currentTarget.style.backgroundColor = 'rgba(177, 18, 38, 0.94)';
            }}
            title="Restart Journey"
          >
            <span className="font-serif" style={{ fontSize: isMobile ? '0.9rem' : '1rem', fontWeight: '700' }}>
              Restart Journey
            </span>
            <RotateCcw size={isMobile ? 16 : 18} color="#FFD700" />
          </button>
        )}
      </div>
    </div>
  );
}
