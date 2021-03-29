import dayjs from "dayjs";
import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/fr";
import "dayjs/locale/en";

dayjs.extend(localizedFormat);

function i18nFormating(value, format, lng) {
  switch (format) {
    case "date":
      return dayjs(value).locale(lng).format("ll");
    case "datetime":
      return dayjs(value).locale(lng).format("llll");
    case "number":
      if (value === null || value === undefined || isNaN(value)) {
        return "-";
      }
      return Intl.NumberFormat(lng, { style: "decimal", maximumFractionDigits: 0 }).format(value);
    case "unit":
      if (value === null || value === undefined || isNaN(value)) {
        return "-";
      }
      return Intl.NumberFormat(lng, { style: "unit", unit: "millimeter", useGrouping: false, maximumFractionDigits: 0 }).format(value);
    default:
      return value;
  }
}

i18n
  // load translation using http -> see /public/locales
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: "en",
    debug: false,
    supportedLngs: ["en", "fr"],
    ns: ["translation", "masu", "baggi", "legal"],
    defaultNS: "translation",

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
      format: i18nFormating,
    },
  });

export default i18n;
