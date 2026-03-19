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
    <main className="w-full mt-20 px-4 md:px-16">
      <div className="mx-auto px-4 md:px-8 py-12 md:py-20 border-t border-[#FFFFFF]">
        {/* ── MOBILE LAYOUT (hidden on lg+) ── */}
        <div className="flex flex-col items-center gap-8 lg:hidden mb-10">
          {/* Logo */}
          <h1 className="text-[#FFFFFF] text-5xl font-bold orbitron text-center">
            GloroQ
          </h1>

          {/* Address */}
          <div className="flex items-start gap-3 text-gray-300 text-center">
            <MapPin size={22} className="text-[#FFFFFF] mt-0.5 shrink-0" />
            <p className="text-sm leading-relaxed">
              345 Faulconer Drive, Suite 4 •<br />
              Charlottesville, CA, 12345
            </p>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3 text-gray-300">
            <Phone size={22} className="text-[#FFFFFF]" />
            <p className="text-sm">(123) 456-7890</p>
          </div>

          {/* Social icons — show first 4, rest overflow hidden */}
          <div className="flex items-center gap-8 overflow-hidden">
            {socialLinks.slice(0, 4).map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="text-[#FFFFFF] hover:text-cyan-400 transition-all duration-300"
                >
                  <Icon size={26} />
                </a>
              );
            })}
          </div>
        </div>

        {/* ── DESKTOP LAYOUT (hidden below lg) ── */}
        <div className="hidden lg:grid grid-cols-2 gap-12 mb-24">
          {/* Left - Logo */}
          <div className="space-y-8">
            <h1 className="text-[#FFFFFF] text-4xl md:text-8xl font-bold orbitron">
              GloroQ
            </h1>
          </div>

          {/* Right - Contact + Social */}
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

        {/* ── BOTTOM BAR — shared, adapts per breakpoint ── */}
        <div className="border-t border-[#FFFFFF] pt-5">
          {/* Mobile bottom: 3 key links centered, others hidden */}
          <div className="flex lg:hidden justify-center gap-10 flex-wrap">
            {footerLinks
              .filter((l) =>
                ["CONTACT US", "PRIVACY POLICY", "DISCLAIMER"].includes(
                  l.title,
                ),
              )
              .map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-[#FFFFFF] hover:text-cyan-400 text-xs font-normal transition-colors duration-300 uppercase tracking-wide"
                >
                  {link.title}
                </a>
              ))}
          </div>

          {/* Desktop bottom: all links + copyright */}
          <div className="hidden lg:flex flex-row justify-between items-center gap-6">
            <div className="flex flex-wrap gap-16">
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
            <div className="text-[#FFFFFF] text-xs font-normal whitespace-nowrap">
              Copyright © 2018 • Lift Media Inc.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Footer;
