import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { VpsComparison } from './components/VpsComparison';
import { ShowdownComparison } from './components/ShowdownComparison';
import { HuggingFaceGuide } from './components/HuggingFaceGuide';
import { KeepAliveGuide } from './components/KeepAliveGuide';
import { ConfigGenerator } from './components/ConfigGenerator';
import { StepByStepTutorial } from './components/StepByStepTutorial';
import { Troubleshooting } from './components/Troubleshooting';
import { Footer } from './components/Footer';
import { Language } from './types';

export default function App() {
  const [language, setLanguage] = useState<Language>('hi');
  const [isDark, setIsDark] = useState<boolean>(true);
  const [vpsFilter, setVpsFilter] = useState<'all' | 'no_card' | 'always_free'>('all');

  // Handle dark mode class on <html> element
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFilterChoice = (filter: 'all' | 'no_card' | 'always_free') => {
    setVpsFilter(filter);
    scrollToSection('vps-list');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col font-sans transition-colors selection:bg-emerald-500/20 selection:text-emerald-400">
      {/* 3-Zone Navigation Header */}
      <Navbar
        language={language}
        setLanguage={setLanguage}
        isDark={isDark}
        setIsDark={setIsDark}
        onSelectTab={scrollToSection}
      />

      {/* Main Content Viewport */}
      <main className="flex-1">
        {/* Hero Section with Direct Answer to User's Request */}
        <HeroSection
          language={language}
          onFilterChoice={handleFilterChoice}
          onSelectTab={scrollToSection}
        />

        {/* Free VPS Comparison Matrix (Oracle, Render, GCP, AWS, Koyeb, HuggingFace) */}
        <VpsComparison
          language={language}
          activeFilter={vpsFilter}
          setActiveFilter={setVpsFilter}
        />

        {/* Head-to-Head Showdown: Oracle vs Render vs Koyeb */}
        <ShowdownComparison language={language} />

        {/* 16GB RAM Hugging Face Spaces 24/7 Deployment Toolkit */}
        <HuggingFaceGuide language={language} />

        {/* 24/7 Keep-Alive Terminal & Systemd Service Guide */}
        <KeepAliveGuide language={language} />

        {/* Interactive Bot Credentials & 1-Click Installer Generator */}
        <ConfigGenerator language={language} />

        {/* 5-Step Beginner Roadmap & Bot Repositories */}
        <StepByStepTutorial
          language={language}
          onDeployClick={() => scrollToSection('config-generator')}
        />

        {/* Troubleshooting & Error Resolution */}
        <Troubleshooting language={language} />
      </main>

      {/* Clean Footer */}
      <Footer language={language} />
    </div>
  );
}
