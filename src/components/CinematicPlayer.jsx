import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Play, Pause, Calendar, MapPin, Sparkles, Volume2, VolumeX } from 'lucide-react';

export default function CinematicPlayer({ episode, onClose, onSelectEpisode, allEpisodes }) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isPlayingAuto, setIsPlayingAuto] = useState(true);
  const [isSoundOn, setIsSoundOn] = useState(true);

  if (!episode) return null;

  const totalEpisodes = allEpisodes.length;
  const currentIndex = allEpisodes.findIndex((e) => e.id === episode.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < totalEpisodes - 1;

  useEffect(() => {
    setCurrentLineIndex(0);
    setIsPlayingAuto(true);
  }, [episode.id]);

  useEffect(() => {
    if (!isPlayingAuto) return;
    const lines = episode.lines || [];
    if (currentLineIndex < lines.length - 1) {
      const timer = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
      }, 3600);
      return () => clearTimeout(timer);
    }
  }, [currentLineIndex, isPlayingAuto, episode]);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9990,
      backgroundColor: 'rgba(11, 11, 11, 0.97)',
      backdropFilter: 'blur(24px)',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto'
    }}>
      {/* Top Controls Header */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        height: '64px',
        padding: '0 4vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(15, 15, 20, 0.88)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(232, 199, 122, 0.15)'
      }}>
        {/* Title Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{
            color: '#B11226',
            fontWeight: '700',
            fontSize: '0.85rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase'
          }}>
            EPISODE 0{episode.episodeNumber} • {episode.year}
          </span>
          <span style={{ color: '#4B5563' }}>•</span>
          <h2 className="font-cinzel" style={{ fontSize: '1.1rem', color: '#FFF', fontWeight: '700' }}>
            {episode.title}
          </h2>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {episode.lines && (
            <button
              onClick={() => setIsPlayingAuto(!isPlayingAuto)}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(232, 199, 122, 0.2)',
                color: '#FFF',
                padding: '6px 14px',
                borderRadius: '50px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                fontSize: '0.8rem'
              }}
            >
              {isPlayingAuto ? <Pause size={14} /> : <Play size={14} />}
              {isPlayingAuto ? 'Narration Playing' : 'Paused'}
            </button>
          )}

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: '#FFF',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{
        maxWidth: '920px',
        width: '100%',
        margin: '0 auto',
        padding: '40px 24px 80px 24px',
        flex: 1
      }}>
        {/* Ken Burns Header Image Backdrop */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '320px',
          borderRadius: '20px',
          overflow: 'hidden',
          marginBottom: '36px',
          boxShadow: '0 15px 50px rgba(0,0,0,0.9)',
          border: '1px solid rgba(232, 199, 122, 0.2)'
        }}>
          <img
            src={episode.image}
            alt={episode.title}
            className="ken-burns"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(11,11,11,0.95) 100%)'
          }} />

          <div style={{
            position: 'absolute',
            bottom: '28px',
            left: '28px',
            right: '28px'
          }}>
            <div style={{ display: 'flex', gap: '16px', color: '#E8C77A', fontSize: '0.85rem', marginBottom: '8px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={14} /> {episode.dateRange}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#9CA3AF' }}>
                <MapPin size={14} /> {episode.location}
              </span>
            </div>
            <h1 className="font-cinzel gold-gradient-text" style={{ fontSize: '2.5rem', fontWeight: '800' }}>
              {episode.title}
            </h1>
            <p style={{ color: '#D1D5DB', fontSize: '0.95rem', marginTop: '4px', fontStyle: 'italic' }}>
              {episode.subtitle}
            </p>
          </div>
        </div>

        {/* Ambient Sound Tag & Visual Atmosphere Pills */}
        {episode.visuals && (
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {episode.ambientSound && (
                <span className="glass-pill" style={{
                  padding: '6px 16px',
                  borderRadius: '50px',
                  fontSize: '0.8rem',
                  color: '#E8C77A',
                  borderColor: 'rgba(232, 199, 122, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <Volume2 size={13} /> Ambience: {episode.ambientSound}
                </span>
              )}
              {episode.visuals.map((v, i) => (
                <span key={i} className="glass-pill" style={{
                  padding: '6px 14px',
                  borderRadius: '50px',
                  fontSize: '0.8rem',
                  color: '#E5E7EB',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <Sparkles size={12} color="#B11226" /> {v}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Story Text Revealed Line-by-Line */}
        {episode.lines && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '40px' }}>
            {episode.lines.map((line, idx) => {
              const isVisible = idx <= currentLineIndex;
              const isCurrent = idx === currentLineIndex;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    setCurrentLineIndex(idx);
                    setIsPlayingAuto(false);
                  }}
                  style={{
                    padding: '18px 24px',
                    borderRadius: '12px',
                    backgroundColor: isCurrent ? 'rgba(177, 18, 38, 0.14)' : 'rgba(255, 255, 255, 0.03)',
                    borderLeft: isCurrent ? '4px solid #B11226' : '4px solid transparent',
                    border: isCurrent ? '1px solid rgba(177, 18, 38, 0.3)' : '1px solid rgba(255, 255, 255, 0.04)',
                    color: isVisible ? '#F3F4F6' : '#4B5563',
                    fontSize: '1.15rem',
                    lineHeight: '1.6',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: isCurrent ? 'translateX(8px)' : 'translateX(0)'
                  }}
                >
                  <p style={{
                    fontWeight: isCurrent ? '600' : '400',
                    fontFamily: line.includes('"') ? 'serif' : 'inherit'
                  }}>
                    {line}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* Sections for Episode 5 */}
        {episode.sections && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '40px' }}>
            {episode.sections.map((sec, idx) => (
              <div key={idx} className="glass-panel" style={{ padding: '28px', borderRadius: '16px' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'rgba(177, 18, 38, 0.25)',
                  color: '#FF4D4D',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  padding: '4px 16px',
                  borderRadius: '50px',
                  marginBottom: '18px',
                  border: '1px solid rgba(177,18,38,0.5)'
                }}>
                  <Calendar size={14} /> {sec.date}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {sec.items.map((item, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      fontSize: '1.05rem',
                      color: '#E5E7EB',
                      lineHeight: '1.6'
                    }}>
                      <span style={{ color: '#E8C77A', fontWeight: 'bold' }}>•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Navigation Footer */}
        <div style={{
          marginTop: '60px',
          paddingTop: '24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button
            disabled={!hasPrev}
            onClick={() => hasPrev && onSelectEpisode(allEpisodes[currentIndex - 1])}
            className="btn-secondary-glass"
            style={{ opacity: hasPrev ? 1 : 0.4, cursor: hasPrev ? 'pointer' : 'not-allowed' }}
          >
            <ChevronLeft size={18} /> Previous Chapter
          </button>

          <span style={{ fontSize: '0.85rem', color: '#6B7280' }}>
            Chapter {currentIndex + 1} of {totalEpisodes}
          </span>

          <button
            disabled={!hasNext}
            onClick={() => hasNext && onSelectEpisode(allEpisodes[currentIndex + 1])}
            className="btn-cinematic"
            style={{ opacity: hasNext ? 1 : 0.4, cursor: hasNext ? 'pointer' : 'not-allowed' }}
          >
            Next Chapter <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
