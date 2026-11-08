import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Copy, Check, AlertTriangle, Lightbulb } from 'lucide-react';
import { FAQS } from '../data/vpsData';
import { Language } from '../types';

interface TroubleshootingProps {
  language: Language;
}

export const Troubleshooting: React.FC<TroubleshootingProps> = ({ language }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [copiedCmd, setCopiedCmd] = useState<number | null>(null);

  const handleCopy = (cmd: string, idx: number) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(idx);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <section id="troubleshooting" className="py-12 lg:py-16 bg-white dark:bg-neutral-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
            {language === 'hi' ? 'Common Errors & Solutions' : 'Troubleshooting & Support'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            {language === 'hi'
              ? 'Telegram Music Bot ke Aam Errors aur Unke 100% Solutions'
              : 'Frequently Asked Questions & Error Fixes'}
          </h2>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            {language === 'hi'
              ? 'Voice chat lag, YouTube 429 rate limit, bot band hone ki samasyaon ka samadhan.'
              : 'Proven fixes for YouTube rate limits, audio distortion, terminal disconnections, and database timeouts.'}
          </p>
        </div>

        {/* FAQs Accordion */}
        <div className="mt-8 space-y-3 max-w-4xl">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 transition-all overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-md">
                      {faq.tag}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">
                      {faq.question[language]}
                    </span>
                  </div>
                  <div className="text-neutral-400 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-neutral-600 dark:text-neutral-300 space-y-3 border-t border-neutral-100 dark:border-neutral-800/80 bg-neutral-50/40 dark:bg-neutral-900/50">
                    <p className="leading-relaxed">
                      {faq.answer[language]}
                    </p>

                    {faq.solutionCmd && (
                      <div className="p-3 rounded-lg bg-neutral-950 text-neutral-200 font-mono text-[11px] flex items-center justify-between gap-3 overflow-x-auto">
                        <code className="text-emerald-400">{faq.solutionCmd}</code>
                        <button
                          onClick={() => handleCopy(faq.solutionCmd!, idx)}
                          className="p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer shrink-0"
                          title="Copy command"
                        >
                          {copiedCmd === idx ? (
                            <span className="text-emerald-400 font-sans text-[10px]">Copied!</span>
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Extra Tip Callout */}
        <div className="mt-8 max-w-4xl p-4 rounded-xl border border-amber-500/20 bg-amber-50/30 dark:bg-amber-950/20 flex items-start gap-3 text-xs text-neutral-700 dark:text-neutral-300">
          <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-800 dark:text-amber-300">
              {language === 'hi' ? 'MongoDB Atlas Tip: ' : 'MongoDB Atlas Whitelist: '}
            </span>
            <span>
              {language === 'hi'
                ? 'MongoDB Atlas me "Network Access" me jakar `0.0.0.0/0` (Allow Access from Anywhere) zaroor enable karein, warna VPS se database connect nahi ho payega!'
                : 'In MongoDB Atlas, make sure to add IP `0.0.0.0/0` under Network Access (Allow Access from Anywhere), otherwise your remote VPS will fail to establish a database handshake!'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
