"use client";

import React from "react";

interface PageLoaderProps {
  message?: string;
}

const PageLoader = ({ message = "Loading..." }: PageLoaderProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, #1a0a3e 0%, #0a0a1a 60%)",
      }}
    >
      {/* Spinning ring */}
      <div className="relative w-16 h-16">
        {/* Outer glow ring */}
        <div
          className="absolute inset-0 rounded-full animate-spin"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 70%, #7c3aed, #06b6d4)",
            padding: "2px",
          }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{ background: "#0a0a1a" }}
          />
        </div>

        {/* Inner pulsing dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-4 h-4 rounded-full animate-pulse"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
              boxShadow: "0 0 12px rgba(124, 58, 237, 0.8)",
            }}
          />
        </div>
      </div>

      {/* Gloro wordmark */}
      <div className="flex flex-col items-center gap-1">
        <span
          className="text-2xl font-bold tracking-widest orbitron"
          style={{
            background: "linear-gradient(90deg, #7c3aed, #06b6d4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          GLOROQ
        </span>
        <span className="text-white/40 text-xs tracking-wider uppercase">
          {message}
        </span>
      </div>

      {/* Animated dots */}
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full animate-bounce"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
              animationDelay: `${i * 0.15}s`,
              animationDuration: "0.8s",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default PageLoader;
