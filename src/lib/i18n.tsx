import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "English" | "Amharic";

type Dictionary = Record<string, { English: string; Amharic: string }>;

export const defaultDictionary: Dictionary = {
  "app.title": { English: "TenaGulecha", Amharic: "ጤናጉለቻ" },
  "nav.login": { English: "Log in", Amharic: "ግባ" },
  "nav.signup": { English: "Sign up", Amharic: "ተመዝገብ" },
  "hero.badge": { English: "Welcome to TenaGulecha", Amharic: "ወደ ጤናጉለቻ እንኳን በደህና መጡ" },
  "hero.title": { English: "HEALTH MANAGEMENT, MADE TRANSPARENT.", Amharic: "የጤና አያያዝ፣ ግልጽ ተደርጓል።" },
  "hero.subtitle": { English: "TenaGulecha acts as an operating system for your health journey. Whether you are an individual tracking wellness goals or an organizer running a clinic, our transparent ecosystem brings everything together seamlessly.", Amharic: "ጤናጉለቻ ለጤናዎ ጉዞ እንደ ኦፕሬቲንግ ሲስተም ያገለግላል። ጤናዎን የሚከታተሉ ግለሰብም ሆኑ ክሊኒክ የሚያስተዳድሩ ድርጅት፣ የእኛ ግልጽ ስነ-ምህዳር ሁሉንም ነገር በአንድ ላይ ያመጣል።" },
  "hero.start": { English: "Get Started", Amharic: "ጀምር" },
  "hero.signin": { English: "Sign In", Amharic: "ግባ" },
  "about.title": { English: "About TenaGulecha", Amharic: "ስለ ጤናጉለቻ" },
  "ecosystem.title": { English: "A unified ecosystem", Amharic: "የተዋሃደ ስነ-ምህዳር" },
  "footer.rights": { English: "© 2026 TenaGulecha Health OS. All rights reserved.", Amharic: "© 2026 ጤናጉለቻ የጤና ስርዓት። መብቱ በህግ የተጠበቀ ነው።" },
  
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
