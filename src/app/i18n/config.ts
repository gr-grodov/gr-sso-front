import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enCommon from "./locales/en/common.json";
import enAuth from "./locales/en/auth.json";

import ruCommon from "./locales/ru/common.json";
import ruAuth from "./locales/ru/auth.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "ru",

    resources: {
      en: {
        common: enCommon,
        auth: enAuth,
      },
      ru: {
        common: ruCommon,
        auth: ruAuth,
      }
    },

    ns: ["common"],
    defaultNS: "common",

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;