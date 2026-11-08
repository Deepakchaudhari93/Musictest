import React, { useState } from 'react';
import { ExternalLink, Copy, Check, Terminal, ChevronRight } from 'lucide-react';
import { PREREQUISITES, BOT_TEMPLATES } from '../data/vpsData';
import { Language } from '../types';

interface StepByStepTutorialProps {
  language: Language;
  onDeployClick: () => void;
}

export const StepByStepTutorial: React.FC<StepByStepTutorialProps> = ({
  language,
  onDeployClick,
}) => {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const handleCopy = (text: string, stepId: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(stepId);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const stringSessionPythonCmd = `python3 -c "from pyrogram import Client; app = Client('assistant', api_id=int(input('API_ID: ')), api_hash=input('API_HASH: '), in_memory=True); app.run(); print('STRING_SESSION:\\n', app.export_session_string())"`;

  return (
    <section id="roadmap" className="py-12 lg:py-16 bg-neutral-50/60 dark:bg-neutral-900/30 border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
            {language === 'hi' ? 'Zero to 24/7 Running Bot' : 'Complete Beginner Roadmap'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            {language === 'hi'
              ? '5 Steps me Telegram Music Bot Banayein aur Host Karein'
              : '5 Steps to Create & Deploy Telegram Music Bot'}
          </h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
            {language === 'hi'
              ? 'Telegram credentials lene se lekar VPS par background me play karne tak ka poora certified process.'
              : 'From acquiring Telegram API keys to daemonizing the voice chat stream on a free Linux server.'}
          </p>
        </div>

        {/* 5 Steps Roadmap Timeline */}
        <div className="mt-10 space-y-4 max-w-4xl">
          {PREREQUISITES.map((item) => (
            <div
              key={item.step}
              className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 dark:bg-emerald-600 text-white font-mono font-bold text-sm flex items-center justify-center shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                    {item.title[language]}
                  </h3>
                  <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
                    {item.desc[language]}
                  </p>

                  {/* Special Python session string generator helper for Step 3 */}
                  {item.step === 3 && (
                    <div className="mt-3 p-2.5 rounded-lg bg-neutral-950 font-mono text-[11px] text-neutral-300 max-w-xl flex items-center justify-between gap-2 overflow-x-auto">
                      <code className="text-emerald-400 select-all">
                        {stringSessionPythonCmd}
                      </code>
                      <button
                        onClick={() => handleCopy(stringSessionPythonCmd, 3)}
                        className="p-1 text-neutral-400 hover:text-white cursor-pointer shrink-0"
                        title="Copy session generator one-liner"
                      >
                        {copiedStep === 3 ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 self-end sm:self-auto"
                >
                  <span>{item.actionText}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                </a>
              ) : (
                <button
                  onClick={onDeployClick}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 self-end sm:self-auto cursor-pointer"
                >
                  <span>{item.actionText}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Popular Open Source Music Bot Repositories */}
        <div className="mt-14 pt-10 border-t border-neutral-200 dark:border-neutral-800">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
            {language === 'hi' ? 'Top Open-Source Music Bots' : 'Top Open-Source Telegram Bot Engines'}
          </div>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">
            {language === 'hi'
              ? 'Kaunsa Music Bot Repo Use Karein?'
              : 'Recommended Music Bot Repositories'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {BOT_TEMPLATES.map((bot) => (
              <div
                key={bot.id}
                className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-neutral-900 dark:text-white">
                    {bot.name}
                  </h4>
                  <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                    {bot.ramRequirement}
                  </span>
                </div>

                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {bot.description[language]}
                </p>

                <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 space-y-1">
                  <div className="text-[11px] text-neutral-500 font-semibold">Features:</div>
                  <ul className="text-xs text-neutral-700 dark:text-neutral-300 space-y-1">
                    {bot.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="text-emerald-500 text-[10px]">●</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 text-[11px] text-emerald-700 dark:text-emerald-300 font-medium">
                  {bot.recommendedFor[language]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
