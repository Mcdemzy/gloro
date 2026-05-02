"use client";
import React, { useState } from "react";
import { Home, Trophy, Gamepad2, Users, Settings, Bell, Copy, AlertTriangle, Share2, Maximize2, User, LogOut, ChevronDown } from "lucide-react";

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [communitiesExpanded, setCommunitiesExpanded] = useState(false);
  
  const sidebarItems = [
    { icon: Maximize2, label: "Overview", href: "#", id: "overview", active: true },
    { icon: Trophy, label: "Tournaments", href: "#", id: "tournaments" },
    { icon: Users, label: "Communities", href: "#", id: "communities", hasDropdown: true },
    { icon: Gamepad2, label: "Configure Games ID", href: "#", id: "games" },
    { icon: Users, label: "Teams", href: "#", id: "teams" }
  ];

  const teams = [
    {
      id: "night-owls",
      name: "Night Owls",
      members: 8,
      image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=200&h=200&fit=crop"
    },
    {
      id: "dreamer-leagues",
      name: "Dreamer Leagues",
      members: 9,
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=200&h=200&fit=crop"
    },
    {
      id: "top-gunner",
      name: "Top Gunner Ash",
      members: 12,
      image: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=200&h=200&fit=crop"
    },
    {
      id: "elites-triads",
      name: "The Elites Triads",
      members: 18,
      image: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=200&h=200&fit=crop"
    }
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText("GLR-001234");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020818] via-[#0a1628] to-[#020818]">
      {/* Top Navigation */}
      <nav className="border-b border-purple-500/20 bg-[#0a1628]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="text-2xl font-bold text-cyan-400">Gloro</div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50"
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">Home</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Tournament</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Categories</a>
              
              <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                P
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Expandable Sidebar */}
        <aside 
          className={`fixed left-0 top-[73px] h-[calc(100vh-73px)] bg-[#1a1d2e] border-r border-purple-500/20 flex flex-col py-8 z-50 transition-all duration-300 ${
            sidebarExpanded ? 'w-72' : 'w-20'
          }`}
          onMouseEnter={() => setSidebarExpanded(true)}
          onMouseLeave={() => {
            setSidebarExpanded(false);
            setCommunitiesExpanded(false);
          }}
        >
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-purple-500 to-transparent"></div>
          
          {/* Collapse/Expand Button */}
          <div className="px-6 mb-6">
            <button className="w-full flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-colors">
              <span className="text-2xl">+</span>
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 px-4 space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id}>
                  <button
                    onClick={() => {
                      if (item.hasDropdown) {
                        setCommunitiesExpanded(!communitiesExpanded);
                      }
                    }}
                    className={`w-full flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-300 group ${
                      item.active
                        ? "bg-cyan-600 text-white"
                        : "bg-transparent text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon size={22} className="flex-shrink-0" />
                    {sidebarExpanded && (
                      <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
                    )}
                    {sidebarExpanded && item.hasDropdown && (
                      <ChevronDown 
                        size={16} 
                        className={`ml-auto transition-transform ${communitiesExpanded ? 'rotate-180' : ''}`}
                      />
                    )}
                  </button>
                  
                  {/* Communities Dropdown */}
                  {item.hasDropdown && communitiesExpanded && sidebarExpanded && (
                    <div className="ml-8 mt-2 space-y-1">
                      <button className="w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                        Community 1
                      </button>
                      <button className="w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                        Community 2
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Section */}
          <div className="px-4 space-y-2 border-t border-white/10 pt-4">
            {/* Go to Creator's Dashboard */}
            <button className="w-full flex items-center gap-4 px-3 py-3 rounded-xl text-cyan-400 hover:bg-cyan-500/10 transition-all duration-300">
              <Share2 size={22} className="flex-shrink-0" />
              {sidebarExpanded && (
                <span className="text-sm font-medium whitespace-nowrap">Go to creator's Dashboard</span>
              )}
            </button>

            {/* Settings */}
            <button className="w-full flex items-center gap-4 px-3 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all duration-300">
              <User size={22} className="flex-shrink-0" />
              {sidebarExpanded && (
                <span className="text-sm font-medium whitespace-nowrap">Settings</span>
              )}
            </button>

            {/* Logout */}
            <button className="w-full flex items-center gap-4 px-3 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all duration-300">
              <LogOut size={22} className="flex-shrink-0" />
              {sidebarExpanded && (
                <span className="text-sm font-medium whitespace-nowrap">Logout</span>
              )}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 p-8 transition-all duration-300 ${sidebarExpanded ? 'ml-72' : 'ml-20'}`}>
          <div className="max-w-7xl mx-auto">
            {/* Profile Header */}
            <div className="bg-[#0a1628] border border-[#455872] rounded-2xl p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-white orbitron">Raymond Thomas</h1>
                    <span className="text-gray-400">• Player_raytop635</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400">Gloro ID: GLR-001234</span>
                    <button onClick={copyToClipboard} className="text-cyan-400 hover:text-cyan-300 transition-colors">
                      <Copy size={18} />
                    </button>
                  </div>
                </div>
                
                <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 flex items-center gap-2">
                  <Share2 size={18} />
                  Switch to Creator's Dashboard
                </button>
              </div>

              {/* Profile Warning */}
              <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border-2 border-red-500/30 rounded-xl p-4 flex items-start gap-3">
                <AlertTriangle size={24} className="text-red-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-red-400 font-semibold mb-1">Profile update required</h3>
                  <p className="text-gray-300 text-sm">Profile update completion is compulsory before being able to apply for Tournaments.</p>
                </div>
                <div className="ml-auto flex-shrink-0">
                  <div className="text-right mb-2">
                    <span className="text-white font-semibold">Progress</span>
                  </div>
                  <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Joined Tournaments */}
              <div className="lg:col-span-2">
                <div className="bg-[#0a1628] border border-[#455872] rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Joined Tournaments</h2>
                  
                  <div className="flex flex-col items-center justify-center py-16">
                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
                      <div className="w-16 h-16 rounded-full border-2 border-gray-600 flex items-center justify-center">
                        <div className="w-1 h-8 bg-gray-600 rotate-45 absolute"></div>
                      </div>
                    </div>
                    <p className="text-gray-400 mb-6">You have not joined any Tournament</p>
                    <button className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50">
                      Explore Tournaments
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column - My Teams */}
              <div className="lg:col-span-1">
                <div className="bg-[#0a1628] border border-[#455872] rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">My teams</h2>
                    <button className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold transition-colors">
                      See all
                    </button>
                  </div>

                  <button className="w-full mb-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50">
                    Create New Team
                  </button>

                  <div className="space-y-4">
                    {teams.map((team) => (
                      <div
                        key={team.id}
                        className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-12 h-12 rounded-lg bg-cover bg-center"
                            style={{ backgroundImage: `url(${team.image})` }}
                          ></div>
                          <div>
                            <p className="text-white font-medium">{team.name}</p>
                            <p className="text-gray-400 text-sm">{team.members} members</p>
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-cyan-400 transition-colors">
                          <Share2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0a1628]/80 mt-16">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Logo and Contact */}
            <div>
              <div className="text-3xl font-bold text-cyan-400 mb-6">Gloro</div>
              <div className="space-y-3 text-gray-400">
                <p className="flex items-center gap-2">
                  <span>📍</span> 345 Faulconer Drive, Suite 4 • Charlottesville, CA 12345
                </p>
                <p className="flex items-center gap-2">
                  <span>📞</span> (123) 456-7890
                </p>
                <p className="flex items-center gap-2">
                  <span>🖨️</span> (123) 456-7890
                </p>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-white font-semibold mb-4">Social Media</h3>
              <div className="flex gap-4">
                {['facebook', 'twitter', 'linkedin', 'youtube', 'instagram', 'google', 'pinterest', 'rss'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-cyan-500/20 flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-all duration-300"
                  >
                    <span className="text-xs">📱</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Links */}
          <div className="flex flex-wrap justify-between items-center pt-8 border-t border-white/10">
            <div className="flex gap-8 text-sm text-gray-400">
              <a href="#" className="hover:text-cyan-400 transition-colors">ABOUT US</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">CONTACT US</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">HELP</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">PRIVACY POLICY</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">DISCLAIMER</a>
            </div>
            <p className="text-sm text-gray-400">Copyright © 2018 • UR Media Inc.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DashboardPage;