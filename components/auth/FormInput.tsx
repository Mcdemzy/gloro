"use client";

import React from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
  error?: string;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, icon, rightElement, error, className, ...props }, ref) => {
    return (
      <div>
        <label className="text-white/80 text-sm mb-1 block font-medium">
          {label}
        </label>
        <div className="relative">
          {icon && (
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            className={`w-full bg-white/5 border rounded-xl py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:bg-white/8 transition-all duration-200 ${
              icon ? "pl-11" : "pl-4"
            } ${rightElement ? "pr-11" : "pr-4"} ${
              error
                ? "border-red-500/60 focus:border-red-500"
                : "border-white/10 focus:border-cyan-500/70"
            } ${className ?? ""}`}
            {...props}
          />
          {rightElement && (
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2">
              {rightElement}
            </span>
          )}
        </div>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  },
);

FormInput.displayName = "FormInput";
export default FormInput;
