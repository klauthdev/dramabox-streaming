import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LanguageState {
  lang: string;
  setLang: (lang: string) => void;
}

export const useLanguage = create<LanguageState>()(
  persist(
    (set) => ({
      lang: 'in',
      setLang: (lang) => set({ lang }),
    }),
    {
      name: 'dramabox-language',
    }
  )
);

export const languages = [
  { code: 'in', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'zhHans', name: '简体中文', flag: '🇨🇳' },
  { code: 'zh', name: '繁體中文', flag: '🇹🇼' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭' },
  { code: 'tl', name: 'Filipino', flag: '🇵🇭' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
];

export const lockMessages: Record<string, string> = {
  in: 'Website ini hanya trial, jika membutuhkan API cek Telegram @sapitokenbot',
  en: 'This website is trial only, if you need API check Telegram @sapitokenbot',
  ja: 'このウェブサイトはトライアルのみです。APIが必要な場合はTelegram @sapitokenbotをチェックしてください',
  zhHans: '本网站仅供试用，如需API请查看Telegram @sapitokenbot',
  zh: '本網站僅供試用，如需API請查看Telegram @sapitokenbot',
  es: 'Este sitio web es solo de prueba, si necesita API consulte Telegram @sapitokenbot',
  de: 'Diese Website ist nur Testversion, wenn Sie API benötigen, prüfen Sie Telegram @sapitokenbot',
  fr: 'Ce site web est en version d\'essai uniquement, si vous avez besoin d\'API consultez Telegram @sapitokenbot',
  pt: 'Este site é apenas teste, se você precisa de API verifique Telegram @sapitokenbot',
  ar: 'هذا الموقع تجريبي فقط، إذا كنت بحاجة إلى API تحقق من Telegram @sapitokenbot',
  th: 'เว็บไซต์นี้เป็นเพียงทดลองใช้ หากคุณต้องการ API ตรวจสอบ Telegram @sapitokenbot',
  tl: 'Ang website na ito ay trial lamang, kung kailangan mo ng API tingnan ang Telegram @sapitokenbot',
  ko: '이 웹사이트는 체험판입니다. API가 필요하면 Telegram @sapitokenbot을 확인하세요',
  tr: 'Bu web sitesi sadece deneme amaçlıdır, API\'ye ihtiyacınız varsa Telegram @sapitokenbot\'ı kontrol edin'
};
