"use client";
import React, { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  X,
  LogOut,
  LayoutGrid,
  Trophy,
  Gamepad2,
  UsersRound,
  MonitorPlay,
  Bell,
  Settings,
  ChevronDown,
  ChevronRight,
  Maximize2,
  Users,
  Share2,
  User,
} from "lucide-react";
import { useLogout } from "@/lib/hooks/auth/useAuth";
import { useAuthStore } from "@/lib/store/auth/authStore";

// ── helpers ───────────────────────────────────────────────────────────────────

function getInitial(username?: string, firstName?: string): string {
  if (firstName) return firstName[0].toUpperCase();
  if (username) return username[0].toUpperCase();
  return "G";
}

// ── types ─────────────────────────────────────────────────────────────────────

interface NavLink {
  name: string;
  href: string;
  protected: boolean;
  authHref?: string;
}

// ── constants ─────────────────────────────────────────────────────────────────

const NAV_LINKS: NavLink[] = [
  { name: "Home", href: "/", protected: false, authHref: "/dashboard" },
  { name: "Tournaments", href: "/tournaments/hub", protected: true },
  { name: "Training", href: "/training", protected: false },
  { name: "Categories", href: "/game/categories", protected: true },
];

// Sidebar items replicated for mobile drawer
const SIDEBAR_NAV_ITEMS = [
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
    icon: UsersRound,
    label: "Teams",
    href: "/dashboard/teams",
    id: "teams",
  },
];

// ── component ─────────────────────────────────────────────────────────────────

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useLogout();

  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Track open dropdowns inside the mobile drawer
  const [drawerTourOpen, setDrawerTourOpen] = useState(false);
  const [drawerCommOpen, setDrawerCommOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close drawer when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const initial = mounted ? getInitial(user?.username, user?.firstName) : "G";
  const isAuthChecked = useAuthStore((s) => s.isAuthChecked);
  const authed = isAuthChecked && isAuthenticated;

  const handleLink = (link: NavLink) => {
    if (!isAuthChecked) return;
    const dest = authed && link.authHref ? link.authHref : link.href;
    router.push(dest);
  };

  const isActive = (link: NavLink) => {
    const dest = authed && link.authHref ? link.authHref : link.href;
    return (
      pathname === dest ||
      (dest !== "/" && dest !== "/dashboard" && pathname.startsWith(dest))
    );
  };

  const isSidebarItemActive = (href: string, id: string) => {
    if (id === "overview") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  const drawerExpanded = (id: string) =>
    id === "tournaments"
      ? drawerTourOpen
      : id === "communities"
        ? drawerCommOpen
        : false;

  const toggleDrawerItem = (id: string) => {
    if (id === "tournaments") setDrawerTourOpen((p) => !p);
    if (id === "communities") setDrawerCommOpen((p) => !p);
  };

  return (
    <>
      {/* ── FLOATING PILL NAV ───────────────────────────────────────────── */}
      <div
        className={`
          fixed left-0 right-0 z-50 flex justify-center pointer-events-none
          transition-all duration-500
          ${scrolled ? "top-3" : "top-6 md:top-10"}
        `}
      >
        <nav
          className={`
            pointer-events-auto
            flex items-center justify-between
            rounded-full border border-white/10
            transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)]
            shadow-[0_8px_40px_rgba(0,0,0,0.45)]
            ${
              scrolled
                ? "px-4 py-2 gap-4 w-[calc(100%-24px)] max-w-3xl"
                : "px-5 py-3 gap-6 w-[calc(100%-32px)] max-w-4xl"
            }
          `}
          style={{
            background:
              "linear-gradient(120deg, rgba(10,8,30,0.82) 0%, rgba(20,12,48,0.88) 100%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderColor: "rgba(255,255,255,0.09)",
            boxShadow:
              "0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          {/* Logo */}
          <button
            onClick={() => router.push(authed ? "/dashboard" : "/")}
            className="shrink-0 orbitron font-bold text-[#00AAE7] tracking-wider transition-all duration-300 hover:text-cyan-300"
            style={{ fontSize: scrolled ? "1.1rem" : "1.25rem" }}
          >
            GloroQ
          </button>

          {/* Center links — desktop */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = isActive(link);
              return (
                <li key={link.name}>
                  <button
                    onClick={() => handleLink(link)}
                    className={`
                      relative px-4 py-2 rounded-full text-sm font-medium
                      transition-all duration-300 cursor-pointer
                      ${active ? "text-white" : "text-white/55 hover:text-white/90"}
                    `}
                  >
                    {active && (
                      <span
                        className="absolute inset-0 rounded-full"
                        style={{
                          background:
                            "linear-gradient(120deg, rgba(78,7,224,0.5), rgba(141,45,226,0.4))",
                          boxShadow: "0 0 16px rgba(141,45,226,0.3)",
                        }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-2 shrink-0">
            {authed && (
              <button className="relative p-2 rounded-full text-white/50 hover:text-white hover:bg-white/8 transition-all duration-200">
                <Bell size={17} />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500" />
              </button>
            )}

            {!mounted ? (
              <div className="w-20 h-8 rounded-full opacity-0" aria-hidden />
            ) : authed ? (
              <div ref={profileRef} className="relative">
                <button
                  onClick={() => setProfileOpen((p) => !p)}
                  className={`
                    w-9 h-9 rounded-full flex items-center justify-center
                    text-white font-bold text-sm tracking-wide
                    transition-all duration-300 hover:scale-105 hover:shadow-[0_0_14px_rgba(141,45,226,0.6)]
                    ${profileOpen ? "ring-2 ring-purple-500/70 ring-offset-1 ring-offset-transparent" : ""}
                  `}
                  style={{
                    background:
                      "linear-gradient(135deg, #4A61DD 0%, #9518D3 100%)",
                  }}
                  title={user?.username}
                >
                  {initial}
                </button>

                <div
                  className={`
                    absolute right-0 top-[calc(100%+10px)] w-52
                    rounded-2xl border border-white/10 overflow-hidden
                    transition-all duration-200 origin-top-right
                    ${profileOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-1 pointer-events-none"}
                  `}
                  style={{
                    background:
                      "linear-gradient(160deg, rgba(14,10,38,0.97), rgba(22,14,54,0.97))",
                    backdropFilter: "blur(24px)",
                    boxShadow:
                      "0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)",
                  }}
                >
                  <div className="px-4 py-3 border-b border-white/8">
                    <p className="text-white text-sm font-semibold truncate">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-white/40 text-xs truncate mt-0.5">
                      @{user?.username}
                    </p>
                  </div>

                  <div className="p-2 space-y-0.5">
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        router.push("/dashboard");
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/70 hover:text-white hover:bg-white/6 transition-colors text-sm"
                    >
                      <LayoutGrid size={15} className="shrink-0" />
                      Dashboard
                    </button>
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        router.push("/creator");
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#00AAE7]/80 hover:text-[#00AAE7] hover:bg-cyan-500/8 transition-colors text-sm"
                    >
                      <MonitorPlay size={15} className="shrink-0" />
                      Creator Dashboard
                    </button>
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        router.push("/dashboard/settings");
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/70 hover:text-white hover:bg-white/6 transition-colors text-sm"
                    >
                      <Settings size={15} className="shrink-0" />
                      Settings
                    </button>
                  </div>

                  <div className="p-2 border-t border-white/8">
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400/70 hover:text-red-400 hover:bg-red-500/8 transition-colors text-sm"
                    >
                      <LogOut size={15} className="shrink-0" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => router.push("/auth/signup")}
                className="relative px-5 py-2 rounded-full text-sm font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(141,45,226,0.5)] hover:scale-[1.03] active:scale-[0.97]"
                style={{
                  background: "linear-gradient(120deg, #4E07E0, #8D2DE2)",
                }}
              >
                <span className="relative z-10">Register Now</span>
              </button>
            )}

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden p-2 rounded-full text-white/60 hover:text-white hover:bg-white/8 transition-all duration-200"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </nav>
      </div>

      {/* ── MOBILE DRAWER ─────────────────────────────────────────────────── */}

      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 z-[60] bg-black/60 md:hidden
          transition-opacity duration-300
          ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setMobileOpen(false)}
      />

      {/* Drawer panel */}
      <div
        className={`
          fixed top-0 left-0 h-full w-72 z-[61] md:hidden
          flex flex-col
          transition-transform duration-300 ease-[cubic-bezier(.4,0,.2,1)]
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        style={{
          background:
            "linear-gradient(160deg, rgba(10,8,30,0.97) 0%, rgba(20,12,52,0.98) 100%)",
          backdropFilter: "blur(24px)",
          borderRight: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-6 pb-4 border-b border-white/8 shrink-0">
          <span className="orbitron text-xl font-bold text-[#00AAE7]">
            GloroQ
          </span>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1.5 rounded-full text-white/40 hover:text-white hover:bg-white/8 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* User strip */}
        {authed && user && (
          <div
            className="mx-4 mt-4 px-4 py-3 rounded-2xl flex items-center gap-3 shrink-0"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shrink-0"
              style={{
                background: "linear-gradient(135deg, #4A61DD, #9518D3)",
              }}
            >
              {initial}
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold truncate">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-white/40 text-xs truncate">@{user.username}</p>
            </div>
          </div>
        )}

        {/* Scrollable content */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {/* ── Top-level nav links ── */}
          {NAV_LINKS.map((link) => {
            const active = isActive(link);
            return (
              <button
                key={link.name}
                onClick={() => {
                  setMobileOpen(false);
                  handleLink(link);
                }}
                className={`
                  w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium
                  transition-all duration-200 text-left
                  ${
                    active
                      ? "text-white bg-white/8 border border-white/10"
                      : "text-white/55 hover:text-white hover:bg-white/5"
                  }
                `}
              >
                {link.name}
                {active && (
                  <span
                    className="ml-auto w-1.5 h-1.5 rounded-full shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #4A61DD, #9518D3)",
                    }}
                  />
                )}
              </button>
            );
          })}

          {/* ── Sidebar section (authenticated only) ── */}
          {authed && (
            <>
              <div className="pt-4 pb-1.5 px-1">
                <p className="text-white/25 text-[10px] uppercase tracking-[0.15em] font-semibold">
                  Dashboard
                </p>
              </div>

              {SIDEBAR_NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const active = isSidebarItemActive(item.href, item.id);
                const expanded = drawerExpanded(item.id);

                return (
                  <div key={item.id}>
                    {item.hasDropdown ? (
                      <button
                        onClick={() => toggleDrawerItem(item.id)}
                        className={`
                          w-full flex items-center gap-3 px-4 py-3 rounded-xl
                          text-sm font-medium transition-all duration-200
                          ${
                            active
                              ? "text-white bg-cyan-500/15 border border-cyan-500/25"
                              : "text-white/60 hover:text-white hover:bg-white/5"
                          }
                        `}
                      >
                        <Icon size={17} className="shrink-0" />
                        <span className="flex-1 text-left">{item.label}</span>
                        <ChevronRight
                          size={14}
                          className={`shrink-0 transition-transform duration-200 ${expanded ? "rotate-90" : ""}`}
                        />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setMobileOpen(false);
                          router.push(item.href);
                        }}
                        className={`
                          w-full flex items-center gap-3 px-4 py-3 rounded-xl
                          text-sm font-medium transition-all duration-200
                          ${
                            active
                              ? "text-white bg-cyan-500/15 border border-cyan-500/25"
                              : "text-white/60 hover:text-white hover:bg-white/5"
                          }
                        `}
                      >
                        <Icon size={17} className="shrink-0" />
                        <span className="flex-1 text-left">{item.label}</span>
                        {active && (
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                        )}
                      </button>
                    )}

                    {/* Sub-items */}
                    {item.hasDropdown && expanded && (
                      <div className="ml-9 mt-0.5 space-y-0.5">
                        {item.subItems?.map((sub, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setMobileOpen(false);
                              router.push(sub.href);
                            }}
                            className={`
                              w-full text-left px-3 py-2 text-xs rounded-lg transition-colors
                              ${
                                pathname === sub.href
                                  ? "text-cyan-400 bg-cyan-500/10"
                                  : "text-white/40 hover:text-white hover:bg-white/5"
                              }
                            `}
                          >
                            {sub.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Creator Dashboard */}
              <button
                onClick={() => {
                  setMobileOpen(false);
                  router.push("/creator");
                }}
                className="w-full flex items-center gap-3 px-4 py-3 mt-1 rounded-xl border border-[#00AAE7]/25 text-[#00AAE7]/80 hover:text-[#00AAE7] hover:border-[#00AAE7]/50 text-sm font-semibold transition-all duration-200"
              >
                <MonitorPlay size={17} className="shrink-0" />
                Creator Dashboard
              </button>

              {/* Settings */}
              <button
                onClick={() => {
                  setMobileOpen(false);
                  router.push("/dashboard/settings");
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 text-sm font-medium transition-all duration-200"
              >
                <User size={17} className="shrink-0" />
                Settings
              </button>
            </>
          )}
        </nav>

        {/* Footer */}
        <div className="px-3 pb-8 pt-3 border-t border-white/8 space-y-1 shrink-0">
          {authed ? (
            <button
              onClick={() => {
                setMobileOpen(false);
                logout();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400/70 hover:text-red-400 hover:bg-red-500/8 text-sm font-medium transition-all duration-200"
            >
              <LogOut size={16} className="shrink-0" />
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                setMobileOpen(false);
                router.push("/auth/signup");
              }}
              className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all duration-300"
              style={{
                background: "linear-gradient(120deg, #4E07E0, #8D2DE2)",
              }}
            >
              Register Now
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
