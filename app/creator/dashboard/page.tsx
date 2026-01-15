"use client";
import { useState } from "react";
import {
  ArrowLeft,
  Sparkles,
  Trophy,
  FileText,
  Settings,
  LogOut,
  Plus,
  Bell,
  Search,
  User,
  MapPin,
  Phone,
  Printer,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  Rss,
} from "lucide-react";

export default function CreatorDashboard() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [activePage, setActivePage] = useState("overview");

  const sidebarItems = [
    { id: "overview", icon: Sparkles, label: "Overview", href: "#" },
    {
      id: "host-tournament",
      icon: Trophy,
      label: "Host New Tournament",
      href: "#",
    },
    {
      id: "hosted-tournaments",
      icon: Trophy,
      label: "Hosted Tournaments",
      href: "#",
    },
    { id: "drafts", icon: FileText, label: "Drafts", href: "#" },
    { id: "settings", icon: Settings, label: "Creator's Settings", href: "#" },
  ];

  const tournaments = [
    {
      id: 1,
      title: "FIFA Global Cup",
      date: "Apr 1 • May 10",
      image:
        "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=300&fit=crop",
      status: "Completed",
    },
    {
      id: 2,
      title: "COD: Warzone Master",
      prize: "$75,000",
      date: "Jun 15 • Jul 22",
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
      status: "Active",
    },
    {
      id: 3,
      title: "Valorant Clash",
      date: "Apr 1 • May 10",
      image:
        "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=300&fit=crop",
      status: "Draft",
    },
    {
      id: 4,
      title: "Fortnite Royale Cup",
      date: "Sep 02 • Oct 16",
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop",
      status: "Completed",
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Linkedin, href: "#" },
    { icon: Youtube, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Rss, href: "#" },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed":
        return (
          <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-semibold flex items-center gap-1">
            ✓ Completed
          </span>
        );
      case "Active":
        return (
          <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold flex items-center gap-1">
            ● Active
          </span>
        );
      case "Draft":
        return (
          <span className="px-3 py-1 bg-gray-500/20 text-gray-400 rounded-full text-xs font-semibold flex items-center gap-1">
            📄 Draft
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a3d4a] via-[#0d4f5c] to-[#0a3d4a] flex flex-col">
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-[73px] bg-[#0c3540]/95 backdrop-blur-md border-b border-cyan-500/20 z-50 px-8 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 className="text-cyan-400 text-2xl font-bold">Gloro</h1>
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-80 pl-12 pr-4 py-2 bg-white/5 border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="#"
            className="text-white hover:text-cyan-400 transition-colors"
          >
            Home
          </a>
          <a
            href="#"
            className="text-white hover:text-cyan-400 transition-colors"
          >
            Tournament
          </a>
          <a
            href="#"
            className="text-white hover:text-cyan-400 transition-colors"
          >
            Categories
          </a>
          <button className="relative text-white hover:text-cyan-400 transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
            P
          </div>
        </div>
      </nav>

      <div className="flex pt-[73px] flex-1">
        {/* Sidebar */}
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
            <button className="w-full flex items-center gap-3 px-3 py-3 text-cyan-400 hover:bg-cyan-500/10 rounded-xl transition-all mb-4">
              <ArrowLeft size={22} className="flex-shrink-0" />
              {sidebarExpanded && (
                <span className="text-sm font-medium whitespace-nowrap">
                  Back to User Dashboard
                </span>
              )}
            </button>

            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                    isActive
                      ? "bg-cyan-500/30 text-white shadow-lg shadow-cyan-500/20"
                      : "text-gray-300 hover:bg-cyan-500/10 hover:text-white"
                  }`}
                >
                  <Icon size={22} className="flex-shrink-0" />
                  {sidebarExpanded && (
                    <span className="text-sm font-medium whitespace-nowrap">
                      {item.label}
                    </span>
                  )}
                </button>
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

        {/* Main Content */}
        <main
          className={`flex-1 transition-all duration-300 ${
            sidebarExpanded ? "ml-64" : "ml-20"
          }`}
        >
          <div className="p-8 pb-0">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">
                    Overview
                  </h1>
                  <p className="text-cyan-300/70">
                    Manage your tournaments and track performance
                  </p>
                </div>
                <button className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-cyan-500/50">
                  Switch to User's Dashboard
                </button>
              </div>

              {/* Stats Card */}
              <div className="bg-gradient-to-br from-[#0c3540]/60 to-[#0a2d36]/60 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-6 mb-8 shadow-xl">
                <p className="text-cyan-300/70 text-sm mb-2">
                  Total Tournaments Created
                </p>
                <p className="text-5xl font-bold text-white">12</p>
              </div>

              {/* My Tournaments Section */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  My Tournaments
                </h2>
                <div className="flex items-center gap-4">
                  <button className="text-cyan-400 hover:text-cyan-300 transition-colors font-semibold">
                    See all
                  </button>
                  <button className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-cyan-500/50 flex items-center gap-2">
                    <Plus size={20} />
                    Create New Tournament
                  </button>
                </div>
              </div>

              {/* Tournament Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {tournaments.map((tournament) => (
                  <div
                    key={tournament.id}
                    className="group bg-gradient-to-br from-[#0c3540]/60 to-[#0a2d36]/60 backdrop-blur-md border border-cyan-500/20 rounded-2xl overflow-hidden hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300"
                  >
                    <div className="relative overflow-hidden h-48">
                      <div
                        className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundImage: `url(${tournament.image})` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a2d36] via-transparent to-transparent"></div>
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {tournament.title}
                      </h3>

                      {tournament.prize && (
                        <p className="text-green-400 font-bold text-lg">
                          Grand Prize: {tournament.prize}
                        </p>
                      )}

                      <p className="text-cyan-300/70 text-sm">
                        {tournament.date}
                      </p>

                      <div className="flex items-center justify-between pt-2">
                        {getStatusBadge(tournament.status)}
                      </div>

                      <button className="w-full px-4 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-400 rounded-xl font-semibold transition-all">
                        Manage
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="bg-[#0a2d36] border-t border-cyan-500/20 mt-12">
            <div className="max-w-7xl mx-auto px-8 py-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div>
                  <h1 className="text-cyan-400 text-4xl font-bold mb-6">
                    Gloro
                  </h1>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-300 text-sm">
                      <MapPin size={18} className="text-cyan-400" />
                      <p>
                        345 Faulconer Drive, Suite 4 • Charlottesville, CA,
                        12345
                      </p>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="flex items-center gap-3 text-gray-300 text-sm">
                        <Phone size={16} className="text-cyan-400" />
                        <p>(123) 456-7890</p>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300 text-sm">
                        <Printer size={16} className="text-cyan-400" />
                        <p>(123) 456-7890</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-white text-lg font-semibold mb-4">
                    Social Media
                  </h3>
                  <div className="flex gap-3">
                    {socialLinks.map((social, index) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={index}
                          href={social.href}
                          className="w-10 h-10 bg-white/5 border border-cyan-500/20 rounded-lg flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all"
                        >
                          <Icon size={18} />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="border-t border-cyan-500/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                <div className="flex gap-6">
                  <a
                    href="#"
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    ABOUT US
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    CONTACT US
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    HELP
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    PRIVACY POLICY
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    DISCLAIMER
                  </a>
                </div>
                <p className="text-gray-500">
                  Copyright © 2018 • Lift Media Inc.
                </p>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
