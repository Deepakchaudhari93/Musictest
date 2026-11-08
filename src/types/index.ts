export type Language = 'hi' | 'en';

export interface VpsProvider {
  id: string;
  name: string;
  tagline: { hi: string; en: string };
  badge: { hi: string; en: string };
  isPopular?: boolean;
  isRecommended?: boolean;
  requiresCreditCard: boolean;
  freeType: 'always_free' | 'free_trial' | 'free_tier_credits';
  vcScore: number; // 1 to 10 rating for Telegram Voice Chat
  specs: {
    cpu: string;
    ram: string;
    storage: string;
    bandwidth: string;
  };
  duration: { hi: string; en: string };
  osOptions: string[];
  pros: { hi: string[]; en: string[] };
  cons: { hi: string[]; en: string[] };
  setupSteps: {
    title: { hi: string; en: string };
    desc: { hi: string; en: string };
    command?: string;
  }[];
  tips: { hi: string; en: string };
  websiteUrl: string;
}

export interface BotTemplate {
  id: string;
  name: string;
  description: { hi: string; en: string };
  repoUrl: string;
  cloneCmd: string;
  ramRequirement: string;
  features: string[];
  recommendedFor: { hi: string; en: string };
}

export interface FaqItem {
  question: { hi: string; en: string };
  answer: { hi: string; en: string };
  solutionCmd?: string;
  tag: string;
}
