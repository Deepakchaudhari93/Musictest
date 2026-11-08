import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, CreditCard, Sparkles, Terminal } from 'lucide-react';
import { Language } from '../types';

interface HeroSectionProps {
  language: Language;
  onFilterChoice: (filter: 'all' | 'no_card' | 'always_free') => void;
  onSelectTab: (tabId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  onFilterChoice,
  onSelectTab,
}) => {
  return (
    <section className="relative overflow-hidden border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Editorial kicker */}
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-600 dark:text-emerald-400 mb-3 uppercase">
          <span>Telegram Voice Chat Bot 24/7 Hosting</span>
          <span aria-hidden="true">·</span>
          <span>Zero Monthly Cost</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white max-w-4xl text-balance">
          {language === 'hi'
            ? 'Telegram Music Bot ke liye 24/7 Free VPS aur Cloud Hosting'
            : 'Best 100% Free VPS to Run Telegram Music Bots 24/7'}
        </h1>

        {/* Direct Answer & Summary Paragraph */}
        <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed">
          {language === 'hi' ? (
            <>
              Music bots (<span className="text-neutral-900 dark:text-white font-medium">AnonXMusic, Yukki, Fallen</span>) ko 24 ghante chalane ke liye do sabse behtareen raaste hain:
              Agar aapke paas international card hai toh <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">Oracle Cloud Always Free (24GB RAM, 4 OCPU)</strong> sabse best hai.
              Agar card nahi hai toh <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">Render.com + UptimeRobot</strong> ya <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">Hugging Face (16GB RAM)</strong> se bina card ke 24/7 chalayein!
            </>
          ) : (
            <>
              To run Telegram music bots uninterrupted 24/7 without paying: If you have a debit/credit card for verification, <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">Oracle Cloud Always Free</strong> gives you 24GB RAM & 4 OCPUs forever. If you don't have a card, use <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">Render.com + UptimeRobot</strong> or <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">Hugging Face Spaces (16GB RAM)</strong> with zero payment info required.
            </>
          )}
        </p>

        {/* Quick Decision Cards (Card vs No Card) */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
          {/* Option A: With Card */}
          <div
            onClick={() => onFilterChoice('always_free')}
            className="group relative p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all cursor-pointer shadow-xs"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-neutral-900 dark:text-white">
                    {language === 'hi' ? 'Agar Card Hai (Recommended)' : 'With Card Verification (Gold Standard)'}
                  </h2>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {language === 'hi' ? 'Oracle Cloud Always Free · Google Cloud' : 'Oracle Cloud Free Tier · Google Cloud Free'}
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
            </div>
            <div className="mt-3 text-xs text-neutral-600 dark:text-neutral-300 space-y-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>24 GB RAM + 4 OCPU Ampere ARM Forever Free</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>True 24/7 full root SSH access (No sleep timeout)</span>
              </div>
            </div>
          </div>

          {/* Option B: No Card */}
          <div
            onClick={() => onFilterChoice('no_card')}
            className="group relative p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all cursor-pointer shadow-xs"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-sky-50 dark:bg-sky-950/50 border border-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-neutral-900 dark:text-white">
                    {language === 'hi' ? 'Bina Kisi Credit Card ke' : 'Zero Credit Card (No Card Needed)'}
                  </h2>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {language === 'hi' ? 'Render.com · Koyeb · Hugging Face' : 'Render.com · Koyeb · Hugging Face Spaces'}
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-sky-500 group-hover:translate-x-0.5 transition-all" />
            </div>
            <div className="mt-3 text-xs text-neutral-600 dark:text-neutral-300 space-y-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                <span>Sirf GitHub account se 1-minute me signup aur deploy</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                <span>UptimeRobot ping ke sath 24/7 continuous uptime</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            onClick={() => onSelectTab('vps-list')}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <span>{language === 'hi' ? 'Sabhi Free VPS Compare Karein' : 'Explore All Free VPS'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onSelectTab('config-generator')}
            className="px-5 py-2.5 text-sm font-semibold text-neutral-700 dark:text-neutral-200 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Terminal className="w-4 h-4 text-emerald-500" />
            <span>{language === 'hi' ? '1-Click Bot Deploy Script Generator' : 'Generate 1-Click Deploy Script'}</span>
          </button>

          <button
            onClick={() => onSelectTab('keep-alive')}
            className="px-4 py-2.5 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Zap className="w-4 h-4 text-amber-500" />
            <span>{language === 'hi' ? '24/7 PuTTY/Termius Keep-Alive Guide' : '24/7 Terminal Disconnect Fix'}</span>
          </button>
        </div>

        {/* Tabular Numerals Feature Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800 grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div>
            <div className="text-2xl font-bold text-neutral-900 dark:text-white font-mono tabular-nums">
              $0.00
            </div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              {language === 'hi' ? '100% Free Lifetime' : 'Zero Hidden Charges'}
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-neutral-900 dark:text-white font-mono tabular-nums">
              24 GB
            </div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              {language === 'hi' ? 'Max Free RAM (Oracle)' : 'Max RAM Allocation'}
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 font-mono tabular-nums">
              24/7 / 365
            </div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              {language === 'hi' ? 'Non-Stop Voice Chat' : 'Continuous VC Uptime'}
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-neutral-900 dark:text-white font-mono tabular-nums">
              0 Dead Clicks
            </div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              {language === 'hi' ? 'Ready-to-run Bash Commands' : 'Copy-Paste Scripts'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
