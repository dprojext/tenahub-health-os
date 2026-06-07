import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "English" | "Amharic";

type Dictionary = Record<string, { English: string; Amharic: string }>;

export const defaultDictionary: Dictionary = {
  "app.title": { English: "TenaGulecha", Amharic: "ጤናጉለቻ" },
  "nav.login": { English: "Log in", Amharic: "ግባ" },
  "nav.signup": { English: "Sign up", Amharic: "ተመዝገብ" },
  "hero.badge": { English: "Welcome to TenaGulecha", Amharic: "ወደ ጤናጉለቻ እንኳን በደህና መጡ" },
  "hero.title": { English: "HEALTH MANAGEMENT, MADE TRANSPARENT.", Amharic: "የጤና አያያዝ፣ ግልጽ ተደርጓል።" },
  "hero.subtitle": { English: "This is East Africa's first Health Super App that holds professionals, organizations, and wellness mini-apps in one transparent ecosystem. Take control of your health journey with integrated health management tools and seamless service connections.", Amharic: "በምስራቅ አፍሪካ የመጀመሪያው የሆነው ይህ የጤና ሱፐር አፕ ባለሙያዎችን፣ ድርጅቶችን እና የጤና ሚኒ-አፕሊኬሽኖችን በአንድ ግልጽ ስነ-ምህዳር ያገናኛል። በተዋሃዱ የጤና አስተዳደር መሳሪያዎች የጤናዎን ጉዞ ይቆጣጠሩ።" },
  "hero.start": { English: "Get Started", Amharic: "ጀምር" },
  "hero.signin": { English: "Sign In", Amharic: "ግባ" },
  "about.title": { English: "About TenaGulecha", Amharic: "ስለ ጤናጉለቻ" },
  "ecosystem.title": { English: "A unified ecosystem", Amharic: "የተዋሃደ ስነ-ምህዳር" },
  "footer.rights": { English: "© 2026 TenaGulecha Health OS. All rights reserved.", Amharic: "© 2026 ጤናጉለቻ የጤና ስርዓት። መብቱ በህግ የተጠበቀ ነው።" },
  
  // Landing Page Content
  "about.desc1": { English: "TenaGulecha is a comprehensive Health Operating System designed to bridge the gap between individuals seeking better health and the professionals and businesses providing care. We act as a central hub where your health data, services, and applications securely converge.", Amharic: "ጤናጉለቻ የተሻለ ጤና የሚፈልጉ ግለሰቦችን እና የህክምና አገልግሎት ሰጪ ባለሙያዎችንና ድርጅቶችን የሚያገናኝ አጠቃላይ የጤና ስነ-ምህዳር ነው። የጤና መረጃዎ፣ አገልግሎቶችዎ እና አፕሊኬሽኖችዎ በአንድነት የሚገኙበት ማዕከል ነው።" },
  "about.whatwedo": { English: "What We Do", Amharic: "ምን እንሰራለን" },
  "about.whatwedo.desc": { English: "We provide a unified platform that simplifies health management. By integrating various wellness mini-apps, direct communication with healthcare providers, and a centralized health profile, we make it easier for you to track, understand, and improve your well-being.", Amharic: "የጤና አያያዝን የሚያቃልል የተዋሃደ መድረክ እናቀርባለን። የተለያዩ የጤና ሚኒ-አፖችን፣ ከህክምና ባለሙያዎች ጋር ቀጥተኛ ግንኙነትን እና ማዕከላዊ የጤና መገለጫን በማዋሃድ ጤንነትዎን መከታተል እና ማሻሻልን ቀላል እናደርጋለን።" },
  "about.point1": { English: "Centralize your health records and wellness data securely.", Amharic: "የጤና መረጃዎን በአስተማማኝ ሁኔታ በአንድ ቦታ ያሰባስቡ።" },
  "about.point2": { English: "Connect you with certified professionals and verified clinics.", Amharic: "ከተመሰከረላቸው ባለሙያዎች እና ክሊኒኮች ጋር ያገናኝዎታል።" },
  "about.point3": { English: "Offer a marketplace of specialized health mini-apps.", Amharic: "ልዩ የጤና ሚኒ-አፕሊኬሽኖች የገበያ ቦታ ያቀርባል።" },
  "about.whatweprovide": { English: "What We Provide", Amharic: "ምን እናቀርባለን" },
  "about.prov1.title": { English: "Secure Health Profiles", Amharic: "ደህንነቱ የተጠበቀ የጤና መገለጫ" },
  "about.prov1.desc": { English: "Your data is encrypted and completely under your control.", Amharic: "የእርስዎ መረጃ የተመሰጠረ እና ሙሉ በሙሉ በእርስዎ ቁጥጥር ስር ነው።" },
  "about.prov2.title": { English: "Mini-App Marketplace", Amharic: "የሚኒ-አፕ የገበያ ቦታ" },
  "about.prov2.desc": { English: "Access targeted tools for mental health, fitness, maternity, and more.", Amharic: "ለአእምሮ ጤና፣ ለአካል ብቃት፣ ለእናትነት እና ለሌሎችም መሳሪያዎችን ያግኙ።" },
  "about.prov3.title": { English: "Real-time Analytics", Amharic: "የእውነተኛ ጊዜ ትንታኔዎች" },
  "about.prov3.desc": { English: "Actionable insights from your wearables and daily tracking.", Amharic: "በየዕለቱ ክትትልዎ እና ስማርት ሰዓቶችዎ ጠቃሚ መረጃዎችን ያግኙ።" },
  
  "ecosystem.desc": { English: "We eliminate the friction between patients, health experts, and providers through a clean, transparent interface designed for individuals, professionals, and listed businesses.", Amharic: "ለግለሰቦች፣ ለባለሙያዎች እና ለድርጅቶች በተዘጋጀ ግልጽ በሆነ ስርዓት በታካሚዎች፣ በጤና ባለሙያዎች እና በአቅራቢዎች መካከል ያለውን ክፍተት እናስወግዳለን።" },
  "eco.users.title": { English: "For Users", Amharic: "ለተጠቃሚዎች" },
  "eco.users.desc": { English: "Take control of your personal health data. Track your vitals, sign up for wellness challenges, and communicate directly with care providers.", Amharic: "የግል የጤና መረጃዎን ይቆጣጠሩ። የጤና ሁኔታዎን ይከታተሉ እና ከህክምና ባለሙያዎች ጋር በቀጥታ ይገናኙ።" },
  "eco.users.li1": { English: "Personalized dashboard", Amharic: "የግል ዳሽቦርድ" },
  "eco.users.li2": { English: "Connect wearables", Amharic: "የስማርት ሰዓት ግንኙነት" },
  "eco.users.li3": { English: "Book appointments", Amharic: "ቀጠሮዎችን ይያዙ" },
  
  "eco.pro.title": { English: "For Professionals", Amharic: "ለባለሙያዎች" },
  "eco.pro.desc": { English: "Verify your credentials and manage your clients seamlessly. Offer remote consultations, schedule appointments, and grow your practice.", Amharic: "የሙያ ማረጋገጫዎን ይመዝግቡ እና ደንበኞችዎን በቀላሉ ያስተዳድሩ። የርቀት ህክምና ይስጡ እና ቀጠሮዎችን ያስተካክሉ።" },
  "eco.pro.li1": { English: "Verified directory listing", Amharic: "የተረጋገጠ የማውጫ ዝርዝር" },
  "eco.pro.li2": { English: "Client roster management", Amharic: "የደንበኞች አስተዳደር" },
  "eco.pro.li3": { English: "Telehealth & messaging", Amharic: "የርቀት ህክምና እና መልእክት" },
  
  "eco.org.title": { English: "List Your Business", Amharic: "ድርጅትዎን ይመዝግቡ" },
  "eco.org.desc": { English: "Clinics, labs, and wellness centers can list their business on our super app. Reach new users, track engagement, and build integrations.", Amharic: "ክሊኒኮች፣ ላቦራቶሪዎች እና የጤና ማዕከላት ድርጅታቸውን በእኛ መተግበሪያ ላይ መመዝገብ ይችላሉ። አዳዲስ ተጠቃሚዎችን ያግኙ።" },
  "eco.org.li1": { English: "Business profile management", Amharic: "የድርጅት መገለጫ አስተዳደር" },
  "eco.org.li2": { English: "User engagement analytics", Amharic: "የተጠቃሚዎች ተሳትፎ ትንታኔ" },
  "eco.org.li3": { English: "Super app integrations", Amharic: "የሱፐር አፕ ውህደት" },
  
  "publish.title": { English: "Publish Your Wellness Mini-App", Amharic: "የእርስዎን የጤና ሚኒ-አፕ ያሳውቁ" },
  "publish.desc": { English: "Are you a digital health developer? Register your web application or service module to list it in the TenaGulecha App Marketplace.", Amharic: "እርስዎ የዲጂታል ጤና አበልፃጊ ነዎት? በመተግበሪያችን የገበያ ቦታ ላይ ለማሳተም የእርስዎን ዌብ አፕሊኬሽን ይመዝግቡ።" },
  "publish.btn": { English: "Publish Site to Show Full Version", Amharic: "ሙሉ ስሪቱን ለማየት ጣቢያውን ያሳውቁ" },
  
  "tabs.dashboard": { English: "Dashboard", Amharic: "ዳሽቦርድ" },
  "tabs.healthdata": { English: "Health Data", Amharic: "የጤና መረጃ" },
  "tabs.miniapps": { English: "Mini-apps", Amharic: "ሚኒ አፕሊኬሽኖች" },
  "tabs.professionals": { English: "Professionals", Amharic: "ባለሙያዎች" },
  "tabs.organizations": { English: "Organizations", Amharic: "ድርጅቶች" },
  "tabs.analytics": { English: "Analytics", Amharic: "ትንታኔዎች" },
  "tabs.profile": { English: "Profile", Amharic: "መገለጫ" },
  "tabs.patients": { English: "Linked Patients", Amharic: "የተገናኙ ታካሚዎች" },
  "tabs.appointments": { English: "Appointments", Amharic: "ቀጠሮዎች" },
  "tabs.portal": { English: "Portal Settings", Amharic: "የፖርታል ቅንብሮች" },
  "tabs.meetings": { English: "Meetings", Amharic: "ስብሰባዎች" },
  "tabs.users": { English: "Users", Amharic: "ተጠቃሚዎች" },
  "tabs.submissions": { English: "Submissions", Amharic: "የገቡ ማመልከቻዎች" },
  "tabs.reports": { English: "Reports", Amharic: "ሪፖርቶች" },
  "tabs.database": { English: "Database", Amharic: "ዳታቤዝ" },
  "tabs.translations": { English: "Translations", Amharic: "ትርጉሞች" },
  "tabs.settings": { English: "Settings", Amharic: "ቅንብሮች" },
};

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  dict: Dictionary;
  setDict: (newDict: Dictionary) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("English");
  const [dict, setDictState] = useState<Dictionary>(defaultDictionary);

  useEffect(() => {
    const savedLang = localStorage.getItem("tenahub_lang") as Language;
    if (savedLang === "English" || savedLang === "Amharic") {
      setLanguageState(savedLang);
    }
    const savedDict = localStorage.getItem("tenahub_dict");
    if (savedDict) {
      try {
        setDictState(JSON.parse(savedDict));
      } catch (e) {}
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("tenahub_lang", lang);
  };

  const setDict = (newDict: Dictionary) => {
    setDictState(newDict);
    localStorage.setItem("tenahub_dict", JSON.stringify(newDict));
  };

  const t = (key: string): string => {
    return dict[key]?.[language] || defaultDictionary[key]?.[language] || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, dict, setDict, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useTranslation must be used within an I18nProvider");
  }
  return context;
}
