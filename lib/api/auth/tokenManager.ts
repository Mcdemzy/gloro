import { env } from "@/lib/config/env";


const LS_KEY = "gloroq_access_token";
const COOKIE_NAME = "gloroq_token";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days (matches refresh token)

function setCookie(value: string) {
  document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Strict`;
}

function clearCookie() {
  document.cookie = `${COOKIE_NAME}=; path=/; max-age=0; SameSite=Strict`;
}

export const tokenManager = {
  get: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(LS_KEY);
  },

  set: (token: string): void => {
    localStorage.setItem(LS_KEY, token);
    setCookie(token); // mirror into cookie so middleware can read it
  },

  clear: (): void => {
    localStorage.removeItem(LS_KEY);
    clearCookie();
  },

  refresh: async (): Promise<string | null> => {
    try {
      const res = await fetch(`${env.API_URL}/refresh`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        tokenManager.clear();
        return null;
      }

      const data = await res.json();
      const newToken: string = data.accessToken;
      tokenManager.set(newToken); // set() handles both localStorage + cookie
      return newToken;
    } catch {
      tokenManager.clear();
      return null;
    }
  },
};
