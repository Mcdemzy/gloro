import React from "react";
import { AlertTriangle, ChevronRight } from "lucide-react";

const JoinedChannelsPage = () => {
  const communities = [
    {
      id: 1,
      name: "PUBG | FIFA GLOBAL CUP COLOSSAL GAMES",
      members: 84,
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=200&fit=crop",
    },
    {
      id: 2,
      name: "PUBG | FIFA GLOBAL CUP COLOSSAL GAMES",
      members: 10,
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=200&h=200&fit=crop",
    },
    {
      id: 3,
      name: "PUBG | FIFA GLOBAL CUP COLOSSAL GAMES",
      members: 12,
      image:
        "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=200&h=200&fit=crop",
    },
    {
      id: 4,
      name: "PUBG | FIFA GLOBAL CUP COLOSSAL GAMES",
      members: 45,
      image:
        "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=200&h=200&fit=crop",
    },
    {
      id: 5,
      name: "PUBG | FIFA GLOBAL CUP COLOSSAL GAMES",
      members: 4,
      image:
        "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=200&h=200&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020818] via-[#0a1628] to-[#020818] p-8">
      <div className="">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          JOINED CHANNELS
        </h1>

        {/* Profile Warning */}
        <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border-2 border-red-500/30 rounded-xl p-4 flex items-start gap-3 mb-8">
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

        {/* Note */}
        <p className="text-gray-400 text-center mb-8">
          NOTE: Communities are auto joined after registering for a tournament
        </p>

        {/* Communities List */}
        <div className="space-y-4">
          {communities.map((community) => (
            <div
              key={community.id}
              className="bg-[#1a1d2e] border border-[#455872] rounded-xl p-5 flex items-center justify-between hover:border-cyan-400/50 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                {/* Community Image */}
                <div
                  className="w-16 h-16 rounded-lg bg-cover bg-center flex-shrink-0"
                  style={{ backgroundImage: `url(${community.image})` }}
                ></div>

                {/* Community Info */}
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">
                    {community.name}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {community.members} Members
                  </p>
                </div>
              </div>

              {/* Arrow Icon */}
              <ChevronRight
                size={24}
                className="text-gray-400 group-hover:text-cyan-400 transition-colors"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JoinedChannelsPage;
