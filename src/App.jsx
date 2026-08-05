import React, { useState } from 'react';
import { STORY_PAGES } from './data/storyPages';
import LandingPage from './components/LandingPage';
import JourneyViewer from './components/JourneyViewer';
import SparkleCursor from './components/SparkleCursor';
import BackgroundAudio from './components/BackgroundAudio';
import PinLockScreen from './components/PinLockScreen';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Resets to false on every refresh
  const [viewState, setViewState] = useState('landing'); // 'landing' or 'journey'
  const [isAudioPlaying, setIsAudioPlaying] = useState(false); // Music OFF during PIN screen & landing page until clicking "OPEN OUR STORY"
  const [pages] = useState(STORY_PAGES);

  const handleBeginJourney = () => {
    setViewState('journey');
    setIsAudioPlaying(true); // Music starts strictly when clicking "OPEN OUR STORY"
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUnlock = () => {
    setIsAuthenticated(true);
  };

  return (
    <div style={{ backgroundColor: '#070709', minHeight: '100vh', color: '#F5F5F7', position: 'relative' }}>
      {/* Secret PIN Lock Screen (Prompts PIN '1234' on every page open and refresh) */}
      {!isAuthenticated && (
        <PinLockScreen onUnlock={handleUnlock} />
      )}

      {/* Golden Mouse Sparkle Trail */}
      <SparkleCursor />

      {/* Floating Background Audio Player with Local Aashiqui 2 MP3 Loop & Volume Slider */}
      <BackgroundAudio
        isAudioPlaying={isAudioPlaying}
        setIsAudioPlaying={setIsAudioPlaying}
      />

      {/* View Routing */}
      {viewState === 'landing' ? (
        <LandingPage onOpenStory={handleBeginJourney} />
      ) : (
        <JourneyViewer pages={pages} />
      )}
    </div>
  );
}
