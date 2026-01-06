import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { label: "WEDDING", key: "wedding" },
    { label: "BIRTHDAY", key: "birthday" },
    { label: "ANNIVERSARY", key: "anniversary" },
    { label: "HOUSEWARMING", key: "house-warming" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#a86dcd] text-white text-sm px-4 py-2 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <a
              href="tel:+919121080131"
              className="font-semibold underline whitespace-nowrap"
            >
              +91 9121080131
            </a>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <a href="https://www.facebook.com/outrightluring" target="_blank" rel="noreferrer">
              <i className="fab fa-facebook-f text-white text-lg"></i>
            </a>
            <a href="https://www.instagram.com/outrightsluringinvite/" target="_blank" rel="noreferrer">
              <i className="fab fa-instagram text-white text-lg"></i>
            </a>
            <a href="https://in.pinterest.com/luringinvite/" target="_blank" rel="noreferrer">
              <i className="fab fa-pinterest-p text-white text-lg"></i>
            </a>
            <a href="https://www.youtube.com/channel/UCNM3O5018f7nqLKFn3UIH8w" target="_blank" rel="noreferrer">
              <i className="fab fa-youtube text-white text-lg"></i>
            </a>
            <a href="https://in.linkedin.com/in/luring-invite-94a35928b" target="_blank" rel="noreferrer">
              <i className="fab fa-linkedin-in text-white text-lg"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50 font-outfit">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2 gap-6">

            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <img
                  src="https://res.cloudinary.com/drdotym31/image/upload/v1750078130/main-logo-1-1024x795_lfasd5.webp"
                  alt="Logo"
                  className="h-20 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav
              className="hidden lg:flex items-center space-x-8 flex-grow justify-center"
              ref={dropdownRef}
            >
              {navItems.map(({ label, key }) => (
                <Link
                  key={key}
                  to={`/${key}`}
                  className="font-semibold text-black hover:text-[#A86DCD] transition-colors"
                >
                  {label}
                </Link>
              ))}

              <Link
                to="/about"
                className="font-semibold text-black hover:text-[#A86DCD] transition-colors"
              >
                ABOUT
              </Link>

              <Link
                to="/contact"
                className="font-semibold text-black hover:text-[#A86DCD] transition-colors"
              >
                CONTACT
              </Link>
            </nav>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-[#A86DCD]"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-8">
              <span className="text-xl font-elegant font-bold text-gray-800">
                Menu
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-md text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="space-y-4">
              {navItems.map(({ label, key }) => (
                <Link
                  key={key}
                  to={`/${key}`}
                  className="block text-lg text-gray-700 hover:text-[#A86DCD]"
                >
                  {label}
                </Link>
              ))}

              <Link
                to="/about"
                className="block text-lg text-gray-700 hover:text-[#A86DCD]"
              >
                ABOUT
              </Link>

              <Link
                to="/contact"
                className="block text-lg text-gray-700 hover:text-[#A86DCD]"
              >
                CONTACT
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
