"use client";
import { useState } from "react";
import {
  ChevronLeft,
  Download,
  Calendar,
  Users,
  MapPin,
  Trophy,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";

export default function ViewJoinedTournamentPage() {
  const [selectedImage, setSelectedImage] = useState(0);

  const images = [
    "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop",
  ];

  const registeredTeams = [
    {
      id: 1,
      name: "Night Owls",
      members: 8,
      avatar:
        "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=100&h=100&fit=crop",
    },
    {
      id: 2,
      name: "Dreamer Leagues",
      members: 6,
      avatar:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=100&h=100&fit=crop",
    },
    {
      id: 3,
      name: "Top Gunner Ash",
      members: 12,
      avatar:
        "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=100&h=100&fit=crop",
    },
    {
      id: 4,
      name: "The Elites Triads",
      members: 10,
      avatar:
        "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=100&h=100&fit=crop",
    },
  ];

  const schedules = [
    { date: "Apr 10th - Apr 31st", stage: "Qualifiers", active: true },
    { date: "May 3rd - May 6th", stage: "Group Stage", active: false },
    { date: "May 16th - May 21st", stage: "Semi Final", active: false },
    { date: "June 1st - June 2nd", stage: "Grand Final", active: false },
  ];

  const rules = [
    { game: "PUBG" },
    { game: "CODM" },
    { game: "Free Fire" },
    { game: "Asphalt" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020818] via-[#0a1628] to-[#020818] p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Profile Warning */}
        <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border-2 border-red-500/30 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle
            size={24}
            className="text-red-400 mt-1 flex-shrink-0"
          />
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

        {/* Back Button & Title */}
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
            <ChevronLeft size={20} />
            PUBG | FIFA GLOBAL CUP COLOSSAL GAMES
          </button>
          <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-all">
            View Channel
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Tournament Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-[#0a1628] border border-[#455872] rounded-2xl p-6">
              {/* Main Image */}
              <div className="mb-4 rounded-2xl overflow-hidden border border-[#455872] h-96">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${images[selectedImage]})` }}
                ></div>
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-4">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`rounded-xl overflow-hidden border-2 transition-all duration-300 h-24 ${
                      selectedImage === index
                        ? "border-cyan-400 shadow-lg shadow-cyan-500/30"
                        : "border-[#455872] hover:border-cyan-400/50"
                    }`}
                  >
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${img})` }}
                    ></div>
                  </button>
                ))}
              </div>
            </div>

            {/* Tournament Info */}
            <div className="bg-[#0a1628] border border-[#455872] rounded-2xl p-6">
              <h1 className="text-3xl font-bold text-white mb-6">
                PUBG | FIFA GLOBAL CUP COLOSSAL GAMES
              </h1>

              <p className="text-gray-400 leading-relaxed mb-6">
                An electrifying crossover event bringing together elite players
                from two gaming giants — PUBG and FIFA. Colossal Games showcases
                tactical battleground survival and world-class football
                competition in one global arena, merging intense action,
                strategy, and e-sports glory on an international stage.
              </p>

              {/* Schedules */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white mb-4">Schedules</h2>
                <div className="space-y-3">
                  {schedules.map((schedule, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                        schedule.active
                          ? "bg-purple-500/20 border border-purple-500/50"
                          : "bg-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <ChevronRight size={20} className="text-purple-400" />
                        <div>
                          <p className="text-white font-medium">
                            {schedule.date}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {schedule.stage}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Registration Deadline */}
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 text-center">
                <p className="text-purple-400 font-semibold">
                  Registration close on 17th December, 2025 | 11:00PM
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Teams & Rules */}
          <div className="space-y-6">
            {/* Teams Registered */}
            <div className="bg-[#0a1628] border border-[#455872] rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">
                Teams registered
              </h2>
              <div className="space-y-3">
                {registeredTeams.map((team) => (
                  <div
                    key={team.id}
                    className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer"
                  >
                    <div
                      className="w-12 h-12 rounded-lg bg-cover bg-center flex-shrink-0"
                      style={{ backgroundImage: `url(${team.avatar})` }}
                    ></div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{team.name}</p>
                      <p className="text-gray-400 text-sm">
                        {team.members} members
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rules */}
            <div className="bg-[#0a1628] border border-[#455872] rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Rules</h2>
              <div className="space-y-3">
                {rules.map((rule, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all group cursor-pointer"
                  >
                    <span className="text-white font-medium">{rule.game}</span>
                    <button className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
                      <Download size={18} />
                      <span className="text-sm">Download file</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
