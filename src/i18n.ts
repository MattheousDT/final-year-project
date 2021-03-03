import {
  register,
  init,
  getLocaleFromNavigator,
  locales,
  locale as $locale,
} from "svelte-i18n";
import { get, Readable } from "svelte/store";

import { setCookie, getCookie } from "@utils/cookie";

const INIT_OPTIONS = {
  fallbackLocale: "en",
  initialLocale: "en",
  formats: {},
  warnOnMissingMessages: true,
};

let currentLocale = null;

register("en", () => fetch("/i18n/en.json").then((e) => e.json()));
register("es", () => fetch("/i18n/es.json").then((e) => e.json()));
register("ko-KR", () => fetch("/i18n/ko-KR.json").then((e) => e.json()));

// TODO: Add/Remove Languages
// register("pt-PT", () => import("./i18n/pt-PT.json"));
// register("es", () => import("./i18n/es.json"));
// register("ja", () => import("./i18n/ja.json"));
// register("pl", () => import("./i18n/pl.json"));

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
