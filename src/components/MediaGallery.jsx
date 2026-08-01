import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Upload, Trash2, Heart, Sparkles, X, Plus, Play, Music } from 'lucide-react';

export default function MediaGallery({ onOpenUpload }) {
  const [userPhotos, setUserPhotos] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  // Built-in memory illustrations
  const defaultItems = [
    { id: 'ep1', title: 'Bharatanatyam Stage', tag: 'College', src: '/assets/ep1.png', caption: 'First semester engineering • Silent admiration' },
    { id: 'ep2', title: 'The Classroom Bench', tag: 'College', src: '/assets/ep2.png', caption: 'Second year • Waiting for college reopening' },
    { id: 'ep3', title: 'DBMS Lab Exam', tag: 'College', src: '/assets/ep3.png', caption: 'Third year • Black Kurta & SQL syntax' },
    { id: 'ep4', title: 'WhatsApp Night Chat', tag: 'Internship', src: '/assets/ep4.png', caption: '6 April 2026 7:57 PM • First message' },
    { id: 'ep5', title: 'Sunset Scooty Ride & Delta Falls', tag: 'Trips', src: '/assets/ep5.png', caption: '21 May & 5 June 2026 • Delta Falls & Hubballi rides' },
    { id: 'ep6', title: 'The Confession 3:07 AM', tag: 'Confession', src: '/assets/ep6.png', caption: '28 June 2026 3:07 AM • "The girl was you."' },
    { id: 'ep7', title: 'Yallur Fort Overlook', tag: 'Trips', src: '/assets/ep7.png', caption: '6 July 2026 • Belagavi & Yallur Fort' },
    { id: 'ep8', title: 'Guitar Serenade', tag: 'Finale', src: '/assets/ep_final.png', caption: 'Happy Girlfriend\'s Day • Forever Yours' }
  ];

  // Load custom uploaded photos from LocalStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('our_story_user_memories');
      if (stored) {
        setUserPhotos(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to read local memories', e);
    }
  }, []);

  const allGalleryItems = [
    ...userPhotos.map((p, i) => ({
      id: `user-${i}`,
      title: p.title || 'Our Real Memory',
      tag: 'Real Photos',
      src: p.dataUrl,
      caption: p.date ? `${p.date} • ${p.note || ''}` : 'Uploaded Memory',
      isUser: true
    })),
    ...defaultItems
  ];

  const filteredItems = activeFilter === 'all'
    ? allGalleryItems
    : allGalleryItems.filter((item) => item.tag === activeFilter || (activeFilter === 'Real Photos' && item.isUser));

  return (
    <div style={{ padding: '0 4vw 80px 4vw' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: '32px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <span style={{ fontSize: '0.85rem', color: '#D4AF37', fontWeight: '700', letterSpacing: '0.1em' }}>
            CINEMATIC MEMORY VAULT
          </span>
          <h2 className="font-cinzel" style={{ fontSize: '2.2rem', color: '#FFF', fontWeight: '800' }}>
            Photos, Illustrations & Video Clips
          </h2>
        </div>

        <button
          onClick={onOpenUpload}
          className="btn-cinematic"
          style={{ padding: '12px 24px', fontSize: '0.95rem' }}
        >
          <Upload size={18} /> Upload Real Memory
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '32px', flexWrap: 'wrap' }}>
        {['all', 'Real Photos', 'College', 'Trips', 'Confession'].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            style={{
              background: activeFilter === filter ? 'rgba(229, 9, 20, 0.25)' : 'rgba(255, 255, 255, 0.05)',
              border: activeFilter === filter ? '1px solid #E50914' : '1px solid rgba(255, 255, 255, 0.1)',
              color: activeFilter === filter ? '#FF4D4D' : '#9CA3AF',
              padding: '8px 18px',
              borderRadius: '50px',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: activeFilter === filter ? '700' : '400',
              transition: 'all 0.2s ease'
            }}
          >
            {filter === 'all' ? 'All Memories' : filter}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '24px'
      }}>
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedImage(item)}
            className="glass-panel"
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'transform 0.3s ease, boxShadow 0.3s ease',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(229, 9, 20, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.5)';
            }}
          >
            <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
              <img
                src={item.src}
                alt={item.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                backgroundColor: item.isUser ? 'rgba(212, 175, 55, 0.85)' : 'rgba(0, 0, 0, 0.75)',
                color: '#FFF',
                fontSize: '0.7rem',
                fontWeight: '700',
                padding: '3px 10px',
                borderRadius: '50px'
              }}>
                {item.tag}
              </span>
            </div>

            <div style={{ padding: '16px 20px' }}>
              <h4 className="font-cinzel" style={{ color: '#FFF', fontSize: '1.05rem', fontWeight: '700' }}>
                {item.title}
              </h4>
              <p style={{ color: '#9CA3AF', fontSize: '0.85rem', marginTop: '4px' }}>
                {item.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          backgroundColor: 'rgba(0,0,0,0.92)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px'
        }}>
          <button
            onClick={() => setSelectedImage(null)}
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: '#FFF',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              cursor: 'pointer'
            }}
          >
            <X size={22} />
          </button>

          <div style={{ maxWidth: '900px', width: '100%', textAlign: 'center' }}>
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              style={{
                maxHeight: '75vh',
                maxWidth: '100%',
                borderRadius: '16px',
                boxShadow: '0 0 50px rgba(0,0,0,0.9)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            />
            <h3 className="font-cinzel" style={{ fontSize: '1.8rem', color: '#FFF', marginTop: '20px' }}>
              {selectedImage.title}
            </h3>
            <p style={{ color: '#D4AF37', fontSize: '1rem', marginTop: '6px' }}>
              {selectedImage.caption}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
