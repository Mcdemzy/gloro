"use client";

import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, User, LogIn } from "lucide-react";
import signupBG from "@/assets/images/signupBG.png";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  return (
    <main className="bg-[#020818] min-h-screen w-full flex items-center justify-center p-4 md:p-8">
      {/* Main Login Container */}
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
            <h2 className="text-white text-2xl font-bold mb-4 orbitron text-center">
              Welcome to Gloro Gaming platform
            </h2>
            <p className="text-white text-lg mt-40 text-center  p-4 rounded-xl">
              This is where you can sign in and sign up, to get more information
              and participate in upcoming Tournament
            </p>
          </div>

          {/* Decorative elements */}
          <div className="relative z-10 flex items-end justify-center">
            <div className="w-full h-64 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="lg:w-1/2 bg-[#0a1628] p-8 md:p-12 flex flex-col">
          {/* Tab Switcher - Updated to match signup page */}
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
            <h3 className="text-white text-2xl font-bold mb-8 text-center">
              Welcome Back!
            </h3>

            <form className="space-y-5">
              {/* Email/Username Input */}
              <div>
                <label className="text-white/90 text-sm mb-2 block">
                  Email or Username
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Enter your email or username"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-cyan-500 focus:bg-white/10 transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="text-white/90 text-sm mb-2 block">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
                    size={20}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
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

              {/* Keep Logged In & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={keepLoggedIn}
                    onChange={(e) => setKeepLoggedIn(e.target.checked)}
                    className="mr-2 w-4 h-4 accent-cyan-500"
                  />
                  <span className="text-white/80 text-sm">
                    Keep me logged in
                  </span>
                </label>
                <a
                  href="#"
                  className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
                >
                  Forgot your password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 rounded-xl transition-all shadow-lg hover:shadow-purple-500/50"
              >
                Login
              </button>

              {/* Sign Up Link - Updated positioning and styling */}
              <p className="text-white/70 text-sm text-center">
                If you do not have an account, create an account by clicking{" "}
                <a
                  href="#"
                  className="text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  Sign up
                </a>
              </p>

              {/* Divider */}
              <div className="flex items-center gap-4 my-4">
                <div className="flex-1 h-px bg-white/10"></div>
                <span className="text-white/50 text-sm">or</span>
                <div className="flex-1 h-px bg-white/10"></div>
              </div>

              {/* Google Sign In */}
              <button
                type="button"
                className="w-full bg-white/10 hover:bg-white/20 border border-white/10 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
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
          </div>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;