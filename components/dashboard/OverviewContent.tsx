"use client";
import React, { useState } from "react";
import { Share2 } from "lucide-react";
import Link from "next/link";

const OverviewContent = () => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl] = useState(
    "https://www.figma.com/design/muJXMFOHkSbpo60dbc"
  );

  const copyShareUrl = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("Link copied to clipboard!");
  };

  const joinedTournaments = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
      title: "FIFA Mobile Tournament",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop",
      title: "Dream League Championship",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=300&fit=crop",
      title: "Call of Duty Mobile Cup",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=300&fit=crop",
      title: "Free Fire Battle Royale",
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
              <h2 className="text-2xl font-bold text-white orbitron">
                Joined Tournaments
              </h2>
              <button className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold transition-colors orbitron">
                See all
              </button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {joinedTournaments.map((tournament) => (
                <div key={tournament.id} className="group cursor-pointer bg-[#65656533] p-4 border border-[#455872] rounded-sm">
                  <div
                    className="w-full h-48 rounded-xl bg-cover bg-center mb-3 border border-[#455872] group-hover:border-cyan-400/50 transition-all"
                    style={{ backgroundImage: `url(${tournament.image})` }}
                  ></div>
                  <p className="text-white text-sm font-medium mb-3 line-clamp-2 orbitron">
                    {tournament.title}
                  </p>
                  <button className="w-full px-4 py-2 border border-[#71D4F7  ] text-cyan-400 hover:bg-cyan-400/10 rounded-xs text-sm font-semibold transition-all bg-[#030D0F]">
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-[#151026] border border-[#5D5264] rounded-2xl p-6 mb-8">
            <button className="w-full mb-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50">
              <Link
                href="/dashboard/teams/create"
                
              >
                Create new team
              </Link>{" "}
            </button>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white orbitron">My teams</h2>
              <button className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold transition-colors orbitron">
                See all
              </button>
            </div>
            
            <div className="space-y-4">
              {teams.map((team) => (
                <div
                  key={team.id}
                  className="flex items-center justify-between p-4 border-b border-[#656565]  hover:bg-white/10 transition-all duration-300"
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
                  <button
                    onClick={() => setShowShareModal(true)}
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    <Share2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#151026] border border-[#455872] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white orbitron">
                Hosted Competitions
              </h2>
              <button className="orbitron text-cyan-400 hover:text-cyan-300 text-sm font-semibold transition-colors">
                See all
              </button>
            </div>
            <div className="space-y-4">
              {hostedCompetitions.map((comp) => (
                <div
                  key={comp.id}
                  className="flex items-center gap-3 p-3 border-b border-[#656565] hover:bg-white/10 transition-all duration-300 cursor-pointer"
                >
                  <div
                    className="w-12 h-12 rounded-lg bg-cover bg-center flex-shrink-0"
                    style={{ backgroundImage: `url(${comp.image})` }}
                  ></div>
                  <p className="text-white text-sm font-medium">{comp.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
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
    </>
  );
};

export default OverviewContent;
