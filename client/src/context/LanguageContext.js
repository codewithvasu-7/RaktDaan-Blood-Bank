import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { translations, SUPPORTED_LANGUAGES } from "../translations/translations";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Safely initialize language from localStorage with strict whitelist validation
  const [lang, setLang] = useState(() => {
    try {
      const stored = localStorage.getItem("raktdan_lang");
      if (stored && SUPPORTED_LANGUAGES.some((l) => l.code === stored)) {
        return stored;
      }
    } catch (e) {
      // localStorage may fail in private mode
    }
    return "en"; // Default to English
  });

  // Secure language switcher with whitelist validation (OWASP Input Validation)
  const changeLanguage = useCallback((code) => {
    if (!code || typeof code !== "string") return;
    const cleanCode = code.trim().toLowerCase();
    const isValid = SUPPORTED_LANGUAGES.some((l) => l.code === cleanCode);
    if (isValid) {
      setLang(cleanCode);
      try {
        localStorage.setItem("raktdan_lang", cleanCode);
      } catch (e) {
        console.warn("Could not save language preference to storage");
      }
    }
  }, []);

  // Sync html lang attribute for accessibility & SEO
  useEffect(() => {
    try {
      document.documentElement.lang = lang;
    } catch (e) {}
  }, [lang]);

  // Safe translation resolver: t("nav.home", "Home")
  const t = useCallback(
    (keyPath, fallback = "") => {
      if (!keyPath || typeof keyPath !== "string") return fallback;

      const keys = keyPath.split(".");
      
      // 1. Try current language
      let value = translations[lang];
      for (const k of keys) {
        if (value && typeof value === "object" && k in value) {
          value = value[k];
        } else {
          value = undefined;
          break;
        }
      }

      if (value !== undefined && typeof value === "string") {
        return value;
      }

      // 2. Fallback to English
      let enValue = translations.en;
      for (const k of keys) {
        if (enValue && typeof enValue === "object" && k in enValue) {
          enValue = enValue[k];
        } else {
          enValue = undefined;
          break;
        }
      }

      if (enValue !== undefined && typeof enValue === "string") {
        return enValue;
      }

      // 3. Fallback to provided fallback string or key itself
      return fallback || keyPath;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider
      value={{
        lang,
        changeLanguage,
        t,
        supportedLanguages: SUPPORTED_LANGUAGES,
        currentLanguageObj: SUPPORTED_LANGUAGES.find((l) => l.code === lang) || SUPPORTED_LANGUAGES[0],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export default LanguageContext;
