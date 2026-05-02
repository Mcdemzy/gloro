// ── User ──────────────────────────────────────────────────────────────────────
// import { is } from './../../../node_modules/next/dist/compiled/webpack/bundle5';

export interface User {
  _id: string;
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  gloroId: string;
  emailVerified: boolean;
  selectedGames: string[];
  role: string;
  status: "pending" | "active" | "suspended" | "deleted";
  bio?: string;
  avatar?: string;
  phoneNumber?: string;
  socialLinks?: {
    twitter?: string;
    discord?: string;
    linkedin?: string;
    telegram?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

// ── Auth Store ────────────────────────────────────────────────────────────────

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isAuthChecked: boolean; // new flag to indicate if we've checked auth status
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  clearAuth: () => void;
}

// ── Request Payloads ──────────────────────────────────────────────────────────

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginPayload {
  identifier: string;
  password: string;
}

export interface SelectGamesPayload {
  games: string[];
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UpdateProfilePayload {
  firstName?: string;
  lastName?: string;
  bio?: string;
  phoneNumber?: string;
  avatar?: string;
  socialLinks?: User["socialLinks"];
}

// ── API Responses ─────────────────────────────────────────────────────────────

export interface MessageResponse {
  success: boolean;
  message: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    user: Pick<
      User,
      | "id"
      | "firstName"
      | "lastName"
      | "username"
      | "email"
      | "gloroId"
      | "status"
    >;
    verificationLink: string;
  };
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    accessToken: string;
  };
}

export interface SelectGamesResponse {
  success: boolean;
  message: string;
  data: {
    selectedGames: string[];
    profileCompletion: string;
  };
}

export interface ProfileResponse {
  success: boolean;
  data: User;
}

export interface RefreshResponse {
  success: boolean;
  accessToken: string;
}
