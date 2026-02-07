"use client"

import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, User, LogIn } from "lucide-react";
import signupBG from "@/assets/images/signupBG.png";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("signup");
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <main className="bg-[#020818] min-h-screen w-full flex items-center justify-center p-4 md:p-8">
      {/* Main Signup Container */}
      <section className="w-full max-w-7xl flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl">
        {/* Left Side - Image Section */}
        <div 
          className="lg:w-1/2 relative min-h-[600px] p-12 flex flex-col justify-between"
          style={{
            backgroundImage: `url(${signupBG.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-blue-900/60 to-black/50"></div>
          
          <div className="relative z-10">
            <h1 className="text-cyan-400 text-5xl font-bold mb-8 orbitron">Gloro</h1>
            <h2 className="text-white text-2xl font-bold mb-4 orbitron text-center">Welcome to Gloro Gaming platform</h2>
            <p className="text-white text-lg mt-40 text-center p-4 rounded-xl">
              This is where you can sign in and sign up, to get more information and participate in upcoming Tournament
            </p>
          </div>

          {/* Decorative elements */}
          <div className="relative z-10 flex items-end justify-center">
            <div className="w-full h-64 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="lg:w-1/2 bg-[#0a1628] p-8 md:p-12 flex flex-col">
          {/* Tab Switcher */}
          <div className="flex bg-white rounded-2xl p-1 mb-8 w-full max-w-md mx-auto">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
                activeTab === "login"
                  ? "bg-cyan-500 text-white shadow-lg"
                  : "text-black"
              }`}
            >
              <LogIn className="inline mr-2" size={18} />
              Login
            </button>
            <button
              onClick={() => setActiveTab("signup")}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
                activeTab === "signup"
                  ? "bg-cyan-500 text-white shadow-lg"
                  : "text-black"
              }`}
            >
              <User className="inline mr-2" size={18} />
              Sign up
            </button>
          </div>

          <div className="w-full max-w-md mx-auto flex-1">
            <h3 className="text-white text-2xl font-bold mb-8 text-center">Create Your Account</h3>

            <div className="space-y-5">
              {/* First Name & Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white/90 text-sm mb-2 block">First name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                    <input
                      type="text"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => handleChange("firstName", e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-cyan-500 focus:bg-white/10 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-white/90 text-sm mb-2 block">Last name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                    <input
                      type="text"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-cyan-500 focus:bg-white/10 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Username Input */}
              <div>
                <label className="text-white/90 text-sm mb-2 block">Username</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                  <input
                    type="text"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={(e) => handleChange("username", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-cyan-500 focus:bg-white/10 transition-all"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className="text-white/90 text-sm mb-2 block">Email address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-cyan-500 focus:bg-white/10 transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="text-white/90 text-sm mb-2 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-12 text-white placeholder-white/40 focus:outline-none focus:border-cyan-500 focus:bg-white/10 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Re-enter Password Input */}
              <div>
                <label className="text-white/90 text-sm mb-2 block">Re-enter password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-12 text-white placeholder-white/40 focus:outline-none focus:border-cyan-500 focus:bg-white/10 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="mr-2 w-4 h-4 accent-cyan-500"
                  />
                  <span className="text-white/80 text-sm">Remember me</span>
                </label>
              </div>

              {/* Sign Up Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 rounded-xl transition-all shadow-lg hover:shadow-purple-500/50"
              >
                Sign Up
              </button>

              {/* Terms & Conditions */}
              <p className="text-white/60 text-xs text-center">
                By signing up, you agreed to Gloro Gaming Platform{" "}
                <a href="#" className="text-cyan-400 hover:text-cyan-300">
                  terms & conditions
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SignupPage;