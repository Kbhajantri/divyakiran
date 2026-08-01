import React from 'react';
import EpisodeCard from './EpisodeCard';
import { Film } from 'lucide-react';

export default function EpisodeRow({ title, subtitle, episodes, onPlayEpisode }) {
  return (
    <section style={{ marginBottom: '48px', padding: '0 4vw' }}>
      {/* Header */}
      <div style={{ marginBottom: '18px' }}>
        <h2 className="font-cinzel" style={{
          fontSize: '1.6rem',
          fontWeight: '700',
          color: '#FFF',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span style={{
            width: '4px',
            height: '24px',
            backgroundColor: '#E50914',
            borderRadius: '2px',
            display: 'inline-block'
          }} />
          {title}
        </h2>
        {subtitle && (
          <p style={{
            fontSize: '0.9rem',
            color: '#9CA3AF',
            marginTop: '4px',
            marginLeft: '14px'
          }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* Horizontal Carousel */}
      <div style={{
        display: 'flex',
        gap: '20px',
        overflowX: 'auto',
        paddingBottom: '16px',
        paddingTop: '6px',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}>
        {episodes.map((ep) => (
          <EpisodeCard
            key={ep.id}
            episode={ep}
            onPlay={onPlayEpisode}
          />
        ))}
      </div>
    </section>
  );
}
