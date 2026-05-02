import { create } from "zustand";
import { tokenManager } from "@/lib/api/auth/tokenManager";
import type { AuthState, User } from "./types";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  // Always null on init — hydrated in setToken or via useAuthInit.
  // Never read tokenManager.get() at module level: it runs on the server
  // where window is undefined and always returns null, which then overwrites
  // the real client-side value during hydration.
  accessToken: null,
  isAuthenticated: false,
  isAuthChecked: false,

  setUser: (user: User) =>
    set({ user, isAuthenticated: true, isAuthChecked: true }),

  setToken: (token: string) => {
    tokenManager.set(token);
    set({ accessToken: token, isAuthenticated: true, isAuthChecked: true });
  },

  clearAuth: () => {
    tokenManager.clear();
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isAuthChecked: true,
    });
  },
}));
