// src\components\layout\Header.tsx
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLoader } from "@/lib/loader-context";

const topMessages: string[] = [
  "Customizable magnets tailored to your occasion",
  "Premium designs crafted for every celebration",
  "Special pricing available for bulk orders",
  "High-quality prints with lasting finish",
  "Dedicated customer support available 24/7",
];

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { label: "WEDDING", slug: "wedding-invites" },
    { label: "BIRTHDAY", slug: "birthday" },
    { label: "ANNIVERSARY", slug: "anniversary" },
    { label: "HOUSEWARMING", slug: "house-warming" },
  ];

  // Text carousel timing
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % topMessages.length);
    }, 6000); // 1s move + 5s wait
    return () => clearInterval(timer);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { done } = useLoader();
  return (
    <>
      {/* ================= TOP BAR ================= */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="bg-[#a86dcd] text-white text-xs sm:text-sm px-3 py-2 overflow-hidden">
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            {/* Phone */}
            <div className="flex items-center gap-2 shrink-0">
              <Phone className="w-4 h-4" />
              <a
                href="tel:+919121080131"
                className="font-semibold underline whitespace-nowrap"
              >
                +91 9121080131
              </a>
            </div>

            {/* Animated Message */}
            <div className="relative flex-1 h-5 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{
                    x: "0%",
                    opacity: 1,
                    transition: {
                      x: { duration: 0.6, ease: "easeInOut" },
                      opacity: { duration: 0.3 },
                    },
                  }}
                  exit={{
                    x: "-100%",
                    opacity: 0,
                    transition: {
                      x: { duration: 0.6, ease: "easeIn" },
                      opacity: { duration: 0.3 },
                    },
                  }}
                  className="absolute inset-0 flex items-center justify-center text-center font-medium whitespace-nowrap"
                >
                  {topMessages[activeIndex]}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Social Icons */}
            <div className="hidden md:flex items-center gap-4 shrink-0">
              <a
                href="https://www.facebook.com/outrightluring"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-facebook-f text-lg" />
              </a>
              <a
                href="https://www.instagram.com/outrightsluringinvite/"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-instagram text-lg" />
              </a>
              <a
                href="https://in.pinterest.com/luringinvite/"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-pinterest-p text-lg" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCNM3O5018f7nqLKFn3UIH8w"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-youtube text-lg" />
              </a>
              <a
                href="https://in.linkedin.com/in/luring-invite-94a35928b"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-linkedin-in text-lg" />
              </a>
            </div>
          </div>
        </div>

        {/* ================= HEADER ================= */}
        <header className="bg-white shadow-md top-0 z-50 font-outfit">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between py-2">
              {/* Logo */}
              <Link to="/" className="relative h-20 flex items-center">
                {done && (
                  <motion.img
                    layoutId="site-logo"
                    src="https://res.cloudinary.com/drdotym31/image/upload/v1750078130/main-logo-1-1024x795_lfasd5.webp"
                    alt="Logo"
                    className="h-16 sm:h-20 w-auto object-contain"
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />
                )}
              </Link>
              {/* Desktop Nav */}
              <nav
                ref={dropdownRef}
                className="hidden lg:flex items-center gap-8"
              >
                {navItems.map(({ label, slug }) => (
                  <Link
                    key={slug}
                    to={`/collections/${slug}`}
                    className="font-semibold hover:text-[#A86DCD]"
                  >
                    {label}
                  </Link>
                ))}
                <Link
                  to="/about"
                  className="font-semibold hover:text-[#A86DCD]"
                >
                  ABOUT
                </Link>
                <Link
                  to="/contact"
                  className="font-semibold hover:text-[#A86DCD]"
                >
                  CONTACT
                </Link>
              </nav>
              {/* Mobile Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </header>
      </div>
      {/* ================= MOBILE MENU ================= */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="p-4">
            <div className="flex justify-between items-center mb-8">
              <span className="text-xl font-bold">Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="space-y-5">
              {[
                ...navItems,
                { label: "ABOUT", slug: "about" },
                { label: "CONTACT", slug: "contact" },
              ].map(({ label, slug }) => (
                <Link
                  key={slug}
                  to={slug.startsWith("/") ? slug : `/${slug}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-lg font-medium"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
