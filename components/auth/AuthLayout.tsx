"use client";

import React from "react";
import signupBG from "@/assets/images/signupBG.png";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className="bg-[#020818] min-h-screen w-full flex items-center justify-center p-4 md:p-8">
      <section className="w-full max-w-7xl flex flex-col lg:flex-row overflow-hidden border border-white/5 shadow-[0_0_48px_#A711E81A]">
        {/* Left Side — Image Panel, desktop only */}
        <div
          className="lg:w-[52%] relative hidden lg:flex flex-col justify-between min-h-[600px] p-10"
          style={{
            backgroundImage: `url(${signupBG.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-[#00000066]" />

          {/* Content */}
          <div className="relative z-10">
            <h1 className="text-cyan-400 text-4xl font-bold orbitron tracking-wide">
              Gloro
            </h1>
          </div>

          <div className="relative z-10 text-center mx-auto px-6 pb-6 pt-12 h-full">
            <h2 className="text-white text-xl font-bold orbitron mb-80 leading-snug">
              Welcome to Gloro Gaming platform
            </h2>
            <p className="text-white/80 text-lg max-w-sm leading-relaxed">
              This is where you can sign in and sign up, to get more information
              and participate in upcoming Tournament
            </p>
          </div>
        </div>

        {/* Right Side — Form Panel */}
        <div className="lg:w-[48%] bg-[#0d1b2e] flex flex-col p-6 sm:p-8 md:p-10">
          {children}
        </div>
      </section>
    </main>
  );
};

export default AuthLayout;
