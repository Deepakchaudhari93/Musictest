import { VpsProvider, BotTemplate, FaqItem } from '../types';

export const VPS_PROVIDERS: VpsProvider[] = [
  {
    id: 'oracle',
    name: 'Oracle Cloud Always Free',
    tagline: {
      hi: 'Telegram Music Bot ke liye No.1 Best Free Server (24GB RAM + 4 OCPU ARM)',
      en: 'The #1 Best Free VPS for Telegram Music Bots with 24GB RAM & 4 OCPUs'
    },
    badge: {
      hi: 'Sabse Best (Lifetime Free)',
      en: 'Best Overall (Lifetime Free)'
    },
    isPopular: true,
    isRecommended: true,
    requiresCreditCard: true,
    freeType: 'always_free',
    vcScore: 10,
    specs: {
      cpu: '4 OCPU Ampere ARM (ya 2 AMD Micro)',
      ram: '24 GB RAM (Up to 4 instances)',
      storage: '200 GB NVMe SSD',
      bandwidth: '10 TB / Month Outbound'
    },
    duration: {
      hi: 'Lifetime Free (Kabhi band nahi hota)',
      en: 'Lifetime Free (Never expires if active)'
    },
    osOptions: ['Ubuntu 22.04 LTS / 24.04', 'Debian 12', 'Oracle Linux'],
    pros: {
      hi: [
        'Pure 24/7 bina kisi restriction ke chalta hai',
        '24GB RAM aur 4 Core CPU se 20+ voice chats ek saath chala sakte ho',
        'Full Root SSH access (PuTTY, Termius, Terminal)',
        'FFmpeg audio streaming bilkul crystal-clear aur smooth hoti hai'
      ],
      en: [
        'Runs true 24/7 without arbitrary sleep or limits',
        'Massive 24GB RAM & 4 OCPUs can easily handle multi-group voice chats',
        'Full root SSH access via PuTTY, Termius, or terminal',
        'FFmpeg audio encoding & streaming is smooth without buffering'
      ]
    },
    cons: {
      hi: [
        'Signup ke waqt International Debit/Credit Card (Visa/Mastercard) chahiye (₹80-100 cut hokar wapas refund ho jata hai)',
        'Kayi regions me ARM instances "Out of Capacity" aate hain (Frankfurt, Mumbai, Singapore select karein)'
      ],
      en: [
        'Requires international debit/credit card for $1 temporary hold during signup',
        'ARM instances can sometimes be temporarily "Out of capacity" in some regions'
      ]
    },
    setupSteps: [
      {
        title: {
          hi: 'Oracle Cloud Free Tier account banayein',
          en: 'Sign up for Oracle Cloud Free Tier'
        },
        desc: {
          hi: 'oracle.com/cloud/free par jayein. Apna real address aur card details bharein. Home region dhyan se chunein (e.g. Mumbai, Singapore, Frankfurt).',
          en: 'Visit oracle.com/cloud/free. Enter your real details and card. Choose home region carefully as it cannot be changed later.'
        }
      },
      {
        title: {
          hi: 'Compute VM Instance banayein',
          en: 'Create Compute VM Instance'
        },
        desc: {
          hi: 'Dashboard me "Create a VM Instance" par click karein. Image me Ubuntu 22.04 ya 24.04 chunein. Shape me "Ampere ARM" select karke 2 to 4 OCPU aur 12-24GB RAM set karein.',
          en: 'Click "Create a VM Instance". Pick Ubuntu 22.04 LTS. Under Shape, select "Ampere ARM" with up to 4 OCPUs and 24GB RAM.'
        }
      },
      {
        title: {
          hi: 'SSH Keys download karein aur connect karein',
          en: 'Download SSH Keys and Connect'
        },
        desc: {
          hi: 'Instance banate waqt private key (.key file) download karein. PuTTY ya Termius se `ubuntu@<your-vps-ip>` par connect karein.',
          en: 'Download the generated SSH private key during creation. Connect using Termius or PuTTY with user `ubuntu@<ip>`.'
        },
        command: 'ssh -i my-oracle-key.key ubuntu@<YOUR_INSTANCE_IP>'
      },
      {
        title: {
          hi: 'FFmpeg aur Bot dependencies install karein',
          en: 'Install FFmpeg and Bot Dependencies'
        },
        desc: {
          hi: 'Terminal me update chalayein aur Python, Git, FFmpeg install karein.',
          en: 'Update packages and install Python, FFmpeg, Git, and build tools.'
        },
        command: 'sudo apt update && sudo apt upgrade -y && sudo apt install -y ffmpeg python3-pip python3-venv git nodejs npm tmux'
      }
    ],
    tips: {
      hi: 'Pro Tip: Agar ARM shape out of capacity dikhaye to pehle AMD Micro (1GB RAM) instance bana lein, wo hamesha instant ban jata hai aur music bot aaram se chala leta hai!',
      en: 'Pro Tip: If ARM shape is out of capacity, deploy the 1GB RAM AMD Micro instance first, which is instantly provisioned and handles music bots easily!'
    },
    websiteUrl: 'https://www.oracle.com/cloud/free/'
  },
  {
    id: 'render',
    name: 'Render.com (Web Service / Worker)',
    tagline: {
      hi: 'Bina Credit Card ke Free 24/7 Bot Host karein (Free Web Service + Keep-Alive)',
      en: 'Host Free 24/7 without Credit Card using Free Web Service + Keep-Alive'
    },
    badge: {
      hi: 'No Credit Card Needed',
      en: 'No Credit Card Needed'
    },
    isPopular: true,
    requiresCreditCard: false,
    freeType: 'always_free',
    vcScore: 8.5,
    specs: {
      cpu: '0.5 vCPU shared',
      ram: '512 MB RAM',
      storage: 'Ephemeral Container',
      bandwidth: '100 GB / Month'
    },
    duration: {
      hi: '750 Free Hours / Month (Bina band hue 24/7 chalta hai)',
      en: '750 Free Hours / Month (Enough for continuous 24/7 single service)'
    },
    osOptions: ['Docker Container', 'Python 3.10 / 3.11 Environment'],
    pros: {
      hi: [
        'Koi bhi Debit/Credit Card nahi lagta (Sirf GitHub account se login karo)',
        'GitHub repository connect karke 1-click automatic deploy ho jata hai',
        'Fast network aur clean logs dashboard'
      ],
      en: [
        'Zero credit card required — sign up with simple GitHub or Google account',
        'Auto-deploys directly from your GitHub repository',
        'Fast network connection and real-time live log viewer'
      ]
    },
    cons: {
      hi: [
        'Free Web Service 15 minute baad sleep me chali jati hai agar koi web request na aaye (Iske liye UptimeRobot se 5 minute ping lagana padta hai)',
        '512MB RAM hai, isliye lightweight bots (AnonXMusic, FallenMusic) ke liye best hai'
      ],
      en: [
        'Free web services go to sleep after 15 min of inactivity unless pinged with UptimeRobot or Cron-job',
        '512MB RAM limit means lightweight bots like FallenMusic or AnonX are ideal'
      ]
    },
    setupSteps: [
      {
        title: {
          hi: 'Render.com par GitHub se Sign Up karein',
          en: 'Sign up on Render.com with GitHub'
        },
        desc: {
          hi: 'Render.com par jayein aur "Sign in with GitHub" karein. Koi payment card nahi manga jayega.',
          en: 'Go to Render.com and sign in with your GitHub account. No billing details requested.'
        }
      },
      {
        title: {
          hi: 'Bot repo me ek chhota web server add karein (Keep-Alive ke liye)',
          en: 'Ensure your bot repo has a lightweight dummy web port'
        },
        desc: {
          hi: 'Music bot repos me aamtaur par `server.py` ya FastAPI/Flask dummy port hota hai taaki Render port bind kar sake.',
          en: 'Most Telegram music bot Docker repos provide a dummy HTTP health server on port 8080 for Render.'
        }
      },
      {
        title: {
          hi: 'New Web Service banayein aur Environment Variables bharein',
          en: 'Create New Web Service & Fill Environment Variables'
        },
        desc: {
          hi: 'New Web Service chunein, apna bot repo connect karein, Environment Variables me BOT_TOKEN, API_ID, API_HASH, STRING_SESSION, MONGO_DB_URI daalein.',
          en: 'Select New Web Service, connect your bot repository, and add your API credentials under Environment variables.'
        }
      },
      {
        title: {
          hi: 'UptimeRobot se 24/7 Free Ping set karein',
          en: 'Setup Free 24/7 Ping on UptimeRobot'
        },
        desc: {
          hi: 'uptimerobot.com par free account banayein, Monitor Type "HTTP(s)" chunein, apna Render service URL daalein aur interval 5 minute set karein.',
          en: 'Create a free account on uptimerobot.com, create an HTTP(s) monitor with your Render app URL at 5-minute interval to prevent sleep.'
        }
      }
    ],
    tips: {
      hi: 'Kamaal ka trick: UptimeRobot ya Cron-Job.org se Render URL ko har 5 minute me ping karne se bot mahine bhar 24/7 bina ruke chalta rehta hai!',
      en: 'Pro Tip: Ping your Render app URL every 5 minutes using free UptimeRobot to keep your bot awake 24/7 all month long!'
    },
    websiteUrl: 'https://render.com/'
  },
  {
    id: 'gcp',
    name: 'Google Cloud Platform (GCP Always Free)',
    tagline: {
      hi: 'Google ka Always Free e2-micro VM (1GB RAM + 30GB SSD Forever Free)',
      en: 'Google Cloud Always Free e2-micro instance with 1GB RAM & 30GB SSD'
    },
    badge: {
      hi: 'Google Official Free Tier',
      en: 'Google Official Free Tier'
    },
    requiresCreditCard: true,
    freeType: 'always_free',
    vcScore: 8.8,
    specs: {
      cpu: '1 vCPU (e2-micro instance)',
      ram: '1 GB RAM (2GB Swap memory bana sakte hain)',
      storage: '30 GB Standard Persistent Disk',
      bandwidth: '1 GB Outbound to all regions (Low latency network)'
    },
    duration: {
      hi: 'Always Free (Forever $0 bill agar US regions me ho)',
      en: 'Always Free Forever in eligible US regions (us-central1, us-east1, us-west1)'
    },
    osOptions: ['Debian 11/12', 'Ubuntu 22.04 Minimal', 'Rocky Linux'],
    pros: {
      hi: [
        'Google ka super high-speed internet backbone, voice chat me 0% lag',
        'Direct web browser SSH terminal (Koi software download karne ki zarurat nahi)',
        'Full root privileges, systemd service, background workers'
      ],
      en: [
        'Ultra-low packet loss on Google global backbone network for clean voice streams',
        'In-browser SSH console directly in Google Cloud console',
        'Full root Debian/Ubuntu access with systemd service auto-restart'
      ]
    },
    cons: {
      hi: [
        'Signup ke waqt ₹2 verification charge lagta hai (card chahiye)',
        'Server region sirf US (us-central1, us-east1, us-west1) hi chunna padega Always Free ke liye'
      ],
      en: [
        'Credit/debit card required for verification ($1-2 hold)',
        'Must select US regions (Iowa, Oregon, S. Carolina) to stay within 100% free limits'
      ]
    },
    setupSteps: [
      {
        title: {
          hi: 'Google Cloud Console me jayein',
          en: 'Open Google Cloud Console'
        },
        desc: {
          hi: 'cloud.google.com/free par jayein aur apna free tier account activate karein ($300 free trial credits bhi milte hain).',
          en: 'Visit cloud.google.com/free and activate your free account ($300 initial credits included).'
        }
      },
      {
        title: {
          hi: 'Compute Engine > VM Instances banayein',
          en: 'Navigate to Compute Engine > VM Instances'
        },
        desc: {
          hi: 'Region: `us-central1 (Iowa)`, Machine Type: `e2-micro` (2 vCPU, 1 GB memory), Boot Disk: 30 GB standard persistent disk.',
          en: 'Set Region to `us-central1`, Machine configuration to `e2-micro`, and Boot disk to 30GB.'
        }
      },
      {
        title: {
          hi: 'SSH button dabakar connect karein',
          en: 'Click the SSH button to launch console'
        },
        desc: {
          hi: 'Google Cloud console me direct browser SSH khul jayega. Swap memory banakar RAM 3GB tak badha lein.',
          en: 'Launch web SSH directly from browser, then configure 2GB swap space to double available memory.'
        },
        command: 'sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile && sudo mkswap /swapfile && sudo swapon /swapfile'
      }
    ],
    tips: {
      hi: 'Swap memory trick: e2-micro me 1GB RAM hoti hai, lekin `sudo fallocate -l 2G /swapfile` command chala kar 2GB Swap add karne se bot kabhi out-of-memory crash nahi hota!',
      en: 'Swap Memory Trick: 1GB physical RAM can easily be augmented with 2GB swap file so PyTgCalls voice rendering never runs out of memory!'
    },
    websiteUrl: 'https://cloud.google.com/free'
  },
  {
    id: 'koyeb',
    name: 'Koyeb Serverless Cloud',
    tagline: {
      hi: 'Modern Docker Container Hosting bina Credit Card ke (Free Nano Service)',
      en: 'Fast Docker container hosting with zero credit card required'
    },
    badge: {
      hi: 'No Card & Fast Deploy',
      en: 'No Card & Fast Deploy'
    },
    requiresCreditCard: false,
    freeType: 'always_free',
    vcScore: 8.0,
    specs: {
      cpu: '0.1 vCPU Eco instance',
      ram: '512 MB RAM',
      storage: '2 GB Container Cache',
      bandwidth: '55 GB / Month'
    },
    duration: {
      hi: 'Free Forever (1 Free Eco Service 24/7)',
      en: 'Free Forever for 1 Eco Service running 24/7'
    },
    osOptions: ['Docker Container', 'GitHub Source Build'],
    pros: {
      hi: [
        'Bina credit card ke instant signup',
        'Direct GitHub repository se deploy ho jata hai',
        'Worldwide fast CDN aur Frankfurt/Washington regions'
      ],
      en: [
        'Instant signup with GitHub without credit card',
        'Direct deploy from Git repository or Docker Hub',
        'Locations in Frankfurt (Europe) and Washington (US)'
      ]
    },
    cons: {
      hi: [
        '512MB RAM limit, heavy video streaming bots slow chal sakte hain',
        'Docker knowledge ya standard music bot Dockerfile chahiye'
      ],
      en: [
        '512MB memory limit; audio streaming works fine, video playback might be strained',
        'Requires Dockerfile or pre-built Docker image'
      ]
    },
    setupSteps: [
      {
        title: {
          hi: 'Koyeb.com par account banayein',
          en: 'Create account on Koyeb.com'
        },
        desc: {
          hi: 'Sign up with GitHub par click karein.',
          en: 'Sign up with your GitHub account.'
        }
      },
      {
        title: {
          hi: 'Create Service > GitHub chunein',
          en: 'Select Create Service > GitHub'
        },
        desc: {
          hi: 'Apna forked Telegram music bot repository select karein (e.g. AnonXMusic).',
          en: 'Select your forked music bot repository.'
        }
      },
      {
        title: {
          hi: 'Environment Variables daalein aur Deploy karein',
          en: 'Set Environment Variables & Deploy'
        },
        desc: {
          hi: 'Bot ke credentials daal kar "Deploy" dabayein. Koyeb container build karke 24/7 chalu kar dega.',
          en: 'Enter your bot configuration variables and click Deploy. Koyeb starts the container in seconds.'
        }
      }
    ],
    tips: {
      hi: 'Koyeb me region "Frankfurt" select karein, Telegram servers ke paas hone ke karan voice latency sabse kam milti hai!',
      en: 'Select Frankfurt region in Koyeb for lowest latency to Telegram European data centers!'
    },
    websiteUrl: 'https://www.koyeb.com/'
  },
  {
    id: 'aws',
    name: 'AWS Free Tier (Amazon EC2)',
    tagline: {
      hi: 'Amazon Web Services ka 750 Hours/Month 1 Saal tak 100% Free VPS',
      en: 'Amazon Web Services 750 hours/month free VPS for 12 full months'
    },
    badge: {
      hi: '12 Months Free',
      en: '12 Months Free'
    },
    requiresCreditCard: true,
    freeType: 'free_trial',
    vcScore: 9.0,
    specs: {
      cpu: '1 vCPU (t2.micro ya t3.micro)',
      ram: '1 GB RAM (DDR4)',
      storage: '30 GB EBS General Purpose SSD',
      bandwidth: '15 GB / Month Outbound'
    },
    duration: {
      hi: '12 Mahine (Pure 1 saal 24/7 chalega)',
      en: '12 Months (750 hours every month, continuous 24/7)'
    },
    osOptions: ['Ubuntu 24.04 / 22.04 LTS', 'Amazon Linux 2023', 'Debian 12'],
    pros: {
      hi: [
        'Amazon ka world-class reliable infrastructure',
        'Mumbai region (ap-south-1) available hai, India ke users ke liye 0 voice lag',
        'Full root terminal, static IP, systemd service auto-restart'
      ],
      en: [
        'Enterprise grade uptime and reliability from Amazon',
        'Available in Mumbai (ap-south-1) region for ultra-fast audio in South Asia',
        'Full root access, Elastic IP support, systemd background execution'
      ]
    },
    cons: {
      hi: [
        'Signup ke waqt Debit/Credit Card par ₹2 charge hota hai (refundable)',
        '12 mahine ke baad billing shuru ho sakti hai agar instance band na kiya jaye'
      ],
      en: [
        'Requires debit/credit card for $1 temporary authentication hold',
        'Valid for 12 months after which standard pricing applies if not closed'
      ]
    },
    setupSteps: [
      {
        title: {
          hi: 'AWS Free Tier account banayein',
          en: 'Create AWS Free Tier Account'
        },
        desc: {
          hi: 'aws.amazon.com/free par jayein aur account banayein.',
          en: 'Go to aws.amazon.com/free and register a personal free tier account.'
        }
      },
      {
        title: {
          hi: 'EC2 Dashboard me Launch Instance karein',
          en: 'Launch an EC2 Instance'
        },
        desc: {
          hi: 'Name: "music-bot", OS: Ubuntu 22.04 LTS, Instance type: `t2.micro` (Free tier eligible), Key Pair banakar download karein.',
          en: 'Name your instance, choose Ubuntu 22.04, ensure instance type is `t2.micro` or `t3.micro`, and generate a key pair.'
        }
      },
      {
        title: {
          hi: 'SSH connect karke bot setup karein',
          en: 'Connect via SSH and configure bot'
        },
        desc: {
          hi: 'Downloaded key pair se connect karein aur FFmpeg ke sath bot deploy karein.',
          en: 'SSH in using `ubuntu@<public-ip>` and run the setup scripts.'
        },
        command: 'ssh -i "my-aws-key.pem" ubuntu@<YOUR_AWS_PUBLIC_IP>'
      }
    ],
    tips: {
      hi: 'AWS me Mumbai (ap-south-1) region select karein. Isse Telegram Voice Chat me music ping 10ms se bhi kam rehta hai!',
      en: 'Choose Mumbai (ap-south-1) region on AWS for lowest voice latency when streaming in Indian and Asian voice chats!'
    },
    websiteUrl: 'https://aws.amazon.com/free/'
  },
  {
    id: 'huggingface',
    name: 'Hugging Face Spaces (Docker / Python)',
    tagline: {
      hi: '16GB RAM aur 2 vCPU 100% Free (Bina Credit Card ke)',
      en: '16GB RAM & 2 vCPUs 100% Free with zero credit card'
    },
    badge: {
      hi: '16GB Free RAM (No Card)',
      en: '16GB Free RAM (No Card)'
    },
    requiresCreditCard: false,
    freeType: 'always_free',
    vcScore: 8.2,
    specs: {
      cpu: '2 vCPU',
      ram: '16 GB RAM (Sabse jyada free RAM!)',
      storage: '50 GB Persistent Disk',
      bandwidth: 'Generous Free Community Bandwidth'
    },
    duration: {
      hi: 'Free Forever',
      en: 'Free Forever for open community spaces'
    },
    osOptions: ['Docker', 'Gradio / Python 3.10'],
    pros: {
      hi: [
        'Poore 16 GB RAM milti hai bina 1 paisa kharch kiye',
        'Kisi credit card ya verification ki jarurat nahi hai',
        'Docker container environment support karta hai'
      ],
      en: [
        'Huge 16 GB RAM allocated at no cost without credit card',
        'No payment details or phone verification required',
        'Full custom Dockerfile execution environment'
      ]
    },
    cons: {
      hi: [
        'Space public ya private rakh sakte hain, par 48 hours inactivity par sleep ho sakta hai unless pinged with HTTP health endpoint',
        'Setup karne ke liye thoda Docker file config samajhna padta hai'
      ],
      en: [
        'Space can sleep if idle without an active web request server and monitor',
        'Requires configuring Dockerfile with exposed port'
      ]
    },
    setupSteps: [
      {
        title: {
          hi: 'Hugging Face par account banayein',
          en: 'Sign up on HuggingFace.co'
        },
        desc: {
          hi: 'huggingface.co par free account banayein.',
          en: 'Create a free account on huggingface.co.'
        }
      },
      {
        title: {
          hi: 'New Space create karein with Docker SDK',
          en: 'Create New Space with Docker SDK'
        },
        desc: {
          hi: 'Space SDK me "Docker" select karein aur Space visibility "Public" ya "Private" chunein.',
          en: 'Create a new space and pick the "Docker" SDK option.'
        }
      },
      {
        title: {
          hi: 'Secrets me Bot credentials add karein',
          en: 'Add Bot credentials to Space Secrets'
        },
        desc: {
          hi: 'Space Settings > Variables and secrets me jakar BOT_TOKEN, API_ID, STRING_SESSION save karein.',
          en: 'Under Space Settings > Secrets, add your BOT_TOKEN, API_ID, API_HASH, STRING_SESSION, and MONGO_DB_URI.'
        }
      }
    ],
    tips: {
      hi: 'Hugging Face Space me 16GB RAM milti hai, isme aap ek sath 50 se zyada voice chats aur YouTube 4K stream tak handle kar sakte ho bina lag ke!',
      en: 'The 16GB RAM on Hugging Face easily handles heavy multi-voice chat streaming and high-bitrate audio transcoding!'
    },
    websiteUrl: 'https://huggingface.co/spaces'
  }
];

export const BOT_TEMPLATES: BotTemplate[] = [
  {
    id: 'anonx',
    name: 'AnonXMusic',
    description: {
      hi: 'Modern, superfast Telegram voice chat music bot with PyTgCalls v1/v2, YouTube, Spotify, Resso, JioSaavn support.',
      en: 'Modern, superfast Telegram voice chat music bot with PyTgCalls v1/v2, YouTube, Spotify, Resso, and JioSaavn support.'
    },
    repoUrl: 'https://github.com/TeamYukki/YukkiMusicBot',
    cloneCmd: 'git clone https://github.com/AnonymousX1025/AnonXMusic.git',
    ramRequirement: '512 MB - 1 GB RAM',
    features: ['YouTube & Spotify & JioSaavn', 'Inline Search & Queue', 'Volume Control (1-200%)', 'Fast Voice Chat Join'],
    recommendedFor: {
      hi: 'Render, Koyeb aur 1GB VPS ke liye sabse best aur lightweight!',
      en: 'Ideal for Render, Koyeb, and 1GB RAM servers due to low memory footprint!'
    }
  },
  {
    id: 'yukki',
    name: 'Yukki Music Bot',
    description: {
      hi: 'Telegram ka sabse popular aur advanced music bot. Video streaming, channel play, radio streams, live lyrics support.',
      en: 'The most feature-packed music bot on Telegram. Supports video streaming, channel play, radio, and live lyrics.'
    },
    repoUrl: 'https://github.com/TeamYukki/YukkiMusicBot',
    cloneCmd: 'git clone https://github.com/TeamYukki/YukkiMusicBot.git',
    ramRequirement: '1 GB - 2 GB RAM',
    features: ['Video & Audio Streaming', 'Channel Play & Radio Mode', 'Speed & Pitch Control', 'Clean Admin Panel'],
    recommendedFor: {
      hi: 'Oracle Cloud (4 OCPU / 24GB RAM) aur AWS / GCP ke liye perfect!',
      en: 'Best paired with Oracle Cloud Always Free or AWS/GCP VPS for high-end features!'
    }
  },
  {
    id: 'fallen',
    name: 'FallenMusic',
    description: {
      hi: 'Ultra lightweight Telegram music bot. Zero bloat, fast startup, zero lag even on cheapest 512MB RAM servers.',
      en: 'Ultra-lightweight Telegram music bot designed specifically for lowest RAM usage and instant playback.'
    },
    repoUrl: 'https://github.com/AnonymousX1025/FallenMusic',
    cloneCmd: 'git clone https://github.com/AnonymousX1025/FallenMusic.git',
    ramRequirement: '300 MB - 512 MB RAM',
    features: ['Minimalist & Blazing Fast', 'Low CPU Usage', 'Instant Audio Transcode', 'Auto Leave Assistant'],
    recommendedFor: {
      hi: 'Render.com aur Koyeb Free Tier ke liye No. 1 choice!',
      en: 'Top recommendation for Render free tier and Koyeb without credit card!'
    }
  }
];

export const PREREQUISITES = [
  {
    step: 1,
    title: { hi: 'Telegram Bot Token (@BotFather)', en: 'Telegram Bot Token (@BotFather)' },
    desc: {
      hi: 'Telegram me @BotFather open karein, `/newbot` likhein, name aur username set karein. Jo HTTP API Token milega use copy kar lein.',
      en: 'Open @BotFather on Telegram, send `/newbot`, enter name and username ending in `bot`. Copy the API Token provided.'
    },
    link: 'https://t.me/BotFather',
    actionText: 'Open @BotFather'
  },
  {
    step: 2,
    title: { hi: 'API_ID & API_HASH (my.telegram.org)', en: 'API_ID & API_HASH (my.telegram.org)' },
    desc: {
      hi: 'my.telegram.org par jayein, apna phone number login karein, "API development tools" me jakar koi bhi app name daal kar API_ID (numbers) aur API_HASH (alphanumeric string) note karein.',
      en: 'Go to my.telegram.org, login with phone number, click API development tools, and obtain your numeric API_ID and API_HASH.'
    },
    link: 'https://my.telegram.org',
    actionText: 'my.telegram.org'
  },
  {
    step: 3,
    title: { hi: 'Pyrogram String Session (Assistant Account)', en: 'Pyrogram String Session (Assistant Account)' },
    desc: {
      hi: 'Music bots me ek assistant account Voice Chat me join hokar audio play karta hai. String session generate karne ke liye Telegram bot `@SessionStringBot` use karein ya Colab/Terminal se generate karein.',
      en: 'The assistant user account joins the voice chat to stream audio. Generate a Pyrogram v2 string session using a session generator bot or terminal.'
    },
    link: 'https://t.me/SessionStringBot',
    actionText: 'Get String Session'
  },
  {
    step: 4,
    title: { hi: 'Free MongoDB Database (MongoDB Atlas)', en: 'Free MongoDB Database (MongoDB Atlas)' },
    desc: {
      hi: 'mongodb.com par jayein, free "M0 Sandbox" (512MB Free Forever) cluster banayein. Database user create karein aur `mongodb+srv://...` connection string copy karein.',
      en: 'Register on mongodb.com, deploy a 100% free M0 Sandbox cluster, create a db user, and copy the `mongodb+srv://...` connection URI.'
    },
    link: 'https://www.mongodb.com/cloud/atlas/register',
    actionText: 'MongoDB Atlas Free'
  },
  {
    step: 5,
    title: { hi: 'Free VPS / Hosting par Deploy Karein', en: 'Deploy on Free VPS / Cloud Hosting' },
    desc: {
      hi: 'Upar bataye gaye free VPS (Oracle Cloud ya Render) par hamara generated 1-click script chalayein aur bot 24/7 background me run karega!',
      en: 'Execute the generated 1-click deployment script or Docker build on your chosen VPS to keep it running 24/7.'
    },
    actionText: 'Deploy Now'
  }
];

export const FAQS: FaqItem[] = [
  {
    tag: '24/7 Uptime',
    question: {
      hi: 'PuTTY / Termius terminal close karne par bot band kyu ho jata hai?',
      en: 'Why does the bot stop when I close the PuTTY/Termius SSH window?'
    },
    answer: {
      hi: 'Jab aap SSH terminal band karte ho to OS process ko SIGHUP (hangup) signal bhejta hai jisse bot kill ho jata hai. Iska permanent solution `systemd service` ya `tmux` use karna hai. Hamara tool automatic systemd script generate karta hai jo server restart hone par bhi bot ko auto-start karta hai!',
      en: 'Closing an SSH terminal sends a SIGHUP signal killing child processes. The production solution is using a systemd service or tmux session. Systemd automatically restarts the bot if it crashes or server reboots.'
    },
    solutionCmd: 'sudo systemctl enable musicbot && sudo systemctl start musicbot'
  },
  {
    tag: 'No Card Option',
    question: {
      hi: 'Mere paas Credit Card nahi hai, mai 24/7 bot kaise chalaun?',
      en: 'I do not have a credit card. How can I run my bot 24/7 for free?'
    },
    answer: {
      hi: 'Aap Render.com ya Hugging Face Spaces ya Koyeb chunein! Ye teeno bina kisi credit card ke 100% free hain. Render par deploy karke UptimeRobot se har 5 minute me web URL ko ping karein, bot mahine ke 30 din 24 ghante continuous chalega!',
      en: 'Use Render.com or Hugging Face Spaces! Neither requires a credit card. On Render, set up a free 5-minute HTTP ping with UptimeRobot to prevent it from sleeping, and it runs 24/7 completely free.'
    }
  },
  {
    tag: 'Audio Lag',
    question: {
      hi: 'Voice Chat me gaana ruk ruk kar ya robot jaisi awaaz kyu aati hai?',
      en: 'Why is audio stuttering or sounding robotic in Telegram Voice Chat?'
    },
    answer: {
      hi: 'Do mukhya karan hote hain: 1) VPS CPU 100% par chala gaya ho (FFmpeg transcoding overload), 2) Telegram data center se door ka server (e.g. US server jab voice chat India me ho). Solution: Mumbai ya Frankfurt region ka VPS chunein, aur YouTube video streaming ke badle audio-only mode chalayein.',
      en: 'Usually caused by high CPU usage during FFmpeg transcoding or high network latency to Telegram voice servers. Solution: Deploy in Frankfurt or Mumbai region, and set bot to stream audio-only rather than 1080p video.'
    }
  },
  {
    tag: 'YouTube 429',
    question: {
      hi: 'YouTube "Sign in to confirm you’re not a bot" ya 429 error kaise theek karein?',
      en: 'How to fix YouTube "Sign in to confirm you are not a bot" or HTTP 429 errors?'
    },
    answer: {
      hi: 'Cloud VPS IP addresses par YouTube kabhi kabhi rate-limit laga deta hai. Iska 100% working fix browser se `cookies.txt` export karke bot ke root folder me daalna ya config me `STRING_SESSION` aur Spotify client ID configure karna hai.',
      en: 'Cloud hosting IPs often face YouTube IP rate limits. Fix this by exporting your YouTube session `cookies.txt` using a browser extension and placing it into your bot folder, or relying on Spotify/JioSaavn fallbacks.'
    }
  },
  {
    tag: 'AI Hosting vs Cloud',
    question: {
      hi: 'Kya AI khud mere repo aur token se Telegram bot ko 24/7 chala sakta hai?',
      en: 'Can the AI directly run my bot 24/7 if I provide the repo and token?'
    },
    answer: {
      hi: 'Nahi, AI ek language model aur code builder hai jo aapko setup, configs aur scripts bana kar deta hai. AI ke paas permanent Linux server nahi hota, isliye jaise hi chat session disconnect hota hai, yahan ka environment band ho jata hai. Isliye bot ko hamesha Render, Koyeb, ya Oracle jaise dedicated cloud servers par daala jata hai jo 365 din 24 ghante chalte hain bina kisi manual intervention ke!',
      en: 'No, AI models are conversational code assistants, not persistent cloud hosting servers. Once a chat session closes, the temporary sandbox suspends. Instead, you can give your repo and token to Render, Koyeb, or Oracle Cloud, which are designed to keep applications online 24/7/365 uninterrupted.'
    }
  }
];
