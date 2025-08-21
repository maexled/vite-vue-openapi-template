import { createI18n } from "vue-i18n";
import en from "./locales/en.json";
import de from "./locales/de.json";

// Get the user's preferred language from localStorage or browser
const getDefaultLocale = (): string => {
  // Check localStorage first
  const savedLocale = localStorage.getItem("locale");
  if (savedLocale && (savedLocale === "en" || savedLocale === "de")) {
    return savedLocale;
  }

  // Check browser language
  const browserLocale = navigator.language.split("-")[0];
  if (browserLocale === "de") {
    return "de";
  }

  // Default to English
  return "en";
};

console.log("Use locale:", getDefaultLocale());

const i18n = createI18n({
  locale: getDefaultLocale(),
  fallbackLocale: "en",
  messages: {
    en,
    de,
  },
  // Enable legacy mode for composition API compatibility
  legacy: false,
  globalInjection: true,
});

export default i18n;

// Helper function to change language
export const setLocale = (locale: string) => {
  if (locale === "en" || locale === "de") {
    i18n.global.locale.value = locale;
    localStorage.setItem("locale", locale);
    // Update document language for accessibility
    document.documentElement.lang = locale;
  }
};

// Get current locale
export const getCurrentLocale = () => i18n.global.locale.value;

// Get available locales
export const getAvailableLocales = () => ["en", "de"];
