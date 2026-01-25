"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

export default function TeamDetailView() {
  const router = useRouter();
  const params = useParams();
  const { tournamentId, game, teamId } = params;

  const teamInfo = {
    name: "Night Owls",
    logo: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=200&h=200&fit=crop",
    game: game as string,
    tournament: "FIFA GLOBAL CUP COLOSSAL GAMES",
    tournamentDate: "2nd December, 2025 - 28 December, 2025",
  };

  const members = [
    {
      id: "GLR-2193709",
      name: "James Garfield",
      phone: "+1 (437) 873 2833",
      inGameName: "LittleGunZ",
      inGameId: "30291228873",
      roles: ["Sniper", "Substitute"],
      socials: {
        x: true,
        facebook: true,
        discord: true,
      },
    },
    // ... other members
  ];

  const handleBack = () => {
    router.push(`/creator/tournaments/${tournamentId}/teams`);
  };

  return (
    <div className="min-h-screen bg-[#0a1f2e] p-8">
      <div className="space-y-6 max-w-6xl mx-auto">
        {/* Tournament Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white uppercase tracking-wider mb-2">
            {teamInfo.tournament}
          </h1>
          <p className="text-gray-400">{teamInfo.tournamentDate}</p>
        </div>

        {/* Back Navigation */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={handleBack}
            className="text-white hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-xl font-semibold text-white">
            Teams - {teamInfo.game.toUpperCase()}
          </h2>
        </div>

        {/* Team Detail Card */}
        <div className="bg-gradient-to-br from-[#0c3540]/60 to-[#0a2d36]/60 backdrop-blur-md border border-cyan-500/20 rounded-2xl overflow-hidden">
          {/* Team Header with Background */}
          <div className="relative h-48 bg-gradient-to-br from-purple-900/40 via-purple-800/30 to-cyan-900/20">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

            {/* Team Logo */}
            <div className="absolute bottom-0 left-8 transform translate-y-1/2">
              <div
                className="w-32 h-32 rounded-2xl bg-cover bg-center border-4 border-[#0a2d36] shadow-2xl"
                style={{ backgroundImage: `url(${teamInfo.logo})` }}
              ></div>
            </div>
          </div>

          {/* Team Info */}
          <div className="pt-20 px-8 pb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              {teamInfo.name}
            </h1>
            <p className="text-gray-400 mb-6">{members.length} members</p>

            {/* Members Section */}
            <div className="space-y-3">
              {members.map((member, index) => (
                <div
                  key={index}
                  className="bg-[#0a2d36]/80 border border-cyan-500/20 rounded-xl p-4 hover:border-cyan-400/40 transition-all"
                >
                  <div className="flex items-center justify-between">
                    {/* Left Side - Member Info */}
                    <div className="flex-1 grid grid-cols-2 gap-8">
                      {/* Column 1 */}
                      <div className="space-y-2">
                        <div>
                          <p className="text-cyan-400 text-sm mb-1">
                            {member.id}
                          </p>
                          <p className="text-white font-semibold">
                            {member.name}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {member.phone}
                          </p>
                        </div>

                        {/* Social Icons */}
                        <div className="flex items-center gap-2">
                          {member.socials.x && (
                            <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                              <svg
                                className="w-3 h-3 fill-black"
                                viewBox="0 0 24 24"
                              >
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                              </svg>
                            </div>
                          )}
                          {member.socials.facebook && (
                            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                              <svg
                                className="w-3 h-3 fill-white"
                                viewBox="0 0 24 24"
                              >
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                              </svg>
                            </div>
                          )}
                          {member.socials.discord && (
                            <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
                              <svg
                                className="w-4 h-4 fill-white"
                                viewBox="0 0 24 24"
                              >
                                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Column 2 */}
                      <div className="space-y-2">
                        <div>
                          <p className="text-gray-400 text-sm">
                            In-Game Name:{" "}
                            <span className="text-white font-medium">
                              {member.inGameName}
                            </span>
                          </p>
                          <p className="text-gray-400 text-sm">
                            In-Game ID:{" "}
                            <span className="text-white font-medium">
                              {member.inGameId}
                            </span>
                          </p>
                        </div>

                        {/* Role Tags */}
                        <div className="flex flex-wrap gap-2">
                          {member.roles.map((role, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-white/10 border border-white/20 text-gray-300 rounded-full text-xs font-medium"
                            >
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
