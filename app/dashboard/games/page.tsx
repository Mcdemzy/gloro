"use client";
import React, { useState } from "react";
import { Search, ChevronRight, X, AlertTriangle } from "lucide-react";

interface Game {
  id: number;
  name: string;
  image: string;
  configured: boolean;
  year?: string;
}

interface ConfigForm {
  username: string;
  inGameId: string;
  email: string;
}

const ConfigureGamesIDPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showConfigModal, setShowConfigModal] = useState<boolean>(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [configForm, setConfigForm] = useState<ConfigForm>({
    username: "",
    inGameId: "",
    email: "",
  });

  const games: Game[] = [
    {
      id: 1,
      name: "Call of Duty Mobile",
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&h=200&fit=crop",
      configured: false,
    },
    {
      id: 2,
      name: "Spiderman 5",
      image:
        "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=200&h=200&fit=crop",
      configured: false,
    },
    {
      id: 3,
      name: "Call of Duty Mobile",
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=200&h=200&fit=crop",
      year: "2025",
      configured: false,
    },
    {
      id: 4,
      name: "Town Warhead Tojo 4 Console",
      image:
        "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=200&h=200&fit=crop",
      configured: false,
    },
    {
      id: 5,
      name: "Free Fire Mobile",
      image:
        "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=200&h=200&fit=crop",
      configured: false,
    },
  ];

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleConfigure = (game: Game) => {
    setSelectedGame(game);
    setShowConfigModal(true);
    setConfigForm({
      username: "",
      inGameId: "",
      email: "",
    });
  };

  const handleSave = () => {
    // Save configuration
    if (selectedGame) {
      console.log("Saving config for", selectedGame.name, configForm);
    }
    setShowConfigModal(false);
    setSelectedGame(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020818] via-[#0a1628] to-[#020818] p-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Configure Games ID
          </h1>
          <p className="text-gray-400">
            Configure your games id to always fill any gaming Tournaments you
            will be applying for.
          </p>
        </div>

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

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search Games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-[#0a1628] border border-[#455872] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Games List */}
        <div className="bg-[#0a1628] border border-[#455872] rounded-2xl overflow-hidden">
          {filteredGames.map((game, index) => (
            <div key={game.id}>
              <div className="flex items-center justify-between p-6 hover:bg-white/5 transition-all group">
                <div className="flex items-center gap-4">
                  {/* Game Image */}
                  <div
                    className="w-16 h-16 rounded-lg bg-cover bg-center flex-shrink-0"
                    style={{ backgroundImage: `url(${game.image})` }}
                  ></div>

                  {/* Game Name */}
                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      {game.name}
                    </h3>
                    {game.year && (
                      <span className="inline-block px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded text-xs font-semibold mt-1">
                        {game.year}
                      </span>
                    )}
                  </div>
                </div>

                {/* Configure Button */}
                <button
                  onClick={() => handleConfigure(game)}
                  className="px-6 py-2 bg-transparent border border-white/20 text-white hover:border-cyan-400 hover:text-cyan-400 rounded-lg font-semibold transition-all flex items-center gap-2 group-hover:border-cyan-400 group-hover:text-cyan-400"
                >
                  Configure
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Divider */}
              {index < filteredGames.length - 1 && (
                <div className="border-b border-white/5"></div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredGames.length === 0 && (
          <div className="bg-[#0a1628] border border-[#455872] rounded-2xl p-12 text-center">
            <p className="text-gray-400">
              No games found matching "{searchQuery}"
            </p>
          </div>
        )}
      </div>

      {/* Configure Game Modal */}
      {showConfigModal && selectedGame && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowConfigModal(false)}
          ></div>

          {/* Modal */}
          <div className="relative bg-[#1a1d2e] border border-[#455872] rounded-2xl w-full max-w-md p-8">
            {/* Close Button */}
            <button
              onClick={() => setShowConfigModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all"
            >
              <X size={18} />
            </button>

            {/* Game Title */}
            <h2 className="text-2xl font-bold text-white mb-6">
              {selectedGame.name}
            </h2>

            {/* Form */}
            <div className="space-y-5">
              {/* In-game Name / Username */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  In-game Name / Username
                </label>
                <input
                  type="text"
                  placeholder="ALL INFO ARE OPTIONAL"
                  value={configForm.username}
                  onChange={(e) =>
                    setConfigForm({ ...configForm, username: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* In-game ID */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  In-game ID
                </label>
                <input
                  type="text"
                  placeholder="ALL INFO ARE OPTIONAL"
                  value={configForm.inGameId}
                  onChange={(e) =>
                    setConfigForm({ ...configForm, inGameId: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* In-game Email */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  In-game Email
                </label>
                <input
                  type="email"
                  placeholder="ALL INFO ARE OPTIONAL"
                  value={configForm.email}
                  onChange={(e) =>
                    setConfigForm({ ...configForm, email: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Save Button */}
              <button
                onClick={handleSave}
                className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfigureGamesIDPage;
