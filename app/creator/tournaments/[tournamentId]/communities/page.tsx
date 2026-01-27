"use client";
import { useState } from "react";
import { ArrowLeft, Send, MessageSquare, Ticket } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

interface Community {
  id: number;
  game: string;
  name: string;
  members: number;
  avatar: string;
}

export default function CommunitiesManagement() {
  const router = useRouter();
  const params = useParams();
  const tournamentId = params.tournamentId as string;

  const [currentView, setCurrentView] = useState<
    "main" | "channel" | "tickets"
  >("main");
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(
    null,
  );
  const [message, setMessage] = useState("");

  const tournamentInfo = {
    title: "FIFA GLOBAL CUP COLOSSAL GAMES",
    date: "2nd December, 2025 - 28 December, 2025",
  };

  const communities: Community[] = [
    {
      id: 1,
      game: "PUBG",
      name: "FIFA GLOBAL CUP COLOSSAL GAMES",
      members: 4,
      avatar:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100&h=100&fit=crop",
    },
    {
      id: 2,
      game: "CODM",
      name: "FIFA GLOBAL CUP COLOSSAL GAMES",
      members: 12,
      avatar:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=100&h=100&fit=crop",
    },
    {
      id: 3,
      game: "Free Fire",
      name: "FIFA GLOBAL CUP COLOSSAL GAMES",
      members: 16,
      avatar:
        "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=100&h=100&fit=crop",
    },
    {
      id: 4,
      game: "E Football",
      name: "FIFA GLOBAL CUP COLOSSAL GAMES",
      members: 18,
      avatar:
        "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=100&h=100&fit=crop",
    },
  ];

  const channelMessages = [
    {
      id: 1,
      author: "Michael Joseph",
      role: "Admin",
      text: "I am so down for this and please let's get this done as soon as possible and I am not sure if i able to cover for everything we have not able to do for so long\nokay i will be fine, dont worrry for now",
      timestamp: "12/03/2025 | 02:37",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
    {
      id: 2,
      author: "Michael Joseph",
      role: "Admin",
      text: "okay i will be fine, dont worrry for now",
      timestamp: "13m ago",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
    {
      id: 3,
      author: "Michael Joseph",
      role: "Admin",
      text: "Announcement!\nNew Tournament Next week guys! 🔥\n\nThis is much better than last one, let's all be active this time. ✅✅✅",
      timestamp: "Just now",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
  ];

  const tickets = [
    {
      id: 1,
      author: "Michael James",
      preview:
        "I am so down for this and please let's get this done as soon as possible and i am not...",
      unread: 1,
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
    {
      id: 2,
      author: "Kirk James",
      preview:
        "I am so down for this and please let's get this done as soon as possible and i am not sure i...",
      unread: 0,
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
    {
      id: 3,
      author: "GunnaL",
      preview: "Yes, we talk later",
      unread: 3,
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    {
      id: 4,
      author: "Stone Liam",
      preview:
        "I am so down for this and please let's get this done as soon as possible and i am not sure i...",
      unread: 0,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    {
      id: 5,
      author: "Rebecca Silly",
      preview:
        "I am so down for this and please let's get this done as soon as possible and i am not sure i...",
      unread: 0,
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
  ];

  const handleBackToTournament = () => {
    router.push(`/creator/tournaments/${tournamentId}`);
  };

  const handleViewTicketDetails = (ticketId: number) => {
    if (!selectedCommunity) return; // Add null check
    router.push(
      `/creator/tournaments/${tournamentId}/communities/${selectedCommunity.id}/tickets/${ticketId}`,
    );
  };

  // Main Communities View
  if (currentView === "main") {
    return (
      <div className="min-h-screen bg-[#0a1f2e] p-8">
        <div className="space-y-6 max-w-6xl mx-auto">
          {/* Tournament Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white uppercase tracking-wider mb-2">
              {tournamentInfo.title} | Communities
            </h1>
            <p className="text-gray-400">{tournamentInfo.date}</p>
          </div>

          {/* Back Navigation */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={handleBackToTournament}
              className="text-white hover:text-cyan-400 transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <h2 className="text-xl font-semibold text-white">Communities</h2>
          </div>

          {/* Communities Grid */}
          <div className="grid grid-cols-1 gap-6">
            {communities.map((community) => (
              <div
                key={community.id}
                className="bg-gradient-to-br from-[#0c3540]/60 to-[#0a2d36]/60 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-16 h-16 rounded-lg bg-cover bg-center"
                      style={{ backgroundImage: `url(${community.avatar})` }}
                    ></div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">
                        {community.game} | {community.name}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Members:{" "}
                        <span className="text-cyan-400 font-semibold">
                          {community.members}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setSelectedCommunity(community);
                      setCurrentView("tickets");
                    }}
                    className="flex-1 px-6 py-3 bg-transparent border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <Ticket size={20} />
                    Ticket
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCommunity(community);
                      setCurrentView("channel");
                    }}
                    className="flex-1 px-6 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-400 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <MessageSquare size={20} />
                    Channel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Channel View
  if (currentView === "channel") {
    return (
      <div className="min-h-screen bg-[#0a1f2e] p-8">
        <div className="space-y-6 max-w-6xl mx-auto">
          {/* Tournament Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white uppercase tracking-wider mb-2">
              {tournamentInfo.title} | Communities
            </h1>
            <p className="text-gray-400">{tournamentInfo.date}</p>
          </div>

          {/* Back Navigation */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setCurrentView("main")}
              className="text-white hover:text-cyan-400 transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <h2 className="text-xl font-semibold text-white">
              Communities · {selectedCommunity?.game} |{" "}
              {selectedCommunity?.name}
            </h2>
          </div>

          {/* Channel Chat */}
          <div className="bg-gradient-to-br from-[#0c3540]/60 to-[#0a2d36]/60 backdrop-blur-md border border-cyan-500/20 rounded-2xl overflow-hidden">
            {/* Chat Header */}
            <div className="bg-[#0a2d36]/80 border-b border-cyan-500/20 p-5 flex items-center gap-3">
              <button
                onClick={() => setCurrentView("main")}
                className="text-white hover:text-cyan-400 transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
              <div
                className="w-12 h-12 rounded-full bg-cover bg-center"
                style={{ backgroundImage: `url(${selectedCommunity?.avatar})` }}
              ></div>
              <div>
                <h3 className="text-white font-semibold">
                  {selectedCommunity?.game} | {selectedCommunity?.name}
                </h3>
              </div>
            </div>

            {/* Messages */}
            <div className="p-6 space-y-6 max-h-[600px] overflow-y-auto bg-[#]/40 mb-20 float-right max-w-120">
              {channelMessages.map((msg) => (
                <div key={msg.id} className="flex gap-3">
                  <div
                    className="w-10 h-10 rounded-full bg-cover bg-center flex-shrink-0"
                    style={{ backgroundImage: `url(${msg.avatar})` }}
                  ></div>

                  <div className="flex-1">
                    <div className="bg-[#0c3540]/60 rounded-2xl rounded-tl-none p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-cyan-400 font-semibold text-sm">
                          {msg.author}
                        </span>
                        <span className="text-xs text-gray-500">
                          • {msg.role}
                        </span>
                      </div>
                      <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">
                        {msg.text}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 mt-1 ml-2">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="bg-[#0a2d36]/80 border-t border-cyan-500/20 p-5 absolute bottom-0 w-full">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type Message here"
                  className="flex-1 px-4 py-3 bg-[#0c3540] border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
                <button className="p-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-all">
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tickets View
  if (currentView === "tickets") {
    return (
      <div className="min-h-screen bg-[#0a1f2e] p-8">
        <div className="space-y-6 max-w-6xl mx-auto">
          {/* Tournament Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white uppercase tracking-wider mb-2">
              {tournamentInfo.title} | Communities
            </h1>
            <p className="text-gray-400">{tournamentInfo.date}</p>
          </div>

          {/* Back Navigation */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setCurrentView("main")}
              className="text-white hover:text-cyan-400 transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <h2 className="text-xl font-semibold text-white">
              Communities · {selectedCommunity?.game} Ticket
            </h2>
          </div>

          {/* Tickets List */}
          <div className="bg-gradient-to-br from-[#0c3540]/60 to-[#0a2d36]/60 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-6">
            <div className="space-y-3">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  onClick={() => handleViewTicketDetails(ticket.id)}
                  className="flex items-center justify-between p-4 bg-[#0a2d36]/60 border border-cyan-500/20 rounded-xl hover:border-cyan-400/40 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div
                      className="w-12 h-12 rounded-full bg-cover bg-center flex-shrink-0"
                      style={{ backgroundImage: `url(${ticket.avatar})` }}
                    ></div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold mb-1">
                        {ticket.author}
                      </h3>
                      <p className="text-gray-400 text-sm truncate">
                        {ticket.preview}
                      </p>
                    </div>

                    {ticket.unread > 0 && (
                      <div className="w-6 h-6 rounded-full bg-cyan-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                        {ticket.unread}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
