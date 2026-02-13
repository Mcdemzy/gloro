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
    <main className="bg-[#020818] min-h-screen w-full flex items-center justify-center p-0 sm:p-4 md:p-6 lg:p-8">
      {/* Main Signup Container */}
      <section className="w-full max-w-7xl flex flex-col lg:flex-row rounded-0 sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl min-h-screen lg:min-h-0">
        {/* Left Side - Image Section - Hidden on mobile */}
        <div 
          className="hidden lg:flex lg:w-1/2 relative min-h-[600px] xl:min-h-[700px] p-8 xl:p-12 flex-col justify-between"
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
            <h1 className="text-cyan-400 text-4xl xl:text-5xl font-bold mb-6 xl:mb-8 orbitron">Gloro</h1>
            <h2 className="text-white text-xl xl:text-2xl font-bold mb-3 xl:mb-4 orbitron text-center">Welcome to Gloro Gaming Platform</h2>
            <p className="text-white/90 text-base xl:text-lg mt-20 xl:mt-40 text-center leading-relaxed p-4 rounded-xl">
              This is where you can sign in and sign up, to get more information and participate in upcoming Tournaments
            </p>
          </div>

          {/* Decorative elements */}
          <div className="relative z-10">
            <div className="w-full h-32 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
        </div>

        {/* Right Side - Signup Form - Full width on mobile */}
        <div className="w-full lg:w-1/2 bg-[#0a1628] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-6 sm:py-8 md:py-10 lg:py-12 flex flex-col min-h-screen lg:min-h-0 justify-center">
          {/* Tab Switcher - ORIGINAL STYLE PRESERVED */}
          <div className="flex bg-white rounded-xl sm:rounded-2xl p-1 mb-6 sm:mb-8 w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-2.5 sm:py-3 px-3 sm:px-6 rounded-lg sm:rounded-xl font-semibold transition-all text-sm sm:text-base flex items-center justify-center ${
                activeTab === "login"
                  ? "bg-cyan-500 text-white shadow-lg"
                  : "text-black bg-white"
              }`}
            >
              <LogIn className="mr-1.5 sm:mr-2 w-4 h-4 sm:w-5 sm:h-5" />
              Login
            </button>
            <button
              onClick={() => setActiveTab("signup")}
              className={`flex-1 py-2.5 sm:py-3 px-3 sm:px-6 rounded-lg sm:rounded-xl font-semibold transition-all text-sm sm:text-base flex items-center justify-center ${
                activeTab === "signup"
                  ? "bg-cyan-500 text-white shadow-lg"
                  : "text-black bg-white"
              }`}
            >
              <User className="mr-1.5 sm:mr-2 w-4 h-4 sm:w-5 sm:h-5" />
              Sign up
            </button>
          </div>

          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto flex-1 lg:flex-none">
            <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center">
              {activeTab === "signup" ? "Create Your Account" : "Welcome Back!"}
            </h3>

            <div className="space-y-4 sm:space-y-5">
              {/* First Name & Last Name */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="text-white/80 text-xs sm:text-sm mb-1.5 sm:mb-2 block">First name</label>
                  <div className="relative">
                    <User className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-white/40 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <input
                      type="text"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => handleChange("firstName", e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg sm:rounded-xl py-2.5 sm:py-3 pl-9 sm:pl-11 pr-3 sm:pr-4 text-white text-sm sm:text-base placeholder-white/40 focus:outline-none focus:border-cyan-500 focus:bg-white/10 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-white/80 text-xs sm:text-sm mb-1.5 sm:mb-2 block">Last name</label>
                  <div className="relative">
                    <User className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-white/40 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <input
                      type="text"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg sm:rounded-xl py-2.5 sm:py-3 pl-9 sm:pl-11 pr-3 sm:pr-4 text-white text-sm sm:text-base placeholder-white/40 focus:outline-none focus:border-cyan-500 focus:bg-white/10 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Username Input */}
              <div>
                <label className="text-white/80 text-xs sm:text-sm mb-1.5 sm:mb-2 block">Username</label>
                <div className="relative">
                  <User className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type="text"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={(e) => handleChange("username", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg sm:rounded-xl py-2.5 sm:py-3 pl-10 sm:pl-12 pr-3 sm:pr-4 text-white text-sm sm:text-base placeholder-white/40 focus:outline-none focus:border-cyan-500 focus:bg-white/10 transition-all"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className="text-white/80 text-xs sm:text-sm mb-1.5 sm:mb-2 block">Email address</label>
                <div className="relative">
                  <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg sm:rounded-xl py-2.5 sm:py-3 pl-10 sm:pl-12 pr-3 sm:pr-4 text-white text-sm sm:text-base placeholder-white/40 focus:outline-none focus:border-cyan-500 focus:bg-white/10 transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="text-white/80 text-xs sm:text-sm mb-1.5 sm:mb-2 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg sm:rounded-xl py-2.5 sm:py-3 pl-10 sm:pl-12 pr-10 sm:pr-12 text-white text-sm sm:text-base placeholder-white/40 focus:outline-none focus:border-cyan-500 focus:bg-white/10 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                  </button>
                </div>
              </div>

              {/* Re-enter Password Input */}
              <div>
                <label className="text-white/80 text-xs sm:text-sm mb-1.5 sm:mb-2 block">Re-enter password</label>
                <div className="relative">
                  <Lock className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg sm:rounded-xl py-2.5 sm:py-3 pl-10 sm:pl-12 pr-10 sm:pr-12 text-white text-sm sm:text-base placeholder-white/40 focus:outline-none focus:border-cyan-500 focus:bg-white/10 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
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
                    className="mr-2 w-3.5 h-3.5 sm:w-4 sm:h-4 accent-cyan-500 rounded"
                  />
                  <span className="text-white/70 text-xs sm:text-sm">Remember me</span>
                </label>
              </div>

              {/* Sign Up Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all shadow-lg hover:shadow-purple-500/50 text-sm sm:text-base"
              >
                {activeTab === "signup" ? "Sign Up" : "Login"}
              </button>

              {/* Terms & Conditions */}
              <p className="text-white/50 text-xs sm:text-sm text-center">
                By signing up, you agree to Gloro Gaming Platform{" "}
                <a href="#" className="text-cyan-400 hover:text-cyan-300 font-semibold">
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