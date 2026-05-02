"use client";

import React, { useRef, useState, useEffect } from "react";
import { ChevronDown, Volume2, VolumeX, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const FALLBACK_IMAGE =
  "https://i.pinimg.com/originals/df/e8/90/dfe89081d0e439a8ac8106e68b74b1ec.jpg";

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [muted, setMuted] = useState(true);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [fading, setFading] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const videos = [
    "/videos/clip1.mp4",
    "/videos/clip2.mp4",
    "/videos/clip3.mp4",
    "/videos/clip4.mp4",
    "/videos/clip5.mp4",
  ];

  const handleVideoEnd = () => {
    setFading(true);

    setTimeout(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
      setFading(false);
      setVideoLoaded(false);
    }, 700);
  };

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);

    if (videoRef.current) videoRef.current.muted = next;

    if (audioRef.current) {
      audioRef.current.muted = next;

      if (!next) {
        audioRef.current.play().catch(() => {});
      }
    }
  };

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.muted = true;
    audio.volume = 0.4;
    audio.play().catch(() => {});
  }, []);

  return (
    <main className="relative min-h-screen flex items-center justify-center text-center px-4 pt-20 overflow-hidden">
      {/* fallback */}
      {!videoLoaded && (
        <img
          src={FALLBACK_IMAGE}
          alt="Gaming background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* video */}
      <video
        ref={videoRef}
        key={currentVideo}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        onCanPlay={() => setVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          videoLoaded && !fading ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src={videos[currentVideo]} type="video/mp4" />
      </video>

      {/* audio */}
      <audio ref={audioRef} src="/sounds/epic-intro.mp3" loop preload="auto" />

      {/* overlays */}
      <div className="absolute inset-0 bg-[#020818]/70 z-[2]" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#020818] to-transparent z-[3]" />

      {/* mute */}
      <button
        onClick={toggleMute}
        className="absolute bottom-8 right-6 z-20 flex items-center gap-1 text-white/70 hover:text-white border border-white/20 hover:border-white/40 rounded-full p-2 bg-black/30 backdrop-blur-md transition text-xs cursor-pointer"
      >
        {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        {muted ? "Unmute" : "Mute"}
      </button>

      {/* content */}
      <div className="relative z-10 max-w-5xl">
        {/* headline */}
        <motion.h1
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="font-black text-2xl md:text-5xl leading-tight orbitron"
        >
          <span className="block text-white">THE ULTIMATE</span>

          <span className="block mt-2 bg-linear-to-r from-purple-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-pulse">
            GAMING PLATFORM
          </span>
        </motion.h1>

        {/* subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.8 }}
          className="mt-6 max-w-2xl mx-auto text-white/80 text-sm md:text-lg leading-7"
        >
          Join tournaments, build your squad, win rewards, grow your audience
          and dominate the competition.
        </motion.p>

        {/* scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-12 flex justify-center"
        >
          <ChevronDown className="text-cyan-400 animate-bounce" size={34} />
        </motion.div>

        
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-10 flex justify-center"
        >
          <Link href="/tournaments/hub" className="relative group">
            {/* pulse ring */}
            <span className="absolute inset-0 rounded-xl bg-cyan-400/30 blur-xl animate-pulse" />

            <span className="relative flex items-center gap-3 px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-2xl hover:scale-105 transition-all duration-300">
              Explore Tournaments
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition"
              />
            </span>
          </Link>
        </motion.div>
      </div>
    </main>
  );
};

export default HeroSection;
