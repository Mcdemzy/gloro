import { z } from "zod";

// ── Login ─────────────────────────────────────────────────────────────────────
// Accepts either an email address OR a plain username.
// We don't validate email format here — the backend determines which it is.

export const loginSchema = z.object({
  identifier: z.string().min(1, "Email or username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

// ── Register ──────────────────────────────────────────────────────────────────

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "First name is required")
      .max(50, "Max 50 characters"),
    lastName: z
      .string()
      .min(1, "Last name is required")
      .max(50, "Max 50 characters"),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(30, "Max 30 characters"),
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

// ── Forgot password ───────────────────────────────────────────────────────────

export const forgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

// ── Reset password ────────────────────────────────────────────────────────────

export const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

// ── Select games ──────────────────────────────────────────────────────────────

export const selectGamesSchema = z.object({
  games: z
    .array(z.string())
    .min(1, "Select at least 1 game")
    .max(3, "Select up to 3 games"),
});

export type SelectGamesFormValues = z.infer<typeof selectGamesSchema>;

// ── Update profile ────────────────────────────────────────────────────────────

export const profileSchema = z.object({
  firstName: z.string().min(1).max(50).optional(),
  lastName: z.string().min(1).max(50).optional(),
  bio: z.string().max(300).optional(),
  phoneNumber: z.string().optional(),
  avatar: z.string().url("Enter a valid URL").optional().or(z.literal("")),
  socialLinks: z
    .object({
      twitter: z.string().url().optional().or(z.literal("")),
      discord: z.string().optional(),
      linkedin: z.string().url().optional().or(z.literal("")),
      telegram: z.string().optional(),
    })
    .optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
