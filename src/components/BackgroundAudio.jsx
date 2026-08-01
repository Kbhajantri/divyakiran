import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Music, VolumeX } from 'lucide-react';
import { getAssetUrl } from '../data/storyPages';

export default function BackgroundAudio({ isAudioPlaying, setIsAudioPlaying }) {
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef(null);

  // Exact local audio file resolved via getAssetUrl for GitHub Pages base path
  const audioSource = getAssetUrl("/assets/aashiqui2_piano_loop.mp3");

  // Play/pause and volume control effect
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;

    if (isAudioPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Autoplay waiting for user interaction:", error);
        });
      }
    } else {
      audio.pause();
    }
  }, [isAudioPlaying, volume]);

  // Global user interaction listener to start audio on initial site open
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (audioRef.current && isAudioPlaying) {
        audioRef.current.play().catch(() => {});
      }
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [isAudioPlaying]);

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
    if (newVol > 0 && !isAudioPlaying) {
      setIsAudioPlaying(true);
    }
  };

  const togglePlay = () => {
    setIsAudioPlaying(!isAudioPlaying);
  };

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '24px',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      backgroundColor: 'rgba(18, 18, 22, 0.92)',
      border: '1.5px solid rgba(232, 199, 122, 0.4)',
      padding: '8px 18px',
      borderRadius: '50px',
      boxShadow: '0 8px 30px rgba(0,0,0,0.85)',
      backdropFilter: 'blur(16px)'
    }}>
      {/* Local HTML5 Audio Element set to loop infinitely */}
      <audio
        ref={audioRef}
        src={audioSource}
        loop
        autoPlay
      />

      {/* Music Icon & Play Toggle */}
      <div
        onClick={togglePlay}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: '#E8C77A',
          cursor: 'pointer'
        }}
        title={isAudioPlaying ? 'Pause Music' : 'Play Music'}
      >
        <Music size={18} className={isAudioPlaying ? 'heart-pulse' : ''} />
        <span className="font-serif" style={{ fontSize: '0.85rem', fontWeight: '600', color: '#F5E5C9' }}>
          Aashiqui 2 • Soothing Piano Loop
        </span>
      </div>

      {/* Volume Control Slider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '6px' }}>
        {volume === 0 || !isAudioPlaying ? (
          <VolumeX size={18} color="#9CA3AF" style={{ cursor: 'pointer' }} onClick={() => setVolume(0.7)} />
        ) : (
          <Volume2 size={18} color="#E8C77A" style={{ cursor: 'pointer' }} onClick={() => setVolume(0)} />
        )}
        
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isAudioPlaying ? volume : 0}
          onChange={handleVolumeChange}
          style={{
            width: '90px',
            accentColor: '#B11226',
            cursor: 'pointer',
            height: '4px'
          }}
          title={`Volume: ${Math.round((isAudioPlaying ? volume : 0) * 100)}%`}
        />
        <span style={{ fontSize: '0.75rem', color: '#E8C77A', width: '32px', fontFamily: "'Cormorant Garamond', serif" }}>
          {Math.round((isAudioPlaying ? volume : 0) * 100)}%
        </span>
      </div>
    </div>
  );
}
