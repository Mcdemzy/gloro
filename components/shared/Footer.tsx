import React from "react";
import {
  MapPin,
  Phone,
  Printer,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  Rss,
  Mail,
  Send,
} from "lucide-react";
import Image from "next/image";
import Logo from "@/assets/images/logo.png";

const Footer = () => {
  const socialLinks = [
    // { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    // { icon: Youtube, href: "#", label: "YouTube" },
    // { icon: Instagram, href: "#", label: "Instagram" },
    // { icon: Rss, href: "#", label: "RSS" },
  ];

  const footerLinks = [
    // { title: "ABOUT US", href: "#" },
    // { title: "CONTACT US", href: "#" },
    // { title: "HELP", href: "#" },
    // { title: "PRIVACY POLICY", href: "#" },
    // { title: "DISCLAIMER", href: "#" },
  ];

  return (
    <main className="w-full bg-[#0a0a14] mt-20 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Top Section - Now with 3 columns on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          {/* Left - Logo and Contact */}
          <div className="space-y-8 lg:col-span-1">
            <div className="relative w-[280px] h-[160px]">
              <Image 
                src={Logo} 
                alt="Gloroq Logo" 
                fill
                className="object-contain object-left"
                priority={false}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 text-gray-300">
                <MapPin
                  size={20}
                  className="text-cyan-400 mt-1 flex-shrink-0"
                />
                <p className="text-sm">
                  345 Faulconer Drive, Suite 4 • Charlottesville, CA, 12345
                </p>
              </div>

              <div className="flex items-center gap-8">
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone size={18} className="text-cyan-400" />
                  <p className="text-sm">(123) 456-7890</p>
                </div>

                <div className="flex items-center gap-3 text-gray-300">
                  <Printer size={18} className="text-cyan-400" />
                  <p className="text-sm">(123) 456-7890</p>
                </div>
              </div>
            </div>
          </div>

          {/* Middle - Newsletter Subscription */}
          <div className="lg:col-span-1 space-y-6">
            <h3 className="text-white text-lg font-semibold flex items-center gap-2">
              <Mail className="w-5 h-5 text-cyan-400" />
              Newsletter
            </h3>
            
            <p className="text-gray-400 text-sm leading-relaxed">
              Subscribe to our newsletter for learning tips, platform updates, and tech insights.
            </p>

            <div className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-white/5 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all text-sm"
                />
              </div>
              
              <button className="w-full px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium text-sm hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2 group">
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                Subscribe
              </button>
            </div>

            {/* Trust indicator */}
            <p className="text-xs text-gray-600">
              No spam. Unsubscribe anytime.
            </p>
          </div>

          {/* Right - Social Media */}
          <div className="lg:col-span-1 space-y-6">
            <h3 className="text-white text-lg font-semibold">Social Media</h3>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-12 h-12 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all duration-300"
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Footer Links */}
          {/* <div className="flex flex-wrap gap-6 justify-center md:justify-start">
            {footerLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-gray-400 hover:text-cyan-400 text-sm font-medium transition-colors duration-300 uppercase tracking-wide"
              >
                {link.title}
              </a>
            ))}
          </div> */}

          {/* Copyright */}
          <div className="text-gray-500 text-sm text-center w-full">
            Copyright © 2026 • <span className="orbitron">Gloroq</span>.
          </div>
        </div>
      </div>
    </main>
  );
};

export default Footer;