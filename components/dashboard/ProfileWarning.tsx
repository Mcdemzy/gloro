"use client";
import React from "react";
import { AlertTriangle } from "lucide-react";

interface ProfileWarningProps {
  progress?: number; // 0-100
}

export default function ProfileWarning({ progress = 33 }: ProfileWarningProps) {
  return (
    <div className="bg-linear-to-r from-red-500/10 to-orange-500/10 border-2 border-red-500/30 rounded-xl p-4 flex md:flex-row flex-col items-start gap-3">
      <AlertTriangle size={20} className="text-red-400 mt-0.5 shrink-0" />
      <div className="flex-1">
        <h3 className="text-red-400 font-semibold mb-0.5 text-sm">
          Profile update required
        </h3>
        <p className="text-gray-400 text-xs">
          Profile update completion is compulsory before being able to apply for
          Tournaments.
        </p>
      </div>
      <div className="shrink-0 md:text-right text-left">
        <span className="text-white text-xs font-semibold block mb-1.5">
          Progress
        </span>
        <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-blue-500 to-purple-500 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
