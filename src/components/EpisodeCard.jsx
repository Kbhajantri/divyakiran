import React from 'react';
import { Play, Sparkles, Clock, Calendar, Heart } from 'lucide-react';

export default function EpisodeCard({ episode, onPlay, isCompleted }) {
  return (
    <div
      onClick={() => onPlay(episode)}
      className="glass-panel"
      style={{
        minWidth: '290px',
        maxWidth: '340px',
        flex: '0 0 auto',
        borderRadius: '12px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.35 cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        userSelect: 'none'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
        e.currentTarget.style.boxShadow = '0 12px 30px rgba(229, 9, 20, 0.35)';
        e.currentTarget.style.borderColor = 'rgba(229, 9, 20, 0.6)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.5)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
      }}
    >
      {/* Thumbnail Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '180px',
        overflow: 'hidden',
        backgroundColor: '#111'
      }}>
        <img
          src={episode.image}
          alt={episode.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
        />
        
        {/* Dark Vignette Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 100%)'
        }} />

        {/* Episode Badge */}
        <span style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          background: episode.isFinale
            ? 'linear-gradient(135deg, #D4AF37, #8A6D0B)'
            : episode.isInteractiveConfession
            ? 'linear-gradient(135deg, #E50914, #800000)'
            : 'rgba(0, 0, 0, 0.75)',
          color: '#FFF',
          fontWeight: '700',
          fontSize: '0.75rem',
          padding: '3px 10px',
          borderRadius: '4px',
          letterSpacing: '0.05em',
          border: '1px solid rgba(255,255,255,0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          {episode.isFinale ? <Heart size={12} fill="#FFF" /> : null}
          {episode.isInteractiveConfession ? <Sparkles size={12} /> : null}
          EP 0{episode.episodeNumber}
        </span>

        {/* Play Icon Overlay on Center */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0, 0, 0, 0.2)',
          transition: 'background 0.3s ease'
        }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            background: 'rgba(229, 9, 20, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(229, 9, 20, 0.8)',
            transform: 'scale(0.9)',
            transition: 'transform 0.3s ease'
          }}>
            <Play size={20} fill="white" color="white" style={{ marginLeft: '2px' }} />
          </div>
        </div>

        {/* Duration / Date */}
        <span style={{
          position: 'absolute',
          bottom: '10px',
          right: '12px',
          fontSize: '0.75rem',
          color: '#E5E7EB',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          background: 'rgba(0,0,0,0.6)',
          padding: '2px 8px',
          borderRadius: '4px'
        }}>
          <Clock size={12} /> {episode.duration}
        </span>
      </div>

      {/* Details Container */}
      <div style={{ padding: '16px 18px 20px 18px' }}>
        <div style={{
          fontSize: '0.75rem',
          color: '#D4AF37',
          fontWeight: '600',
          marginBottom: '4px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <Calendar size={12} /> {episode.dateRange}
        </div>

        <h3 className="font-cinzel" style={{
          fontSize: '1.15rem',
          fontWeight: '700',
          color: '#FFF',
          marginBottom: '8px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {episode.title}
        </h3>

        <p style={{
          fontSize: '0.85rem',
          color: '#9CA3AF',
          lineHeight: '1.4',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          height: '2.8em',
          marginBottom: '14px'
        }}>
          {episode.summary}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {episode.tags.slice(0, 2).map((tag, idx) => (
            <span key={idx} style={{
              fontSize: '0.7rem',
              color: '#D1D5DB',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              padding: '2px 8px',
              borderRadius: '4px',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
