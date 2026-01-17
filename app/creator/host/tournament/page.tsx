"use client";
import { useState } from "react";
import {
  Plus,
  X,
  Search,
  Settings2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import TournamentFormLayout from "@/components/creator/host/TournamentFormLayout";

interface SelectedGame {
  name: string;
  minTeam: number;
  maxTeam: number;
}

export default function HostTournamentPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [coverImages, setCoverImages] = useState<string[]>([null, null, null, null]);
  const [selectedGames, setSelectedGames] = useState<SelectedGame[]>([]);
  const [showGameModal, setShowGameModal] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [currentGame, setCurrentGame] = useState<string>("");
  const [teamConfig, setTeamConfig] = useState({ min: 2, max: 6 });
  const [searchQuery, setSearchQuery] = useState("");

  const availableGames = [
    "PUBG Mobile",
    "COD Mobile",
    "Mortal Kombat",
    "Free Fire",
    "Apex Mobile",
  ];

  const handleImageUpload = (index: number) => {
    // Simulate file upload - in real app, you'd use file input
    const mockImage = `https://images.unsplash.com/photo-${index + 1}?w=400&h=300&fit=crop`;
    const newImages = [...coverImages];
    newImages[index] = mockImage;
    setCoverImages(newImages);
  };

  const handleRemoveImage = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newImages = [...coverImages];
    newImages[index] = null;
    setCoverImages(newImages);
  };

  const handleAddGame = () => {
    setShowGameModal(true);
  };

  const handleGameSelect = (game: string) => {
    setCurrentGame(game);
    setShowGameModal(false);
    setShowTeamModal(true);
  };

  const handleTeamConfigSave = () => {
    if (currentGame && !selectedGames.find((g) => g.name === currentGame)) {
      setSelectedGames([
        ...selectedGames,
        {
          name: currentGame,
          minTeam: teamConfig.min,
          maxTeam: teamConfig.max,
        },
      ]);
    }
    setShowTeamModal(false);
    setCurrentGame("");
    setTeamConfig({ min: 2, max: 6 });
  };

  const handleRemoveGame = (gameName: string) => {
    setSelectedGames(selectedGames.filter((g) => g.name !== gameName));
  };

  const handleEditGame = (gameName: string) => {
    const game = selectedGames.find((g) => g.name === gameName);
    if (game) {
      setCurrentGame(game.name);
      setTeamConfig({ min: game.minTeam, max: game.maxTeam });
      setShowTeamModal(true);
    }
  };

  const filteredGames = availableGames.filter(
    (game) =>
      game.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !selectedGames.find((g) => g.name === game),
  );

  const handleSaveDraft = () => {
    console.log("Saving draft:", { title, coverImages, selectedGames });
    alert("Tournament saved as draft!");
  };

  const handleProceed = () => {
    if (!title) {
      alert("Please enter a tournament title");
      return;
    }
    
    if (selectedGames.length === 0) {
      alert("Please add at least one game");
      return;
    }
    
    // Navigate to step 2
    router.push("/creator/host/tournament/step-2");
  };

  return (
    <TournamentFormLayout
      currentStep={1}
      onSaveDraft={handleSaveDraft}
      onProceed={handleProceed}
    >
      {/* Title */}
      <div>
        <label className="text-white font-semibold mb-2 block">
          Title <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 bg-[#0a2d36] border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
          placeholder="Enter tournament title"
          required
        />
      </div>

      {/* Cover Images */}
      <div>
        <label className="text-white font-semibold mb-2 block">
          Cover Image <span className="text-red-400">*</span>
        </label>
        <div className="grid grid-cols-4 gap-4">
          {coverImages.map((img, index) => (
            <div
              key={index}
              className="aspect-square relative group"
            >
              <div
                onClick={() => !img && handleImageUpload(index)}
                className={`w-full h-full border-2 rounded-lg flex items-center justify-center cursor-pointer transition-all ${
                  img
                    ? "border-cyan-500/30 bg-cover bg-center"
                    : "border-dashed border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-500/5"
                }`}
                style={img ? { backgroundImage: `url(${img})` } : {}}
              >
                {!img && <Plus size={32} className="text-cyan-400" />}
              </div>
              
              {img && (
                <button
                  onClick={(e) => handleRemoveImage(index, e)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
        <p className="text-gray-400 text-sm mt-2">Upload 4 images for best display</p>
      </div>

      {/* Games List */}
      <div>
        <label className="text-white font-semibold mb-2 block">
          Games (s) <span className="text-red-400">*</span>
        </label>

        {/* Add Game Button */}
        <button
          type="button"
          onClick={handleAddGame}
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-4 px-4 py-2 bg-cyan-500/10 rounded-lg hover:bg-cyan-500/20"
        >
          <Plus size={18} />
          Click on the + icon to add games (s)
        </button>

        {/* Selected Games */}
        <div className="space-y-3">
          {selectedGames.map((game, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-[#0a2d36] border border-cyan-500/20 rounded-lg group hover:border-cyan-400/50 transition-all"
            >
              <div>
                <span className="text-white font-medium">{game.name}</span>
                <p className="text-gray-400 text-sm mt-1">
                  Team Size: {game.minTeam} - {game.maxTeam} members
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => handleEditGame(game.name)}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <Settings2 size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveGame(game.name)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          ))}
          
          {selectedGames.length === 0 && (
            <p className="text-gray-400 text-center py-4">
              No games added yet. Click the button above to add games.
            </p>
          )}
        </div>
      </div>

      {/* Game Selection Modal */}
      {showGameModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowGameModal(false)}
          ></div>

          <div className="relative bg-[#0a2d36] border border-cyan-400/30 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="mb-4">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search games..."
                  className="w-full pl-10 pr-4 py-3 bg-[#0c3540] border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="mb-3">
              <p className="text-gray-400 text-sm">Choose games</p>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {filteredGames.map((game) => (
                <button
                  key={game}
                  type="button"
                  onClick={() => handleGameSelect(game)}
                  className="w-full text-left px-4 py-3 bg-[#0c3540] hover:bg-cyan-500/10 text-white rounded-lg transition-all border border-transparent hover:border-cyan-400/30"
                >
                  {game}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Team Configuration Modal */}
      {showTeamModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowTeamModal(false)}
          ></div>

          <div className="relative bg-gradient-to-br from-[#0c3540] to-[#0a2d36] border border-cyan-400/30 rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              {currentGame}
            </h3>

            <div className="space-y-6">
              <div>
                <label className="text-white font-medium mb-2 block">
                  Minimum Team Member
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={teamConfig.min}
                  onChange={(e) =>
                    setTeamConfig({
                      ...teamConfig,
                      min: parseInt(e.target.value) || 2,
                    })
                  }
                  className="w-full px-4 py-3 bg-[#0a2d36] border border-cyan-500/20 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-white font-medium mb-2 block">
                  Maximum Team Member
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={teamConfig.max}
                  onChange={(e) =>
                    setTeamConfig({
                      ...teamConfig,
                      max: parseInt(e.target.value) || 6,
                    })
                  }
                  className="w-full px-4 py-3 bg-[#0a2d36] border border-cyan-500/20 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowTeamModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleTeamConfigSave}
                  className="flex-1 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold transition-all shadow-lg"
                >
                  {selectedGames.find(g => g.name === currentGame) ? 'Update' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </TournamentFormLayout>
  );
}