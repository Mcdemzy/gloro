"use client";
import React, { useRef, useState, useEffect } from "react";
import { ChevronDown, Gamepad2, Volume2, VolumeX } from "lucide-react";

const FALLBACK_IMAGE =
  "https://i.pinimg.com/originals/df/e8/90/dfe89081d0e439a8ac8106e68b74b1ec.jpg";

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(true);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [fading, setFading] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Put your downloaded .mp4 files in /public/videos/
  const videos = [
    "/videos/clip1.mp4",
    "/videos/clip2.mp4",
    "/videos/clip3.mp4",
    "/videos/clip4.mp4",
    "/videos/clip5.mp4"
  ];

  const handleVideoEnd = () => {
    setFading(true);
    setTimeout(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
      setFading(false);
      setVideoLoaded(false);
    }, 800);
  };

  // Sync mute state to both video and audio
  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    if (videoRef.current) videoRef.current.muted = next;
    if (audioRef.current) {
      audioRef.current.muted = next;
      // Audio needs user gesture to play — attempt on first unmute
      if (!next) {
        audioRef.current.play().catch(() => {});
      }
    }
  };

  // On mount, try to play audio (will stay muted until user unmutes)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = true; // always start muted (browser policy)
    audio.volume = 0.4;
    audio.play().catch(() => {}); // silent fail if blocked
  }, []);

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center overflow-hidden">
      {/* Fallback image — shows until video loads */}
      {!videoLoaded && (
        <img
          src={FALLBACK_IMAGE}
          alt="Gaming background"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        />
      )}

      {/* Video Background */}
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
        style={{ zIndex: 1 }}
      >
        <source src={videos[currentVideo]} type="video/mp4" />
      </video>

      {/* Separate audio track — /public/sounds/epic-intro.mp3 */}
      <audio ref={audioRef} src="/sounds/epic-intro.mp3" loop preload="auto" />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#020818]/70 z-[2]" />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#020818] to-transparent z-[3]" />

      {/* Mute toggle */}
      <button
        onClick={toggleMute}
        className="absolute bottom-8 right-6 z-10 flex items-center gap-1.5 text-white/60 hover:text-white transition-colors text-xs border border-white/20 hover:border-white/40 rounded-full px-3 py-1.5 bg-black/30 backdrop-blur-sm"
      >
        {muted ? <VolumeX size={13} /> : <Volume2 size={13} />}
        {muted ? "Unmute" : "Mute"}
      </button>

      {/* Video indicator dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
        {videos.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setFading(true);
              setTimeout(() => {
                setCurrentVideo(i);
                setFading(false);
                setVideoLoaded(false);
              }, 400);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentVideo ? "bg-cyan-400 w-4" : "bg-white/30 w-1.5"
            }`}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-[4]">
        <h1 className="font-bold text-3xl md:text-5xl leading-tight tracking-wide md:mt-36 mt-10 orbitron">
          THE ULTIMATE <br />
          <span className="bg-linear-to-r from-[#7C3AED] via-[#2F82EE] to-[#00AEEF] bg-clip-text text-transparent font-extrabold text-4xl md:text-6xl mr-2">
            GAMING{" "}
          </span>
          <span className="font-extrabold text-4xl md:text-6xl text-white">
            PLATFORM
          </span>
        </h1>

        <p className="mt-3 max-w-xl mx-auto text-sm md:text-base font-normal text-[#FFFFFFC7] leading-6 tracking-wide">
          All your gaming essentials in one place. Tournaments, news, streams
          and community—designed for players and creators.
        </p>

        <div className="my-7 flex justify-center">
          <ChevronDown
            className="text-cyan-400 animate-bounce"
            size={36}
            strokeWidth={2}
          />
        </div>

        <button className="group relative font-semibold text-sm text-white bg-linear-to-b from-cyan-500 to-cyan-100 rounded-lg shadow-lg hover:shadow-cyan-400/50 transition-all duration-300 hover:scale-105 overflow-hidden p-px cursor-pointer">
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 z-20" />
          <span className="relative z-10 flex items-center gap-2 bg-[#232230] backdrop-blur-sm py-3 px-7 rounded-lg">
            {/* <Gamepad2 size={18} color="#9EF5B4" /> */}
            See all Tournaments
          </span>
        </button>
      </div>
    </main>
  );
};

export default HeroSection;
