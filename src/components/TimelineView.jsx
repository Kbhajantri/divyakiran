import React, { useState } from 'react';
import { Calendar, MapPin, Play, Heart, ChevronDown, Sparkles } from 'lucide-react';

export default function TimelineView({ episodes, onPlayEpisode }) {
  const [selectedYear, setSelectedYear] = useState('ALL');

  const years = ['ALL', '2022', '2023', '2024', '2025', '2026'];

  const filteredEpisodes = selectedYear === 'ALL'
    ? episodes
    : episodes.filter((ep) => ep.year === selectedYear);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 4vw 80px 4vw' }}>
      {/* Timeline Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span style={{ fontSize: '0.85rem', color: '#B11226', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          INTERACTIVE CHAPTER TIMELINE
        </span>
        <h2 className="font-cinzel gold-gradient-text" style={{ fontSize: '2.5rem', fontWeight: '800', marginTop: '6px' }}>
          2022 ↓ 2023 ↓ 2024 ↓ 2025 ↓ 2026
        </h2>
        <p style={{ color: '#9CA3AF', fontSize: '0.95rem', marginTop: '8px' }}>
          Click any year to jump straight into that chapter of our journey.
        </p>
      </div>

      {/* Year Filter Pills */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '48px',
        flexWrap: 'wrap'
      }}>
        {years.map((year, idx) => (
          <React.Fragment key={year}>
            <button
              onClick={() => setSelectedYear(year)}
              style={{
                background: selectedYear === year
                  ? 'linear-gradient(135deg, #B11226 0%, #7A0A18 100%)'
                  : 'rgba(255, 255, 255, 0.05)',
                border: selectedYear === year ? '1px solid #E8C77A' : '1px solid rgba(232, 199, 122, 0.15)',
                color: selectedYear === year ? '#FFF' : '#D1D5DB',
                padding: '10px 22px',
                borderRadius: '50px',
                cursor: 'pointer',
                fontSize: '0.95rem',
                fontWeight: selectedYear === year ? '700' : '500',
                boxShadow: selectedYear === year ? '0 0 20px rgba(177, 18, 38, 0.6)' : 'none',
                transition: 'all 0.3s ease'
              }}
            >
              {year === 'ALL' ? 'Show All Years' : year}
            </button>
            {idx < years.length - 1 && year !== 'ALL' && (
              <ChevronDown size={16} color="#B11226" style={{ opacity: 0.6 }} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Timeline Stream */}
      <div style={{ position: 'relative', paddingLeft: '36px' }}>
        {/* Vertical Line */}
        <div style={{
          position: 'absolute',
          top: '12px',
          bottom: '12px',
          left: '14px',
          width: '2px',
          background: 'linear-gradient(180deg, #B11226 0%, #E8C77A 50%, #B11226 100%)'
        }} />

        {filteredEpisodes.map((ep) => (
          <div
            key={ep.id}
            style={{
              position: 'relative',
              marginBottom: '40px'
            }}
          >
            {/* Timeline Dot */}
            <div style={{
              position: 'absolute',
              left: '-36px',
              top: '6px',
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              backgroundColor: ep.isInteractiveConfession || ep.isFinale ? '#B11226' : '#16161B',
              border: ep.isFinale ? '2px solid #E8C77A' : '2px solid #B11226',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 14px rgba(177, 18, 38, 0.7)'
            }}>
              {ep.isFinale ? (
                <Heart size={12} fill="#FFF" color="#FFF" />
              ) : (
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#E8C77A' }} />
              )}
            </div>

            {/* Card Content */}
            <div className="glass-panel" style={{
              padding: '24px 28px',
              borderRadius: '16px',
              borderLeft: ep.isInteractiveConfession ? '4px solid #B11226' : '1px solid rgba(232, 199, 122, 0.15)',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '10px'
              }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#E8C77A', fontWeight: '700', letterSpacing: '0.06em' }}>
                    YEAR {ep.year} • S0{ep.season}:EP0{ep.episodeNumber}
                  </span>
                  <h3 className="font-cinzel" style={{ fontSize: '1.4rem', color: '#FFF', fontWeight: '700', marginTop: '4px' }}>
                    {ep.title}
                  </h3>
                </div>

                <button
                  onClick={() => onPlayEpisode(ep)}
                  className="btn-cinematic"
                  style={{ padding: '8px 20px', fontSize: '0.85rem' }}
                >
                  <Play size={14} fill="white" /> Watch Scene
                </button>
              </div>

              <div style={{ fontSize: '0.85rem', color: '#9CA3AF', marginBottom: '12px', display: 'flex', gap: '16px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={14} color="#B11226" /> {ep.location}
                </span>
                {ep.ambientSound && (
                  <span style={{ color: '#E8C77A', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Sparkles size={12} /> {ep.ambientSound}
                  </span>
                )}
              </div>

              <p style={{ color: '#D1D5DB', fontSize: '0.95rem', lineHeight: '1.6' }}>
                {ep.summary}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
