import React from 'react';
import { Server, Globe, Moon, Sun, ArrowUpRight } from 'lucide-react';
import { Language } from '../types';

interface NavbarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  onSelectTab: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  setLanguage,
  isDark,
  setIsDark,
  onSelectTab,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 text-base font-bold tracking-tight text-neutral-900 dark:text-white whitespace-nowrap shrink-0 group"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20">
            <Server className="w-4 h-4" />
          </div>
          <span className="flex items-center gap-1.5">
            TeleVPS <span className="text-emerald-600 dark:text-emerald-400">24/7</span>
          </span>
        </a>

        {/* Zone 2: 4-5 Navigation Links */}
        <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-neutral-600 dark:text-neutral-400">
          <button
            onClick={() => onSelectTab('vps-list')}
            className="hover:text-neutral-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer text-left"
          >
            {language === 'hi' ? 'Free VPS List' : 'VPS Providers'}
          </button>
          <button
            onClick={() => onSelectTab('showdown')}
            className="hover:text-neutral-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer text-left text-emerald-600 dark:text-emerald-400 font-semibold"
          >
            {language === 'hi' ? 'Oracle vs Render vs Koyeb' : 'Showdown'}
          </button>
          <button
            onClick={() => onSelectTab('hf-guide')}
            className="hover:text-neutral-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer text-left text-amber-500 font-semibold"
          >
            {language === 'hi' ? 'Hugging Face (16GB)' : 'Hugging Face (16GB)'}
          </button>
          <button
            onClick={() => onSelectTab('config-generator')}
            className="hover:text-neutral-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer text-left"
          >
            {language === 'hi' ? 'Config Generator' : 'Config Generator'}
          </button>
          <button
            onClick={() => onSelectTab('keep-alive')}
            className="hover:text-neutral-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer text-left"
          >
            {language === 'hi' ? '24/7 Keep-Alive' : 'Keep-Alive'}
          </button>
        </nav>

        {/* Zone 3: Primary Action & Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
            className="px-2.5 py-1.5 text-xs font-semibold rounded-md border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-neutral-500" />
            <span>{language === 'hi' ? 'Hinglish' : 'English'}</span>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle theme"
            className="p-1.5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-md border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors cursor-pointer"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Primary Action Button */}
          <button
            onClick={() => onSelectTab('config-generator')}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-lg transition-colors shadow-xs flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>{language === 'hi' ? 'Bot Deployer' : 'Generate Config'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
