"use client";
import { useState } from "react";
import {
  AlertTriangle,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Ticket {
  id: number;
  title: string;
  preview: string;
  status: "open" | "pending" | "resolved";
  unread: number;
  tournament: string;
  avatar: string;
  timestamp: string;
}

export default function TicketsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    priority: "",
    description: "",
  });
  const router = useRouter();

  const tickets: Ticket[] = [
    {
      id: 1,
      title: "PUGB | FIFA GLOBAL CUP COLOSSAL GAMES",
      preview:
        "I am so down for this and please let's get this done as soon as possible and I am not...",
      status: "open",
      unread: 1,
      tournament: "PUGB | FIFA GLOBAL CUP COLOSSAL GAMES",
      avatar:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100&h=100&fit=crop",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      title: "PUGB | FIFA GLOBAL CUP COLOSSAL GAMES",
      preview:
        "I am so down for this and please let's get this done as soon as possible and I am not sure I...",
      status: "pending",
      unread: 0,
      tournament: "PUGB | FIFA GLOBAL CUP COLOSSAL GAMES",
      avatar:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=100&h=100&fit=crop",
      timestamp: "5 hours ago",
    },
    {
      id: 3,
      title: "PUGB | FIFA GLOBAL CUP COLOSSAL GAMES",
      preview: "Yes, we talk later",
      status: "resolved",
      unread: 3,
      tournament: "PUGB | FIFA GLOBAL CUP COLOSSAL GAMES",
      avatar:
        "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=100&h=100&fit=crop",
      timestamp: "1 day ago",
    },
  ];

  const categories = [
    "Technical Issue",
    "Payment Problem",
    "Account Issue",
    "Tournament Query",
    "General Support",
  ];
  const priorities = ["Low", "Medium", "High", "Urgent"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "resolved":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      default:
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <Clock size={16} />;
      case "pending":
        return <MessageSquare size={16} />;
      case "resolved":
        return <CheckCircle size={16} />;
      default:
        return <MessageSquare size={16} />;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating ticket:", formData);
    setShowCreateModal(false);
    setFormData({ title: "", category: "", priority: "", description: "" });
  };

  const handleViewTicket = (ticketId: number) => {
    router.push(`/dashboard/communities/tickets/${ticketId}`);
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-white mb-2">TICKETS</h1>

      {/* Profile Warning */}
      <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border-2 border-red-500/30 rounded-xl p-4 flex items-start gap-3">
        <AlertTriangle size={24} className="text-red-400 mt-1 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="text-red-400 font-semibold mb-1">
            Profile update required
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

      {/* Create Ticket Button */}
      <div className="flex justify-between items-center">
        <p className="text-gray-400 text-sm">
          Need help? Create a support ticket and our team will assist you.
        </p>
        {/* <button
          onClick={() => setShowCreateModal(true)}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-all flex items-center gap-2"
        >
          <Plus size={20} />
          Create Ticket
        </button> */}
      </div>

      {/* Tickets List */}
      <div className="bg-[#0a1628] border border-[#455872] rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">
          Your Support Tickets
        </h2>

        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              onClick={() => handleViewTicket(ticket.id)}
              className="bg-[#1a1d2e] border border-[#455872] rounded-xl p-5 hover:border-cyan-400/50 transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div
                  className="w-16 h-16 rounded-lg bg-cover bg-center flex-shrink-0"
                  style={{ backgroundImage: `url(${ticket.avatar})` }}
                ></div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-white font-semibold text-lg">
                      {ticket.title}
                    </h3>
                    <div className="flex items-center gap-3">
                      {ticket.unread > 0 && (
                        <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center">
                          {ticket.unread}
                        </span>
                      )}
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border ${getStatusColor(
                          ticket.status
                        )}`}
                      >
                        {getStatusIcon(ticket.status)}
                        {ticket.status.charAt(0).toUpperCase() +
                          ticket.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm mb-2 line-clamp-1">
                    {ticket.preview}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-xs">
                      {ticket.timestamp}
                    </span>
                    <Link
                      href={`/dashboard/communities/tickets/${ticket.id}`}
                      className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {tickets.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare size={48} className="mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400 text-lg mb-2">No tickets yet</p>
            <p className="text-gray-500 text-sm">
              Create your first support ticket to get help from our team
            </p>
          </div>
        )}
      </div>

      {/* Create Ticket Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowCreateModal(false)}
          ></div>

          <div className="relative bg-[#0a1628] border border-cyan-400/30 rounded-2xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">
                Create Support Ticket
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <XCircle size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Title */}
              <div>
                <label className="text-white font-medium mb-2 block">
                  Ticket Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Brief description of your issue"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              {/* Category */}
              <div>
                <label className="text-white font-medium mb-2 block">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="bg-[#0a1628]">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Priority */}
              <div>
                <label className="text-white font-medium mb-2 block">
                  Priority
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {priorities.map((priority) => (
                    <button
                      key={priority}
                      type="button"
                      onClick={() => setFormData({ ...formData, priority })}
                      className={`py-3 rounded-lg font-medium transition-all ${
                        formData.priority === priority
                          ? "bg-cyan-500 text-white"
                          : "bg-white/5 text-gray-400 hover:bg-white/10"
                      }`}
                    >
                      {priority}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-white font-medium mb-2 block">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Provide detailed information about your issue..."
                  rows={6}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-purple-500/50"
              >
                Submit Ticket
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
