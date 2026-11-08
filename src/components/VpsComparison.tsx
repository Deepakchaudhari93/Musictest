import React, { useState } from 'react';
import { 
  Server, 
  Cpu, 
  HardDrive, 
  Wifi, 
  Check, 
  X, 
  ExternalLink, 
  Copy, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  CreditCard,
  ShieldCheck,
  Search,
  SlidersHorizontal,
  Flame
} from 'lucide-react';
import { VPS_PROVIDERS } from '../data/vpsData';
import { Language, VpsProvider } from '../types';

interface VpsComparisonProps {
  language: Language;
  activeFilter: 'all' | 'no_card' | 'always_free';
  setActiveFilter: (filter: 'all' | 'no_card' | 'always_free') => void;
}

export const VpsComparison: React.FC<VpsComparisonProps> = ({
  language,
  activeFilter,
  setActiveFilter,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedProviderId, setExpandedProviderId] = useState<string | null>('oracle');
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const filteredProviders = VPS_PROVIDERS.filter((provider) => {
    if (activeFilter === 'no_card' && provider.requiresCreditCard) {
      return false;
    }
    if (activeFilter === 'always_free' && provider.freeType !== 'always_free') {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = provider.name.toLowerCase().includes(q);
      const matchTag = provider.tagline[language].toLowerCase().includes(q);
      const matchOs = provider.osOptions.some((os) => os.toLowerCase().includes(q));
      return matchName || matchTag || matchOs;
    }
    return true;
  });

  return (
    <section id="vps-list" className="py-12 lg:py-16 bg-white dark:bg-neutral-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
              {language === 'hi' ? 'Server Ranking & Comparison' : 'Curated VPS Benchmark'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
              {language === 'hi'
                ? 'Telegram Music Bot ke liye Best Free VPS (Ranked)'
                : 'Top Free VPS for Telegram Music Bots'}
            </h2>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400 max-w-2xl">
              {language === 'hi'
                ? '24/7 uptime, Voice chat latency, RAM allocation aur FFmpeg transcoding performance ke aadhar par ranked list.'
                : 'Ranked by voice chat reliability, zero-buffering transcoding, RAM limits, and 24/7 continuous uptime.'}
            </p>
          </div>

          {/* Interactive Filter Tabs (Buttons) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-100 dark:bg-neutral-900 rounded-lg self-start md:self-auto border border-neutral-200 dark:border-neutral-800">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeFilter === 'all'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              {language === 'hi' ? 'Sabhi (All 6)' : 'All Hosts (6)'}
            </button>
            <button
              onClick={() => setActiveFilter('no_card')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeFilter === 'no_card'
                  ? 'bg-white dark:bg-neutral-800 text-emerald-600 dark:text-emerald-400 shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>{language === 'hi' ? 'No Credit Card' : 'No Credit Card'}</span>
            </button>
            <button
              onClick={() => setActiveFilter('always_free')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeFilter === 'always_free'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              {language === 'hi' ? 'Lifetime Always Free' : 'Lifetime Always Free'}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-6 mb-8 max-w-md relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              language === 'hi'
                ? 'Server khojein (e.g. Oracle, Render, Ubuntu, 16GB)...'
                : 'Search hosts (e.g. Oracle, Render, Docker, Ubuntu)...'
            }
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 transition-all"
          />
        </div>

        {/* Providers Grid */}
        <div className="space-y-6">
          {filteredProviders.map((provider, index) => {
            const isExpanded = expandedProviderId === provider.id;

            return (
              <div
                key={provider.id}
                className={`rounded-xl border transition-all ${
                  provider.isRecommended
                    ? 'border-emerald-500/40 dark:border-emerald-500/30 bg-emerald-50/10 dark:bg-emerald-950/10'
                    : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900'
                }`}
              >
                {/* Main Row / Card Header */}
                <div className="p-5 sm:p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Title & Metadata */}
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                        <span className="font-mono font-bold text-neutral-900 dark:text-white">
                          #{index + 1}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                          {provider.badge[language]}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{provider.duration[language]}</span>
                        <span aria-hidden="true">·</span>
                        <span className={provider.requiresCreditCard ? 'text-amber-600 dark:text-amber-400' : 'text-sky-600 dark:text-sky-400 font-medium'}>
                          {provider.requiresCreditCard
                            ? (language === 'hi' ? 'Card verification zaroori' : 'Card verification required')
                            : (language === 'hi' ? 'Bina Card ke 100% Free' : 'Zero Card Required')}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                        {provider.name}
                        {provider.isRecommended && (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-100/70 dark:bg-emerald-950/70 px-2 py-0.5 rounded-md">
                            <Flame className="w-3.5 h-3.5 text-emerald-600" />
                            {language === 'hi' ? 'No. 1 Recommendation' : 'Top Pick'}
                          </span>
                        )}
                      </h3>

                      <p className="text-sm text-neutral-600 dark:text-neutral-300">
                        {provider.tagline[language]}
                      </p>
                    </div>

                    {/* Quick VC Rating and Action */}
                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-right">
                        <div className="text-xs text-neutral-500 dark:text-neutral-400">
                          {language === 'hi' ? 'Voice Chat Score' : 'Voice Chat Score'}
                        </div>
                        <div className="text-xl font-black text-neutral-900 dark:text-white font-mono tabular-nums flex items-baseline justify-end gap-1">
                          <span className="text-emerald-600 dark:text-emerald-400">{provider.vcScore}</span>
                          <span className="text-xs text-neutral-400 font-normal">/ 10</span>
                        </div>
                      </div>

                      <a
                        href={provider.websiteUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 text-xs font-semibold text-neutral-900 dark:text-white bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
                      >
                        <span>{language === 'hi' ? 'Free Portal' : 'Open Portal'}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
                      </a>

                      <button
                        onClick={() => setExpandedProviderId(isExpanded ? null : provider.id)}
                        className="p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                        aria-label="Toggle details"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Specs Matrix Strip */}
                  <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-neutral-200/70 dark:border-neutral-800/70 text-xs">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-neutral-400 shrink-0" />
                      <div>
                        <span className="text-neutral-400 block text-[11px] uppercase tracking-wider">CPU</span>
                        <span className="font-semibold text-neutral-800 dark:text-neutral-200 font-mono">
                          {provider.specs.cpu}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Server className="w-4 h-4 text-emerald-500 shrink-0" />
                      <div>
                        <span className="text-neutral-400 block text-[11px] uppercase tracking-wider">RAM</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                          {provider.specs.ram}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <HardDrive className="w-4 h-4 text-neutral-400 shrink-0" />
                      <div>
                        <span className="text-neutral-400 block text-[11px] uppercase tracking-wider">Storage</span>
                        <span className="font-semibold text-neutral-800 dark:text-neutral-200 font-mono">
                          {provider.specs.storage}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Wifi className="w-4 h-4 text-neutral-400 shrink-0" />
                      <div>
                        <span className="text-neutral-400 block text-[11px] uppercase tracking-wider">Bandwidth</span>
                        <span className="font-semibold text-neutral-800 dark:text-neutral-200 font-mono">
                          {provider.specs.bandwidth}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Details Section */}
                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 rounded-b-xl space-y-6">
                    {/* Pros and Cons */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      {/* Pros */}
                      <div className="space-y-2">
                        <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5" />
                          <span>{language === 'hi' ? 'Faayde (Pros)' : 'Advantages'}</span>
                        </div>
                        <ul className="space-y-1.5 text-xs text-neutral-700 dark:text-neutral-300">
                          {provider.pros[language].map((pro, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-emerald-500 font-bold shrink-0">✓</span>
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Cons */}
                      <div className="space-y-2">
                        <div className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                          <X className="w-3.5 h-3.5" />
                          <span>{language === 'hi' ? 'Dhyan Rakhne Wali Baatein (Cons)' : 'Limitations to Note'}</span>
                        </div>
                        <ul className="space-y-1.5 text-xs text-neutral-700 dark:text-neutral-300">
                          {provider.cons[language].map((con, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-amber-500 font-bold shrink-0">!</span>
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Pro Tip */}
                    <div className="p-3.5 rounded-lg border border-emerald-500/20 bg-emerald-50/30 dark:bg-emerald-950/20 text-xs text-neutral-800 dark:text-neutral-200 flex items-start gap-2.5">
                      <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-emerald-700 dark:text-emerald-300">
                          {language === 'hi' ? 'Kamyabi ka Secret Tip: ' : 'Expert Deployment Tip: '}
                        </span>
                        <span>{provider.tips[language]}</span>
                      </div>
                    </div>

                    {/* Step-by-Step Setup Guide */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
                        {language === 'hi' ? 'Step-by-Step Setup Guide' : 'Step-by-Step Setup Instructions'}
                      </h4>

                      <div className="space-y-3">
                        {provider.setupSteps.map((step, sIdx) => (
                          <div
                            key={sIdx}
                            className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-1.5 text-xs"
                          >
                            <div className="font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 flex items-center justify-center font-mono text-[11px]">
                                {sIdx + 1}
                              </span>
                              <span>{step.title[language]}</span>
                            </div>
                            <p className="text-neutral-600 dark:text-neutral-400 pl-7">
                              {step.desc[language]}
                            </p>

                            {step.command && (
                              <div className="ml-7 mt-2 flex items-center justify-between p-2 rounded-md bg-neutral-900 text-neutral-200 font-mono text-[11px] overflow-x-auto">
                                <code className="select-all">{step.command}</code>
                                <button
                                  onClick={() => handleCopy(step.command!, `${provider.id}-${sIdx}`)}
                                  className="ml-3 p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer shrink-0"
                                  title="Copy command"
                                >
                                  {copiedCmd === `${provider.id}-${sIdx}` ? (
                                    <span className="text-emerald-400 text-[10px] font-sans">Copied!</span>
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
