"use client";
import React, { useState } from "react";
import { Search, Calendar, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

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

// Training Detail Page Component
const TrainingDetail = ({ training, onBack }: TrainingDetailProps) => {
  return (
    <div className="w-full bg-linear-to-br from-[#0a0a1a] via-[#1a0a2e] to-[#0a0a1a] min-h-screen">
      <div className="w-full px-6 md:px-12 lg:px-24 py-20">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 cursor-pointer"
          >
            <svg
              className="w-5 h-5"
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
            {training.title}
          </h1>

          {/* Hero Image */}
          <div className="relative h-96 rounded-2xl overflow-hidden mb-12">
            <img
              src={training.image}
              alt={training.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Description Header */}
          <h2 className="text-2xl font-semibold text-white mb-6">
            How do you create compelling presentations that wow your colleagues
            and impress your managers?
          </h2>

          {/* Content Paragraphs */}
          <div className="space-y-6 text-gray-300 leading-relaxed">
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
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex items-center text-gray-500">
              <Calendar className="w-5 h-5 mr-2" />
              {training.date}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Training Page Component (for the <section> part of your page)
const TrainingSection = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(
    null,
  );

  const filteredData = trainingData.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (selectedTraining) {
    return (
      <TrainingDetail
        training={selectedTraining}
        onBack={() => setSelectedTraining(null)}
      />
    );
  }

  return (
    <main className="bg-[#020818]">
      <Navbar />
      <div className="w-full min-h-screen pt-52">
        {/* Hero Section */}
        <div className="w-full px-6 md:px-12 lg:px-24 pb-18">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 orbitron tracking-[5%]">
              ENJOY YOUR <br />
              <span className="text-[#3b82f6] text-7xl">TRAINING</span>
            </h1>
            <p className="text-[#FFFFFFC7] font-normal text-lg max-w-4xl mx-auto mb-12">
              All your gaming essentials in one place. Tournaments, news,
              streams and community—designed for players and creators.
            </p>

            {/* Search Bar */}
            <div className="max-w-lg mx-auto relative">
              <Search className="absolute left-4 top-1/2 z-10 -translate-y-1/2 w-5 h-5 text-[#FFFFFF]" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent backdrop-blur-sm border border-[#DCDCDC] rounded-lg pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#3b82f6]"
              />
            </div>
          </div>
        </div>

        {/* Training Cards Grid */}
        <div className="w-full px-6 md:px-12 lg:px-24 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
              {filteredData.map((training) => (
                <div
                  key={training.id}
                  className="backdrop-blur-sm rounded-lg overflow-hidden border border-gray-800/50 hover:border-gray-700 transition-all cursor-pointer group"
                  onClick={() => setSelectedTraining(training)}
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(5, 27, 36, 0) 0%, rgba(9, 61, 82, 0.25) 100%), linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 100%)",
                  }}
                >
                  {/* Card Image */}
                  <div className="relative h-56 overflow-hidden p-6">
                    <img
                      src={training.image}
                      alt={training.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-6 pt-0">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold text-white flex-1 line-clamp-2">
                        {training.title}
                      </h3>
                      <div className="bg-[#00000080] p-2 rounded-full">
                        <ArrowUpRight className="text-[#2CCCFF] group-hover:text-[#3b82f6] transition-colors shrink-0" />
                      </div>
                    </div>

                    <p className="text-[#EFEFEF] mb-32 line-clamp-2">
                      {training.description}
                    </p>

                    <div className="flex items-center text-[#EFEFEF] text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      {training.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center">
              <button className="bg-[#59366D] hover:bg-purple-700 text-white font-medium px-8 py-3 rounded-lg transition-all inline-flex items-center gap-2 cursor-pointer">
                Load More
                <svg
                  className="w-5 h-5"
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
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default TrainingSection;
