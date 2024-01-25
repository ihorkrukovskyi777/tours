export const localeFormat = (locale = "en") => {
  switch (locale.toLowerCase()) {
    case "pt-pt":
      return "pt";
    default:
      return locale;
  }
};
