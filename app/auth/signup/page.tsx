"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { useRouter } from "next/navigation";

import AuthLayout from "@/components/auth/AuthLayout";
import AuthTabs from "@/components/auth/AuthTabs";
import FormInput from "@/components/auth/FormInput";
import { GuestGuard } from "@/lib/components/auth/Guards";


import { useRegister } from "@/lib/hooks/auth/useAuth";
import { RegisterFormValues, registerSchema } from "@/lib/api/validation/schemas";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const { onSubmit, isLoading } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  return (
    <GuestGuard>
      <AuthLayout>
        <AuthTabs activeTab="signup" />

        <div className="w-full max-w-md mx-auto flex-1">
          <h3 className="text-white text-lg font-medium mb-4 text-center tracking-wide">
            Create Your Account
          </h3>

          <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
            {/* First + Last name row */}
            <div className="grid grid-cols-2 gap-3">
              <FormInput
                label="First name"
                placeholder="John"
                icon={<User size={16} />}
                error={errors.firstName?.message}
                {...register("firstName")}
              />
              <FormInput
                label="Last name"
                placeholder="Doe"
                icon={<User size={16} />}
                error={errors.lastName?.message}
                {...register("lastName")}
              />
            </div>

            {/* Username */}
            <FormInput
              label="Username"
              placeholder="Enter your username"
              icon={<User size={18} />}
              error={errors.username?.message}
              {...register("username")}
            />

            {/* Email */}
            <FormInput
              label="Email address"
              type="email"
              placeholder="Enter your email"
              icon={<Mail size={18} />}
              error={errors.email?.message}
              {...register("email")}
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

            {/* Confirm Password */}
            <FormInput
              label="Re-enter password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              icon={<Lock size={18} />}
              error={errors.confirmPassword?.message}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-white/30 hover:text-white/70 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              }
              {...register("confirmPassword")}
            />

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-linear-to-r from-[#4E07E0] to-[#8D2DE2] text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/40 text-sm tracking-wide cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating account…" : "Sign Up"}
            </button>

            {/* Already have account */}
            <p className="text-white/60 text-sm text-center">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/auth/login")}
                className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
              >
                Log in
              </button>
            </p>

            {/* Terms */}
            <p className="text-white/50 text-xs text-center">
              By signing up, you agreed to GloroQ Gaming Platform{" "}
              <a
                href="#"
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                terms &amp; conditions
              </a>
            </p>
          </form>
        </div>
      </AuthLayout>
    </GuestGuard>
  );
};

export default SignupPage;
