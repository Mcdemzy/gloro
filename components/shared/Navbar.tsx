"use client"
import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('Home');

  return (
    <nav className="fixed top-10 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[1459px] text-black">
      <div 
        className="h-[104px] rounded-[100px] flex items-center justify-between px-[69px] py-6"
        style={{
          background: 'linear-gradient(270deg, rgba(149, 24, 211, 0.05) 0%, rgba(74, 97, 221, 0.05) 50%, rgba(0, 170, 231, 0.05) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
          border: '0.2px solid rgba(175, 192, 187, 0.7)',
          boxShadow: '0px 4px 32px 0px rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(10px)'
        }}
      >
        {/* Logo */}
        <div className="flex-shrink-0">
          <h1 className="text-[#00AAE7] text-3xl font-bold tracking-wide">Gloro</h1>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search news, games & Tournaments"
              className="w-full bg-white/5 border border-white/10 rounded-full pl-12 pr-4 py-3 text-black placeholder-gray-400 text-sm focus:outline-none focus:border-[#00AAE7]/50 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <a
            href="#"
            onClick={() => setActiveLink('Home')}
            className={`text-base font-medium transition-colors ${
              activeLink === 'Home' ? 'text-[#00AAE7]' : 'text-black hover:text-[#00AAE7]'
            }`}
          >
            Home
          </a>
          <a
            href="#"
            onClick={() => setActiveLink('Tournaments')}
            className={`text-base font-medium transition-colors ${
              activeLink === 'Tournaments' ? 'text-[#00AAE7]' : 'text-black hover:text-[#00AAE7]'
            }`}
          >
            Tournaments
          </a>
          <a
            href="#"
            onClick={() => setActiveLink('Training')}
            className={`text-base font-medium transition-colors ${
              activeLink === 'Training' ? 'text-[#00AAE7]' : 'text-black hover:text-[#00AAE7]'
            }`}
          >
            Training
          </a>
          <button
            className="flex items-center gap-1 text-base font-medium text-black hover:text-[#00AAE7] transition-colors"
          >
            Categories
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Register Button */}
        <div className="flex-shrink-0 ml-8">
          <button 
            className="px-8 py-3 rounded-full text-white font-medium text-base transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(90deg, #4A61DD 0%, #00AAE7 100%)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            Register Now
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;