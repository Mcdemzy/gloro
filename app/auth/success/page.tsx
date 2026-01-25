"use client";

import React, { useState, useEffect } from "react";
import BG from "@/assets/images/loginBG.png";
import Character from "@/assets/images/Char.svg";

const SuccessPage = () => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Redirect logic here
          // window.location.href = '/dashboard';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden flex flex-col"
      style={{
        backgroundImage: `url(${BG.src})`,
      }}
    >
      {/* Gloro Logo - Top Left */}
      <div className="pt-12 pl-12 md:pl-16 lg:pl-20">
        <h1
          className="orbitron text-[48px] font-bold leading-[100%]"
          style={{
            background: "#00AAE7",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Gloro
        </h1>
      </div>

      {/* Main Content - Centered */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {/* Character Image with Stars */}
        <div className="relative w-full max-w-[360px] mb-16">
          {/* Floating Stars */}
          <div className="absolute -top-8 right-1/4 animate-twinkle">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path
                d="M20 0L23.09 16.91L40 20L23.09 23.09L20 40L16.91 23.09L0 20L16.91 16.91L20 0Z"
                fill="#00AAE7"
              />
            </svg>
          </div>
          <div className="absolute top-4 right-8 animate-twinkle-delay">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 0L13.854 10.146L24 12L13.854 13.854L12 24L10.146 13.854L0 12L10.146 10.146L12 0Z"
                fill="#00AAE7"
              />
            </svg>
          </div>
          <div className="absolute top-16 left-8 animate-twinkle">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path
                d="M14 0L16.163 11.837L28 14L16.163 16.163L14 28L11.837 16.163L0 14L11.837 11.837L14 0Z"
                fill="#00AAE7"
              />
            </svg>
          </div>

          {/* Character */}
          <img
            src={Character.src}
            alt="Success Character"
            className="w-full h-auto object-contain mx-auto relative z-10"
            style={{
              filter: "drop-shadow(0 15px 35px rgba(0, 170, 231, 0.3))",
            }}
          />
        </div>

        {/* Text Content */}
        <div className="text-center space-y-4 max-w-2xl">
          <h2 className="orbitron text-3xl md:text-4xl font-semibold text-white">
            Registration Successful
          </h2>
          <p className="text-gray-300 text-base md:text-lg">
            You will be redirected in {countdown} seconds...
          </p>
        </div>
      </div>

      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap");
        
        .orbitron {
          font-family: "Orbitron", sans-serif;
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1.2) rotate(180deg);
          }
        }

        @keyframes twinkle-delay {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1) rotate(0deg);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.15) rotate(-180deg);
          }
        }

        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }

        .animate-twinkle-delay {
          animation: twinkle-delay 2.5s ease-in-out infinite 0.5s;
        }
      `}</style>
    </main>
  );
};

export default SuccessPage;
