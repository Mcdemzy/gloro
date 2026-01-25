import React from "react";

const Footer = () => {
  const socialMedia = [
    "facebook",
    "twitter",
    "linkedin",
    "youtube",
    "instagram",
    "google",
    "pinterest",
    "rss",
  ];

  const footerLinks = [
    { label: "ABOUT US", href: "#" },
    { label: "CONTACT US", href: "#" },
    { label: "HELP", href: "#" },
    { label: "PRIVACY POLICY", href: "#" },
    { label: "DISCLAIMER", href: "#" },
  ];

  return (
    <footer className="border-t border-white/10 bg-[#0a1628]/80 mt-16">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="text-3xl font-bold text-cyan-400 mb-6">Gloro</div>
            <div className="space-y-3 text-gray-400">
              <p>📍 345 Faulconer Drive, Suite 4 • Charlottesville, CA 12345</p>
              <p>📞 (123) 456-7890</p>
              <p>🖨️ (123) 456-7890</p>
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Social Media</h3>
            <div className="flex gap-4">
              {socialMedia.map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-cyan-500/20 flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-all duration-300"
                >
                  <span className="text-xs">📱</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-between items-center pt-8 border-t border-white/10">
          <div className="flex gap-8 text-sm text-gray-400">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-cyan-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <p className="text-sm text-gray-400">
            Copyright © 2018 • UR Media Inc.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
