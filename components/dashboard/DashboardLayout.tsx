"use client";
import React, { useState } from "react";
import {
  Bell,
  Copy,
  Share2,
  Maximize2,
  Trophy,
  Users,
  Gamepad2,
  User,
  LogOut,
  ChevronDown,
  Search,
  MoreVertical,
} from "lucide-react";

const DashboardLayout = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [tournamentsExpanded, setTournamentsExpanded] = useState(false);
  const [communitiesExpanded, setCommunitiesExpanded] = useState(false);
  const [activeView, setActiveView] = useState("overview");
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl] = useState(
    "https://www.figma.com/design/muJXMFOHkSbpo60dbc"
  );

  const sidebarItems = [
    { icon: Maximize2, label: "Overview", href: "#", id: "overview" },
    {
      icon: Trophy,
      label: "Tournaments",
      href: "#",
      id: "tournaments",
      hasDropdown: true,
      subItems: [
        { label: "Joined competitions", href: "#", id: "joined" },
        { label: "Hosted competitions", href: "#", id: "hosted" },
        { label: "Host new competition", href: "#", id: "host-new" },
      ],
    },
    {
      icon: Users,
      label: "Communities",
      href: "#",
      id: "communities",
      hasDropdown: true,
    },
    { icon: Gamepad2, label: "Configure Games ID", href: "#", id: "games" },
    { icon: Users, label: "Teams", href: "#", id: "teams" },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText("GLR-001234");
  };

  const copyShareUrl = () => {
    navigator.clipboard.writeText(shareUrl);
  };

  // Overview Content Component
  const OverviewContent = () => {
    const joinedTournaments = [
      {
        id: 1,
        image:
          "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
        title: "FIFA Mobile FIFA MobileFIFA Mobile",
      },
      {
        id: 2,
        image:
          "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop",
        title: "FIFA Mobile FIFA MobileFIFA Mobile",
      },
      {
        id: 3,
        image:
          "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=300&fit=crop",
        title: "FIFA Mobile FIFA MobileFIFA Mobile",
      },
      {
        id: 4,
        image:
          "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=300&fit=crop",
        title: "FIFA Mobile FIFA MobileFIFA Mobile",
      },
    ];

    const teams = [
      {
        id: "night-owls",
        name: "Night Owls",
        members: 6,
        image:
          "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=200&h=200&fit=crop",
      },
      {
        id: "dreamer-leagues",
        name: "Dreamer Leagues",
        members: 9,
        image:
          "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=200&h=200&fit=crop",
      },
      {
        id: "top-gunner",
        name: "Top Gunner Ash",
        members: 12,
        image:
          "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=200&h=200&fit=crop",
      },
      {
        id: "elites-triads",
        name: "The Elites Triads",
        members: 18,
        image:
          "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=200&h=200&fit=crop",
      },
    ];

    const hostedCompetitions = [
      {
        id: 1,
        name: "Ikorodu Gamers Hangout",
        image:
          "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=200&h=200&fit=crop",
      },
      {
        id: 2,
        name: "John Cent's Gaming Competition",
        image:
          "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=200&h=200&fit=crop",
      },
      {
        id: 3,
        name: "Enugu Esport Cup",
        image:
          "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=200&h=200&fit=crop",
      },
    ];

    return (
      <>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-[#0a1628] border border-[#455872] rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Joined Tournaments
                </h2>
                <button className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold transition-colors">
                  See all
                </button>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {joinedTournaments.map((tournament) => (
                  <div key={tournament.id} className="group cursor-pointer">
                    <div
                      className="w-full h-48 rounded-xl bg-cover bg-center mb-3 border border-[#455872] group-hover:border-cyan-400/50 transition-all"
                      style={{ backgroundImage: `url(${tournament.image})` }}
                    ></div>
                    <p className="text-white text-sm font-medium mb-3 line-clamp-2">
                      {tournament.title}
                    </p>
                    <button className="w-full px-4 py-2 bg-transparent border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 rounded-lg text-sm font-semibold transition-all">
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-[#0a1628] border border-[#455872] rounded-2xl p-6 mb-8">
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
                    className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-lg bg-cover bg-center"
                        style={{ backgroundImage: `url(${team.image})` }}
                      ></div>
                      <div>
                        <p className="text-white font-medium">{team.name}</p>
                        <p className="text-gray-400 text-sm">
                          {team.members} members
                        </p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-cyan-400 transition-colors">
                      <Share2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0a1628] border border-[#455872] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Hosted Competitions
                </h2>
                <button className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold transition-colors">
                  See all
                </button>
              </div>
              <div className="space-y-4">
                {hostedCompetitions.map((comp) => (
                  <div
                    key={comp.id}
                    className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer"
                  >
                    <div
                      className="w-12 h-12 rounded-lg bg-cover bg-center flex-shrink-0"
                      style={{ backgroundImage: `url(${comp.image})` }}
                    ></div>
                    <p className="text-white text-sm font-medium">
                      {comp.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  // Teams Content Component
  const TeamsContent = () => {
    const teams = [
      {
        id: "top-gunner",
        name: "Top Gunner Ash",
        description:
          "We strike from the shadows, leave no second chance precision, power, and fire in every shot",
        currentTournaments: 2,
        members: [
          {
            id: 1,
            name: "John Abagnale",
            role: "Team Lead",
            avatar:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
          },
          {
            id: 2,
            name: "Amir Ahmad",
            role: "Team Lead Assistant",
            tags: ["Sniper"],
            avatar:
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
          },
          {
            id: 3,
            name: "Michael Klirk",
            avatar:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
          },
          {
            id: 4,
            name: "Khalifa Suzaine",
            avatar:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
          },
          {
            id: 5,
            name: "James Lukas",
            tags: ["Looter", "Logic"],
            avatar:
              "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
          },
          {
            id: 6,
            name: "Manuel",
            tags: ["Looter"],
            avatar:
              "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop",
          },
          {
            id: 7,
            name: "NoName",
            avatar:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
          },
          {
            id: 8,
            name: "Christy Sue",
            role: "Team Lead",
            avatar:
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
          },
          {
            id: 9,
            name: "John Meyer",
            role: "Team Lead",
            avatar:
              "https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop",
          },
        ],
        image:
          "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=400&h=400&fit=crop",
        memberCount: 12,
      },
    ];

    return (
      <div className="space-y-6">
        {/* Profile Warning */}
        <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border-2 border-red-500/30 rounded-xl p-4 flex items-start gap-3">
          <div className="flex-1">
            <h3 className="text-red-400 font-semibold mb-1">
              ⚠️ Profile update required
            </h3>
            <p className="text-gray-300 text-sm">
              Profile update completion is compulsory before being able to apply
              for Tournaments.
            </p>
          </div>
          <div className="flex-shrink-0">
            <div className="text-right mb-2">
              <span className="text-white font-semibold text-sm">Progress</span>
            </div>
            <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Your Teams Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Your Teams</h2>
          <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50">
            Create new team
          </button>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <div
              key={team.id}
              className="bg-[#0a1628] border border-[#455872] rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all cursor-pointer group"
            >
              <div
                className="relative h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${team.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-transparent"></div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowShareModal(true);
                    }}
                    className="p-2 bg-white/10 backdrop-blur-sm hover:bg-cyan-500/20 rounded-lg transition-all"
                  >
                    <Share2 size={18} className="text-white" />
                  </button>
                  <button className="p-2 bg-red-500/80 hover:bg-red-600 rounded-lg transition-all">
                    <span className="text-white text-sm font-bold">🗑️</span>
                  </button>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {team.name}
                </h3>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                    Currently in {team.currentTournaments} Tournaments
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-6">{team.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-white font-semibold">
                    Members({team.members.length})
                  </span>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 rounded-lg text-sm font-semibold transition-all flex items-center gap-2">
                      <span>✏️</span> Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowShareModal(true);
                      }}
                      className="px-4 py-2 bg-white/5 text-white hover:bg-white/10 rounded-lg text-sm font-semibold transition-all flex items-center gap-2"
                    >
                      <Share2 size={16} /> Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team Members Detail Section */}
        <div className="bg-[#0a1628] border border-[#455872] rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6">Members(12)</h3>
          <div className="space-y-3">
            {teams[0].members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${member.avatar})` }}
                  ></div>
                  <div>
                    <p className="text-white font-medium">{member.name}</p>
                    {member.role && (
                      <span className="inline-block px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded text-xs font-semibold mt-1">
                        {member.role}
                      </span>
                    )}
                    {member.tags &&
                      member.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="inline-block px-2 py-1 bg-white/10 text-gray-400 rounded text-xs font-medium ml-2 mt-1"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 flex items-center justify-center text-cyan-400 transition-all">
                    <Share2 size={16} />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all">
                    <span className="text-lg">−</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020818] via-[#0a1628] to-[#020818]">
      {/* Fixed Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 border-b border-purple-500/20 bg-[#0a1628]/95 backdrop-blur-md z-[60]">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-cyan-400">Gloro</div>
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-400">Player_raytop635</span>
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

      <div className="flex pt-[73px]">
        {/* Expandable Sidebar */}
        <aside
          className={`fixed left-0 top-[73px] h-[calc(100vh-73px)] bg-[#1a1d2e] border-r border-purple-500/20 flex flex-col py-8 z-50 transition-all duration-300 ${
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
              const isExpanded =
                item.id === "tournaments"
                  ? tournamentsExpanded
                  : item.id === "communities"
                  ? communitiesExpanded
                  : false;

              return (
                <div key={item.id}>
                  <button
                    onClick={() => {
                      setActiveView(item.id);
                      if (item.id === "tournaments")
                        setTournamentsExpanded(!tournamentsExpanded);
                      else if (item.id === "communities")
                        setCommunitiesExpanded(!communitiesExpanded);
                    }}
                    className={`w-full flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-300 group ${
                      activeView === item.id
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
                  </button>

                  {item.hasDropdown &&
                    isExpanded &&
                    sidebarExpanded &&
                    item.subItems && (
                      <div className="ml-8 mt-2 space-y-1">
                        {item.subItems.map((subItem, idx) => (
                          <button
                            key={idx}
                            className="w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                          >
                            {subItem.label}
                          </button>
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
            <button className="w-full flex items-center gap-4 px-3 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all duration-300">
              <User size={22} className="flex-shrink-0" />
              {sidebarExpanded && (
                <span className="text-sm font-medium whitespace-nowrap">
                  Settings
                </span>
              )}
            </button>
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

        {/* Main Content */}
        <main
          className={`flex-1 p-8 transition-all duration-300 ${
            sidebarExpanded ? "ml-72" : "ml-20"
          }`}
        >
          <div className="max-w-7xl mx-auto">
            {/* Profile Header */}
            <div className="bg-[#0a1628] border border-[#455872] rounded-2xl p-8 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-white">
                      Raymond Thomas
                    </h1>
                    <span className="text-gray-400">• Player_raytop635</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400">Gloro ID: GLR-001234</span>
                    <button
                      onClick={copyToClipboard}
                      className="text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <Copy size={18} />
                    </button>
                  </div>
                </div>
                <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 flex items-center gap-2">
                  <Share2 size={18} /> Switch to Creator's Dashboard
                </button>
              </div>
            </div>

            {/* Render Content Based on Active View */}
            {activeView === "overview" && <OverviewContent />}
            {activeView === "teams" && <TeamsContent />}
          </div>
        </main>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowShareModal(false)}
          ></div>
          <div className="relative bg-[#0a1628] border border-cyan-400/30 rounded-2xl p-8 max-w-lg w-full">
            <div className="mb-6">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white text-sm"
              />
            </div>
            <button
              onClick={copyShareUrl}
              className="w-full px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
            >
              Copy this link →
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0a1628]/80 mt-16">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="text-3xl font-bold text-cyan-400 mb-6">Gloro</div>
              <div className="space-y-3 text-gray-400">
                <p>
                  📍 345 Faulconer Drive, Suite 4 • Charlottesville, CA 12345
                </p>
                <p>📞 (123) 456-7890</p>
                <p>🖨️ (123) 456-7890</p>
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Social Media</h3>
              <div className="flex gap-4">
                {[
                  "facebook",
                  "twitter",
                  "linkedin",
                  "youtube",
                  "instagram",
                  "google",
                  "pinterest",
                  "rss",
                ].map((social) => (
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
          <div className="flex flex-wrap justify-between items-center pt-8 border-t border-white/10">
            <div className="flex gap-8 text-sm text-gray-400">
              <a href="#" className="hover:text-cyan-400 transition-colors">
                ABOUT US
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors">
                CONTACT US
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors">
                HELP
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors">
                PRIVACY POLICY
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors">
                DISCLAIMER
              </a>
            </div>
            <p className="text-sm text-gray-400">
              Copyright © 2018 • UR Media Inc.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;
