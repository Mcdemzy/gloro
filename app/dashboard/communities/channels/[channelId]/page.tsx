"use client";
import { useState } from "react";
import {
  ChevronLeft,
  Send,
  ArrowRight,
  Ticket,
  ArrowLeft,
  MessageSquare,
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

interface Message {
  id: number;
  text: string;
  sender: "admin" | "user";
  timestamp: string;
  avatar: string;
}

export default function ViewJoinedChannelPage() {
  const [message, setMessage] = useState("");
  const router = useRouter();
  const params = useParams();
  const channelId = params.channelId as string;

  const messages: Message[] = [
    {
      id: 1,
      text: "I am so down for this and please let's get this done as soon as possible and I am not sure if i able to cover for everything we have not able to do for so long",
      sender: "admin",
      timestamp: "12/03/2025 | 02:35",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
    {
      id: 2,
      text: "I am so down for this and please let's get this done as soon as possible and I am not sure if i able to cover for everything we have not able to do for so longl am so down for this and please let's get this done as soon as possible and i am not sure if i able to cover for everything we have not able to do for so long",
      sender: "admin",
      timestamp: "12/03/2025 | 02:35",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
    {
      id: 3,
      text: "I am so down for this and please let's get this done as soon as possible and i am not sure if i able to cover for everything we have not able to do for so long",
      sender: "admin",
      timestamp: "12/03/2025 | 02:35",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
  ];

  const channelInfo = {
    name: "PUBG | FIFA GLOBAL CUP COLOSSAL GAMES",
    members: 84,
    description: "Official tournament channel for PUBG FIFA Global Cup",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100&h=100&fit=crop",
  };

  const handleCreateTicket = () => {
    // Navigate to create ticket page or open modal
    router.push(`/dashboard/communities/tickets`);
  };

  const handleBack = () => {
    router.push("/dashboard/communities/channels");
  };

  return (
    <div className="space-y-6">
      {/* Back Navigation */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-semibold">Back to Channels</span>
        </button>
      </div>

      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white mb-2">
          {channelInfo.name}
        </h1>
        <p className="text-gray-400">Tournament Channel</p>
      </div>

      {/* Back Button & Actions */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-white hover:text-cyan-400 transition-colors"
        >
          <ChevronLeft size={20} />
          <span className="font-semibold">{channelInfo.name}</span>
        </button>

        <div className="flex gap-3">
          <Link
            href={`/dashboard/communities/tickets`}
            className="px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg font-medium transition-all text-sm flex items-center gap-2"
          >
            <Ticket size={16} />
            View Tickets
          </Link>
          <button
            onClick={handleCreateTicket}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all text-sm flex items-center gap-2"
          >
            <MessageSquare size={16} />
            Create Ticket
          </button>
        </div>
      </div>

      {/* Channel Info Card */}
      <div className="bg-[#1a1d2e] border border-[#455872] rounded-xl p-5">
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-lg bg-cover bg-center flex-shrink-0"
            style={{ backgroundImage: `url(${channelInfo.image})` }}
          ></div>
          <div>
            <h3 className="text-white font-semibold text-lg mb-1">
              {channelInfo.name}
            </h3>
            <p className="text-gray-400 text-sm mb-2">
              {channelInfo.description}
            </p>
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm">
                {channelInfo.members} Members
              </span>
              <span className="text-gray-400 text-sm">•</span>
              <span className="text-green-400 text-sm">
                Admin announcements only
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="bg-[#2d3548] border border-[#455872] rounded-2xl overflow-hidden">
        {/* Chat Header */}
        <div className="bg-[#1a1d2e] border-b border-[#455872] p-5 flex items-center gap-3">
          <button
            onClick={handleBack}
            className="text-white hover:text-cyan-400 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <div
            className="w-12 h-12 rounded-full bg-cover bg-center"
            style={{ backgroundImage: `url(${channelInfo.image})` }}
          ></div>
          <div className="flex-1">
            <h3 className="text-white font-semibold">{channelInfo.name}</h3>
            <p className="text-gray-400 text-sm">
              Tournament Channel • Read Only
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold">
              {channelInfo.members} online
            </span>
          </div>
        </div>

        {/* Messages Area - Read Only */}
        <div className="p-6 space-y-6 max-h-[500px] overflow-y-auto bg-[#2d3548]">
          <div className="text-center mb-4">
            <p className="text-gray-400 text-sm">
              Welcome to the channel! This is a read-only announcement channel.
            </p>
          </div>

          {messages.map((msg) => (
            <div key={msg.id} className="flex gap-3">
              {/* Admin Badge */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div
                    className="w-10 h-10 rounded-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${msg.avatar})` }}
                  ></div>
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-600 rounded-full text-white text-xs flex items-center justify-center">
                    A
                  </span>
                </div>
              </div>

              {/* Message Bubble */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-semibold text-sm">
                    Admin
                  </span>
                  <span className="text-gray-500 text-xs">•</span>
                  <span className="text-gray-500 text-xs">{msg.timestamp}</span>
                </div>
                <div className="bg-[#3d4556] rounded-2xl p-4">
                  <p className="text-gray-200 text-sm leading-relaxed">
                    {msg.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Notice */}
        <div className="bg-[#1a1d2e] border-t border-[#455872] p-5">
          <div className="flex items-center justify-between">
            <p className="text-gray-400 text-sm">
              This is a read-only channel. To contact admins, create a support
              ticket.
            </p>
            <button
              onClick={handleCreateTicket}
              className="px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg font-medium transition-all text-sm flex items-center gap-2 border border-cyan-400/30"
            >
              <ArrowRight size={16} />
              Create Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
