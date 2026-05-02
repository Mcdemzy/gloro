"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "@/lib/store/auth/authStore";
import { getProfile } from "@/lib/api/auth/authApi";
import { tokenManager } from "@/lib/api/auth/tokenManager";

export function useAuthInit() {
  const setUser = useAuthStore((s) => s.setUser);
  const setToken = useAuthStore((s) => s.setToken);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const isAuthChecked = useAuthStore((s) => s.isAuthChecked);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current || isAuthChecked) return;
    initialized.current = true;

    // Read token from localStorage (safe here — we're inside useEffect, client only)
    const token = tokenManager.get();

    if (!token) {
      useAuthStore.setState({ isAuthChecked: true, isAuthenticated: false });
      return;
    }

    // Hydrate the store's accessToken from localStorage so authFetch can use it
    // This is the critical line that was missing: without it, the store has
    // accessToken: null even though localStorage has a valid token.
    setToken(token);

    getProfile()
      .then((res) => {
        const user = (res as { data?: unknown }).data ?? res;
        setUser(user as Parameters<typeof setUser>[0]);
      })
      .catch(() => {
        clearAuth();
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
