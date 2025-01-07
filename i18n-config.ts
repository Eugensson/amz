export const i18n = {
  locales: [
    { code: "en-US", name: "English", icon: "/icons/usa.svg" },
    { code: "fr", name: "Français", icon: "/icons/fr.svg" },
    { code: "ar", name: "العربية", icon: "/icons/uae.svg" },
    { code: "ua", name: "Украінська", icon: "/icons/ua.svg" },
  ],
  defaultLocale: "en-US",
};

export const getDirection = (locale: string) => {
  return locale === "ar" ? "rtl" : "ltr";
};
export type I18nConfig = typeof i18n;
export type Locale = I18nConfig["locales"][number];
