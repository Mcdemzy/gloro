"use client";
import React from "react";
import {
  Maximize2,
  Trophy,
  Users,
  Gamepad2,
  Share2,
  User,
  LogOut,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  sidebarExpanded: boolean;
  setSidebarExpanded: (expanded: boolean) => void;
  tournamentsExpanded: boolean;
  setTournamentsExpanded: (expanded: boolean) => void;
  communitiesExpanded: boolean;
  setCommunitiesExpanded: (expanded: boolean) => void;
}

const sidebarItems = [
  {
    icon: Maximize2,
    label: "Overview",
    href: "/dashboard",
    id: "overview",
  },
  {
    icon: Trophy,
    label: "Tournaments",
    href: "/dashboard/tournaments",
    id: "tournaments",
    hasDropdown: true,
    subItems: [
      { label: "Joined competitions", href: "/dashboard/tournaments/joined" },
      { label: "Hosted competitions", href: "/dashboard/tournaments/hosted" },
      { label: "Host new competition", href: "/dashboard/tournaments/host" },
    ],
  },
  {
    icon: Users,
    label: "Communities",
    href: "/dashboard/communities",
    id: "communities",
    hasDropdown: true,
    subItems: [
      { label: "Channels", href: "/dashboard/communities/channels" },
      { label: "Tickets", href: "/dashboard/communities/tickets" },
    ],
  },
  {
    icon: Gamepad2,
    label: "Configure Games ID",
    href: "/dashboard/games",
    id: "games",
  },
  {
    icon: Users,
    label: "Teams",
    href: "/dashboard/teams",
    id: "teams",
  },
];

const Sidebar = ({
  sidebarExpanded,
  setSidebarExpanded,
  tournamentsExpanded,
  setTournamentsExpanded,
  communitiesExpanded,
  setCommunitiesExpanded,
}: SidebarProps) => {
  const pathname = usePathname();

  const isActive = (href: string, id: string) => {
    if (id === "overview") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/*
       * ── SIDEBAR ──────────────────────────────────────────────────────────
       * Hidden on mobile (md:flex). Collapses to icon-only (w-[60px]),
       * expands to full labels (w-56) on hover.
       */}
      <aside
        className={`
          hidden md:flex
          fixed left-0 top-[73px] h-[calc(100vh-73px)]
          flex-col py-5
          bg-[#0d0f1e] border-r border-purple-500/20
          z-50 overflow-hidden
          transition-[width] duration-300 ease-[cubic-bezier(.4,0,.2,1)]
          ${sidebarExpanded ? "w-56" : "w-[60px]"}
        `}
        onMouseEnter={() => setSidebarExpanded(true)}
        onMouseLeave={() => {
          setSidebarExpanded(false);
          setTournamentsExpanded(false);
          setCommunitiesExpanded(false);
        }}
      >
        {/* Subtle gradient right-border glow */}
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-500/40 to-transparent pointer-events-none" />

        {/* + button */}
        <div className="flex items-center justify-center h-9 mb-3 shrink-0">
          <button className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-cyan-400 hover:bg-white/5 transition-all">
            <span className="text-xl leading-none">+</span>
          </button>
        </div>

        {/* Nav items */}
        <div className="flex-1 px-2 space-y-0.5 overflow-y-auto overflow-x-hidden">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href, item.id);
            const isExpanded =
              item.id === "tournaments"
                ? tournamentsExpanded
                : item.id === "communities"
                  ? communitiesExpanded
                  : false;

            return (
              <div key={item.id}>
                <Link
                  href={item.hasDropdown ? "#" : item.href}
                  onClick={(e) => {
                    if (item.hasDropdown) {
                      e.preventDefault();
                      if (item.id === "tournaments")
                        setTournamentsExpanded(!tournamentsExpanded);
                      if (item.id === "communities")
                        setCommunitiesExpanded(!communitiesExpanded);
                    }
                  }}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-xl
                    transition-all duration-200 group relative
                    ${
                      active
                        ? "bg-cyan-500 text-white"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }
                  `}
                >
                  {/* Icon — always visible */}
                  <Icon size={19} className="shrink-0" />

                  {/* Label + chevron — fade in when expanded */}
                  <span
                    className={`
                      flex items-center gap-1 flex-1 min-w-0
                      text-sm font-medium whitespace-nowrap
                      transition-[opacity,transform] duration-200
                      ${sidebarExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1 pointer-events-none"}
                    `}
                  >
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.hasDropdown && (
                      <ChevronRight
                        size={13}
                        className={`shrink-0 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
                      />
                    )}
                  </span>

                  {/* Tooltip when collapsed */}
                  {!sidebarExpanded && (
                    <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-[#1a1d2e] border border-white/10 rounded-lg text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-xl">
                      {item.label}
                    </div>
                  )}
                </Link>

                {/* Dropdown sub-items */}
                {item.hasDropdown && isExpanded && sidebarExpanded && (
                  <div className="ml-8 mt-0.5 space-y-0.5">
                    {item.subItems?.map((sub, idx) => (
                      <Link
                        key={idx}
                        href={sub.href}
                        className={`
                          block px-3 py-2 text-xs rounded-lg transition-colors
                          ${
                            pathname === sub.href
                              ? "text-cyan-400 bg-cyan-500/10"
                              : "text-gray-400 hover:text-white hover:bg-white/5"
                          }
                        `}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom actions */}
        <div className="px-2 space-y-0.5 border-t border-white/10 pt-3 shrink-0">
          {/* Creator Dashboard */}
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-cyan-400 hover:bg-cyan-500/10 transition-all duration-200 group relative">
            <Share2 size={19} className="shrink-0" />
            <span
              className={`
                text-sm font-medium whitespace-nowrap
                transition-[opacity,transform] duration-200
                ${sidebarExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1 pointer-events-none"}
              `}
            >
              Go to creator&apos;s Dashboard
            </span>
            {!sidebarExpanded && (
              <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-[#1a1d2e] border border-white/10 rounded-lg text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-xl">
                Creator&apos;s Dashboard
              </div>
            )}
          </button>

          {/* Settings */}
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all duration-200 group relative"
          >
            <User size={19} className="shrink-0" />
            <span
              className={`
                text-sm font-medium whitespace-nowrap
                transition-[opacity,transform] duration-200
                ${sidebarExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1 pointer-events-none"}
              `}
            >
              Settings
            </span>
            {!sidebarExpanded && (
              <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-[#1a1d2e] border border-white/10 rounded-lg text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-xl">
                Settings
              </div>
            )}
          </Link>

          {/* Logout */}
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all duration-200 group relative">
            <LogOut size={19} className="shrink-0" />
            <span
              className={`
                text-sm font-medium whitespace-nowrap
                transition-[opacity,transform] duration-200
                ${sidebarExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1 pointer-events-none"}
              `}
            >
              Logout
            </span>
            {!sidebarExpanded && (
              <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-[#1a1d2e] border border-white/10 rounded-lg text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-xl">
                Logout
              </div>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
