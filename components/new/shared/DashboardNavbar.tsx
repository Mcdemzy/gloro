"use client";
import React, { useState, useEffect } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  Menu,
  X,
  LayoutGrid,
  Trophy,
  Gamepad2,
  Users,
  UsersRound,
  MonitorPlay,
  Settings,
  LogOut,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useLogout, useProfile } from "@/lib/hooks/auth/useAuth";
import { useAuthStore } from "@/lib/store/auth/authStore";

/** Returns up to 2 uppercase initials from a username or full name */
function getInitials(
  username?: string,
  firstName?: string,
  lastName?: string,
): string {
  if (firstName && lastName) {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  }
  if (username) {
    const parts = username.split(/[\s_-]/);
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return username.slice(0, 2).toUpperCase();
  }
  return "GL";
}

const DashboardNavbar = () => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tournamentsOpen, setTournamentsOpen] = useState(false);
  const [communitiesOpen, setCommunitiesOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useLogout();
  const { fetchProfile } = useProfile();
  const user = useAuthStore((s) => s.user);

  // Fetch profile on mount if user data is missing
  useEffect(() => {
    if (!user) {
      fetchProfile();
    }
  }, []);

  const initials = getInitials(user?.username, user?.firstName, user?.lastName);

  const navLinks = [
    { name: "Home", href: "/dashboard" },
    { name: "Tournament", href: "/tournaments/hub" },
    { name: "Categories", href: "/game/categories", hasDropdown: true },
  ];

  const drawerItems = [
    { icon: LayoutGrid, label: "Overview", href: "/dashboard" },
    {
      icon: Trophy,
      label: "Tournaments",
      href: "/tournaments/hub",
      hasDropdown: true,
      open: tournamentsOpen,
      setOpen: setTournamentsOpen,
    },
    {
      icon: Users,
      label: "Communities",
      href: "#",
      hasDropdown: true,
      open: communitiesOpen,
      setOpen: setCommunitiesOpen,
    },
    { icon: Gamepad2, label: "Configure Game ID", href: "#" },
    { icon: UsersRound, label: "Teams", href: "#" },
  ];

  return (
    <>
      {/* ── NAVBAR ── */}
      <div className="max-w-7xl fixed mx-auto md:top-14 top-0 left-0 right-0 z-50">
        <nav
          className="relative py-6 md:px-12 lg:px-16 px-8 w-full flex items-center justify-between text-white md:rounded-[100px] rounded-none md:border-[0.2px] border-0 border-[#AFC0BBB2] shadow-[0_4px_32px_#0000004D]"
          style={{
            background:
              "linear-gradient(270deg, rgba(149, 24, 211, 1) 0%, rgba(74, 97, 221, 1) 50%, rgba(0, 170, 231, 1) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
          }}
        >
          <div className="bg-black/65 inset-0 absolute z-0 pointer-events-none left-0 right-0 md:rounded-[100px] rounded-none" />

          {/* LEFT — Hamburger + Logo */}
          <div className="relative z-10 flex items-center gap-3">
            <button
              className="lg:hidden p-1.5 hover:bg-white/5 rounded-full transition-colors"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-white" />
            </button>

            <h1
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider cursor-pointer orbitron"
              style={{
                background:
                  "linear-gradient(90deg, #00AAE7 0%, #4A61DD 50%, #9518D3 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              onClick={() => router.push("/dashboard")}
            >
              GloroQ
            </h1>
          </div>

          {/* CENTER — Search bar */}
          <div
            className={`relative z-10 hidden md:flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-5 py-2.5 transition-all duration-300 ${
              searchFocused
                ? "border-white/25 w-[380px] lg:w-[440px]"
                : "w-[320px] lg:w-[400px]"
            }`}
          >
            <Search className="w-4 h-4 text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none text-white placeholder-gray-500 flex-1 text-sm"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>

          {/* CENTER — Nav links (large desktop) */}
          <div className="relative z-10 hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/dashboard" && pathname.startsWith(link.href));
              return (
                <button
                  key={link.name}
                  onClick={() => router.push(link.href)}
                  className={`flex items-center gap-1.5 font-medium text-base transition-colors ${
                    isActive
                      ? "text-[#00AAE7]"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              );
            })}
          </div>

          {/* RIGHT — Search icon (mobile), Bell, Profile avatar */}
          <div className="relative z-10 flex items-center gap-2 sm:gap-3">
            <button className="md:hidden p-2 hover:bg-white/5 rounded-full transition-colors">
              <Search className="w-5 h-5 text-gray-400" />
            </button>

            <button className="relative p-2 hover:bg-white/5 rounded-full transition-colors">
              <Bell className="w-5 h-5 text-white/70" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </button>

            {/* Profile avatar with real initials */}
            <button
              onClick={() => router.push("/dashboard")}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base hover:scale-105 transition-transform shrink-0"
              style={{
                background: "linear-gradient(135deg, #4A61DD 0%, #9518D3 100%)",
              }}
              title={user?.username ?? "Profile"}
            >
              {initials}
            </button>
          </div>
        </nav>
      </div>

      {/* ── MOBILE DRAWER BACKDROP ── */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-100 bg-black/60 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* ── MOBILE DRAWER ── */}
      <div
        className={`fixed top-0 left-0 h-screen w-72 z-101 lg:hidden flex flex-col transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          background:
            "linear-gradient(180deg, rgba(178, 139, 179, 0.2) 0%, rgba(144, 168, 168, 0.2) 100%)",
          backdropFilter: "blur(24px)",
          borderRight: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 pt-7 pb-5">
          <h1 className="text-2xl font-bold tracking-wider text-[#00AAE7] orbitron">
            GloroQ
          </h1>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-white/50 hover:text-white transition-colors p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* User info strip */}
        {user && (
          <div className="mx-4 mb-4 px-4 py-3 rounded-xl bg-white/5 border border-white/8 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
              style={{
                background: "linear-gradient(135deg, #4A61DD 0%, #9518D3 100%)",
              }}
            >
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold truncate">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-white/40 text-xs truncate">@{user.username}</p>
            </div>
          </div>
        )}

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto px-4 py-3 space-y-1">
          {drawerItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" &&
                item.href !== "#" &&
                pathname.startsWith(item.href));

            if (item.hasDropdown) {
              return (
                <div key={item.label}>
                  <button
                    onClick={() => item.setOpen?.(!item.open)}
                    className={`w-full flex items-center justify-between px-3 py-3 rounded-xl transition-colors ${
                      isActive
                        ? "text-white bg-white/8"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="w-5 h-5 shrink-0" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${item.open ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>
              );
            }

            return (
              <button
                key={item.label}
                onClick={() => {
                  router.push(item.href);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-colors ${
                  isActive
                    ? "text-white bg-white/8"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}

          <button
            onClick={() => {
              router.push("/creator");
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl border border-[#00AAE7]/60 text-[#00AAE7] hover:text-[#03bcff] hover:border-[#4A61DD] transition-colors mt-2"
          >
            <MonitorPlay className="w-5 h-5 shrink-0" />
            <span className="text-sm font-bold">Go to creator's Dashboard</span>
          </button>
        </nav>

        {/* Drawer Footer */}
        <div className="px-4 pb-10 pt-3 space-y-1 border-t border-white/8">
          <button
            onClick={() => {
              router.push("/dashboard/settings");
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Settings className="w-5 h-5 shrink-0" />
            <span className="text-sm font-medium">Settings</span>
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              logout();
            }}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-400/80 hover:text-red-400 hover:bg-red-500/5 transition-colors"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default DashboardNavbar;
