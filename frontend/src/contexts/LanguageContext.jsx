import React, { createContext, useContext, useEffect, useState } from "react";
import { LANGUAGES } from "../i18n";

const LanguageContext = createContext(undefined);

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") return LANGUAGES.EN;
    return window.localStorage.getItem("profinoks_lang") || LANGUAGES.EN;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("profinoks_lang", lang);
    }
  }, [lang]);

  const toggleLang = () => {
    setLang((prev) => (prev === LANGUAGES.EN ? LANGUAGES.TR : LANGUAGES.EN));
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
