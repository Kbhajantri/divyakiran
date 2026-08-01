import React from 'react';
import { Play, Info, Calendar, MapPin, Sparkles } from 'lucide-react';

export default function HeroBanner({ featuredEpisode, onPlayEpisode, onExploreClick }) {
  if (!featuredEpisode) return null;

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      minHeight: '82vh',
      display: 'flex',
      alignItems: 'flex-end',
      padding: '0 4vw 60px 4vw',
      marginBottom: '30px',
      overflow: 'hidden'
    }}>
      {/* Backdrop Image */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url(${featuredEpisode.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        filter: 'brightness(0.65) contrast(1.1)',
        transform: 'scale(1.02)',
        transition: 'transform 10s ease-out'
      }} />

      {/* Cinematic Gradient Overlays */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(5,5,8,0.4) 0%, rgba(5,5,8,0.7) 60%, rgba(5,5,8,1) 100%)'
      }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at left center, rgba(229,9,20,0.25) 0%, rgba(0,0,0,0) 70%)'
      }} />

      {/* Content Container */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '820px'
      }}>
        {/* Badges */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <span className="glass-pill" style={{
            color: '#E50914',
            fontWeight: '700',
            fontSize: '0.85rem',
            padding: '4px 14px',
            borderRadius: '50px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Sparkles size={14} /> FEATURED MEMORY • S0{featuredEpisode.season}:E0{featuredEpisode.episodeNumber}
          </span>
          <span style={{ color: '#D4AF37', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Calendar size={14} /> {featuredEpisode.dateRange}
          </span>
          <span style={{ color: '#9CA3AF', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MapPin size={14} /> {featuredEpisode.location}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-cinzel" style={{
          fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
          fontWeight: '900',
          color: '#FFF',
          lineHeight: '1.1',
          marginBottom: '16px',
          textShadow: '0 4px 20px rgba(0,0,0,0.9)'
        }}>
          {featuredEpisode.title}
        </h1>

        {/* Subtitle / Synopsis */}
        <p className="hero-synopsis" style={{
          fontSize: '1.15rem',
          color: '#E5E7EB',
          lineHeight: '1.6',
          marginBottom: '28px',
          maxWidth: '720px',
          textShadow: '0 2px 10px rgba(0,0,0,0.8)'
        }}>
          {featuredEpisode.summary}
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <button
            onClick={() => onPlayEpisode(featuredEpisode)}
            className="btn-cinematic"
            style={{ fontSize: '1.05rem', padding: '14px 32px' }}
          >
            <Play size={20} fill="white" /> Watch Episode {featuredEpisode.episodeNumber}
          </button>

          <button
            onClick={onExploreClick}
            className="btn-secondary-glass"
            style={{ fontSize: '1rem', padding: '14px 28px' }}
          >
            <Info size={19} /> Browse Timeline
          </button>
        </div>
      </div>
    </div>
  );
}
