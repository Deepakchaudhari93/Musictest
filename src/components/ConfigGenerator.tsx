import React, { useState } from 'react';
import { 
  FileCode, 
  Terminal, 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  Settings, 
  Layers, 
  RefreshCcw,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { Language } from '../types';
import { BOT_TEMPLATES } from '../data/vpsData';

interface ConfigGeneratorProps {
  language: Language;
}

export const ConfigGenerator: React.FC<ConfigGeneratorProps> = ({ language }) => {
  const [selectedBot, setSelectedBot] = useState<'anonx' | 'yukki' | 'fallen'>('anonx');
  const [botToken, setBotToken] = useState('');
  const [apiId, setApiId] = useState('');
  const [apiHash, setApiHash] = useState('');
  const [stringSession, setStringSession] = useState('');
  const [mongoUri, setMongoUri] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const [botName, setBotName] = useState('Ishani Music');
  const [outputTab, setOutputTab] = useState<'config' | 'deployScript' | 'dockerfile' | 'systemd'>('deployScript');
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  const fillDemoValues = () => {
    setBotToken('7182938475:AAFeD...YOUR_BOT_TOKEN_HERE');
    setApiId('24910294');
    setApiHash('9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d');
    setStringSession('BAG9z...PYROGRAM_V2_STRING_SESSION_HERE');
    setMongoUri('mongodb+srv://user:pass@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority');
    setOwnerId('6543210987');
    setBotName('Ishani Music Bot');
  };

  const clearForm = () => {
    setBotToken('');
    setApiId('');
    setApiHash('');
    setStringSession('');
    setMongoUri('');
    setOwnerId('');
  };

  const selectedTemplate = BOT_TEMPLATES.find((t) => t.id === selectedBot) || BOT_TEMPLATES[0];

  // Config.env content
  const configEnvContent = `# ==============================================
# Telegram Music Bot Configuration (config.env)
# Generated for: ${botName || 'MyMusicBot'}
# ==============================================

API_ID = ${apiId || 'YOUR_API_ID'}
API_HASH = "${apiHash || 'YOUR_API_HASH'}"
BOT_TOKEN = "${botToken || 'YOUR_BOT_TOKEN'}"
MONGO_DB_URI = "${mongoUri || 'YOUR_MONGO_DB_URI'}"
OWNER_ID = ${ownerId || 'YOUR_TELEGRAM_USER_ID'}
STRING_SESSION = "${stringSession || 'YOUR_PYROGRAM_STRING_SESSION'}"
MUSIC_BOT_NAME = "${botName || 'Ishani Music'}"
DURATION_LIMIT = 300
LOGGER_ID = ${ownerId || '-1001234567890'}
AUTO_LEAVING_ASSISTANT = True
SUPPORT_CHANNEL = "https://t.me/Telegram"
SUPPORT_CHAT = "https://t.me/Telegram"
`;

  // 1-Click deploy.sh bash script
  const deployScriptContent = `#!/usr/bin/env bash
# ====================================================================
# 1-Click 24/7 Telegram Music Bot Installer for Ubuntu/Debian VPS
# Script installs FFmpeg, Python, Virtualenv, Clones Bot & Configures Systemd
# ====================================================================

set -e

echo "🚀 [1/5] Updating Linux packages & installing FFmpeg audio encoder..."
sudo apt update -y && sudo apt upgrade -y
sudo apt install -y ffmpeg python3-pip python3-venv git curl wget tmux build-essential libffi-dev libssl-dev

echo "📁 [2/5] Setting up workspace..."
mkdir -p /home/$USER/musicbot_workspace
cd /home/$USER/musicbot_workspace

if [ ! -d "${selectedTemplate.id === 'anonx' ? 'AnonXMusic' : selectedTemplate.id === 'yukki' ? 'YukkiMusicBot' : 'FallenMusic'}" ]; then
  echo "📥 Cloning ${selectedTemplate.name} repository..."
  ${selectedTemplate.cloneCmd}
fi

cd ${selectedTemplate.id === 'anonx' ? 'AnonXMusic' : selectedTemplate.id === 'yukki' ? 'YukkiMusicBot' : 'FallenMusic'}

echo "🐍 [3/5] Installing Python requirements & dependencies..."
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip setuptools wheel
if [ -f "requirements.txt" ]; then
  pip install -r requirements.txt
fi

echo "⚙️ [4/5] Writing config.env credentials..."
cat << 'EOF' > config.env
${configEnvContent}
EOF

echo "🛡️ [5/5] Registering 24/7 background systemd service..."
sudo tee /etc/systemd/system/musicbot.service > /dev/null << EOF
[Unit]
Description=Telegram Music Bot 24/7 Daemon
After=network.target

[Service]
Type=simple
User=$USER
WorkingDirectory=$(pwd)
ExecStart=$(pwd)/venv/bin/python3 -m ${selectedTemplate.id === 'anonx' ? 'AnonXMusic' : selectedTemplate.id === 'yukki' ? 'YukkiMusicBot' : 'FallenMusic'}
Restart=always
RestartSec=5
LimitNOFILE=65536

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable musicbot
sudo systemctl restart musicbot

echo "🎉 ======================================================="
echo "✅ Bot Successfully Deployed and Running in 24/7 Daemon!"
echo "📜 To check live logs anytime: sudo journalctl -u musicbot -f"
echo "🛑 To stop bot: sudo systemctl stop musicbot"
echo "🔄 To restart bot: sudo systemctl restart musicbot"
echo "======================================================="
`;

  // Dockerfile content
  const dockerfileContent = `# Dockerfile for ${selectedTemplate.name} (Render / Koyeb / Hugging Face)
FROM python:3.10-slim-bullseye

# Install system audio transcoding libraries
RUN apt-get update && apt-get install -y --no-install-recommends \\
    ffmpeg \\
    git \\
    curl \\
    gcc \\
    libffi-dev \\
    libssl-dev \\
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Clone bot repository
RUN ${selectedTemplate.cloneCmd} .

# Install python dependencies
RUN pip install --no-cache-dir --upgrade pip setuptools wheel
RUN pip install --no-cache-dir -r requirements.txt

# Copy config if available
COPY . .

# Run bot
CMD ["python3", "-m", "${selectedTemplate.id === 'anonx' ? 'AnonXMusic' : selectedTemplate.id === 'yukki' ? 'YukkiMusicBot' : 'FallenMusic'}"]
`;

  // Systemd service content
  const systemdServiceContent = `[Unit]
Description=${botName || 'Telegram Music Bot'} 24/7 Service
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/${selectedTemplate.id === 'anonx' ? 'AnonXMusic' : selectedTemplate.id === 'yukki' ? 'YukkiMusicBot' : 'FallenMusic'}
ExecStart=/home/ubuntu/${selectedTemplate.id === 'anonx' ? 'AnonXMusic' : selectedTemplate.id === 'yukki' ? 'YukkiMusicBot' : 'FallenMusic'}/venv/bin/python3 -m ${selectedTemplate.id === 'anonx' ? 'AnonXMusic' : selectedTemplate.id === 'yukki' ? 'YukkiMusicBot' : 'FallenMusic'}
Restart=always
RestartSec=5
LimitNOFILE=65536

[Install]
WantedBy=multi-user.target
`;

  const getActiveCode = () => {
    switch (outputTab) {
      case 'config':
        return configEnvContent;
      case 'deployScript':
        return deployScriptContent;
      case 'dockerfile':
        return dockerfileContent;
      case 'systemd':
        return systemdServiceContent;
      default:
        return deployScriptContent;
    }
  };

  const getActiveFileName = () => {
    switch (outputTab) {
      case 'config':
        return 'config.env';
      case 'deployScript':
        return 'deploy-musicbot.sh';
      case 'dockerfile':
        return 'Dockerfile';
      case 'systemd':
        return 'musicbot.service';
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getActiveCode());
    setCopiedTab(outputTab);
    setTimeout(() => setCopiedTab(null), 2000);
  };

  const handleDownloadFile = () => {
    const element = document.createElement('a');
    const file = new Blob([getActiveCode()], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = getActiveFileName();
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section id="config-generator" className="py-12 lg:py-16 bg-white dark:bg-neutral-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
              {language === 'hi' ? '1-Click Deployment Generator' : 'Deployment Generator'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
              {language === 'hi'
                ? 'Bot Configuration & 1-Click Install Script Generator'
                : 'Bot Credentials & 1-Click Deploy Script Builder'}
            </h2>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400 max-w-2xl">
              {language === 'hi'
                ? 'Apne Telegram credentials daalein aur turant ready-to-run Bash script, config.env aur Systemd auto-restart daemon generate karein.'
                : 'Enter your bot keys to generate a ready-to-run Ubuntu bash installer, Dockerfile, and systemd service file.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fillDemoValues}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{language === 'hi' ? 'Demo Values Fill Karein' : 'Load Demo Values'}</span>
            </button>
            <button
              onClick={clearForm}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors cursor-pointer"
            >
              {language === 'hi' ? 'Clear' : 'Reset'}
            </button>
          </div>
        </div>

        {/* 2-Column Split: Input Form on Left, Output Code on Right */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Fields */}
          <div className="lg:col-span-5 space-y-5 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40">
            {/* Bot Repo Selection */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                {language === 'hi' ? 'Music Bot Repository Chunein:' : 'Select Music Bot Engine:'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {BOT_TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    onClick={() => setSelectedBot(tmpl.id as any)}
                    className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                      selectedBot === tmpl.id
                        ? 'border-emerald-500 bg-white dark:bg-neutral-800 text-emerald-600 dark:text-emerald-400 font-bold shadow-xs'
                        : 'border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 text-neutral-600 dark:text-neutral-400 hover:border-neutral-300'
                    }`}
                  >
                    <div className="text-xs">{tmpl.name}</div>
                    <div className="text-[10px] text-neutral-400 font-mono font-normal mt-0.5">
                      {tmpl.ramRequirement}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Bot Name */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                {language === 'hi' ? 'Bot Ka Naam' : 'Music Bot Name'}
              </label>
              <input
                type="text"
                value={botName}
                onChange={(e) => setBotName(e.target.value)}
                placeholder="Ishani Music"
                className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            {/* BOT TOKEN */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  BOT_TOKEN (@BotFather)
                </label>
                <a
                  href="https://t.me/BotFather"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  Open @BotFather ↗
                </a>
              </div>
              <input
                type="text"
                value={botToken}
                onChange={(e) => setBotToken(e.target.value)}
                placeholder="7182938475:AAFeD_..."
                className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            {/* API ID & HASH */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  API_ID (my.telegram.org)
                </label>
                <input
                  type="text"
                  value={apiId}
                  onChange={(e) => setApiId(e.target.value)}
                  placeholder="24910294"
                  className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  API_HASH
                </label>
                <input
                  type="text"
                  value={apiHash}
                  onChange={(e) => setApiHash(e.target.value)}
                  placeholder="9a8b7c6d5e4f..."
                  className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>
            </div>

            {/* STRING SESSION */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  STRING_SESSION (Pyrogram Assistant)
                </label>
                <span className="text-[10px] text-neutral-400">
                  {language === 'hi' ? 'VC me join hone ke liye' : 'For voice chat join'}
                </span>
              </div>
              <textarea
                value={stringSession}
                onChange={(e) => setStringSession(e.target.value)}
                placeholder="BAG9z... (Pyrogram v2 string session from assistant user account)"
                rows={2}
                className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden resize-none"
              />
            </div>

            {/* MONGO DB URI */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                MONGO_DB_URI (Free MongoDB Atlas)
              </label>
              <input
                type="text"
                value={mongoUri}
                onChange={(e) => setMongoUri(e.target.value)}
                placeholder="mongodb+srv://user:pass@cluster.mongodb.net/..."
                className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>

            {/* OWNER ID */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                OWNER_ID (Aapka Telegram User ID)
              </label>
              <input
                type="text"
                value={ownerId}
                onChange={(e) => setOwnerId(e.target.value)}
                placeholder="6543210987"
                className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Right Column: Generated Code View */}
          <div className="lg:col-span-7 flex flex-col rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-900 text-neutral-100 overflow-hidden shadow-sm">
            {/* Top Bar of Code Box */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-neutral-950 border-b border-neutral-800">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setOutputTab('deployScript')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                    outputTab === 'deployScript'
                      ? 'bg-emerald-600 text-white'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  🚀 deploy.sh (1-Click)
                </button>
                <button
                  onClick={() => setOutputTab('config')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                    outputTab === 'config'
                      ? 'bg-emerald-600 text-white'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  📄 config.env
                </button>
                <button
                  onClick={() => setOutputTab('systemd')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                    outputTab === 'systemd'
                      ? 'bg-emerald-600 text-white'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  🛡️ musicbot.service
                </button>
                <button
                  onClick={() => setOutputTab('dockerfile')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                    outputTab === 'dockerfile'
                      ? 'bg-emerald-600 text-white'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  🐳 Dockerfile
                </button>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyCode}
                  className="px-2.5 py-1 text-xs font-medium rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  title="Copy code"
                >
                  {copiedTab === outputTab ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-sans">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleDownloadFile}
                  className="px-2.5 py-1 text-xs font-medium rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  title="Download File"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            {/* Code Body */}
            <div className="p-4 overflow-x-auto max-h-[460px]">
              <pre className="text-xs font-mono text-emerald-300 leading-relaxed whitespace-pre selection:bg-emerald-900 selection:text-white">
                {getActiveCode()}
              </pre>
            </div>

            {/* Quick Run Instruction Strip */}
            <div className="px-4 py-3 bg-neutral-950/80 border-t border-neutral-800 text-xs text-neutral-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <span className="font-sans">
                {outputTab === 'deployScript' ? (
                  language === 'hi'
                    ? 'VPS terminal me sirf yeh command chalaayein: `bash deploy-musicbot.sh`'
                    : 'Run on your VPS terminal: `bash deploy-musicbot.sh`'
                ) : (
                  language === 'hi'
                    ? 'Is file ko bot ke root folder me rakhein.'
                    : 'Place this file inside your bot root directory.'
                )}
              </span>
              <span className="text-[11px] font-mono text-emerald-400">
                {getActiveFileName()}
              </span>
            </div>
          </div>
        </div>

        {/* 1-Click Direct Cloud Deploy & AI Hosting Clarification */}
        <div className="mt-8 p-5 rounded-xl border border-emerald-500/30 bg-emerald-50/10 dark:bg-emerald-950/20">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
                {language === 'hi' ? 'Bina Kisi Server Command ke 1-Click Deploy' : 'Zero-Terminal 1-Click Cloud Deploy'}
              </div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                {language === 'hi'
                  ? 'Apna Repo aur Token in Free Clouds par dekar 24/7 chalayein'
                  : 'Deploy Repo & Token Directly to 24/7 Free Cloud Services'}
              </h3>
              <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-300 max-w-2xl leading-relaxed">
                {language === 'hi'
                  ? 'AI ek coding assistant hai jo yahan temporary chalta hai, isliye AI khud 24/7 background process nahi rakh sakta. Lekin jab aap Render ya Koyeb par apna repo aur token daalte hain, toh unka cloud server aapke liye 365 din bina ruke bot ko 24 ghante run karta hai!'
                  : 'AI assistants run within temporary conversation sandboxes and cannot host persistent 24/7 background demons. Give your repo and token to these free clouds and they will host it 24/7 automatically!'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <a
                href="https://dashboard.render.com/select-repo?type=web"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-xs"
              >
                <span>Deploy on Render (Free) ↗</span>
              </a>
              <a
                href="https://app.koyeb.com/services/deploy"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-white border border-neutral-700 transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>Deploy on Koyeb ↗</span>
              </a>
              <a
                href="https://huggingface.co/new-space"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-700 transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>Hugging Face (16GB RAM) ↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
