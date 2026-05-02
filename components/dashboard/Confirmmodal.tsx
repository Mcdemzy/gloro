"use client";
import React from "react";
import { AlertTriangle, Loader2 } from "lucide-react";

interface ConfirmModalProps {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning";
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative bg-[#0a1628] border border-[#455872] rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <div className="flex flex-col items-center text-center gap-4">
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center ${
              variant === "danger"
                ? "bg-red-500/20 border border-red-500/30"
                : "bg-yellow-500/20 border border-yellow-500/30"
            }`}
          >
            <AlertTriangle
              size={26}
              className={
                variant === "danger" ? "text-red-400" : "text-yellow-400"
              }
            />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{message}</p>
          </div>
          <div className="flex gap-3 w-full mt-2">
            <button
              onClick={onCancel}
              disabled={loading}
              className="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold transition-all text-sm"
            >
              {cancelLabel}
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all text-sm text-white ${
                variant === "danger"
                  ? "bg-red-500 hover:bg-red-600 disabled:opacity-60"
                  : "bg-yellow-500 hover:bg-yellow-600 disabled:opacity-60"
              }`}
            >
              {loading && <Loader2 size={15} className="animate-spin" />}
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}