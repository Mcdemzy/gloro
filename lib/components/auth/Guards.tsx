"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/auth/authStore";

interface GuardProps {
  children: React.ReactNode;
}

/**
 * AuthGuard — wrap protected pages with this.
 * Redirects unauthenticated users to /auth/login.
 */
export function AuthGuard({ children }: GuardProps) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isAuthChecked = useAuthStore((s) => s.isAuthChecked);
  const router = useRouter();

  useEffect(() => {
    if (isAuthChecked && !isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [isAuthChecked, isAuthenticated, router]);

  if (!isAuthChecked) return null;
  if (!isAuthenticated) return null;
  return <>{children}</>;
}

/**
 * GuestGuard — wrap login/signup pages with this.
 * Redirects already-authenticated users to /dashboard.
 */
export function GuestGuard({ children }: GuardProps) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) return null;
  return <>{children}</>;
}
