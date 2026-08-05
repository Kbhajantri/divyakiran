import React, { useState, useEffect, useRef } from 'react';
import { Lock, KeyRound, Heart } from 'lucide-react';

export default function PinLockScreen({ onUnlock }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    // Auto-focus input on render
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handlePinChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 4);
    setPin(val);
    setError(false);

    if (val.length === 4) {
      if (val === '1234') {
        onUnlock();
      } else {
        setError(true);
        setShake(true);
        setTimeout(() => {
          setPin('');
          setShake(false);
        }, 500);
      }
    }
  };

  const handleKeyPress = (num) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      setError(false);

      if (newPin.length === 4) {
        if (newPin === '1234') {
          onUnlock();
        } else {
          setError(true);
          setShake(true);
          setTimeout(() => {
            setPin('');
            setShake(false);
          }, 500);
        }
      }
    }
  };

  const handleBackspace = () => {
    setPin((prev) => prev.slice(0, -1));
    setError(false);
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
      padding: '20px',
      userSelect: 'none'
    }}>
      {/* Hidden native input for mobile virtual keyboard */}
      <input
        ref={inputRef}
        type="password"
        pattern="[0-9]*"
        inputMode="numeric"
        value={pin}
        onChange={handlePinChange}
        style={{
          position: 'absolute',
          opacity: 0,
          pointerEvents: 'none',
          width: '1px',
          height: '1px'
        }}
      />

      {/* Main Lock Card */}
      <div style={{
        width: '100%',
        maxWidth: '400px',
        backgroundColor: 'rgba(18, 12, 10, 0.92)',
        border: '2px solid rgba(232, 199, 122, 0.45)',
        borderRadius: '24px',
        padding: '36px 28px',
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
          marginBottom: '16px',
          boxShadow: '0 0 20px rgba(177, 18, 38, 0.5)'
        }}>
          <Lock size={28} color="#FFD700" />
        </div>

        <h2 className="font-cinzel gold-text" style={{ fontSize: '1.6rem', fontWeight: '700', marginBottom: '6px' }}>
          Enter Passcode
        </h2>

        <p className="font-serif" style={{ color: '#F5E5C9', fontSize: '0.95rem', fontStyle: 'italic', marginBottom: '24px' }}>
          Please enter the secret 4-digit PIN to access our story
        </p>

        {/* 4 PIN Dots */}
        <div
          onClick={() => inputRef.current && inputRef.current.focus()}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '28px',
            cursor: 'pointer'
          }}
        >
          {[0, 1, 2, 3].map((idx) => {
            const isFilled = pin.length > idx;
            return (
              <div
                key={idx}
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  border: error ? '2px solid #FF4D4D' : (isFilled ? '2px solid #FFD700' : '2px solid rgba(232, 199, 122, 0.4)'),
                  backgroundColor: error ? '#FF4D4D' : (isFilled ? '#B11226' : 'transparent'),
                  boxShadow: isFilled ? '0 0 15px rgba(255, 215, 0, 0.8)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              />
            );
          })}
        </div>

        {/* Error message if PIN is wrong */}
        {error && (
          <p style={{ color: '#FF4D4D', fontSize: '0.85rem', fontWeight: '600', marginBottom: '16px', fontFamily: "'Cormorant Garamond', serif" }}>
            Incorrect Passcode. Please try again ♡
          </p>
        )}

        {/* On-screen Keypad */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
          maxWidth: '280px',
          margin: '0 auto'
        }}>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              onClick={() => handleKeyPress(num)}
              style={{
                padding: '14px',
                fontSize: '1.25rem',
                fontWeight: '700',
                fontFamily: "'Cinzel', serif",
                color: '#FFF8DC',
                backgroundColor: 'rgba(30, 20, 16, 0.85)',
                border: '1px solid rgba(232, 199, 122, 0.3)',
                borderRadius: '50px',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                transition: 'all 0.15s ease',
                touchAction: 'manipulation'
              }}
              onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.94)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              {num}
            </button>
          ))}
          <div />
          <button
            onClick={() => handleKeyPress('0')}
            style={{
              padding: '14px',
              fontSize: '1.25rem',
              fontWeight: '700',
              fontFamily: "'Cinzel', serif",
              color: '#FFF8DC',
              backgroundColor: 'rgba(30, 20, 16, 0.85)',
              border: '1px solid rgba(232, 199, 122, 0.3)',
              borderRadius: '50px',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
              transition: 'all 0.15s ease',
              touchAction: 'manipulation'
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.94)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            0
          </button>
          <button
            onClick={handleBackspace}
            style={{
              padding: '14px',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: '#E8C77A',
              backgroundColor: 'rgba(30, 20, 16, 0.85)',
              border: '1px solid rgba(232, 199, 122, 0.3)',
              borderRadius: '50px',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
              transition: 'all 0.15s ease',
              touchAction: 'manipulation'
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
