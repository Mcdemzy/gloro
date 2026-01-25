"use client";
import { useState } from "react";
import { ChevronLeft, Send, Paperclip, Smile, ArrowLeft } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

interface Message {
  id: number;
  text: string;
  sender: "support" | "user";
  timestamp: string;
  avatar: string;
}

export default function ViewTicketPage() {
  const [message, setMessage] = useState("");
  const router = useRouter();
  const params = useParams();
  const ticketId = params.ticketId as string;

  const messages: Message[] = [
    {
      id: 1,
      text: "I am so down for this and please let's get this done as soon as possible and I am not sure if i able to cover for everything we have not able to do for so long",
      sender: "support",
      timestamp: "12/03/2025 | 02:35",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
    {
      id: 2,
      text: "okay i will be fine, dont worrry for now",
      sender: "user",
      timestamp: "12/03/2025 | 02:37",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    },
    {
      id: 3,
      text: "I am so down for this and please let's get this done as soon as possible and ❤️❤️❤️",
      sender: "support",
      timestamp: "12/03/2025 | 02:35",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
    {
      id: 4,
      text: "okay i will be fine, dont worrry for now",
      sender: "user",
      timestamp: "12/03/2025 | 02:35",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    },
    {
      id: 5,
      text: "Let's talk later",
      sender: "user",
      timestamp: "12/03/2025 | 02:35",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    },
  ];

  const handleSend = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      // In a real app, you would send this to your backend
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Navigation */}
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/communities/tickets"
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-semibold">Back to Tickets</span>
        </Link>
      </div>

      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white mb-6">
          TICKET #{ticketId} | PUBG | FIFA GLOBAL CUP COLOSSAL GAMES
        </h1>
      </div>

      {/* Back Button & Tournament Name */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => router.push("/dashboard/communities/tickets")}
          className="flex items-center gap-2 text-white hover:text-cyan-400 transition-colors"
        >
          <ChevronLeft size={20} />
          <span className="font-semibold">
            PUBG | FIFA GLOBAL CUP COLOSSAL GAMES
          </span>
        </button>
        <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all text-sm">
          View Channel
        </button>
      </div>

      {/* Chat Container */}
      <div className="bg-[#1a1d2e] border border-[#455872] rounded-2xl overflow-hidden">
        {/* Chat Header */}
        <div className="bg-[#0a1628] border-b border-[#455872] p-5 flex items-center gap-3">
          <button
            onClick={() => router.push("/dashboard/communities/tickets")}
            className="text-white hover:text-cyan-400 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <div
            className="w-12 h-12 rounded-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100&h=100&fit=crop)",
            }}
          ></div>
          <div className="flex-1">
            <h3 className="text-white font-semibold">
              PUBG | FIFA GLOBAL CUP COLOSSAL GAMES
            </h3>
            <p className="text-gray-400 text-sm">Support Ticket #{ticketId}</p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold">
              Open
            </span>
          </div>
        </div>

        {/* Messages Area */}
        <div className="p-6 space-y-6 max-h-[600px] overflow-y-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${
                msg.sender === "user" ? "flex-row-reverse" : ""
              }`}
            >
              {/* Avatar */}
              {msg.sender === "support" && (
                <div
                  className="w-10 h-10 rounded-full bg-cover bg-center flex-shrink-0"
                  style={{ backgroundImage: `url(${msg.avatar})` }}
                ></div>
              )}

              {/* Message Bubble */}
              <div
                className={`max-w-[70%] ${
                  msg.sender === "user" ? "items-end" : ""
                }`}
              >
                <div
                  className={`rounded-2xl p-4 ${
                    msg.sender === "user"
                      ? "bg-[#2d3548] text-white"
                      : "bg-[#0d1117] text-gray-300"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {msg.text}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-1 px-2">
                  <span className="text-xs text-gray-500">{msg.timestamp}</span>
                  <span className="text-xs text-gray-500">
                    {msg.sender === "support" ? "Support Agent" : "You"}
                  </span>
                </div>
              </div>

              {/* User Avatar */}
              {msg.sender === "user" && (
                <div
                  className="w-10 h-10 rounded-full bg-cover bg-center flex-shrink-0"
                  style={{ backgroundImage: `url(${msg.avatar})` }}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="bg-[#0a1628] border-t border-[#455872] p-5">
          <div className="flex items-center gap-3">
            <button className="text-gray-400 hover:text-cyan-400 transition-colors">
              <Paperclip size={22} />
            </button>
            <button className="text-gray-400 hover:text-cyan-400 transition-colors">
              <Smile size={22} />
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type Message here"
              className="flex-1 px-4 py-3 bg-[#1a1d2e] border border-[#455872] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
            <button
              onClick={handleSend}
              disabled={!message.trim()}
              className="p-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg transition-all"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
