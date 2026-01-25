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
} from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Rss, href: "#", label: "RSS" },
  ];

  const footerLinks = [
    { title: "ABOUT US", href: "#" },
    { title: "CONTACT US", href: "#" },
    { title: "HELP", href: "#" },
    { title: "PRIVACY POLICY", href: "#" },
    { title: "DISCLAIMER", href: "#" },
  ];

  return (
    <main className="w-full bg-[#0a0a14] mt-20 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Left - Logo and Contact */}
          <div className="space-y-8">
            <h1 className="text-cyan-400 text-5xl font-bold orbitron">Gloro</h1>

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

          {/* Right - Social Media */}
          <div className="space-y-6">
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
          <div className="flex flex-wrap gap-6 justify-center md:justify-start">
            {footerLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-gray-400 hover:text-cyan-400 text-sm font-medium transition-colors duration-300 uppercase tracking-wide"
              >
                {link.title}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-gray-500 text-sm">
            Copyright © 2018 • Lift Media Inc.
          </div>
        </div>
      </div>
    </main>
  );
};

export default Footer;
