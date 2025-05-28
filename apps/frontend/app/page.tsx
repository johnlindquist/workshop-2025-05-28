import React, { useState, useEffect } from 'react';
import WorkshopBanner from './components/WorkshopBanner';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import BrowseTopics from './components/BrowseTopics';
import FeedSection from './components/FeedSection';
import Footer from './components/Footer';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    if (process.env.NEXT_PUBLIC_LOG_LEVEL === 'info') {
      // eslint-disable-next-line no-console
      console.info(`INFO: App loaded. Dark mode toggled to: ${isDarkMode}. All components mounted.`);
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`flex flex-col min-h-screen antialiased ${isDarkMode ? 'dark bg-gray-900 text-gray-200' : 'bg-white text-black'}`}>
      <WorkshopBanner />
      <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      
      <div className="w-full flex flex-col flex-grow">
        <HeroSection />
        <BrowseTopics />
        <FeedSection />
      </div>
      
      <Footer toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
    </div>
  );
}
