"use client";
import React from "react";
import {
  ArrowLeft,
  Sparkles,
  Trophy,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface SidebarProps {
  sidebarExpanded: boolean;
  setSidebarExpanded: (expanded: boolean) => void;
}

const Sidebar = ({ sidebarExpanded, setSidebarExpanded }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const sidebarItems = [
    {
      id: "overview",
      icon: Sparkles,
      label: "Overview",
      href: "/creator",
    },
    {
      id: "host-tournament",
      icon: Trophy,
      label: "Host New Tournament",
      href: "/creator/host/tournament",
    },
    {
      id: "hosted-tournaments",
      icon: Trophy,
      label: "Hosted Tournaments",
      href: "/creator/tournaments",
    },
    {
      id: "drafts",
      icon: FileText,
      label: "Drafts",
      href: "/creator/drafts",
    },
    {
      id: "settings",
      icon: Settings,
      label: "Creator's Settings",
      href: "/creator/settings",
    },
  ];

  const isActive = (href: string) => {
    if (href === "/creator") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={`fixed left-0 top-[73px] h-[calc(100vh-73px)] bg-gradient-to-b from-[#0c3540]/80 to-[#0a2d36]/80 backdrop-blur-md border-r border-cyan-500/20 flex flex-col py-8 z-40 transition-all duration-300 ${
        sidebarExpanded ? "w-64" : "w-20"
      }`}
      onMouseEnter={() => setSidebarExpanded(true)}
      onMouseLeave={() => setSidebarExpanded(false)}
    >
      {/* Decorative line */}
      <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-cyan-500 to-transparent"></div>

      {/* Plus Button */}
      <div className="px-4 mb-6">
        <button className="w-full flex items-center justify-center text-cyan-400 hover:text-cyan-300 transition-colors">
          <span className="text-3xl">+</span>
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {/* Back Button */}
        <button
          onClick={() => router.push("/dashboard")}
          className="w-full flex items-center gap-3 px-3 py-3 text-cyan-400 hover:bg-cyan-500/10 rounded-xl transition-all mb-4"
        >
          <ArrowLeft size={22} className="flex-shrink-0" />
          {sidebarExpanded && (
            <span className="text-sm font-medium whitespace-nowrap">
              Back to User Dashboard
            </span>
          )}
        </button>

        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isItemActive = isActive(item.href);
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                isItemActive
                  ? "bg-cyan-500/30 text-white shadow-lg shadow-cyan-500/20"
                  : "text-gray-300 hover:bg-cyan-500/10 hover:text-white"
              }`}
            >
              <Icon size={22} className="flex-shrink-0" />
              {sidebarExpanded && (
                <span className="text-sm font-medium whitespace-nowrap orbitron">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-4 pt-4 border-t border-cyan-500/20">
        <button className="w-full flex items-center gap-3 px-3 py-3 text-gray-300 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all">
          <LogOut size={22} className="flex-shrink-0" />
          {sidebarExpanded && (
            <span className="text-sm font-medium whitespace-nowrap">
              Logout
            </span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
