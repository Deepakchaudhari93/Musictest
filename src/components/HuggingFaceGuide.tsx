import React, { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  ExternalLink, 
  ShieldCheck, 
  Terminal, 
  FolderGit2, 
  Radio, 
  FileCode,
  Zap,
  HelpCircle
} from 'lucide-react';
import { Language } from '../types';

interface HuggingFaceGuideProps {
  language: Language;
}

export const HuggingFaceGuide: React.FC<HuggingFaceGuideProps> = ({ language }) => {
  const [repoInput, setRepoInput] = useState('https://github.com/Deepakchaudhari93/Musicishu.git');
  const [activeTab, setActiveTab] = useState<'mobile' | 'steps' | 'dockerfile' | 'server' | 'readme' | 'secrets'>('mobile');
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTab(id);
    setTimeout(() => setCopiedTab(null), 2000);
  };

  const cleanRepoName = repoInput.split('/').pop()?.replace('.git', '') || 'Musicishu';
  const isMusicishu = repoInput.toLowerCase().includes('musicishu') || repoInput.toLowerCase().includes('aniya');
  const targetModule = isMusicishu ? 'ANIYAXMUSIC' : cleanRepoName;

  const hfReadmeContent = `---
title: Musicishu Telegram Bot
emoji: 🎵
colorFrom: green
colorTo: indigo
sdk: docker
app_port: 7860
pinned: false
---

# 24/7 Telegram Music Bot Running on Hugging Face Spaces (16GB RAM)
This Space runs a persistent Telegram Voice Chat Music Bot daemon paired with a lightweight HTTP health server on port 7860 to ensure uninterrupted 24/7 uptime.
`;

  const hfServerPy = `# server.py - Port 7860 Dummy HTTP Health Server for Hugging Face Spaces
# Isse Hugging Face ko continuous web traffic milta hai aur space kabhi sleep nahi hota!
import http.server
import socketserver
import os
import threading

PORT = int(os.environ.get("PORT", 7860))

class HealthHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        html = f"""
        <html>
            <head><title>Musicishu Bot Status</title></head>
            <body style="background:#0f172a;color:#10b981;font-family:sans-serif;padding:40px;text-align:center;">
                <h1>🟢 Musicishu Bot is Running 24/7</h1>
                <p style="color:#94a3b8;">Hugging Face Space Active · 16 GB RAM · Audio & Video Streaming Online</p>
                <div style="font-size:12px;color:#64748b;margin-top:20px;">Health Check Endpoint OK (Status 200)</div>
            </body>
        </html>
        """
        self.wfile.write(html.encode("utf-8"))

def start_server():
    with socketserver.TCPServer(("", PORT), HealthHandler) as httpd:
        print(f"[*] Hugging Face Health Server started on port {PORT}")
        httpd.serve_forever()

if __name__ == "__main__":
    start_server()
`;

  const hfDockerfile = `# Dockerfile specifically crafted for Musicishu on Hugging Face Spaces 24/7
FROM python:3.10-slim-bullseye

# 1. Install FFmpeg, Git, Node.js and system audio/crypto build libraries
RUN apt-get update -y && apt-get install -y --no-install-recommends \\
    curl \\
    git \\
    ffmpeg \\
    aria2 \\
    gcc \\
    build-essential \\
    libffi-dev \\
    libssl-dev \\
    nodejs \\
    npm \\
    && rm -rf /var/lib/apt/lists/*

# 2. Set Hugging Face working directory
WORKDIR /app

# 3. Clone the bot repository
RUN git clone ${repoInput.trim() || 'https://github.com/Deepakchaudhari93/Musicishu.git'} .

# 4. Install Python dependencies
RUN pip3 install --no-cache-dir -U pip setuptools wheel && \\
    pip3 install --no-cache-dir -U -r requirements.txt

# 5. Copy port 7860 keep-alive server
COPY server.py /app/server.py

# 6. Expose Hugging Face mandatory port 7860
EXPOSE 7860

# 7. Start both the Health Server & the Telegram Music Bot in parallel!
CMD python3 /app/server.py & python3 -m ${targetModule}
`;

  return (
    <section id="hf-guide" className="py-12 lg:py-16 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-500 dark:text-amber-400 mb-1 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>{language === 'hi' ? '16GB RAM Non-Stop 24/7 Setup' : 'Hugging Face Spaces 24/7 Toolkit'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            {language === 'hi'
              ? 'Hugging Face Par Kisi Bhi Repo Ko 24/7 Non-Stop Kaise Chalayein?'
              : 'How to Run Any Telegram Bot Repo 24/7 on Hugging Face (16GB RAM)'}
          </h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {language === 'hi'
              ? 'Hugging Face Space me bot chalane ke liye 2 zaroori cheezein chahiye: 1) Docker SDK aur 2) Port 7860 par dummy health server jo UptimeRobot ke sath milkar bot ko 365 din bina ruke jagaye rakhta hai!'
              : 'To keep Hugging Face 16GB spaces running without the 48-hour idle sleep, pair our Dockerfile with the port 7860 background keep-alive server and UptimeRobot.'}
          </p>
        </div>

        {/* Interactive Repo Input & 1-Click Ready Download */}
        <div className="mt-8 p-5 rounded-xl border border-amber-500/30 bg-amber-50/10 dark:bg-amber-950/20 max-w-4xl space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-amber-500 uppercase tracking-wider">
                {language === 'hi' ? 'Ready-to-Deploy Files (Download on Phone)' : 'Ready-to-Deploy Files (Download on Phone)'}
              </div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                Musicishu (AniyaMusic) + Port 7860 Keep-Alive Server
              </h3>
            </div>

            {/* Direct Download ZIP Button */}
            <a
              href="/Musicishu-HuggingFace-Ready.zip"
              download="Musicishu-HuggingFace-Ready.zip"
              className="px-4 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-xs cursor-pointer"
            >
              <span>{language === 'hi' ? '📦 Full Repo (.ZIP)' : '📦 Full Repo (.ZIP)'}</span>
            </a>
          </div>

          {/* Individual Single-Tap Download Buttons for Mobile */}
          <div className="p-3.5 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2">
            <div className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
              {language === 'hi'
                ? '📱 Phone Me Yeh 3 Files Download Karein Aur GitHub Par Upload Karein:'
                : '📱 Download These 3 Files on Mobile & Upload to GitHub:'}
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href="/server.py"
                download="server.py"
                className="px-3 py-1.5 text-xs font-semibold rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 transition-colors flex items-center gap-1.5"
              >
                <span>📥 1. server.py</span>
              </a>
              <a
                href="/Dockerfile"
                download="Dockerfile"
                className="px-3 py-1.5 text-xs font-semibold rounded-md bg-sky-500/10 border border-sky-500/30 text-sky-600 dark:text-sky-400 hover:bg-sky-500/20 transition-colors flex items-center gap-1.5"
              >
                <span>📥 2. Dockerfile</span>
              </a>
              <a
                href="/start"
                download="start"
                className="px-3 py-1.5 text-xs font-semibold rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-colors flex items-center gap-1.5"
              >
                <span>📥 3. start</span>
              </a>
              <a
                href="https://github.com/Deepakchaudhari93/Musicishu/upload/main"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 text-xs font-bold rounded-md bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90 transition-opacity flex items-center gap-1.5 ml-auto"
              >
                <span>🚀 GitHub Direct Upload Page ↗</span>
              </a>
            </div>
          </div>

          <label className="block text-xs font-bold text-neutral-900 dark:text-white pt-2 border-t border-neutral-200/50 dark:border-neutral-800/60">
            {language === 'hi' ? 'Target Repository URL:' : 'Target Repository URL:'}
          </label>
          <div className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <FolderGit2 className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={repoInput}
                onChange={(e) => setRepoInput(e.target.value)}
                placeholder="https://github.com/Deepakchaudhari93/Musicishu.git"
                className="w-full pl-9 pr-3 py-2 text-xs font-mono rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
              />
            </div>
            <a
              href="https://huggingface.co/new-space"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-amber-500 hover:bg-amber-600 text-neutral-950 font-sans transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer shadow-xs"
            >
              <span>{language === 'hi' ? 'New Space Banayein ↗' : 'Create Space on HF ↗'}</span>
            </a>
          </div>

          <div className="p-3 rounded-lg bg-neutral-900 text-neutral-200 font-mono text-[11px] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-neutral-400"># Direct GitHub Push Command: </span>
              <code className="text-amber-300">git add . && git commit -m "Add HF port 7860 keep-alive" && git push</code>
            </div>
            <button
              onClick={() => handleCopy('git add . && git commit -m "Add HF port 7860 keep-alive" && git push', 'git-cmd')}
              className="px-2 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[10px] cursor-pointer self-start sm:self-auto shrink-0"
            >
              {copiedTab === 'git-cmd' ? 'Copied!' : 'Copy Command'}
            </button>
          </div>
        </div>

        {/* Tab Controls for Hugging Face Files */}
        <div className="mt-8 flex flex-wrap gap-2 p-1 bg-neutral-100 dark:bg-neutral-900 rounded-lg w-fit border border-neutral-200 dark:border-neutral-800">
          <button
            onClick={() => setActiveTab('mobile')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'mobile'
                ? 'bg-amber-500 text-neutral-950 shadow-xs'
                : 'text-amber-600 dark:text-amber-400 hover:text-amber-500'
            }`}
          >
            📱 {language === 'hi' ? 'Phone Se Kaise Karein (Mobile Guide)' : 'Mobile Phone Step-by-Step'}
          </button>
          <button
            onClick={() => setActiveTab('steps')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'steps'
                ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            📋 {language === 'hi' ? 'General Steps' : '4-Step Setup Guide'}
          </button>
          <button
            onClick={() => setActiveTab('dockerfile')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'dockerfile'
                ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            🐳 Dockerfile
          </button>
          <button
            onClick={() => setActiveTab('server')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'server'
                ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            ⚡ server.py
          </button>
          <button
            onClick={() => setActiveTab('secrets')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'secrets'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-emerald-600 dark:text-emerald-400 hover:text-emerald-500'
            }`}
          >
            🔑 7 Secrets List
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="mt-5 max-w-4xl">
          {activeTab === 'mobile' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-amber-500/40 bg-amber-50/20 dark:bg-amber-950/30 text-xs text-neutral-800 dark:text-neutral-200">
                <span className="font-bold text-amber-600 dark:text-amber-400 text-sm block mb-1">
                  📱 Phone Se 100% Setup Karne Ka Aasan Tarika:
                </span>
                Aapko computer ya laptop ki bilkul zarurat nahi hai! Apne phone ke Chrome / Brave browser se neeche diye gaye 4 steps follow karein:
              </div>

              {/* Step 1 Mobile */}
              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-white text-sm">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center text-xs">1</span>
                  <span>Phone me GitHub Repo Kholein:</span>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 pl-7">
                  Phone ke Chrome browser me jayein aur yeh link open karein:
                </p>
                <div className="pl-7 flex items-center gap-2">
                  <a
                    href="https://github.com/Deepakchaudhari93/Musicishu"
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-600 dark:text-emerald-400 font-mono font-bold underline text-xs"
                  >
                    github.com/Deepakchaudhari93/Musicishu ↗
                  </a>
                </div>
                <div className="pl-7 space-y-1.5 text-neutral-700 dark:text-neutral-300">
                  <div>• Upar <strong>"Add file" &gt; "Create new file"</strong> par tap karein.</div>
                  <div>• File name me likhein: <code className="font-mono text-emerald-500 font-bold">server.py</code></div>
                  <div>• Humare "server.py" tab ka code copy karke paste karein aur neeche green button <strong>"Commit changes"</strong> daba dein!</div>
                </div>
              </div>

              {/* Step 2 Mobile */}
              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-white text-sm">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center text-xs">2</span>
                  <span>Hugging Face Space Banayein:</span>
                </div>
                <div className="pl-7 space-y-1.5 text-neutral-700 dark:text-neutral-300">
                  <div>• Phone browser me open karein: <a href="https://huggingface.co/new-space" target="_blank" rel="noreferrer" className="text-amber-500 font-bold underline">huggingface.co/new-space ↗</a></div>
                  <div>• Space Name: <code className="font-mono">musicishu</code></div>
                  <div>• Space SDK me <strong className="text-emerald-500">"Docker"</strong> par tap karein (Blank template) aur "Create Space" daba dein.</div>
                </div>
              </div>

              {/* Step 3 Mobile */}
              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-white text-sm">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center text-xs">3</span>
                  <span>Phone se 7 Secrets Paste Karein:</span>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 pl-7">
                  Space me upar <strong>"Settings"</strong> tab par tap karein &gt; neeche scroll karke <strong>"Variables and secrets"</strong> me jayein. "+ New secret" daba kar apne Telegram Bot credentials paste karein (BOT_TOKEN, API_ID, API_HASH, STRING_SESSION, MONGO_DB_URI, OWNER_ID, LOGGER_ID).
                </p>
              </div>

              {/* Step 4 Mobile */}
              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-white text-sm">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center text-xs">4</span>
                  <span>UptimeRobot Ping (Never Sleep):</span>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 pl-7">
                  Apne phone me <a href="https://uptimerobot.com" target="_blank" rel="noreferrer" className="text-emerald-500 font-bold underline">uptimerobot.com ↗</a> kholein. Apne Space ka link daal kar 5-minute interval save karein. Ab aapka phone chahe band ho ya switch-off ho, bot 24/7 non-stop internet par chalta rahega!
                </p>
              </div>
            </div>
          )}
          {activeTab === 'steps' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 flex items-start gap-3.5 text-xs">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-neutral-950 font-bold flex items-center justify-center shrink-0">1</span>
                <div>
                  <div className="font-bold text-neutral-900 dark:text-white text-sm">Hugging Face Space Create Karein</div>
                  <div className="text-neutral-600 dark:text-neutral-300 mt-1 leading-relaxed">
                    huggingface.co/new-space par jayein. Name daalein (e.g. <code>musicishu-bot</code>), Space SDK me <strong className="text-amber-500 dark:text-amber-400">"Docker"</strong> chunein, aur Template me "Blank" select karein.
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 flex items-start gap-3.5 text-xs">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-neutral-950 font-bold flex items-center justify-center shrink-0">2</span>
                <div>
                  <div className="font-bold text-neutral-900 dark:text-white text-sm">Secrets Me Bot Credentials Add Karein</div>
                  <div className="text-neutral-600 dark:text-neutral-300 mt-1 leading-relaxed">
                    Space Settings &gt; <strong>Variables and secrets</strong> me jayein. Wahan "+ New secret" dabakar: <code>BOT_TOKEN</code>, <code>API_ID</code>, <code>API_HASH</code>, <code>STRING_SESSION</code>, <code>LOGGER_ID</code>, <code>OWNER_ID</code>, aur <code>MONGO_DB_URI</code> save karein (Secrets tab me poori list dekhein).
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 flex items-start gap-3.5 text-xs">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-neutral-950 font-bold flex items-center justify-center shrink-0">3</span>
                <div>
                  <div className="font-bold text-neutral-900 dark:text-white text-sm">Files Add Karein (Files Tab me)</div>
                  <div className="text-neutral-600 dark:text-neutral-300 mt-1 leading-relaxed">
                    Space ke "Files" tab me jakar do files banayein ya upload karein:
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li><code>Dockerfile</code> (Upar Dockerfile tab se copy karein)</li>
                      <li><code>server.py</code> (Port 7860 keep-alive script)</li>
                      <li><code>README.md</code> (Agar pehle se na ho toh HF header add karein)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 flex items-start gap-3.5 text-xs">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-neutral-950 font-bold flex items-center justify-center shrink-0">4</span>
                <div>
                  <div className="font-bold text-neutral-900 dark:text-white text-sm">UptimeRobot Se 24/7 Non-Stop Ping Lagayein</div>
                  <div className="text-neutral-600 dark:text-neutral-300 mt-1 leading-relaxed">
                    Apne Space ka public web URL copy karein (e.g. <code>https://username-musicishu-bot.hf.space</code>). <strong>UptimeRobot.com</strong> par HTTP monitor banakar 5 minute ka ping laga dein. Done! Space kabhi sleep nahi hoga aur 16GB RAM par hamesha 24/7 run karega!
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'secrets' && (
            <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 space-y-4 text-xs">
              <div className="font-bold text-neutral-900 dark:text-white text-sm">
                Musicishu (AniyaMusic) Ke Liye Hugging Face Secrets:
              </div>
              <p className="text-neutral-600 dark:text-neutral-400">
                Hugging Face Space me <strong>Settings &gt; Variables and secrets &gt; New secret</strong> par click karein aur in 7 secrets ko add karein:
              </p>
              <div className="space-y-2 font-mono">
                <div className="p-2.5 rounded bg-neutral-100 dark:bg-neutral-950 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">BOT_TOKEN</span>
                    <span className="text-neutral-500 font-sans ml-2 text-[11px]">— @BotFather se mila token</span>
                  </div>
                </div>
                <div className="p-2.5 rounded bg-neutral-100 dark:bg-neutral-950 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">API_ID</span>
                    <span className="text-neutral-500 font-sans ml-2 text-[11px]">— my.telegram.org ka numeric ID</span>
                  </div>
                </div>
                <div className="p-2.5 rounded bg-neutral-100 dark:bg-neutral-950 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">API_HASH</span>
                    <span className="text-neutral-500 font-sans ml-2 text-[11px]">— my.telegram.org ka 32-char hash</span>
                  </div>
                </div>
                <div className="p-2.5 rounded bg-neutral-100 dark:bg-neutral-950 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">STRING_SESSION</span>
                    <span className="text-neutral-500 font-sans ml-2 text-[11px]">— Pyrogram v2 string session (Assistant Account)</span>
                  </div>
                </div>
                <div className="p-2.5 rounded bg-neutral-100 dark:bg-neutral-950 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">MONGO_DB_URI</span>
                    <span className="text-neutral-500 font-sans ml-2 text-[11px]">— mongodb+srv://... (MongoDB Atlas Free URI)</span>
                  </div>
                </div>
                <div className="p-2.5 rounded bg-neutral-100 dark:bg-neutral-950 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">OWNER_ID</span>
                    <span className="text-neutral-500 font-sans ml-2 text-[11px]">— Aapka Telegram numeric user ID</span>
                  </div>
                </div>
                <div className="p-2.5 rounded bg-neutral-100 dark:bg-neutral-950 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">LOGGER_ID</span>
                    <span className="text-neutral-500 font-sans ml-2 text-[11px]">— Log channel ya group ID (e.g. -100...)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'dockerfile' && (
            <div className="rounded-xl border border-neutral-800 bg-neutral-950 text-neutral-200 p-4 font-mono text-xs relative">
              <button
                onClick={() => handleCopy(hfDockerfile, 'hf-docker')}
                className="absolute right-3 top-3 px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-white flex items-center gap-1.5 cursor-pointer"
              >
                {copiedTab === 'hf-docker' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="font-sans text-[11px]">{copiedTab === 'hf-docker' ? 'Copied!' : 'Copy Dockerfile'}</span>
              </button>
              <pre className="text-emerald-300 overflow-x-auto whitespace-pre">{hfDockerfile}</pre>
            </div>
          )}

          {activeTab === 'server' && (
            <div className="rounded-xl border border-neutral-800 bg-neutral-950 text-neutral-200 p-4 font-mono text-xs relative">
              <button
                onClick={() => handleCopy(hfServerPy, 'hf-server')}
                className="absolute right-3 top-3 px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-white flex items-center gap-1.5 cursor-pointer"
              >
                {copiedTab === 'hf-server' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="font-sans text-[11px]">{copiedTab === 'hf-server' ? 'Copied!' : 'Copy server.py'}</span>
              </button>
              <pre className="text-sky-300 overflow-x-auto whitespace-pre">{hfServerPy}</pre>
            </div>
          )}

          {activeTab === 'readme' && (
            <div className="rounded-xl border border-neutral-800 bg-neutral-950 text-neutral-200 p-4 font-mono text-xs relative">
              <button
                onClick={() => handleCopy(hfReadmeContent, 'hf-readme')}
                className="absolute right-3 top-3 px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-white flex items-center gap-1.5 cursor-pointer"
              >
                {copiedTab === 'hf-readme' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="font-sans text-[11px]">{copiedTab === 'hf-readme' ? 'Copied!' : 'Copy README.md'}</span>
              </button>
              <pre className="text-amber-300 overflow-x-auto whitespace-pre">{hfReadmeContent}</pre>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
