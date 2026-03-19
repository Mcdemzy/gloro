"use client";

import { LogIn, User } from "lucide-react";
import { useRouter } from "next/navigation";

interface AuthTabsProps {
  activeTab: "login" | "signup";
}

const AuthTabs = ({ activeTab }: AuthTabsProps) => {
  const router = useRouter();

  return (
    <div className="flex bg-white rounded-2xl p-1.5 mb-5 w-full max-w-sm mx-auto">
      <button
        onClick={() => router.push("/auth/login")}
        className={`flex-1 py-2.5 px-5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
          activeTab === "login"
            ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30"
            : "text-gray-800 hover:text-gray-600 cursor-pointer"
        }`}
      >
        <LogIn size={16} />
        Login
      </button>
      <button
        onClick={() => router.push("/auth/signup")}
        className={`flex-1 py-2.5 px-5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
          activeTab === "signup"
            ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30"
            : "text-gray-800 hover:text-gray-600 cursor-pointer"
        }`}
      >
        <User size={16} />
        Sign up
      </button>
    </div>
  );
};

export default AuthTabs;
