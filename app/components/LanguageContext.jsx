"use client";
import { createContext, useState, useEffect, useContext } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("ar");

  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang) setLanguage(savedLang);
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      <div
        dir={language === "ar" ? "rtl" : "ltr"}
        style={{
          fontFamily:
            language === "ar" ? "'Cairo', sans-serif" : "'Inter', sans-serif",
        }}
      >
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
