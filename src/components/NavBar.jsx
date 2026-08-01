import React, { useState, useEffect } from 'react';
import { Heart, Volume2, VolumeX, Image as ImageIcon, Music, Film, Upload, Menu, X } from 'lucide-react';

export default function NavBar({
  activeTab,
  setActiveTab,
  isAudioPlaying,
  toggleAudio,
  onOpenUpload
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'episodes', label: 'Episodes', icon: Film },
    { id: 'timeline', label: 'Timeline', icon: Heart },
    { id: 'gallery', label: 'Memories & Photos', icon: ImageIcon },
    { id: 'guitar', label: 'Guitar Serenade', icon: Music },
  ];

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      height: '70px',
      padding: '0 4vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: scrolled ? 'rgba(5, 5, 8, 0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
      transition: 'all 0.3s ease'
    }}>
      {/* Brand Logo */}
      <div
        onClick={() => setActiveTab('episodes')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
          userSelect: 'none'
        }}
      >
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #E50914, #800000)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 15px rgba(229, 9, 20, 0.5)'
        }}>
          <Heart size={20} fill="#FFF" color="#FFF" />
        </div>
        <span className="font-cinzel" style={{
          fontSize: '1.4rem',
          fontWeight: '900',
          letterSpacing: '0.06em',
          color: '#FFF'
        }}>
          OUR STORY
        </span>
      </div>

      {/* Desktop Navigation Links */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        gap: '28px'
      }} className="desktop-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                background: 'none',
                border: 'none',
                color: isActive ? '#E50914' : '#D1D5DB',
                fontWeight: isActive ? '700' : '400',
                fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                borderRadius: '6px',
                transition: 'all 0.2s ease',
                borderBottom: isActive ? '2px solid #E50914' : '2px solid transparent'
              }}
            >
              <Icon size={16} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Actions: Add Memory + Sound Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Upload Memory Button */}
        <button
          onClick={onOpenUpload}
          className="btn-secondary-glass"
          style={{
            padding: '8px 16px',
            fontSize: '0.85rem'
          }}
          title="Upload real photos, videos & audio recordings"
        >
          <Upload size={15} />
          <span style={{ display: 'inline' }}>+ Add Memory</span>
        </button>

        {/* Audio Toggle Button */}
        <button
          onClick={toggleAudio}
          style={{
            background: isAudioPlaying ? 'rgba(229, 9, 20, 0.2)' : 'rgba(255, 255, 255, 0.08)',
            border: isAudioPlaying ? '1px solid #E50914' : '1px solid rgba(255, 255, 255, 0.15)',
            color: isAudioPlaying ? '#FF4D4D' : '#9CA3AF',
            borderRadius: '50px',
            padding: '8px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            fontSize: '0.85rem'
          }}
        >
          {isAudioPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
          {isAudioPlaying && (
            <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', height: '14px' }}>
              <div className="wave-bar" />
              <div className="wave-bar" />
              <div className="wave-bar" />
            </div>
          )}
        </button>
      </div>
    </header>
  );
}
