import React, { useState } from 'react';
import { X, Upload, Check, Sparkles } from 'lucide-react';

export default function ParchmentUploaderModal({ onClose, onSavePage }) {
  const [title, setTitle] = useState('');
  const [dateMeta, setDateMeta] = useState('');
  const [fileDataUrl, setFileDataUrl] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setFileDataUrl(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fileDataUrl) return;

    const newPage = {
      chapterNumber: Date.now(),
      seasonInfo: 'Our Journey',
      chapterTitle: title || 'New Journey Page',
      dateMeta: dateMeta || 'Special Memory',
      exactImage: fileDataUrl,
      paragraphs: ['Uploaded manuscript parchment page.']
    };

    try {
      const stored = localStorage.getItem('our_story_custom_parchment_pages');
      const list = stored ? JSON.parse(stored) : [];
      list.push(newPage);
      localStorage.setItem('our_story_custom_parchment_pages', JSON.stringify(list));
    } catch (err) {
      console.error('Storage error', err);
    }

    if (onSavePage) onSavePage(newPage);

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
      backgroundColor: 'rgba(0,0,0,0.88)',
      backdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '520px',
        width: '100%',
        padding: '36px',
        borderRadius: '24px',
        position: 'relative',
        border: '1.5px solid rgba(177, 18, 38, 0.5)',
        backgroundColor: '#16161B'
      }}>
        {/* Close Button */}
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

        <h3 className="font-cinzel gold-text" style={{ fontSize: '1.6rem', marginBottom: '8px' }}>
          Upload Parchment Page Image
        </h3>
        <p style={{ fontSize: '0.85rem', color: '#9CA3AF', marginBottom: '24px' }}>
          Add your handwritten parchment scans or memory photo pages to the journey sequence.
        </p>

        {isSaved ? (
          <div style={{ textAlign: 'center', padding: '28px 0' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'rgba(177, 18, 38, 0.2)',
              border: '2px solid #B11226',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto'
            }}>
              <Check size={32} color="#B11226" />
            </div>
            <h4 style={{ color: '#FFF', fontSize: '1.2rem' }}>Parchment Page Added to Journey!</h4>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: '#E8C77A', display: 'block', marginBottom: '6px' }}>
                Page Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Episode 2 — The Waiting"
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
              <label style={{ fontSize: '0.8rem', color: '#E8C77A', display: 'block', marginBottom: '6px' }}>
                Date / Subtitle
              </label>
              <input
                type="text"
                value={dateMeta}
                onChange={(e) => setDateMeta(e.target.value)}
                placeholder="e.g. 2023 — Second Year Engineering"
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

            {/* Image Drop Area */}
            <div>
              <label style={{ fontSize: '0.8rem', color: '#E8C77A', display: 'block', marginBottom: '6px' }}>
                Select Manuscript Page Scan Image
              </label>
              <div style={{
                border: '2px dashed rgba(177, 18, 38, 0.5)',
                borderRadius: '12px',
                padding: '24px',
                textAlign: 'center',
                backgroundColor: 'rgba(177, 18, 38, 0.05)',
                cursor: 'pointer',
                position: 'relative'
              }}>
                <input
                  type="file"
                  accept="image/*"
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
                <Upload size={32} color="#B11226" style={{ marginBottom: '8px' }} />
                <p style={{ color: '#E5E7EB', fontSize: '0.9rem' }}>
                  {fileDataUrl ? '✓ Parchment Image Loaded' : 'Click or drag page scan image here'}
                </p>
                <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                  Supports JPG, PNG, WEBP
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
              Save Page to Journey
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
