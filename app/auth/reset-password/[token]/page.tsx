"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Eye, EyeOff, ShieldCheck, AlertTriangle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import AuthLayout from "@/components/auth/AuthLayout";
import FormInput from "@/components/auth/FormInput";
import { resetPasswordSchema, ResetPasswordFormValues } from "@/lib/api/validation/schemas";
import { useResetPassword } from "@/lib/hooks/auth/useAuth";

const ResetPasswordPage = ({
  params,
}: {
  params: Promise<{ token: string }>;
}) => {
  const { token } = React.use(params);
  const router = useRouter();
  // const searchParams = useSearchParams();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { onSubmit, isLoading } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const handleFormSubmit = (data: ResetPasswordFormValues) => {
    if (!token) return;
    onSubmit({
      token,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    });
  };

  // No token in URL — show an error state
  if (!token) {
    return (
      <AuthLayout>
        <div className="w-full max-w-sm mx-auto flex-1 flex flex-col items-center justify-center text-center pt-8">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
            style={{
              background: "rgba(239,68,68,0.15)",
              border: "1px solid rgba(239,68,68,0.35)",
            }}
          >
            <AlertTriangle size={26} className="text-red-400" />
          </div>
          <h3 className="text-white text-lg font-bold mb-2">
            Invalid reset link
          </h3>
          <p className="text-white/40 text-sm leading-relaxed mb-7">
            This link is missing or has expired. Request a new one from the
            forgot password page.
          </p>
          <button
            onClick={() => router.push("/auth/forgot-password")}
            className="w-full text-white font-semibold py-3 rounded-xl text-sm tracking-wide transition-all duration-300 hover:shadow-purple-500/40"
            style={{ background: "linear-gradient(90deg, #4E07E0, #8D2DE2)" }}
          >
            Request new link
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-sm mx-auto flex-1">
        {/* Header */}
        <div className="mb-7">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
            style={{
              background:
                "linear-gradient(135deg, rgba(78,7,224,0.3), rgba(141,45,226,0.3))",
              border: "1px solid rgba(141,45,226,0.4)",
            }}
          >
            <ShieldCheck size={22} className="text-purple-300" />
          </div>
          <h3 className="text-white text-xl font-bold tracking-wide mb-1">
            Set new password
          </h3>
          <p className="text-white/45 text-sm leading-relaxed">
            Choose a strong password you haven't used before.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
          {/* New password */}
          <FormInput
            label="New password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
            icon={<Lock size={18} />}
            error={errors.newPassword?.message}
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-white/30 hover:text-white/70 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
            {...register("newPassword")}
          />

          {/* Confirm password */}
          <FormInput
            label="Confirm new password"
            type={showConfirm ? "text" : "password"}
            placeholder="Re-enter new password"
            icon={<Lock size={18} />}
            error={errors.confirmPassword?.message}
            rightElement={
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="text-white/30 hover:text-white/70 transition-colors"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
            {...register("confirmPassword")}
          />

          {/* Password hint */}
          <p className="text-white/25 text-xs">
            Must be at least 6 characters.
          </p>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/40 text-sm tracking-wide disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(90deg, #4E07E0, #8D2DE2)",
            }}
          >
            {isLoading ? "Resetting…" : "Reset password"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/auth/login")}
            className="w-full text-white/40 hover:text-white/70 text-sm py-2 transition-colors"
          >
            Back to login
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ResetPasswordPage;