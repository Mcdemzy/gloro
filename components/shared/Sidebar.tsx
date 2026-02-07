"use client";
import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Trophy,
  FileText,
  Settings,
  LogOut,
  ChevronDown,
  Users,
  Gamepad2,
  UsersRound,
  ArrowRight,
  ArrowLeft,
  Maximize2,
  Menu,
  X,
  Plus,
  Home,
  Calendar,
  Target,
  Crown,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface SidebarProps {
  isMobile?: boolean;
}

const Sidebar = ({ isMobile = false }: SidebarProps) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(!isMobile);
  const [tournamentsOpen, setTournamentsOpen] = useState(false);
  const [communitiesOpen, setCommunitiesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Tournament dropdown items with icons for collapsed state
  const tournamentSubItems = [
    { label: "Active", href: "/creator/tournaments/active", icon: Target },
    { label: "Past", href: "/creator/tournaments/past", icon: Calendar },
    { label: "Upcoming", href: "/creator/tournaments/upcoming", icon: Trophy },
  ];

  // Communities dropdown items with icons for collapsed state
  const communitiesSubItems = [
    { label: "My", href: "/creator/communities/my", icon: Home },
    {
      label: "Discover",
      href: "/creator/communities/discover",
      icon: Sparkles,
    },
    { label: "Events", href: "/creator/communities/events", icon: Calendar },
    {
      label: "Leaderboards",
      href: "/creator/communities/leaderboards",
      icon: Crown,
    },
  ];

  const mainItems = [
    {
      id: "overview",
      icon: Maximize2,
      label: "Overview",
      href: "/creator",
    },
    {
      id: "host-tournament",
      icon: Trophy,
      label: "Host New",
      href: "/creator/host/tournament",
    },
    {
      id: "tournaments",
      icon: Trophy,
      label: "Tournaments",
      href: "/creator/tournaments",
      hasDropdown: true,
      subItems: tournamentSubItems,
    },
    {
      id: "communities",
      icon: Users,
      label: "Communities",
      href: "/creator/communities",
      hasDropdown: true,
      subItems: communitiesSubItems,
    },
    {
      id: "configure-games",
      icon: Gamepad2,
      label: "Configure ID",
      href: "/creator/configure",
    },
    {
      id: "teams",
      icon: UsersRound,
      label: "Teams",
      href: "/creator/teams",
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
      label: "Settings",
      href: "/creator/settings",
    },
  ];

  const isActive = (href: string) => {
    if (href === "/creator") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  // Mobile hamburger button
  if (isMobile && !mobileOpen) {
    return (
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 w-12 h-12 rounded-lg bg-gradient-to-br from-[#0c3540] to-[#0a2d36] border border-cyan-500/30 shadow-lg flex items-center justify-center"
      >
        <Menu className="w-6 h-6 text-cyan-400" />
      </button>
    );
  }

  // Render dropdown items in collapsed state
  const renderCollapsedDropdown = (itemId: string, subItems: any[]) => {
    if (hoveredDropdown !== itemId) return null;

    return (
      <div className="absolute left-full top-0 ml-2 py-2 bg-gradient-to-b from-[#0c3540] to-[#0a2d36] border border-cyan-500/30 rounded-xl shadow-2xl z-50 min-w-[160px]">
        {subItems.map((subItem, index) => (
          <Link
            key={index}
            href={subItem.href}
            className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-cyan-500/10 transition-colors"
          >
            <subItem.icon size={18} />
            <span className="text-sm font-medium whitespace-nowrap">
              {subItem.label}
            </span>
          </Link>
        ))}
      </div>
    );
  };

  // Main sidebar content
  const sidebarContent = (
    <div
      className={`sidebar-container ${isMobile ? "fixed inset-0 z-40" : "relative"}`}
    >
      {/* Mobile overlay */}
      {isMobile && mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${isMobile ? "fixed left-0 top-0 h-full z-50" : "relative"} ${
          sidebarExpanded ? "w-[426px]" : "w-24"
        } transition-all duration-300 bg-gradient-to-b from-[#0c3540] to-[#0a2d36] backdrop-blur-xl flex flex-col  py-8 overflow-hidden`}
        style={
          !sidebarExpanded
            ? {
                // Clip-path styling from your CSS
                clipPath:
                  "polygon(0% 0%, 100% 0%, 100% 12%, 90% 14%, 90% 18%, 100% 20%, 100% 32%, 90% 34%, 90% 38%, 100% 40%, 100% 52%, 90% 54%, 90% 58%, 100% 60%, 100% 72%, 90% 74%, 90% 78%, 100% 80%, 100% 92%, 65% 100%, 0% 100%)",
                borderRadius: "18px",
                margin: "20px",
                height: "calc(100vh - 40px)",
                border: "1px solid rgba(125, 249, 255, 0.4)",
                boxShadow:
                  "0 0 40px rgba(0, 255, 255, 0.35), inset 0 0 12px rgba(255, 255, 255, 0.05)",
              }
            : {
                borderRight: "1px solid rgba(125, 249, 255, 0.2)",
                borderRadius: "24px",
                margin: "20px",
                height: "calc(100vh - 40px)",
              }
        }
      >
        {/* Mobile close button */}
        {isMobile && (
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-4 right-4 w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center"
          >
            <X className="w-5 h-5 text-cyan-400" />
          </button>
        )}

        {/* Expand/Collapse button */}
        {!isMobile && (
          <div className="px-4 mb-6">
            <button
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
              className="w-full flex items-center justify-center text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <span
                className={`text-3xl transition-transform duration-300 ${sidebarExpanded ? "rotate-45" : ""}`}
              >
                {sidebarExpanded ? "−" : "+"}
              </span>
            </button>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {/* Back Button */}
          <button
            onClick={() => router.push("/dashboard")}
            className="w-full flex items-center justify-center gap-3 px-3 py-3 text-cyan-400 hover:bg-cyan-500/10 rounded-xl transition-all mb-4 group relative"
          >
            <ArrowLeft size={22} className="flex-shrink-0" />
            {sidebarExpanded && (
              <span className="text-sm font-medium whitespace-nowrap">
                Back to Dashboard
              </span>
            )}
            {!sidebarExpanded && (
              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-2 bg-[#0c3540] border border-cyan-500/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                <span className="text-sm font-medium">Back to Dashboard</span>
              </div>
            )}
          </button>

          {mainItems.map((item) => {
            const Icon = item.icon;
            const isItemActive = isActive(item.href);

            if (sidebarExpanded) {
              // Expanded state with dropdowns
              if (item.hasDropdown) {
                const isOpen =
                  item.id === "tournaments" ? tournamentsOpen : communitiesOpen;
                const toggleOpen =
                  item.id === "tournaments"
                    ? () => setTournamentsOpen(!tournamentsOpen)
                    : () => setCommunitiesOpen(!communitiesOpen);

                return (
                  <div key={item.id} className="relative">
                    <button
                      onClick={toggleOpen}
                      className={`w-full flex items-center justify-between px-3 py-3 rounded-xl transition-all ${
                        isItemActive
                          ? "bg-cyan-500/30 text-white shadow-lg shadow-cyan-500/20"
                          : "text-gray-300 hover:bg-cyan-500/10 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={22} className="flex-shrink-0" />
                        <span className="text-sm font-medium whitespace-nowrap">
                          {item.label}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {isOpen && item.subItems && (
                      <div className="mt-1 ml-10 flex flex-col gap-1">
                        {item.subItems.map((subItem: any, index: number) => {
                          const SubIcon = subItem.icon;
                          return (
                            <Link
                              key={index}
                              href={subItem.href}
                              className="flex items-center gap-3 px-4 py-2 text-left text-sm text-gray-300 hover:text-white hover:bg-cyan-500/10 rounded-lg transition-colors"
                            >
                              <SubIcon size={18} />
                              {subItem.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              // Expanded state without dropdown
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
                  <span className="text-sm font-medium whitespace-nowrap">
                    {item.label}
                  </span>
                </Link>
              );
            } else {
              // Collapsed state
              if (item.hasDropdown) {
                return (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => setHoveredDropdown(item.id)}
                    onMouseLeave={() => setHoveredDropdown(null)}
                  >
                    <button
                      className={`w-full flex items-center justify-center px-3 py-3 rounded-xl transition-all group ${
                        isItemActive
                          ? "bg-cyan-500/30 text-white shadow-lg shadow-cyan-500/20"
                          : "text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10"
                      }`}
                      onClick={() => {
                        // If user clicks directly on the icon, go to main page
                        router.push(item.href);
                      }}
                    >
                      <Icon size={22} className="flex-shrink-0" />
                      {!sidebarExpanded && (
                        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-2 bg-[#0c3540] border border-cyan-500/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                          <span className="text-sm font-medium">
                            {item.label}
                          </span>
                        </div>
                      )}
                    </button>

                    {/* Dropdown in collapsed state */}
                    {item.subItems &&
                      renderCollapsedDropdown(item.id, item.subItems)}
                  </div>
                );
              }

              // Collapsed state without dropdown
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`w-full flex items-center justify-center px-3 py-3 rounded-xl transition-all group relative ${
                    isItemActive
                      ? "bg-cyan-500/30 text-white shadow-lg shadow-cyan-500/20"
                      : "text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10"
                  }`}
                >
                  <Icon size={22} className="flex-shrink-0" />
                  {!sidebarExpanded && (
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-2 bg-[#0c3540] border border-cyan-500/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                  )}
                </Link>
              );
            }
          })}
        </nav>

        {/* Logout */}
        <div className="px-4 pt-4 border-t border-cyan-500/20">
          <button
            onClick={() => router.push("/")}
            className="w-full flex items-center gap-3 px-3 py-3 text-gray-300 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all group relative"
          >
            <LogOut size={22} className="flex-shrink-0" />
            {sidebarExpanded && (
              <span className="text-sm font-medium whitespace-nowrap">
                Logout
              </span>
            )}
            {!sidebarExpanded && (
              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-2 bg-[#0c3540] border border-cyan-500/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                <span className="text-sm font-medium">Logout</span>
              </div>
            )}
          </button>
        </div>

        {/* Additional styling for icons */}
        <style jsx>{`
          .icon-hover-effect:hover {
            color: #7df9ff !important;
            transform: scale(1.1);
            transition: all 0.25s ease;
          }
        `}</style>
      </aside>
    </div>
  );

  // For mobile, show full sidebar
  if (isMobile) {
    return (
      <>
        {sidebarContent}
        <style jsx>{`
          @media (max-width: 768px) {
            aside {
              width: 85vw !important;
              max-width: 400px;
              border-radius: 0 24px 24px 0 !important;
              clip-path: none !important;
              margin: 0 !important;
              height: 100vh !important;
            }
          }
        `}</style>
      </>
    );
  }

  return sidebarContent;
};

export default Sidebar;
