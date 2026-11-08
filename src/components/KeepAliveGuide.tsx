import React, { useState } from 'react';
import { Terminal, Shield, RefreshCw, Copy, Check, Info, Radio, Zap, Clock } from 'lucide-react';
import { Language } from '../types';

interface KeepAliveGuideProps {
  language: Language;
}

export const KeepAliveGuide: React.FC<KeepAliveGuideProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'systemd' | 'tmux' | 'screen' | 'uptimerobot'>('systemd');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="keep-alive" className="py-12 lg:py-16 bg-neutral-50/60 dark:bg-neutral-900/40 border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
            {language === 'hi' ? '24/7 Non-Stop Uptime Guide' : 'Continuous 24/7 Uptime'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            {language === 'hi'
              ? 'Terminal Band Karne Par Bhi Bot 24 Ghante Kaise Chalayein?'
              : 'How to Keep Bot Running 24/7 Even When Terminal is Closed?'}
          </h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {language === 'hi'
              ? 'Jab aap phone ya laptop me PuTTY/Termius band karte hain, toh Linux SIGHUP signal bhejkar process kill kar deta hai. Yahan 4 tareeqe diye gaye hain jisse bot 365 din bina ruke background me chalta rahega.'
              : 'Closing your SSH window sends a SIGHUP hangup signal that immediately terminates foreground processes. Choose one of these 4 methods to daemonize your bot indefinitely.'}
          </p>
        </div>

        {/* Method Selector Tabs */}
        <div className="mt-8 flex flex-wrap gap-2 p-1 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 w-fit">
          <button
            onClick={() => setActiveTab('systemd')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'systemd'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Method 1: Systemd Service (Recommended)</span>
          </button>

          <button
            onClick={() => setActiveTab('tmux')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'tmux'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Method 2: Tmux Session</span>
          </button>

          <button
            onClick={() => setActiveTab('screen')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'screen'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Method 3: Screen Tool</span>
          </button>

          <button
            onClick={() => setActiveTab('uptimerobot')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'uptimerobot'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Method 4: UptimeRobot (For Render / Koyeb)</span>
          </button>
        </div>

        {/* Tab Content Panes */}
        <div className="mt-6">
          {/* Method 1: Systemd Service */}
          {activeTab === 'systemd' && (
            <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                    <span>Systemd Service: Sabse Solid aur Industrial Tareeqa</span>
                    <span className="text-xs font-mono font-normal text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                      Auto-Restart on Crash & Reboot
                    </span>
                  </h3>
                  <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                    {language === 'hi'
                      ? 'Systemd Linux ka system service manager hai. Agar VPS restart ho ya bot kisi karan crash ho jaye, toh ye 3 second ke andar bot ko khud b khud dobara chalu kar deta hai.'
                      : 'Systemd is the native Linux service supervisor. It ensures your bot boots automatically on server restart and recovers within seconds if killed.'}
                  </p>
                </div>
              </div>

              {/* Step 1: Create Service File */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Step 1: Service file banayein (`/etc/systemd/system/musicbot.service`)
                </div>
                <div className="relative rounded-lg bg-neutral-950 p-4 font-mono text-xs text-neutral-200 overflow-x-auto">
                  <button
                    onClick={() =>
                      handleCopy(
                        `sudo nano /etc/systemd/system/musicbot.service`,
                        'sys-step1'
                      )
                    }
                    className="absolute right-3 top-3 p-1.5 rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors cursor-pointer"
                  >
                    {copiedId === 'sys-step1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <code>sudo nano /etc/systemd/system/musicbot.service</code>
                </div>
              </div>

              {/* Step 2: Content of file */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Step 2: Yeh content paste karein (Ctrl+O aur Enter dabakar save karein, Ctrl+X se exit karein):
                </div>
                <div className="relative rounded-lg bg-neutral-950 p-4 font-mono text-xs text-emerald-400/90 overflow-x-auto">
                  <button
                    onClick={() =>
                      handleCopy(
`[Unit]
Description=Telegram Music Bot 24/7 Service
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/AnonXMusic
ExecStart=/usr/bin/python3 -m AnonXMusic
Restart=always
RestartSec=5
LimitNOFILE=65536

[Install]
WantedBy=multi-user.target`,
                        'sys-code'
                      )
                    }
                    className="absolute right-3 top-3 p-1.5 rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors cursor-pointer"
                  >
                    {copiedId === 'sys-code' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <pre className="text-[11px] leading-relaxed whitespace-pre font-mono">
{`[Unit]
Description=Telegram Music Bot 24/7 Service
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/AnonXMusic
ExecStart=/usr/bin/python3 -m AnonXMusic
Restart=always
RestartSec=5
LimitNOFILE=65536

[Install]
WantedBy=multi-user.target`}
                  </pre>
                </div>
              </div>

              {/* Step 3: Commands to start and enable */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Step 3: Service ko activate karein aur status check karein
                </div>
                <div className="relative rounded-lg bg-neutral-950 p-4 font-mono text-xs text-neutral-200 overflow-x-auto space-y-1.5">
                  <button
                    onClick={() =>
                      handleCopy(
                        `sudo systemctl daemon-reload && sudo systemctl enable musicbot && sudo systemctl start musicbot && sudo systemctl status musicbot`,
                        'sys-enable'
                      )
                    }
                    className="absolute right-3 top-3 p-1.5 rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors cursor-pointer"
                  >
                    {copiedId === 'sys-enable' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <div className="text-neutral-400"># Reload systemd and start service</div>
                  <div className="text-emerald-400">sudo systemctl daemon-reload</div>
                  <div className="text-emerald-400">sudo systemctl enable musicbot</div>
                  <div className="text-emerald-400">sudo systemctl start musicbot</div>
                  <div className="text-neutral-400 mt-2"># View real-time live logs anytime:</div>
                  <div className="text-sky-300">journalctl -u musicbot -f</div>
                </div>
              </div>
            </div>
          )}

          {/* Method 2: Tmux */}
          {activeTab === 'tmux' && (
            <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-5">
              <div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                  Tmux: Detachable Background Virtual Terminal
                </h3>
                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                  {language === 'hi'
                    ? 'Tmux ek background terminal banata hai jise aap band kar sakte ho aur baad me dobara re-attach kar sakte ho.'
                    : 'Tmux creates a persistent virtual console session that continues running when you disconnect.'}
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/50 text-xs space-y-2 font-mono">
                  <div className="flex items-center justify-between text-neutral-700 dark:text-neutral-300 font-sans font-semibold">
                    <span>1. Naya session shuru karein aur bot start karein:</span>
                    <button
                      onClick={() => handleCopy(`tmux new -s musicbot\ncd AnonXMusic\npython3 -m AnonXMusic`, 'tmux-1')}
                      className="p-1 text-neutral-400 hover:text-white cursor-pointer"
                    >
                      {copiedId === 'tmux-1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <div className="p-2.5 rounded bg-neutral-950 text-emerald-400">
                    tmux new -s musicbot<br />
                    cd AnonXMusic<br />
                    python3 -m AnonXMusic
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/50 text-xs space-y-2">
                  <div className="font-semibold text-neutral-900 dark:text-white">
                    2. Background me chhod kar bahar aane ke liye (Detach):
                  </div>
                  <div className="text-neutral-600 dark:text-neutral-300">
                    Keyboard par <kbd className="px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 font-mono text-[11px]">Ctrl + B</kbd> dabayein, fir <kbd className="px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 font-mono text-[11px]">D</kbd> dabayein. Aapka terminal detach ho jayega aur bot background me chalta rahega!
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/50 text-xs space-y-2 font-mono">
                  <div className="flex items-center justify-between text-neutral-700 dark:text-neutral-300 font-sans font-semibold">
                    <span>3. Kabhi bhi dobara screen par dekhne ke liye (Re-attach):</span>
                    <button
                      onClick={() => handleCopy(`tmux attach -t musicbot`, 'tmux-3')}
                      className="p-1 text-neutral-400 hover:text-white cursor-pointer"
                    >
                      {copiedId === 'tmux-3' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <div className="p-2.5 rounded bg-neutral-950 text-emerald-400">
                    tmux attach -t musicbot
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Method 3: Screen */}
          {activeTab === 'screen' && (
            <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-5">
              <div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                  GNU Screen: Sabse Simple aur Purana Tareeqa
                </h3>
                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                  {language === 'hi'
                    ? 'Screen command har Linux VPS me pehle se hoti hai ya 1 second me install ho jati hai.'
                    : 'GNU Screen is ubiquitous on almost every Linux distribution.'}
                </p>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 rounded-lg bg-neutral-950 text-neutral-200 space-y-1.5 relative">
                  <button
                    onClick={() => handleCopy(`sudo apt install screen -y\nscreen -S music\npython3 -m AnonXMusic`, 'screen-all')}
                    className="absolute right-3 top-3 p-1.5 rounded bg-neutral-800 text-neutral-300 cursor-pointer"
                  >
                    {copiedId === 'screen-all' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <div className="text-neutral-400"># Install & start new screen:</div>
                  <div className="text-emerald-400">sudo apt install screen -y</div>
                  <div className="text-emerald-400">screen -S music</div>
                  <div className="text-emerald-400">python3 -m AnonXMusic</div>
                  <div className="text-neutral-400 pt-2"># Detach shortcut: Press Ctrl+A, then press D</div>
                  <div className="text-neutral-400 pt-1"># Resume anytime:</div>
                  <div className="text-sky-300">screen -r music</div>
                </div>
              </div>
            </div>
          )}

          {/* Method 4: UptimeRobot */}
          {activeTab === 'uptimerobot' && (
            <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-5">
              <div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                  <span>Render.com & Koyeb Free 24/7 Keep-Alive Hack</span>
                  <span className="text-xs font-mono font-normal text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-2 py-0.5 rounded-md">
                    No Credit Card
                  </span>
                </h3>
                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                  {language === 'hi'
                    ? 'Render free web service 15 minute me so (sleep) jati hai agar koi user na ho. UptimeRobot har 5 minute me request bhej kar use 24 ghante jaga kar rakhta hai!'
                    : 'Render free tier spins down after 15 minutes of inactivity. Pinging it every 5 minutes from UptimeRobot keeps the container hot 24/7.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/40 space-y-1">
                  <div className="font-bold text-neutral-900 dark:text-white">1. Render URL Copy Karein</div>
                  <div className="text-neutral-500 dark:text-neutral-400 text-[11px]">
                    Render dashboard me aapka live URL dikhega (e.g. `https://my-music-bot.onrender.com`).
                  </div>
                </div>

                <div className="p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/40 space-y-1">
                  <div className="font-bold text-neutral-900 dark:text-white">2. UptimeRobot.com me Jayein</div>
                  <div className="text-neutral-500 dark:text-neutral-400 text-[11px]">
                    Free account banayein, "+ Add New Monitor" dabayein, Monitor Type "HTTP(s)" chunein.
                  </div>
                </div>

                <div className="p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/40 space-y-1">
                  <div className="font-bold text-neutral-900 dark:text-white">3. Interval 5 Mins Set Karein</div>
                  <div className="text-neutral-500 dark:text-neutral-400 text-[11px]">
                    URL me Render link paste karein aur Monitoring Interval 5 minutes karke Save karein. Done!
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
