"use client";

import React from "react";

interface FormInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

const FormInput = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
  rightElement,
}: FormInputProps) => {
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
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full bg-white/5 border border-white/10 rounded-xl py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-cyan-500/70 focus:bg-white/8 transition-all duration-200 ${
            icon ? "pl-11" : "pl-4"
          } ${rightElement ? "pr-11" : "pr-4"}`}
        />
        {rightElement && (
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2">
            {rightElement}
          </span>
        )}
      </div>
    </div>
  );
};

export default FormInput;
