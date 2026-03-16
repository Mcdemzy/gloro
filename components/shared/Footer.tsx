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
import { FaGooglePlusG, FaPinterest } from "react-icons/fa";

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: FaGooglePlusG, href: "#", label: "Google Plus" },
    { icon: FaPinterest, href: "#", label: "Pinterest" },
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
    <main className="w-full mt-20 px-16">
      <div className="mx-auto px-4 md:px-8 py-20 border-t border-[#FFFFFF]">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          {/* Left - Logo and Contact */}
          <div className="space-y-8">
            <h1 className="text-[#FFFFFF] text-8xl font-bold orbitron">
              Gloro
            </h1>
          </div>

          {/* Right - Social Media */}
          <div className="space-y-14">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin size={28} className="text-[#FFFFFF] mt-1 shrink-0" />
                <p className="text-sm">
                  345 Faulconer Drive, Suite 4 • Charlottesville, CA, 12345
                </p>
              </div>

              <div className="flex items-center gap-32">
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone size={28} className="text-[#FFFFFF]" />
                  <p className="text-sm">(123) 456-7890</p>
                </div>

                <div className="flex items-center gap-3 text-gray-300">
                  <Printer size={28} className="text-[#FFFFFF]" />
                  <p className="text-sm">(123) 456-7890</p>
                </div>
              </div>
            </div>
            <div className="flex items-start">
              <h3 className="text-[#FFFFFF] text-sm mr-10 font-normal">
                Social Media
              </h3>

              <div className="flex flex-wrap gap-9">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="flex items-center justify-center text-[#FFFFFF] hover:text-cyan-400 transition-all duration-300"
                    >
                      <Icon size={28} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>  

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-[#FFFFFF]">
          {/* Footer Links */}
          <div className="flex flex-wrap gap-16 justify-center md:justify-start">
            {footerLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-[#FFFFFF] hover:text-cyan-400 text-xs font-normal transition-colors duration-300 uppercase tracking-wide"
              >
                {link.title}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-[#FFFFFF] text-xs font-normal">
            Copyright © 2018 • Lift Media Inc.
          </div>
        </div>
      </div>
    </main>
  );
};

export default Footer;
