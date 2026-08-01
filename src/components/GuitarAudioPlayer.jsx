import React, { useState, useEffect, useRef } from 'react';
import { Music, Play, Pause, Volume2, VolumeX, Radio, Sparkles } from 'lucide-react';

export default function GuitarAudioPlayer({ isAudioPlaying, toggleAudio, customAudioTracks = [] }) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef(null);
  const synthAudioCtxRef = useRef(null);

  // Default romantic acoustic guitar track URLs / synthesized soundscapes
  const defaultTracks = [
    {
      name: "Cinematic Ambient Guitar",
      artist: "Kiran & Divya's Theme",
      // royalty-free atmospheric ambient acoustic guitar stream link
      url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-acoustic-guitar-114406.mp3"
    },
    {
      name: "Soft Stars & Guitar Serenade",
      artist: "Kiran's Serenade",
      url: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=acoustic-guitar-loop-10086.mp3"
    }
  ];

  const tracks = [...customAudioTracks, ...defaultTracks];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (isAudioPlaying) {
        audioRef.current.play().catch((err) => console.log('Audio autoplay prevented by browser', err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isAudioPlaying, currentTrackIndex, volume]);

  const activeTrack = tracks[currentTrackIndex] || tracks[0];

  return (
    <div style={{
      position: 'fixed',
      bottom: '16px',
      left: '4vw',
      zIndex: 9000,
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      padding: '10px 20px',
      borderRadius: '50px',
      backgroundColor: 'rgba(15, 15, 22, 0.92)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(212, 175, 55, 0.35)',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.8)'
    }}>
      {/* Hidden Audio Tag */}
      <audio
        ref={audioRef}
        src={activeTrack?.url || activeTrack?.dataUrl}
        loop
      />

      {/* Track Art & Play/Pause */}
      <button
        onClick={toggleAudio}
        style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          backgroundColor: isAudioPlaying ? '#E50914' : 'rgba(255,255,255,0.1)',
          border: 'none',
          color: '#FFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: isAudioPlaying ? '0 0 15px rgba(229,9,20,0.7)' : 'none'
        }}
      >
        {isAudioPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: '2px' }} />}
      </button>

      {/* Track Info */}
      <div style={{ maxWidth: '180px' }}>
        <div style={{
          fontSize: '0.85rem',
          color: '#FFF',
          fontWeight: '600',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {activeTrack?.name}
        </div>
        <div style={{
          fontSize: '0.75rem',
          color: '#D4AF37',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <Music size={12} /> {activeTrack?.artist}
        </div>
      </div>

      {/* Audio Visualizer Waves */}
      {isAudioPlaying && (
        <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end', height: '18px' }}>
          <div className="wave-bar" />
          <div className="wave-bar" />
          <div className="wave-bar" />
          <div className="wave-bar" />
        </div>
      )}

      {/* Track Selector */}
      {tracks.length > 1 && (
        <select
          value={currentTrackIndex}
          onChange={(e) => setCurrentTrackIndex(Number(e.target.value))}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            color: '#D1D5DB',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            fontSize: '0.75rem',
            padding: '4px 8px',
            borderRadius: '6px',
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          {tracks.map((t, i) => (
            <option key={i} value={i} style={{ backgroundColor: '#111', color: '#FFF' }}>
              {t.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
