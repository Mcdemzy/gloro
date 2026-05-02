"use client";
import React, { useState } from "react";
import { Copy, X, Check } from "lucide-react";

interface ShareModalProps {
  url: string;
  onClose: () => void;
}

export default function ShareModal({ url, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-[#0a1628] border border-cyan-400/30 rounded-2xl p-8 max-w-lg w-full shadow-2xl shadow-cyan-500/10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
        <h3 className="text-white font-bold text-lg mb-4">Share Team</h3>
        <div className="mb-4">
          <input
            type="text"
            value={url}
            readOnly
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none"
          />
        </div>
        <button
          onClick={handleCopy}
          className="w-full px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
        >
          {copied ? (
            <>
              <Check size={18} /> Copied!
            </>
          ) : (
            <>
              <Copy size={18} /> Copy this link
            </>
          )}
        </button>
      </div>
    </div>
  );
}
