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
    <main className="w-full mt-10 px-4 md:px-12">
      <div className="mx-auto px-4 md:px-6 py-8 md:py-12 border-t border-[#ffffff30]">
        {/* Mobile */}
        <div className="flex flex-col items-center gap-5 lg:hidden mb-6">
          <h1 className="text-white text-3xl font-bold orbitron">GloroQ</h1>
          <div className="flex items-start gap-2 text-gray-400 text-center">
            <MapPin size={15} className="text-white mt-0.5 shrink-0" />
            <p className="text-xs leading-relaxed">
              345 Faulconer Drive, Suite 4 • Charlottesville, CA, 12345
            </p>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Phone size={15} className="text-white" />
            <p className="text-xs">(123) 456-7890</p>
          </div>
          <div className="flex items-center gap-5">
            {socialLinks.slice(0, 4).map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="text-white hover:text-cyan-400 transition-colors"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden lg:grid grid-cols-2 gap-8 mb-12">
          <div>
            <h1 className="text-white text-5xl font-bold orbitron">GloroQ</h1>
          </div>
          <div className="space-y-6">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin size={16} className="text-white shrink-0" />
                <p className="text-xs">
                  345 Faulconer Drive, Suite 4 • Charlottesville, CA, 12345
                </p>
              </div>
              <div className="flex items-center gap-16">
                <div className="flex items-center gap-2 text-gray-400">
                  <Phone size={16} className="text-white" />
                  <p className="text-xs">(123) 456-7890</p>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Printer size={16} className="text-white" />
                  <p className="text-xs">(123) 456-7890</p>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <span className="text-white text-xs whitespace-nowrap">
                Social Media
              </span>
              <div className="flex flex-wrap gap-5">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="text-white hover:text-cyan-400 transition-colors"
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#ffffff20] pt-4">
          <div className="flex lg:hidden justify-center gap-6 flex-wrap">
            {footerLinks
              .filter((l) =>
                ["CONTACT US", "PRIVACY POLICY", "DISCLAIMER"].includes(
                  l.title,
                ),
              )
              .map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className="text-white/50 hover:text-cyan-400 text-[10px] transition-colors uppercase tracking-wide"
                >
                  {link.title}
                </a>
              ))}
          </div>
          <div className="hidden lg:flex flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-8">
              {footerLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className="text-white/50 hover:text-cyan-400 text-[10px] transition-colors uppercase tracking-wide"
                >
                  {link.title}
                </a>
              ))}
            </div>
            <p className="text-white/40 text-[10px] whitespace-nowrap">
              Copyright © 2018 • Lift Media Inc.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Footer;
