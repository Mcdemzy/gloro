import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  selectGames,
  getProfile,
  updateProfile,
  resendVerification,
  registerUser,
} from "@/lib/api/auth/authApi";
import { toast } from "@/lib/api/toast/toast";
import { useAuthStore } from "@/lib/store/auth/authStore";
import { LoginPayload, RegisterPayload, ResetPasswordPayload, UpdateProfilePayload } from "@/lib/store/auth/types";

// ── useLogin ──────────────────────────────────────────────────────────────────

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const setToken = useAuthStore((s) => s.setToken);
  const setUser = useAuthStore((s) => s.setUser);
  const router = useRouter();
  const searchParams = useSearchParams();

  async function onSubmit(payload: LoginPayload) {
    setIsLoading(true);
    try {
      const res = await loginUser(payload);
      if (res.data?.accessToken) {
        setToken(res.data.accessToken);
      }
      if (res.data?.user) {
        setUser(res.data.user);
      }
      toast.success("Welcome back!");

      const hasGames = res.data.user.selectedGames?.length > 0;

      if (!hasGames) {
        router.push("/game/choose");
        return;
      }
      // Redirect: honour ?callbackUrl=... if present, else go to /dashboard
      const callbackUrl = searchParams?.get("callbackUrl") || "/dashboard";

      // Use replace so the login page isn't in the browser history stack
      router.replace(callbackUrl);

      return res;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Login failed. Try again.";
      toast.error(message);
      setIsLoading(false);
    }
  }

  return { onSubmit, isLoading };
}

// ── useRegister ───────────────────────────────────────────────────────────────

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(payload: RegisterPayload) {
    setIsLoading(true);
    try {
      await registerUser(payload);
      toast.success("Account created! Check your email to verify.");
      router.push("/auth/activation");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Registration failed. Try again.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }

  return { onSubmit, isLoading };
}

// ── useLogout ─────────────────────────────────────────────────────────────────

export function useLogout() {
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const router = useRouter();

  async function logout() {
    try {
      await logoutUser();
    } catch {
      // Proceed with local logout even if server call fails
    } finally {
      clearAuth();
      toast.info("You've been logged out.");
      router.replace("/auth/login");
    }
  }

  return { logout };
}

// ── useForgotPassword ─────────────────────────────────────────────────────────

export function useForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(email: string) {
    setIsLoading(true);
    try {
      await forgotPassword({ email });
      setSent(true);
      toast.success("Reset link sent! Check your inbox.");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }

  return { onSubmit, isLoading, sent };
}

// ── useResetPassword ──────────────────────────────────────────────────────────

export function useResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(payload: ResetPasswordPayload) {
    setIsLoading(true);
    try {
      await resetPassword(payload);
      toast.success("Password reset! You can now log in.");
      router.push("/auth/login");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Reset failed. Try again.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }

  return { onSubmit, isLoading };
}

// ── useSelectGames ────────────────────────────────────────────────────────────

export function useSelectGames() {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, user } = useAuthStore();
  const router = useRouter();

  async function onSubmit(games: string[]) {
    setIsLoading(true);
    try {
      const res = await selectGames({ games });
      if (user) {
        setUser({ ...user, selectedGames: res.data.selectedGames });
      }
      toast.success("Games saved! Let's go.");
      router.push("/dashboard");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Could not save games.";
      toast.error(message);
      setIsLoading(false);
    }
  }

  return { onSubmit, isLoading };
}

// ── useProfile ────────────────────────────────────────────────────────────────

export function useProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const { setUser } = useAuthStore();

  async function fetchProfile() {
    setIsFetching(true);
    try {
      const res = await getProfile();
      setUser(res.data);
      return res.data;
    } catch {
      toast.error("Could not load profile.");
    } finally {
      setIsFetching(false);
    }
  }

  async function onUpdate(payload: UpdateProfilePayload) {
    setIsLoading(true);
    try {
      const res = await updateProfile(payload);
      setUser(res.data);
      toast.success("Profile updated!");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Update failed.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }

  return { fetchProfile, onUpdate, isLoading, isFetching };
}

// ── useResendVerification ─────────────────────────────────────────────────────

export function useResendVerification() {
  const [isLoading, setIsLoading] = useState(false);

  async function resend(email: string) {
    setIsLoading(true);
    try {
      await resendVerification(email);
      toast.success("Verification email sent!");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Could not resend email.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }

  return { resend, isLoading };
}
