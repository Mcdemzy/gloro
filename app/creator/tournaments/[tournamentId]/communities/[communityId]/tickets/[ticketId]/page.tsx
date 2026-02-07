"use client";
import { useState } from "react";
import { ArrowLeft, Send, X } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

export default function TicketDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { tournamentId, communityId, ticketId } = params;
  const [message, setMessage] = useState("");

  const tournamentInfo = {
    title: "FIFA GLOBAL CUP COLOSSAL GAMES",
    date: "2nd December, 2025 - 28 December, 2025",
  };

  const ticketMessages = [
    {
      id: 1,
      author: "Michael James",
      isUser: false,
      text: "I am so down for this and please let's get this done as soon as possible and i am not sure if i able to cover for everything we have not able to do for so long",
      timestamp: "10/03/2025 | 02:35",
      hasAttachment: true,
    },
    {
      id: 2,
      author: "You",
      isUser: true,
      text: "okay i will be fine, dont worrry for now",
      timestamp: "12/03/2025 | 02:37",
      hasAttachment: true,
    },
    {
      id: 3,
      author: "Michael James",
      isUser: false,
      text: "I am so down for this and please let's get this done as soon as possible and 😍😍😍",
      timestamp: "12/03/2025 | 02:38",
    },
    {
      id: 4,
      author: "You",
      isUser: true,
      text: "okay i will be fine, dont worrry for now",
      timestamp: "12/03/2025 | 02:35",
      hasAttachment: true,
    },
    {
      id: 5,
      author: "You",
      isUser: true,
      text: "Let's talk later",
      timestamp: "12/03/2025 | 02:35",
      hasAttachment: true,
    },
  ];

  const handleBack = () => {
    router.push(`/creator/tournaments/${tournamentId}/communities`);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1f2e] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white uppercase tracking-wider mb-2 orbitron">
            {tournamentInfo.title} | Communities
          </h1>
          <p className="text-gray-400 text-sm">{tournamentInfo.date}</p>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-3 text-gray-400 mb-6">
          <button
            onClick={handleBack}
            className="hover:text-cyan-400 transition-colors"
          >
            Communities
          </button>
          <span>•</span>
          <span className="text-white">PUBG Ticket</span>
        </div>

        {/* Chat Container */}
        <div className="bg-gradient-to-br from-[#0c3540]/60 to-[#0a2d36]/60 backdrop-blur-md border border-cyan-500/20 rounded-2xl overflow-hidden">
          {/* Chat Header */}
          <div className="bg-[#0a2d36]/80 border-b border-cyan-500/20 p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBack}
                className="text-white hover:text-cyan-400 transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
              <div
                className="w-12 h-12 rounded-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop)",
                }}
              ></div>
              <div>
                <h3 className="text-white font-semibold">Michael James</h3>
              </div>
            </div>

            <button className="px-6 py-2 bg-cyan-500/20 hover:bg-red-500/20 border border-cyan-400/50 hover:border-red-400/50 text-cyan-400 hover:text-red-400 rounded-lg font-semibold transition-all flex items-center gap-2">
              <X size={18} />
              Close ticket
            </button>
          </div>

          {/* Messages */}
          <div className="p-6 space-y-4 max-h-[600px] overflow-y-auto bg-[#0a2d36]/40">
            {ticketMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-md ${msg.isUser ? "" : "flex gap-3"}`}>
                  {!msg.isUser && (
                    <div
                      className="w-10 h-10 rounded-full bg-cover bg-center flex-shrink-0"
                      style={{
                        backgroundImage:
                          "url(https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop)",
                      }}
                    ></div>
                  )}

                  <div className="flex flex-col">
                    <div
                      className={`rounded-2xl p-4 ${
                        msg.isUser
                          ? "bg-cyan-500/20 border border-cyan-400/30 rounded-br-none"
                          : "bg-[#0c3540]/60 border border-cyan-500/20 rounded-tl-none"
                      }`}
                    >
                      <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">
                        {msg.text}
                      </p>
                      {msg.hasAttachment && (
                        <div className="mt-2 pt-2 border-t border-white/10">
                          <span className="text-xs text-cyan-400">
                            📎 Attachment
                          </span>
                        </div>
                      )}
                    </div>
                    <span
                      className={`text-xs text-gray-500 mt-1 ${msg.isUser ? "text-right" : "ml-2"}`}
                    >
                      {msg.timestamp}
                    </span>
                    {msg.hasAttachment && msg.isUser && (
                      <span className="text-xs text-cyan-400 mt-1 text-right">
                        📎
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="bg-[#0a2d36]/80 border-t border-cyan-500/20 p-5">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type Message here"
                className="flex-1 px-4 py-3 bg-[#0c3540] border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
              <button
                onClick={handleSendMessage}
                className="p-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-all"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
