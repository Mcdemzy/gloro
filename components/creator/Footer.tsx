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
import Link from "next/link";

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Linkedin, href: "#" },
    { icon: Youtube, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Rss, href: "#" },
  ];

  const footerLinks = [
    { label: "ABOUT US", href: "#" },
    { label: "CONTACT US", href: "#" },
    { label: "HELP", href: "#" },
    { label: "PRIVACY POLICY", href: "#" },
    { label: "DISCLAIMER", href: "#" },
  ];

  return (
    <footer className="bg-[#0a2d36] border-t border-cyan-500/20 mt-12">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h1 className="text-cyan-400 text-4xl font-bold mb-6">Gloro</h1>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300 text-sm">
                <MapPin size={18} className="text-cyan-400" />
                <p>345 Faulconer Drive, Suite 4 • Charlottesville, CA, 12345</p>
              </div>
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-3 text-gray-300 text-sm">
                  <Phone size={16} className="text-cyan-400" />
                  <p>(123) 456-7890</p>
                </div>
                <div className="flex items-center gap-3 text-gray-300 text-sm">
                  <Printer size={16} className="text-cyan-400" />
                  <p>(123) 456-7890</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Social Media
            </h3>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-white/5 border border-cyan-500/20 rounded-lg flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-cyan-500/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div className="flex gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p className="text-gray-500">Copyright © 2018 • Lift Media Inc.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
