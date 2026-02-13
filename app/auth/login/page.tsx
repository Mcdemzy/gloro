"use client";

import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, User, LogIn } from "lucide-react";
import signupBG from "@/assets/images/signupBG.png";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  // Signup form state
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login submitted:", loginData);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup submitted:", signupData);
  };

  return (
    <main className="bg-[#020818] min-h-screen w-full flex items-center justify-center p-0 sm:p-4 md:p-6 lg:p-8">
      {/* Main Auth Container */}
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
            <h1 className="text-cyan-400 text-4xl xl:text-5xl font-bold mb-6 xl:mb-8 orbitron">
              Gloro
            </h1>
            <h2 className="text-white text-xl xl:text-2xl font-bold mb-3 xl:mb-4 orbitron">
              Welcome to Gloro Gaming Platform
            </h2>
            <p className="text-white/90 text-base xl:text-lg mt-20 xl:mt-40 leading-relaxed">
              {activeTab === "login" 
                ? "Sign in to access your account and join exciting tournaments."
                : "Create an account to start your gaming journey with us."}
            </p>
          </div>

          {/* Decorative elements */}
          <div className="relative z-10">
            <div className="w-full h-32 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
        </div>

        {/* Right Side - Auth Form - Full width on mobile */}
        <div className="w-full lg:w-1/2 bg-[#0a1628] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-6 sm:py-8 md:py-10 lg:py-12 flex flex-col min-h-screen lg:min-h-0 justify-center">
          {/* Tab Switcher - ORIGINAL STYLE RESTORED */}
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
              {activeTab === "login" ? "Welcome Back!" : "Create Your Account"}
            </h3>

            {/* LOGIN FORM */}
            {activeTab === "login" && (
              <form onSubmit={handleLoginSubmit} className="space-y-4 sm:space-y-5">
                {/* Email/Username Input */}
                <div>
                  <label className="text-white/80 text-xs sm:text-sm mb-1.5 sm:mb-2 block">
                    Email or Username
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4 sm:w-5 sm:h-5"
                    />
                    <input
                      type="text"
                      placeholder="Enter your email or username"
                      value={loginData.email}
                      onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-lg sm:rounded-xl py-2.5 sm:py-3 pl-10 sm:pl-12 pr-3 sm:pr-4 text-white text-sm sm:text-base placeholder-white/40 focus:outline-none focus:border-cyan-500 focus:bg-white/10 transition-all"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="text-white/80 text-xs sm:text-sm mb-1.5 sm:mb-2 block">
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4 sm:w-5 sm:h-5"
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-lg sm:rounded-xl py-2.5 sm:py-3 pl-10 sm:pl-12 pr-10 sm:pr-12 text-white text-sm sm:text-base placeholder-white/40 focus:outline-none focus:border-cyan-500 focus:bg-white/10 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Keep Logged In & Forgot Password */}
                <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 xs:gap-0">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={keepLoggedIn}
                      onChange={(e) => setKeepLoggedIn(e.target.checked)}
                      className="mr-2 w-3.5 h-3.5 sm:w-4 sm:h-4 accent-cyan-500 rounded"
                    />
                    <span className="text-white/70 text-xs sm:text-sm">
                      Keep me logged in
                    </span>
                  </label>
                  <a
                    href="#"
                    className="text-cyan-400 hover:text-cyan-300 text-xs sm:text-sm transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all shadow-lg hover:shadow-purple-500/50 text-sm sm:text-base"
                >
                  Login
                </button>

                {/* Sign Up Link */}
                <p className="text-white/60 text-xs sm:text-sm text-center">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setActiveTab("signup")}
                    className="text-cyan-400 hover:text-cyan-300 font-semibold"
                  >
                    Sign up
                  </button>
                </p>

                {/* Divider */}
                <div className="flex items-center gap-3 sm:gap-4 my-3 sm:my-4">
                  <div className="flex-1 h-px bg-white/10"></div>
                  <span className="text-white/40 text-xs sm:text-sm">or</span>
                  <div className="flex-1 h-px bg-white/10"></div>
                </div>

                {/* Google Sign In */}
                <button
                  type="button"
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </button>
              </form>
            )}

            {/* SIGNUP FORM */}
            {activeTab === "signup" && (
              <form onSubmit={handleSignupSubmit} className="space-y-4 sm:space-y-5">
                {/* First Name & Last Name */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="text-white/80 text-xs sm:text-sm mb-1.5 sm:mb-2 block">First name</label>
                    <div className="relative">
                      <User className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-white/40 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <input
                        type="text"
                        placeholder="John"
                        value={signupData.firstName}
                        onChange={(e) => setSignupData({...signupData, firstName: e.target.value})}
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
                        value={signupData.lastName}
                        onChange={(e) => setSignupData({...signupData, lastName: e.target.value})}
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
                      value={signupData.username}
                      onChange={(e) => setSignupData({...signupData, username: e.target.value})}
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
                      value={signupData.email}
                      onChange={(e) => setSignupData({...signupData, email: e.target.value})}
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
                      value={signupData.password}
                      onChange={(e) => setSignupData({...signupData, password: e.target.value})}
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
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
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
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all shadow-lg hover:shadow-purple-500/50 text-sm sm:text-base"
                >
                  Sign Up
                </button>

                {/* Login Link */}
                <p className="text-white/60 text-xs sm:text-sm text-center">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setActiveTab("login")}
                    className="text-cyan-400 hover:text-cyan-300 font-semibold"
                  >
                    Login
                  </button>
                </p>

                {/* Terms & Conditions */}
                <p className="text-white/50 text-xs sm:text-sm text-center">
                  By signing up, you agree to Gloro Gaming Platform{" "}
                  <a href="#" className="text-cyan-400 hover:text-cyan-300 font-semibold">
                    terms & conditions
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;