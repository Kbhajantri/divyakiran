import React, { useState } from 'react';
import { STORY_PAGES } from './data/storyPages';
import LandingPage from './components/LandingPage';
import JourneyViewer from './components/JourneyViewer';
import SparkleCursor from './components/SparkleCursor';
import BackgroundAudio from './components/BackgroundAudio';

export default function App() {
  const [viewState, setViewState] = useState('landing'); // 'landing' or 'journey'
  const [isAudioPlaying, setIsAudioPlaying] = useState(true); // Default TRUE to start music when website opens
  const [pages] = useState(STORY_PAGES);

  const handleBeginJourney = () => {
    setViewState('journey');
    setIsAudioPlaying(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ backgroundColor: '#070709', minHeight: '100vh', color: '#F5F5F7', position: 'relative' }}>
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
