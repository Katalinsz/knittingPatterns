import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/logo.png";
import bgPattern from "../assets/img.webp";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef(null);
  const dropdownRef = useRef(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
    setDropdownOpen(false);
  };

  return (
    <header className="relative h-[110px] w-full">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgPattern})` }}
      />

      <div className="container mx-auto px-4 relative z-10 h-full w-full">
        {/* Desktop Layout */}
        <div className="hidden md:flex h-full  w-full">
          <div className="h-[70px] flex items-center bg-[#fafafa]/90 pl-6 pr-8 rounded-br-[100px] shadow-sm backdrop-blur-sm min-w-[200px] fixed top-0 left-0">
            <img src={logo} alt="Logo" className="h-[32px]" />
          </div>

          <div className="flex-grow" />

          <nav
            className="h-[70px] flex items-center bg-[#fafafa]/90 pl-10 pr-8 rounded-bl-[100px] shadow-sm backdrop-blur-sm min-w-[300px] fixed top-0 right-0"
            ref={dropdownRef}
          >
            <ul className="flex gap-8 text-gray-800 font-medium items-center">
              {["Home", "Library", "Create Motive"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-green-600 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
              <li className="relative">
                <button
                  onClick={toggleDropdown}
                  className="bg-green-600 text-white px-4 py-1.5 rounded-full hover:bg-green-700 transition-colors"
                >
                  Login
                </button>
                {dropdownOpen && (
                  <ul className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                    {["Item 1", "Item 2"].map((item, index) => (
                      <li key={index}>
                        <a
                          href="#"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                          onClick={handleLinkClick}
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </ul>
          </nav>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex justify-between items-center h-[70px] px-4 bg-[#fafafa]/90 shadow-sm backdrop-blur-sm w-full">
          <div className="flex-1 flex justify-center">
            <img src={logo} alt="Logo" className="h-[32px]" />
          </div>

          <button
            onClick={toggleMenu}
            className="text-gray-800 focus:outline-none absolute right-4"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <nav
          ref={menuRef}
          className={`md:hidden bg-white/95 backdrop-blur-sm shadow-md rounded-b-lg transition-all duration-300 overflow-hidden w-full ${
            isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-6 py-4 space-y-4 w-full">
            {["Home", "Library", "Create Motive"].map((item) => (
              <a
                href="#"
                className="block text-gray-800 hover:text-green-600 py-2 text-center"
                onClick={handleLinkClick}
                key={item}
              >
                {item}
              </a>
            ))}
            <div className="relative flex justify-center">
              <button
                onClick={toggleDropdown}
                className="text-gray-800 hover:text-green-600 py-2"
              >
                Login
              </button>
              {dropdownOpen && (
                <div className="absolute top-full mt-2 bg-white rounded-md shadow-lg py-2 w-48 z-10">
                  {["Item 1", "Item 2"].map((item, index) => (
                    <a
                      key={index}
                      href="#"
                      className="block px-4 py-2 text-gray-600 hover:text-green-600 hover:bg-gray-100"
                      onClick={handleLinkClick}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
