/**
 * @returns undefined if on server
 * @returns string | null if on client
 */
export function getCookie(name, cookies = null) {
  if (cookies == null) {
    if (typeof window === "undefined") {
      return undefined;
    }
    cookies = document.cookie;
  }

  const kv = cookies.split(";").find((part) => part.trim().startsWith(name));

  if (!kv) return null;

  const cookieValue = kv.split("=")[1];
  if (!cookieValue) return null;

  return decodeURIComponent(cookieValue.trim());
}

export function setCookie(name, value, options: any = {}) {
  if (typeof window === "undefined") {
    return undefined;
  }

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = {
    [encodeURIComponent(name)]: encodeURIComponent(value),
    sameSite: "strict",
    "max-age": 60 * 60 * 24 * 365,
    ...options,
  };

  document.cookie = Object.entries(updatedCookie)
    .map((kv) => kv.join("="))
    .join(";");
}
