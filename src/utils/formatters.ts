import type { ILocale } from "./constants";

export const formatCurrency = (
  locale: ILocale,
  languageCode: string,
  amount: number,
  removeDecimal?: boolean
) =>
  new Intl.NumberFormat(languageCode, {
    style: "currency",
    currency: locale.currency,
    minimumFractionDigits: removeDecimal ? 0 : 2,
  }).format(amount / 100);

export const formatDate = (languageCode: string, date: Date) =>
  new Intl.DateTimeFormat(languageCode, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

export const formatTime = (languageCode: string, date: number) =>
  new Intl.RelativeTimeFormat(languageCode, {}).format(
    date - Date.now(),
    "minute"
  );

export const formatLargeNumber = (languageCode: string, num: number) =>
  new Intl.NumberFormat(languageCode, {
    notation: "compact",
  }).format(num);
