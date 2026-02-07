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
  ChevronDown,
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

const Sidebar = ({
  sidebarExpanded,
  setSidebarExpanded,
  tournamentsExpanded,
  setTournamentsExpanded,
  communitiesExpanded,
  setCommunitiesExpanded,
}: SidebarProps) => {
  const pathname = usePathname();

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

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={`fixed left-0 top-40 h-[calc(100vh-73px)] bg-[#1a1d2e] border-r border-purple-500/20 flex flex-col py-8 z-50 transition-all duration-300 ${
        sidebarExpanded ? "w-72" : "w-20"
      }`}
      onMouseEnter={() => setSidebarExpanded(true)}
      onMouseLeave={() => {
        setSidebarExpanded(false);
        setTournamentsExpanded(false);
        setCommunitiesExpanded(false);
      }}
    >
      <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-purple-500 to-transparent"></div>

      <div className="px-6 mb-6">
        <button className="w-full flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-colors">
          <span className="text-2xl">+</span>
        </button>
      </div>

      <div className="flex-1 px-4 space-y-2 overflow-y-auto">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isItemActive = isActive(item.href);
          const isExpanded =
            item.id === "tournaments"
              ? tournamentsExpanded
              : item.id === "communities"
              ? communitiesExpanded
              : false;

          return (
            <div key={item.id}>
              <Link
                href={item.href}
                onClick={(e) => {
                  if (item.hasDropdown) {
                    e.preventDefault();
                    if (item.id === "tournaments") {
                      setTournamentsExpanded(!tournamentsExpanded);
                    } else if (item.id === "communities") {
                      setCommunitiesExpanded(!communitiesExpanded);
                    }
                  }
                }}
                className={`w-full flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-300 group ${
                  isItemActive
                    ? "bg-cyan-600 text-white"
                    : "bg-transparent text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={22} className="flex-shrink-0" />
                {sidebarExpanded && (
                  <span className="text-sm font-medium whitespace-nowrap">
                    {item.label}
                  </span>
                )}
                {sidebarExpanded && item.hasDropdown && (
                  <ChevronDown
                    size={16}
                    className={`ml-auto transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                )}
              </Link>

              {item.hasDropdown &&
                isExpanded &&
                sidebarExpanded &&
                item.subItems && (
                  <div className="ml-8 mt-2 space-y-1">
                    {item.subItems.map((subItem, idx) => (
                      <Link
                        key={idx}
                        href={subItem.href}
                        className="w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5 block"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
            </div>
          );
        })}
      </div>

      <div className="px-4 space-y-2 border-t border-white/10 pt-4">
        <button className="w-full flex items-center gap-4 px-3 py-3 rounded-xl text-cyan-400 hover:bg-cyan-500/10 transition-all duration-300">
          <Share2 size={22} className="flex-shrink-0" />
          {sidebarExpanded && (
            <span className="text-sm font-medium whitespace-nowrap">
              Go to creator's Dashboard
            </span>
          )}
        </button>
        <Link
          href="/dashboard/settings"
          className="w-full flex items-center gap-4 px-3 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all duration-300"
        >
          <User size={22} className="flex-shrink-0" />
          {sidebarExpanded && (
            <span className="text-sm font-medium whitespace-nowrap">
              Settings
            </span>
          )}
        </Link>
        <button className="w-full flex items-center gap-4 px-3 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all duration-300">
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
