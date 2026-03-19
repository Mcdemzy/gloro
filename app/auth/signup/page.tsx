"use client";

import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthTabs from "@/components/auth/AuthTabs";
import FormInput from "@/components/auth/FormInput";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup submitted:", formData);
  };

  return (
    <AuthLayout>
      {/* Tab Switcher */}
      <AuthTabs activeTab="signup" />

      <div className="w-full max-w-md mx-auto flex-1">
        <h3 className="text-white text-lg font-medium mb-4 text-center tracking-wide">
          Create Your Account
        </h3>

        <form className="space-y-3" onSubmit={handleSubmit}>
          {/* First + Last name row */}
          <div className="grid grid-cols-2 gap-3">
            <FormInput
              label="First name"
              placeholder="John"
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              icon={<User size={16} />}
            />
            <FormInput
              label="Last name"
              placeholder="Doe"
              value={formData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              icon={<User size={16} />}
            />
          </div>

          {/* Username */}
          <FormInput
            label="Username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={(e) => handleChange("username", e.target.value)}
            icon={<User size={18} />}
          />

          {/* Email */}
          <FormInput
            label="Email address"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            icon={<Mail size={18} />}
          />

          {/* Password */}
          <FormInput
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
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

          {/* Re-enter Password */}
          <FormInput
            label="Re-enter password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={formData.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
            icon={<Lock size={18} />}
            rightElement={
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-white/30 hover:text-white/70 transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
          />

          {/* Remember Me */}
          <label className="flex items-center gap-2 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 accent-cyan-500 rounded"
            />
            <span className="text-white/70 text-sm">Remember me</span>
          </label>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-linear-to-r from-[#4E07E0] to-[#8D2DE2] text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/40 text-sm tracking-wide cursor-pointer"
          >
            Sign Up
          </button>

          {/* Terms */}
          <p className="text-white/50 text-xs text-center">
            By signing up, you agreed to Gloro Gaming Platform{" "}
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
  );
};

export default SignupPage;
