import React from 'react';
import { Server, ArrowUp } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-400">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
            <Server className="w-3 h-3" />
          </div>
          <span className="font-semibold text-neutral-800 dark:text-neutral-200">
            TeleVPS 24/7
          </span>
          <span aria-hidden="true">·</span>
          <span>
            {language === 'hi'
              ? 'Telegram Music Bot Free Hosting & VPS Handbook'
              : 'Telegram Music Bot Free Hosting & VPS Guide'}
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://t.me/BotFather"
            target="_blank"
            rel="noreferrer"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            @BotFather
          </a>
          <a
            href="https://my.telegram.org"
            target="_blank"
            rel="noreferrer"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            my.telegram.org
          </a>
          <a
            href="https://www.oracle.com/cloud/free/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Oracle Cloud Free
          </a>
          <button
            onClick={scrollToTop}
            className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            title="Scroll to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
