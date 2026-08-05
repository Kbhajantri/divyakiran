import React, { useState, useEffect, useRef } from 'react';
import { Lock, ArrowRight } from 'lucide-react';

export default function PinLockScreen({ onUnlock }) {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    // Auto-focus input on render to open native device keyboard
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setPasscode(val);
    setError(false);

    // Case-insensitive passcode check: 'divyz', 'Divyz', 'DIVYZ', etc.
    if (val.trim().toLowerCase() === 'divyz') {
      onUnlock();
    } else if (val.trim().length >= 5) {
      // If 5 characters are entered and wrong, trigger shake and erase written passcode
      setError(true);
      setShake(true);
      setTimeout(() => {
        setPasscode('');
        setShake(false);
      }, 450);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passcode.trim().toLowerCase() === 'divyz') {
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => {
        setPasscode('');
        setShake(false);
      }, 450);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 999999,
      backgroundColor: '#070709',
      backgroundImage: 'radial-gradient(circle at 50% 35%, rgba(177, 18, 38, 0.28) 0%, rgba(7, 7, 9, 0.98) 75%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      {/* Main Lock Card */}
      <div style={{
        width: '100%',
        maxWidth: '420px',
        backgroundColor: 'rgba(18, 12, 10, 0.92)',
        border: '2px solid rgba(232, 199, 122, 0.45)',
        borderRadius: '24px',
        padding: '40px 28px',
        boxShadow: '0 25px 70px rgba(0,0,0,0.95), 0 0 40px rgba(177,18,38,0.3)',
        backdropFilter: 'blur(16px)',
        textAlign: 'center',
        transform: shake ? 'translateX(-10px)' : 'none',
        transition: 'transform 0.08s ease'
      }}>
        {/* Pulsing Lock Icon */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: 'rgba(177, 18, 38, 0.2)',
          border: '1.5px solid #D4AF37',
          marginBottom: '18px',
          boxShadow: '0 0 20px rgba(177, 18, 38, 0.5)'
        }}>
          <Lock size={28} color="#FFD700" />
        </div>

        <h2 className="font-cinzel gold-text" style={{ fontSize: '1.7rem', fontWeight: '700', marginBottom: '8px' }}>
          Enter Passcode
        </h2>

        <p className="font-serif" style={{ color: '#F5E5C9', fontSize: '0.95rem', fontStyle: 'italic', marginBottom: '28px' }}>
          Please enter the secret passcode to access our story
        </p>

        {/* Text Input Form using native device keyboard */}
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <input
              ref={inputRef}
              type="text"
              value={passcode}
              onChange={handleInputChange}
              placeholder="Enter passcode..."
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              style={{
                width: '100%',
                padding: '16px 54px 16px 20px',
                fontSize: '1.15rem',
                fontFamily: "'Cormorant Garamond', serif",
                color: '#FFF8DC',
                backgroundColor: 'rgba(30, 20, 16, 0.85)',
                border: error ? '2px solid #FF4D4D' : '1.5px solid rgba(232, 199, 122, 0.4)',
                borderRadius: '50px',
                outline: 'none',
                boxShadow: error ? '0 0 15px rgba(255,77,77,0.5)' : 'inset 0 2px 10px rgba(0,0,0,0.8)',
                transition: 'all 0.2s ease'
              }}
            />

            <button
              type="submit"
              style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: '#B11226',
                border: '1px solid #FFD700',
                color: '#FFF8DC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(177,18,38,0.6)',
                transition: 'all 0.2s ease'
              }}
              title="Unlock Story"
            >
              <ArrowRight size={20} />
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <p style={{ color: '#FF4D4D', fontSize: '0.88rem', fontWeight: '600', marginTop: '6px', fontFamily: "'Cormorant Garamond', serif" }}>
              Incorrect Passcode. Please try again ♡
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
