import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, Heart, Sparkles, BookOpen, Maximize2, ZoomIn } from 'lucide-react';
import { STORY_PAGES } from '../data/storyPages';

export default function BookSpread({ onRestartBook }) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [useExactImageMode, setUseExactImageMode] = useState(true);
  const [isZoomedIn, setIsZoomedIn] = useState(false);

  const totalPages = STORY_PAGES.length;
  const currentPage = STORY_PAGES[currentPageIndex];

  const handleNextPage = () => {
    if (currentPageIndex < totalPages - 1 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPageIndex((prev) => prev + 1);
        setIsFlipping(false);
      }, 400);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0 && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPageIndex((prev) => prev - 1);
        setIsFlipping(false);
      }, 400);
    }
  };

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      width: '100%',
      backgroundColor: '#1A0E08',
      backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(255, 209, 102, 0.12) 0%, rgba(44, 26, 14, 0.95) 80%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '36px 24px',
      overflow: 'hidden'
    }}>
      {/* View Mode Toggle Header for exact image */}
      {currentPage.exactImage && (
        <div style={{
          marginBottom: '20px',
          zIndex: 20,
          display: 'flex',
          gap: '12px',
          alignItems: 'center'
        }}>
          <button
            onClick={() => setUseExactImageMode(true)}
            className="btn-vintage"
            style={{
              padding: '8px 20px',
              fontSize: '0.85rem',
              background: useExactImageMode ? 'linear-gradient(135deg, #8B0000 0%, #5C0000 100%)' : 'rgba(44,26,14,0.8)',
              borderColor: useExactImageMode ? '#FFF' : '#D4AF37'
            }}
          >
            <BookOpen size={16} /> Show Original Manuscript Scan
          </button>
          <button
            onClick={() => setUseExactImageMode(false)}
            className="btn-vintage"
            style={{
              padding: '8px 20px',
              fontSize: '0.85rem',
              background: !useExactImageMode ? 'linear-gradient(135deg, #8B0000 0%, #5C0000 100%)' : 'rgba(44,26,14,0.8)',
              borderColor: !useExactImageMode ? '#FFF' : '#D4AF37'
            }}
          >
            <Sparkles size={16} /> Show Typography Mode
          </button>
        </div>
      )}

      {/* 3D Book Container */}
      <div className="book-perspective" style={{
        maxWidth: '1100px',
        width: '100%',
        margin: '0 auto'
      }}>
        {/* Book Open Spread Frame */}
        <div
          className="book-spread-container"
          style={{
            position: 'relative',
            width: '100%',
            minHeight: '680px',
            display: 'flex',
            borderRadius: '12px',
            boxShadow: '0 25px 75px rgba(0, 0, 0, 0.95)',
            border: '8px solid #2C1A0E',
            backgroundColor: '#FAF3E0',
            overflow: 'hidden',
            transform: isFlipping ? 'scale(0.98) rotateY(2deg)' : 'scale(1) rotateY(0deg)',
            transition: 'transform 0.4s ease'
          }}
        >
          {/* Render EXACT PARCHMENT IMAGE if available and mode is enabled */}
          {currentPage.exactImage && useExactImageMode ? (
            <div style={{
              position: 'relative',
              width: '100%',
              minHeight: '680px',
              backgroundColor: '#FAF3E0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '16px'
            }}>
              {/* Exact Parchment Image Container */}
              <div
                onClick={() => setIsZoomedIn(!isZoomedIn)}
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '600px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
                  border: '2px solid #E8D5B7'
                }}
                title="Click to view full screen high resolution"
              >
                <img
                  src={currentPage.exactImage}
                  alt="Exact Manuscript Parchment Scan"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    backgroundColor: '#1A0E08'
                  }}
                />

                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  backgroundColor: 'rgba(43, 24, 16, 0.85)',
                  color: '#D4AF37',
                  padding: '6px 14px',
                  borderRadius: '50px',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  border: '1px solid #D4AF37',
                  backdropFilter: 'blur(8px)'
                }}>
                  <ZoomIn size={14} /> Click to Fullscreen Scan
                </div>
              </div>

              {/* Navigation Controls Bar */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 16px 4px 16px',
                borderTop: '1px solid rgba(114, 27, 41, 0.2)'
              }}>
                <button
                  disabled={currentPageIndex === 0}
                  onClick={handlePrevPage}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: currentPageIndex === 0 ? '#C2B299' : '#721B29',
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: '700',
                    fontSize: '1rem',
                    cursor: currentPageIndex === 0 ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <ChevronLeft size={18} /> Previous Page
                </button>

                <span className="font-serif" style={{ fontSize: '0.95rem', color: '#744E1B', fontWeight: '600' }}>
                  Chapter {currentPage.chapterNumber} of {totalPages} (Exact Manuscript Scan)
                </span>

                <button
                  disabled={currentPageIndex === totalPages - 1}
                  onClick={handleNextPage}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: currentPageIndex === totalPages - 1 ? '#C2B299' : '#721B29',
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: '700',
                    fontSize: '1rem',
                    cursor: currentPageIndex === totalPages - 1 ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  Next Page <ChevronRight size={18} />
                </button>
              </div>
            </div>
          ) : (
            /* Styled Typography Mode */
            <>
              {/* Left Parchment Page (Page 1/2) */}
              <div
                className="parchment-paper deckled-edge page-left"
                style={{
                  flex: 1,
                  padding: '44px 40px',
                  borderRight: '2px solid rgba(74, 46, 27, 0.2)',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: 'linear-gradient(to right, #FAF3E0 0%, #F4E8D1 90%, #E2D0B2 100%)'
                }}
              >
                <div>
                  {/* Parchment Headers */}
                  <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <h1 className="font-script" style={{
                      fontSize: '2.5rem',
                      color: '#2B1810',
                      lineHeight: '1.2',
                      textDecoration: 'underline'
                    }}>
                      # {currentPage.seasonInfo}
                    </h1>

                    <h2 className="font-script" style={{
                      fontSize: '1.8rem',
                      color: '#2B1810',
                      marginTop: '6px',
                      textDecoration: 'underline'
                    }}>
                      ## {currentPage.episodeTitle}
                    </h2>

                    <h3 className="font-script" style={{
                      fontSize: '2.1rem',
                      color: '#2B1810',
                      marginTop: '6px',
                      fontWeight: '700',
                      textDecoration: 'underline'
                    }}>
                      "{currentPage.chapterTitle}"
                    </h3>

                    <p className="font-serif" style={{
                      fontSize: '1rem',
                      color: '#4A2E1B',
                      fontStyle: 'italic',
                      marginTop: '8px'
                    }}>
                      * {currentPage.dateMeta} *
                    </p>
                  </div>

                  {/* Left Page Story Paragraphs */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {currentPage.leftPageText.map((p, idx) => (
                      <p
                        key={idx}
                        className="font-serif"
                        style={{
                          fontSize: '1.12rem',
                          color: '#2B1810',
                          lineHeight: '1.65',
                          letterSpacing: '0.01em',
                          fontWeight: p.includes('Divya') ? '600' : '400'
                        }}
                      >
                        {p.includes('Divya') ? (
                          <>
                            Her name was <u style={{ color: '#721B29', fontWeight: 'bold' }}>Divya</u>. ♡
                          </>
                        ) : (
                          p
                        )}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Left Page Number Indicator */}
                <div style={{
                  textAlign: 'center',
                  fontSize: '0.95rem',
                  color: '#4A2E1B',
                  marginTop: '16px',
                  fontFamily: "'Cormorant Garamond', serif",
                  textDecoration: 'underline'
                }}>
                  Page 1/2
                </div>
              </div>

              {/* Book Spine Crease Divider */}
              <div style={{
                width: '24px',
                background: 'linear-gradient(to right, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.05) 60%, rgba(0,0,0,0.3) 100%)',
                boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)',
                zIndex: 10
              }} />

              {/* Right Parchment Page (Page 2/2) */}
              <div
                className="parchment-paper deckled-edge page-right"
                style={{
                  flex: 1.05,
                  padding: '44px 40px',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: 'linear-gradient(to left, #FAF3E0 0%, #F4E8D1 90%, #E2D0B2 100%)'
                }}
              >
                <div>
                  {!currentPage.isFinale ? (
                    /* Right Page Story Text */
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {currentPage.rightPageText.map((p, idx) => (
                        <p
                          key={idx}
                          className="font-serif"
                          style={{
                            fontSize: '1.12rem',
                            color: '#2B1810',
                            lineHeight: '1.65',
                            letterSpacing: '0.01em',
                            fontStyle: p.includes('I had no idea') ? 'italic' : 'normal',
                            fontWeight: p.includes('Hubballi') || p.includes('Bharatanatyam') ? '600' : '400'
                          }}
                        >
                          {p.includes('Bharatanatyam') ? (
                            <>
                              She loved taking part in college events. Whenever she performed <u style={{ fontWeight: 'bold' }}>Bharatanatyam</u>, everyone watched with admiration. She always gave her best, and that made her even more special.
                            </>
                          ) : p.includes('Hubballi') ? (
                            <>
                              One day, during our classroom introductions, she said she was from <u style={{ fontWeight: 'bold' }}>Hubballi</u>. It was a simple detail, but for some reason, I never forgot it.
                            </>
                          ) : (
                            p
                          )}
                        </p>
                      ))}
                    </div>
                  ) : (
                    /* Finale Page Special View */
                    <div style={{ textAlign: 'center', padding: '10px 0' }}>
                      <h2 className="font-script" style={{ fontSize: '2.8rem', color: '#721B29', marginBottom: '16px' }}>
                        The Best Chapter Is Still Being Written ❤️
                      </h2>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
                        {currentPage.rightPageText.map((p, idx) => (
                          <p key={idx} className="font-serif" style={{ fontSize: '1.2rem', color: '#2B1810', fontStyle: 'italic' }}>
                            {p}
                          </p>
                        ))}
                      </div>

                      <div style={{ display: 'inline-block', margin: '12px 0' }}>
                        <Heart size={54} color="#721B29" fill="#721B29" className="heart-pulse" />
                      </div>

                      <p className="font-title" style={{ fontSize: '1.2rem', color: '#721B29', fontWeight: '700' }}>
                        {currentPage.signoff}
                      </p>

                      <p className="font-script" style={{ fontSize: '2.2rem', color: '#D4AF37', marginTop: '8px', whiteSpace: 'pre-line' }}>
                        {currentPage.authorSign}
                      </p>

                      <button
                        onClick={onRestartBook}
                        className="btn-vintage"
                        style={{ marginTop: '20px', fontSize: '1rem', padding: '12px 30px' }}
                      >
                        <RotateCcw size={18} /> Read Again
                      </button>
                    </div>
                  )}
                </div>

                {/* Bottom Controls & Page 2/2 Indicator */}
                <div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '20px',
                    paddingTop: '12px',
                    borderTop: '1px solid rgba(114, 27, 41, 0.2)'
                  }}>
                    <button
                      disabled={currentPageIndex === 0}
                      onClick={handlePrevPage}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: currentPageIndex === 0 ? '#C2B299' : '#721B29',
                        fontFamily: "'Cormorant Garamond', serif",
                        fontWeight: '700',
                        fontSize: '1rem',
                        cursor: currentPageIndex === 0 ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <ChevronLeft size={18} /> Previous Page
                    </button>

                    <span className="font-serif" style={{ fontSize: '0.9rem', color: '#744E1B', fontWeight: '600' }}>
                      Chapter {currentPage.chapterNumber} of {totalPages}
                    </span>

                    <button
                      disabled={currentPageIndex === totalPages - 1}
                      onClick={handleNextPage}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: currentPageIndex === totalPages - 1 ? '#C2B299' : '#721B29',
                        fontFamily: "'Cormorant Garamond', serif",
                        fontWeight: '700',
                        fontSize: '1rem',
                        cursor: currentPageIndex === totalPages - 1 ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      Next Page <ChevronRight size={18} />
                    </button>
                  </div>

                  {/* Right Page Number Indicator */}
                  <div style={{
                    textAlign: 'center',
                    fontSize: '0.95rem',
                    color: '#4A2E1B',
                    marginTop: '10px',
                    fontFamily: "'Cormorant Garamond', serif",
                    textDecoration: 'underline'
                  }}>
                    Page 2/2
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Lightbox Fullscreen Modal for Exact Image */}
      {isZoomedIn && currentPage.exactImage && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
          backgroundColor: 'rgba(0,0,0,0.92)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          <button
            onClick={() => setIsZoomedIn(false)}
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              color: '#FFF',
              padding: '10px 20px',
              borderRadius: '50px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            ✕ Close High-Res View
          </button>
          <img
            src={currentPage.exactImage}
            alt="Exact Manuscript Parchment Fullscreen Scan"
            style={{
              maxHeight: '90vh',
              maxWidth: '95vw',
              objectFit: 'contain',
              boxShadow: '0 0 50px rgba(0,0,0,0.9)',
              borderRadius: '8px'
            }}
          />
        </div>
      )}
    </div>
  );
}
