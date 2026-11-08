import React, { useState } from 'react';
import { Trophy, Check, X, ArrowRight, Zap, Shield, Cpu, Server, ExternalLink, HelpCircle } from 'lucide-react';
import { Language } from '../types';

interface ShowdownProps {
  language: Language;
}

export const ShowdownComparison: React.FC<ShowdownProps> = ({ language }) => {
  const [selectedScenario, setSelectedScenario] = useState<'with_card' | 'no_card_beginner' | 'docker_fan'>('with_card');

  return (
    <section id="showdown" className="py-12 lg:py-16 bg-neutral-900 text-neutral-100 border-b border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1 flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>{language === 'hi' ? 'Direct Muqabla: Oracle vs Render vs Koyeb' : 'Direct Showdown: Oracle vs Render vs Koyeb'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {language === 'hi'
              ? 'In Teeno Me Se Telegram Music Bot Ke Liye Kaun Sa Best Hai?'
              : 'Which One is the Absolute Best for Telegram Music Bots?'}
          </h2>
          <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
            {language === 'hi'
              ? 'Agar aapke paas card hai toh bina soche Oracle Cloud chunein. Agar card nahi hai toh Render.com + UptimeRobot sabse aasan aur reliable hai. Neeche poora detailed comparison dekhein.'
              : 'If you have a card for $1 temporary verification, Oracle is the undisputed king. Without a card, Render with UptimeRobot is the most practical choice.'}
          </p>
        </div>

        {/* Quick Decision Scenario Buttons */}
        <div className="mt-8 flex flex-wrap gap-2.5">
          <button
            onClick={() => setSelectedScenario('with_card')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              selectedScenario === 'with_card'
                ? 'bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-400/40'
                : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white'
            }`}
          >
            <span>🏆 {language === 'hi' ? 'Mere paas Card hai (Oracle 24GB)' : 'I have a Card (Oracle 24GB)'}</span>
          </button>

          <button
            onClick={() => setSelectedScenario('no_card_beginner')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              selectedScenario === 'no_card_beginner'
                ? 'bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-400/40'
                : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white'
            }`}
          >
            <span>🛡️ {language === 'hi' ? 'Bina Card Sabse Aasan (Render 24/7)' : 'No Card & Simplest (Render)'}</span>
          </button>

          <button
            onClick={() => setSelectedScenario('docker_fan')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              selectedScenario === 'docker_fan'
                ? 'bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-400/40'
                : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white'
            }`}
          >
            <span>⚡ {language === 'hi' ? 'Bina Card 16GB Heavy RAM (Hugging Face)' : 'No Card 16GB RAM (Hugging Face)'}</span>
          </button>
        </div>

        {/* Interactive Winner Banner based on scenario */}
        <div className="mt-6 p-5 rounded-xl border border-emerald-500/40 bg-emerald-950/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
              <span>★ FINAL VERDICT:</span>
              <span className="text-white">
                {selectedScenario === 'with_card'
                  ? 'Oracle Cloud Always Free (Winner Rank #1 Overall)'
                  : selectedScenario === 'no_card_beginner'
                  ? 'Render.com + UptimeRobot (Winner for Zero Card Beginners)'
                  : 'Hugging Face Spaces (Winner for Maximum Free 16GB RAM without Card)'}
              </span>
            </div>
            <p className="text-xs text-neutral-300 max-w-2xl">
              {selectedScenario === 'with_card' &&
                (language === 'hi'
                  ? 'Oracle Cloud me aapko 24 GB RAM aur 4 CPU milte hain. Bot kabhi lag ya crash nahi karega aur ek sath 20 se zyada groups me play kar sakta hai!'
                  : 'Oracle gives 24 GB RAM and 4 OCPUs. Unrestricted background execution, supports 20+ simultaneous groups without lag.')}
              {selectedScenario === 'no_card_beginner' &&
                (language === 'hi'
                  ? 'Render par GitHub se repo connect karein, Environment Variables bharein aur UptimeRobot se 5 minute ping lagayein. Bina card ke 24/7 chalega!'
                  : 'Render is easiest without credit card. Connect GitHub repo, add env vars, and ping every 5 mins via UptimeRobot to keep awake.')}
              {selectedScenario === 'docker_fan' &&
                (language === 'hi'
                  ? 'Hugging Face Spaces me bina card ke poori 16 GB RAM milti hai! Video stream aur heavy queues ke liye yeh Render se 32 guna zyada powerful hai (UptimeRobot ping zaroor lagayein).'
                  : 'Hugging Face gives a massive 16 GB RAM with zero payment card. 32x more memory than Render for lag-free video streaming and heavy queues!')}
            </p>
          </div>

          <a
            href={
              selectedScenario === 'with_card'
                ? 'https://www.oracle.com/cloud/free/'
                : selectedScenario === 'no_card_beginner'
                ? 'https://render.com/'
                : 'https://huggingface.co/new-space'
            }
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 shadow-xs"
          >
            <span>
              {language === 'hi' ? 'Is Platform Par Jayein' : 'Go to This Platform'}
            </span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Head-to-Head Comparison Table */}
        <div className="mt-8 overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-950">
          <table className="w-full text-left text-xs text-neutral-300">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-900/80 text-[11px] uppercase tracking-wider font-semibold text-neutral-400">
                <th className="py-3.5 px-4 font-mono">Feature</th>
                <th className="py-3.5 px-4 text-emerald-400">
                  <div className="flex items-center gap-1.5">
                    <span>Oracle Cloud</span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">#1 Overall</span>
                  </div>
                </th>
                <th className="py-3.5 px-4 text-amber-400">
                  <div className="flex items-center gap-1.5">
                    <span>Hugging Face</span>
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded">16GB RAM</span>
                  </div>
                </th>
                <th className="py-3.5 px-4 text-sky-400">
                  <div className="flex items-center gap-1.5">
                    <span>Render.com</span>
                    <span className="text-[10px] bg-sky-500/20 text-sky-300 px-1.5 py-0.5 rounded">Easiest</span>
                  </div>
                </th>
                <th className="py-3.5 px-4 text-purple-400">
                  <div className="flex items-center gap-1.5">
                    <span>Koyeb</span>
                    <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded">Docker</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/80">
              {/* RAM Allocation */}
              <tr className="hover:bg-neutral-900/40">
                <td className="py-3 px-4 font-semibold text-white">RAM Allocation</td>
                <td className="py-3 px-4 font-mono font-bold text-emerald-400">24 GB RAM</td>
                <td className="py-3 px-4 font-mono font-bold text-amber-400">16 GB RAM (Massive!)</td>
                <td className="py-3 px-4 font-mono text-neutral-300">512 MB RAM</td>
                <td className="py-3 px-4 font-mono text-neutral-300">512 MB RAM</td>
              </tr>

              {/* CPU Cores */}
              <tr className="hover:bg-neutral-900/40">
                <td className="py-3 px-4 font-semibold text-white">CPU Processing</td>
                <td className="py-3 px-4 font-mono text-emerald-400">4 OCPU (Ampere)</td>
                <td className="py-3 px-4 font-mono text-amber-400">2 vCPU</td>
                <td className="py-3 px-4 font-mono text-neutral-300">0.5 vCPU shared</td>
                <td className="py-3 px-4 font-mono text-neutral-300">0.1 vCPU Eco</td>
              </tr>

              {/* 24/7 Sleep Policy */}
              <tr className="hover:bg-neutral-900/40">
                <td className="py-3 px-4 font-semibold text-white">24/7 Sleep Policy</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">Never Sleeps (True VPS)</td>
                <td className="py-3 px-4 text-neutral-300">48h idle sleep (UptimeRobot ping prevents it)</td>
                <td className="py-3 px-4 text-neutral-300">15 min sleep (UptimeRobot ping prevents it)</td>
                <td className="py-3 px-4 text-neutral-300">24/7 Continuous</td>
              </tr>

              {/* Credit Card Requirement */}
              <tr className="hover:bg-neutral-900/40">
                <td className="py-3 px-4 font-semibold text-white">Credit Card Required?</td>
                <td className="py-3 px-4 text-amber-400 font-semibold">Haan (Card verification)</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">NO CARD (100% Free)</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">NO CARD (100% Free)</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">NO CARD (100% Free)</td>
              </tr>

              {/* Video Streaming */}
              <tr className="hover:bg-neutral-900/40">
                <td className="py-3 px-4 font-semibold text-white">Video Stream in VC</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">1080p Video Smooth</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">1080p Video Smooth</td>
                <td className="py-3 px-4 text-amber-400">Sirf Audio</td>
                <td className="py-3 px-4 text-amber-400">Sirf Audio</td>
              </tr>

              {/* Setup Difficulty */}
              <tr className="hover:bg-neutral-900/40">
                <td className="py-3 px-4 font-semibold text-white">Setup Difficulty</td>
                <td className="py-3 px-4 text-neutral-300">Medium (SSH bash script)</td>
                <td className="py-3 px-4 text-neutral-300">Medium (Dockerfile + Port 7860)</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">Super Easy (No Docker needed)</td>
                <td className="py-3 px-4 text-neutral-300">Easy (Docker based)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Summary Decision Rule */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-emerald-500/30 bg-neutral-950 space-y-2">
            <div className="font-bold text-emerald-400 text-sm flex items-center gap-1.5">
              <span>Oracle Cloud (Winner Overall):</span>
            </div>
            <ul className="space-y-1 text-neutral-300">
              <li>• Agar debit/credit card hai toh 100% yahi chunein.</li>
              <li>• Full root terminal aur permanent 24/7 uptime.</li>
              <li>• 20+ groups aur 24 GB RAM.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-amber-500/30 bg-neutral-950 space-y-2">
            <div className="font-bold text-amber-400 text-sm flex items-center gap-1.5">
              <span>Hugging Face (16 GB Free RAM):</span>
            </div>
            <ul className="space-y-1 text-neutral-300">
              <li>• Bina credit card ke sabse zyada RAM milti hai (16GB).</li>
              <li>• Heavy video streams aur high-bitrate music smooth chalta hai.</li>
              <li>• UptimeRobot se port 7860 par ping lagana padta hai.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-sky-500/30 bg-neutral-950 space-y-2">
            <div className="font-bold text-sky-400 text-sm flex items-center gap-1.5">
              <span>Render.com (Sabse Aasan):</span>
            </div>
            <ul className="space-y-1 text-neutral-300">
              <li>• Bina card ke 1 minute me GitHub repo se deploy ho jata hai.</li>
              <li>• Dockerfile likhne ki zarurat nahi hoti.</li>
              <li>• UptimeRobot ping ke sath 24/7 audio play karta hai.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
