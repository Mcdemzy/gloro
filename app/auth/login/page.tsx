"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

import AuthLayout from "@/components/auth/AuthLayout";
import AuthTabs from "@/components/auth/AuthTabs";
import FormInput from "@/components/auth/FormInput";
import GoogleButton from "@/components/auth/GoogleButton";
import PageLoader from "@/components/ui/PageLoader";
import { LoginFormValues, loginSchema } from "@/lib/api/validation/schemas";
import { GuestGuard } from "@/lib/components/auth/Guards";
import { useLogin } from "@/lib/hooks/auth/useAuth";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { onSubmit, isLoading } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  // isLoading stays true after successful login (navigating away).
  // Show the full-screen loader instead of a blank white flash.
  if (isLoading) {
    return <PageLoader message="Signing you in…" />;
  }

  return (
    <GuestGuard>
      <AuthLayout>
        <AuthTabs activeTab="login" />

        <div className="w-full max-w-sm mx-auto flex-1">
          <h3 className="text-white text-xl font-bold mb-6 text-center tracking-wide">
            Welcome Back!
          </h3>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Email / Username */}
            <FormInput
              label="Email or Username"
              type="text"
              placeholder="Enter your email or username"
              icon={<Mail size={18} />}
              error={errors.identifier?.message}
              {...register("identifier")}
            />

            {/* Password */}
            <FormInput
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              icon={<Lock size={18} />}
              error={errors.password?.message}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-white/30 hover:text-white/70 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
              {...register("password")}
            />

            {/* Keep logged in + Forgot password */}
            <div className="flex items-center justify-between pt-1 mb-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-cyan-500 rounded"
                />
                <span className="text-white/70 text-sm">Keep me logged in</span>
              </label>
              <a
                href="/auth/forgot-password"
                className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
              >
                Forgot your password?
              </a>
            </div>

            {/* Sign up hint */}
            <p className="text-white/60 text-sm text-center">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/auth/signup")}
                className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
              >
                Sign up
              </button>
            </p>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-linear-to-r from-[#4E07E0] to-[#8D2DE2] text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/40 text-sm tracking-wide cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Login
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 py-1">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-white/40 text-xs">or</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <GoogleButton />
          </form>
        </div>
      </AuthLayout>
    </GuestGuard>
  );
};

export default LoginPage;
