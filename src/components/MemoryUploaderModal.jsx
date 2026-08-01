import React, { useState } from 'react';
import { X, Upload, Image as ImageIcon, Music, Check, Sparkles } from 'lucide-react';

export default function MemoryUploaderModal({ onClose, onSaveMemory, onSaveAudioTrack }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');
  const [fileDataUrl, setFileDataUrl] = useState('');
  const [fileType, setFileType] = useState('image');
  const [isSaved, setIsSaved] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type.startsWith('audio/')) {
      setFileType('audio');
    } else {
      setFileType('image');
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setFileDataUrl(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fileDataUrl) return;

    if (fileType === 'audio') {
      if (onSaveAudioTrack) {
        onSaveAudioTrack({
          title: title || 'Kiran\'s Real Guitar Recording',
          dataUrl: fileDataUrl
        });
      }
    } else {
      const newMemory = {
        title: title || 'Our Real Memory',
        date: date || 'Special Moment',
        note: note || '',
        dataUrl: fileDataUrl,
        timestamp: Date.now()
      };

      try {
        const stored = localStorage.getItem('our_story_user_memories');
        const list = stored ? JSON.parse(stored) : [];
        list.unshift(newMemory);
        localStorage.setItem('our_story_user_memories', JSON.stringify(list));
      } catch (err) {
        console.error('Storage error', err);
      }

      if (onSaveMemory) onSaveMemory(newMemory);
    }

    setIsSaved(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      backgroundColor: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '540px',
        width: '100%',
        padding: '36px',
        borderRadius: '24px',
        position: 'relative',
        border: '1px solid rgba(229, 9, 20, 0.4)'
      }}>
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            color: '#FFF',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        <h3 className="font-cinzel" style={{ fontSize: '1.6rem', color: '#FFF', marginBottom: '8px' }}>
          Upload Real Memory
        </h3>
        <p style={{ fontSize: '0.85rem', color: '#9CA3AF', marginBottom: '24px' }}>
          Add your real photos, videos, or guitar audio recordings to our cinematic stream.
        </p>

        {isSaved ? (
          <div style={{ textAlign: 'center', padding: '32px 0' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'rgba(229, 9, 20, 0.2)',
              border: '2px solid #E50914',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto'
            }}>
              <Check size={32} color="#E50914" />
            </div>
            <h4 style={{ color: '#FFF', fontSize: '1.2rem' }}>Memory Saved to Vault!</h4>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: '#D4AF37', display: 'block', marginBottom: '6px' }}>
                Memory Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Scooty Ride to Hubballi / Tolankere"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#FFF',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', color: '#D4AF37', display: 'block', marginBottom: '6px' }}>
                Date / Moment
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="e.g. 21 May 2026 / 5 June 2026"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#FFF',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* File Upload Drop Area */}
            <div>
              <label style={{ fontSize: '0.8rem', color: '#D4AF37', display: 'block', marginBottom: '6px' }}>
                Select Photo, Video, or Audio File
              </label>
              <div style={{
                border: '2px dashed rgba(229, 9, 20, 0.4)',
                borderRadius: '12px',
                padding: '24px',
                textAlign: 'center',
                backgroundColor: 'rgba(229, 9, 20, 0.04)',
                cursor: 'pointer',
                position: 'relative'
              }}>
                <input
                  type="file"
                  accept="image/*,video/*,audio/*"
                  onChange={handleFileChange}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0,
                    cursor: 'pointer',
                    width: '100%',
                    height: '100%'
                  }}
                />
                <Upload size={32} color="#E50914" style={{ marginBottom: '8px' }} />
                <p style={{ color: '#E5E7EB', fontSize: '0.9rem' }}>
                  {fileDataUrl ? '✓ File Loaded Ready to Save' : 'Click or Drag photo/audio file here'}
                </p>
                <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                  Supports JPG, PNG, MP4, MP3, WAV
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={!fileDataUrl}
              className="btn-cinematic"
              style={{
                width: '100%',
                marginTop: '12px',
                justifyContent: 'center',
                opacity: fileDataUrl ? 1 : 0.5
              }}
            >
              Save Memory to Vault
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
