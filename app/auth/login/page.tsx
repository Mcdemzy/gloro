"use client";

import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthTabs from "@/components/auth/AuthTabs";
import FormInput from "@/components/auth/FormInput";
import GoogleButton from "@/components/auth/GoogleButton";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login submitted", { email, password, keepLoggedIn });
  };

  return (
    <AuthLayout>
      {/* Tab Switcher */}
      <AuthTabs activeTab="login" />

      <div className="w-full max-w-sm mx-auto flex-1">
        <h3 className="text-white text-xl font-bold mb-6 text-center tracking-wide">
          Welcome Back!
        </h3>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <FormInput
            label="Email or Username"
            type="text"
            placeholder="Enter your email or username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail size={18} />}
          />

          {/* Password */}
          <FormInput
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<Lock size={18} />}
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-white/30 hover:text-white/70 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
          />

          {/* Keep logged in + Forgot password */}
          <div className="flex items-center justify-between pt-1 mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={keepLoggedIn}
                onChange={(e) => setKeepLoggedIn(e.target.checked)}
                className="w-4 h-4 accent-cyan-500 rounded"
              />
              <span className="text-white/70 text-sm">Keep me logged in</span>
            </label>
            <a
              href="#"
              className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
            >
              Forgot your password?
            </a>
          </div>

          {/* Sign up hint */}
          <p className="text-white/60 text-sm text-center">
            If you do not have an account, create an account by clicking{" "}
            <button
              type="button"
              onClick={() => router.push("/auth/signup")}
              className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
            >
              Sign in
            </button>
          </p>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-linear-to-r from-[#4E07E0] to-[#8D2DE2] text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/40 text-sm tracking-wide cursor-pointer"
          >
            Login
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 py-1">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/40 text-xs">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Google */}
          <GoogleButton />
        </form>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
