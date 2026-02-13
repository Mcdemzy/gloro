"use client";
import React, { useState } from "react";
import { Search, Calendar, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/shared/Navbar";

// Define interfaces for type safety
interface Training {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  category: string;
}

interface TrainingDetailProps {
  training: Training;
  onBack: () => void;
}

// Training Data
const trainingData: Training[] = [
  {
    id: 1,
    title: "Introduction to GloroQ Game Tournament",
    description:
      "How do you create compelling presentations that wow your colleagues and impress your managers?",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80",
    date: "20 Jan 2022",
    category: "Tournament",
  },
  {
    id: 2,
    title: "UX review presentations",
    description:
      "How do you create compelling presentations that wow your colleagues and impress your managers?",
    image:
      "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&q=80",
    date: "20 Jan 2022",
    category: "Design",
  },
  {
    id: 3,
    title: "UX review presentations",
    description:
      "How do you create compelling presentations that wow your colleagues and impress your managers?",
    image:
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&q=80",
    date: "20 Jan 2022",
    category: "Design",
  },
  {
    id: 4,
    title: "UX review presentations",
    description:
      "How do you create compelling presentations that wow your colleagues and impress your managers?",
    image:
      "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&q=80",
    date: "20 Jan 2022",
    category: "Design",
  },
  {
    id: 5,
    title: "UX review presentations",
    description:
      "How do you create compelling presentations that wow your colleagues and impress your managers?",
    image:
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&q=80",
    date: "20 Jan 2022",
    category: "Design",
  },
  {
    id: 6,
    title: "UX review presentations",
    description:
      "How do you create compelling presentations that wow your colleagues and impress your managers?",
    image:
      "https://images.unsplash.com/photo-1614294148960-9aa740632a87?w=800&q=80",
    date: "20 Jan 2022",
    category: "Streaming",
  },
  {
    id: 7,
    title: "UX review presentations",
    description:
      "How do you create compelling presentations that wow your colleagues and impress your managers?",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80",
    date: "20 Jan 2022",
    category: "Tournament",
  },
  {
    id: 8,
    title: "UX review presentations",
    description:
      "How do you create compelling presentations that wow your colleagues and impress your managers?",
    image:
      "https://images.unsplash.com/photo-1614294148960-9aa740632a87?w=800&q=80",
    date: "20 Jan 2022",
    category: "Streaming",
  },
  {
    id: 9,
    title: "UX review presentations",
    description:
      "How do you create compelling presentations that wow your colleagues and impress your managers?",
    image:
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&q=80",
    date: "20 Jan 2022",
    category: "Design",
  },
];

// Training Detail Page Component - Fully Responsive
const TrainingDetail = ({ training, onBack }: TrainingDetailProps) => {
  return (
    <div className="w-full bg-gradient-to-br from-[#0a0a1a] via-[#1a0a2e] to-[#0a0a1a] min-h-screen">
      {/* <Navbar /> */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="max-w-4xl lg:max-w-5xl mx-auto">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 sm:mb-8 text-sm sm:text-base"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Training
          </button>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 sm:mb-8 text-center">
            {training.title}
          </h1>

          {/* Hero Image */}
          <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 rounded-xl sm:rounded-2xl overflow-hidden mb-8 sm:mb-12">
            <img
              src={training.image}
              alt={training.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Description Header */}
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-4 sm:mb-6">
            How do you create compelling presentations that wow your colleagues
            and impress your managers?
          </h2>

          {/* Content Paragraphs */}
          <div className="space-y-4 sm:space-y-6 text-gray-300 leading-relaxed text-sm sm:text-base">
            <p>
              How do you create compelling presentations that wow your
              colleagues and impress your managers? How do you create compelling
              presentations that wow your colleagues and impress your managers?
              How do you create compelling presentations that wow your
              colleagues and impress your managers? How do you create compelling
              presentations that wow your colleagues and impress your managers?
              How do you create compelling presentations that wow your
              colleagues and impress your managers? How do you create compelling
              presentations that wow your colleagues and impress your managers?
              How do you create compelling presentations that wow your
              colleagues and impress your managers? How do you create compelling
              presentations that wow your colleagues and impress your managers?
              How do you create compelling presentations that wow your
              colleagues and impress your managers?
            </p>

            <p>
              How do you create compelling presentations that wow your
              colleagues and impress your managers? How do you create compelling
              presentations that wow your colleagues and impress your managers?
              How do you create compelling presentations that wow your
              colleagues and impress your managers? How do you create compelling
              presentations that wow your colleagues and impress your managers?
              How do you create compelling presentations that wow your
              colleagues and impress your managers? How do you create compelling
              presentations that wow your colleagues and impress your managers?
              How do you create compelling presentations that wow your
              colleagues and impress your managers? How do you create compelling
              presentations that wow your colleagues and impress your managers?
              How do you create compelling presentations that wow your
              colleagues and impress your managers?
            </p>
          </div>

          {/* Date */}
          <div className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-gray-800">
            <div className="flex items-center text-gray-500 text-xs sm:text-sm">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              {training.date}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Training Page Component - Fully Responsive
const TrainingSection = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(
    null,
  );
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredData = trainingData.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const visibleData = filteredData.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  if (selectedTraining) {
    return (
      <TrainingDetail
        training={selectedTraining}
        onBack={() => setSelectedTraining(null)}
      />
    );
  }

  return (
    <main className="bg-gradient-to-br from-[#0a0a1a] via-[#1a0a2e] to-[#0a0a1a] min-h-screen">
      {/* <Navbar /> */}
      
      {/* Hero Section */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 pt-20 sm:pt-24 md:pt-28 lg:pt-32 xl:pt-40 pb-8 sm:pb-10 md:pb-12">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 orbitron">
            ENJOY YOUR{" "}
            <span className="block sm:inline">
              <span className="text-[#3b82f6]">TRAINING</span>
            </span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl lg:max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 px-2">
            All your gaming essentials in one place. Tournaments, news,
            streams and community—designed for players and creators.
          </p>

          {/* Search Bar */}
          <div className="max-w-lg sm:max-w-xl mx-auto relative px-2 sm:px-0">
            <Search className="absolute left-6 sm:left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search training courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1a1a2e]/60 backdrop-blur-sm border border-gray-700/50 rounded-full sm:rounded-lg pl-10 sm:pl-12 pr-4 py-3 sm:py-4 text-white text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6]/50"
            />
          </div>

          {/* Search Results Count */}
          {searchQuery && (
            <p className="text-gray-400 text-xs sm:text-sm mt-4">
              Found {filteredData.length} result{filteredData.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>

      {/* Training Cards Grid */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto">
          
          {/* Category Filters - Mobile Horizontal Scroll */}
          <div className="mb-6 sm:mb-8 md:mb-12 overflow-x-auto pb-2 -mx-4 px-4 sm:px-0 sm:overflow-visible sm:mx-0">
            <div className="flex sm:flex-wrap gap-2 sm:gap-3 min-w-max sm:min-w-0">
              <button className="px-4 py-2 bg-[#3b82f6] text-white rounded-full text-xs sm:text-sm whitespace-nowrap">
                All Courses
              </button>
              <button className="px-4 py-2 bg-[#1a1a2e]/60 text-gray-300 hover:text-white border border-gray-700/50 rounded-full text-xs sm:text-sm whitespace-nowrap transition-colors">
                Tournament
              </button>
              <button className="px-4 py-2 bg-[#1a1a2e]/60 text-gray-300 hover:text-white border border-gray-700/50 rounded-full text-xs sm:text-sm whitespace-nowrap transition-colors">
                Design
              </button>
              <button className="px-4 py-2 bg-[#1a1a2e]/60 text-gray-300 hover:text-white border border-gray-700/50 rounded-full text-xs sm:text-sm whitespace-nowrap transition-colors">
                Streaming
              </button>
              <button className="px-4 py-2 bg-[#1a1a2e]/60 text-gray-300 hover:text-white border border-gray-700/50 rounded-full text-xs sm:text-sm whitespace-nowrap transition-colors">
                Strategy
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-white font-semibold text-base sm:text-lg">
              {filteredData.length} Training Courses
            </h2>
            <select className="bg-[#1a1a2e]/60 text-white text-xs sm:text-sm border border-gray-700/50 rounded-lg px-3 py-2 focus:outline-none focus:border-[#3b82f6]">
              <option>Most Recent</option>
              <option>Oldest</option>
              <option>A-Z</option>
            </select>
          </div>

          {/* Cards Grid */}
          {visibleData.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10 md:mb-12">
                {visibleData.map((training) => (
                  <div
                    key={training.id}
                    className="bg-[#1a1a2e]/80 backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden border border-gray-800/50 hover:border-[#3b82f6]/50 transition-all duration-300 cursor-pointer group h-full flex flex-col"
                    onClick={() => setSelectedTraining(training)}
                  >
                    {/* Card Image */}
                    <div className="relative h-40 sm:h-48 md:h-52 lg:h-56 overflow-hidden flex-shrink-0">
                      <img
                        src={training.image}
                        alt={training.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Category Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="bg-purple-600/90 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
                          {training.category}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 sm:p-5 md:p-6 flex-grow flex flex-col">
                      <div className="flex items-start justify-between mb-2 sm:mb-3">
                        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white flex-1 line-clamp-2 group-hover:text-[#3b82f6] transition-colors">
                          {training.title}
                        </h3>
                        <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-[#3b82f6] transition-colors flex-shrink-0 ml-2" />
                      </div>

                      <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6 line-clamp-2 flex-grow">
                        {training.description}
                      </p>

                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center text-gray-500 text-xs sm:text-sm">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
                          {training.date}
                        </div>
                        <span className="text-[#3b82f6] text-xs sm:text-sm font-medium group-hover:underline">
                          Read more
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              {visibleCount < filteredData.length && (
                <div className="text-center">
                  <button
                    onClick={loadMore}
                    className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium px-6 sm:px-8 py-2.5 sm:py-3 rounded-full sm:rounded-lg transition-all inline-flex items-center gap-2 text-sm sm:text-base shadow-lg hover:shadow-purple-600/30"
                  >
                    Load More
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </>
          ) : (
            // No Results State
            <div className="text-center py-16 sm:py-20">
              <div className="text-gray-500 text-base sm:text-lg mb-4">
                No training courses found
              </div>
              <button
                onClick={() => setSearchQuery("")}
                className="text-[#3b82f6] hover:text-white border border-[#3b82f6]/50 hover:border-[#3b82f6] px-6 py-2.5 rounded-lg transition-all text-sm sm:text-base"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default TrainingSection;