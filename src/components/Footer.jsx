import React from "react";
import logo from "../assets/logo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    about: [
      { name: "About us", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Contact us", href: "/contact" },
    ],
    policies: [
      { name: "Terms and conditions", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Cookies", href: "/cookies" },
      { name: "Licenses", href: "/licenses" },
    ],
    followUs: [
      { name: "Facebook", href: "#" },
      { name: "Pinterest", href: "#" },
      { name: "Instagram", href: "#" },
    ],
  };

  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          {/* Logo Column */}
          <div className="space-y-4">
            <div className="flex justify-center md:justify-start">
              <img src={logo} alt="Knitted for You" className="h-8 w-auto" />
            </div>
            <div className="text-sm text-gray-600 leading-relaxed">
              <p>Knitted mediq is a community for</p>
              <p>discussing, sharing inspiring needs</p>
              <p>and finding creative people worldwide.</p>
            </div>
          </div>

          {/* About Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-800 uppercase tracking-wide">
              About
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-gray-800 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-800 uppercase tracking-wide">
              And Find Movies
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {footerLinks.policies.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-gray-800 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-800 uppercase tracking-wide">
              Follow Us
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {footerLinks.followUs.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-gray-800 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
