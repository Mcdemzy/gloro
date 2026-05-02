import { RegisterPayload, RegisterResponse, MessageResponse, LoginPayload, LoginResponse, SelectGamesPayload, SelectGamesResponse, ForgotPasswordPayload, ResetPasswordPayload, ProfileResponse, UpdateProfilePayload, RefreshResponse } from "@/lib/store/auth/types";
import { authFetch, parseResponse } from "./authClient";


// 1. Register
export async function registerUser(
  payload: RegisterPayload,
): Promise<RegisterResponse> {
  const res = await authFetch("/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return parseResponse<RegisterResponse>(res);
}

// 2. Verify email (called via link — usually handled by the page at /auth/activation)
export async function verifyEmail(token: string): Promise<MessageResponse> {
  const res = await authFetch(`/verify-email/${token}`, { method: "GET" });
  return parseResponse<MessageResponse>(res);
}

// 3. Login
export async function loginUser(payload: LoginPayload): Promise<LoginResponse> {
  const res = await authFetch("/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return parseResponse<LoginResponse>(res);
}

// 4. Select games (requires auth)
export async function selectGames(
  payload: SelectGamesPayload,
): Promise<SelectGamesResponse> {
  const res = await authFetch("/select-games", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return parseResponse<SelectGamesResponse>(res);
}

// 5. Forgot password
export async function forgotPassword(
  payload: ForgotPasswordPayload,
): Promise<MessageResponse> {
  const res = await authFetch("/forgot-password", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return parseResponse<MessageResponse>(res);
}

// 6. Reset password
export async function resetPassword(
  payload: ResetPasswordPayload,
): Promise<MessageResponse> {
  const res = await authFetch("/reset-password", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return parseResponse<MessageResponse>(res);
}

// 7. Get profile (requires auth)
export async function getProfile(): Promise<ProfileResponse> {
  const res = await authFetch("/profile", { method: "GET" });
  return parseResponse<ProfileResponse>(res);
}

// 8. Update profile (requires auth)
export async function updateProfile(
  payload: UpdateProfilePayload,
): Promise<ProfileResponse> {
  const res = await authFetch("/profile", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  return parseResponse<ProfileResponse>(res);
}

// 9. Refresh access token
export async function refreshToken(): Promise<RefreshResponse> {
  const res = await authFetch("/refresh", { method: "POST" });
  return parseResponse<RefreshResponse>(res);
}

// 10. Logout (requires auth)
export async function logoutUser(): Promise<MessageResponse> {
  const res = await authFetch("/logout", { method: "POST" });
  return parseResponse<MessageResponse>(res);
}

// 11. Resend verification email
export async function resendVerification(
  email: string,
): Promise<MessageResponse> {
  const res = await authFetch("/resend-verification", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
  return parseResponse<MessageResponse>(res);
}
