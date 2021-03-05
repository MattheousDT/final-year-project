import {
  register,
  init,
  getLocaleFromNavigator,
  locales,
  locale as $locale,
} from "svelte-i18n";
import { get, Readable } from "svelte/store";

import { setCookie, getCookie } from "@utils/cookie";
import { LANGUAGES } from "@utils/constants";

const INIT_OPTIONS = {
  fallbackLocale: "en",
  initialLocale: "en",
  formats: {},
  warnOnMissingMessages: true,
};

let currentLocale = null;

Object.keys(LANGUAGES).forEach((k) =>
  register(k, () => fetch(`/i18n/${k}.json`).then((e) => e.json()))
);

$locale.subscribe((value) => {
  if (value == null) return;

  currentLocale = value;

  // if running in the client, save the language preference in a cookie
  if (typeof window !== "undefined") {
    setCookie("locale", value);
  }
});

// initialize the i18n library in client
export function initI18n() {
  init({
    ...INIT_OPTIONS,
    initialLocale:
      getCookie("locale") ||
      get<string[]>(locales).find(
        (e) =>
          e === getLocaleFromNavigator() ||
          e.split("-")[0] === getLocaleFromNavigator().split("-")[0]
      ) ||
      "en",
  });
}
