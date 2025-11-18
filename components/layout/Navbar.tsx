"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "History", href: "#history" },
  { name: "Collections", href: "#collections" },
  { name: "Visit", href: "#visit" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out mix-blend-difference text-white",
          scrolled ? "py-6" : "py-10"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="group">
            <span className="text-xl font-bold tracking-[0.3em] uppercase block group-hover:opacity-70 transition-opacity">
              Monas
            </span>
          </Link>

          {/* Desktop Nav - Minimal */}
          <nav className="hidden md:flex items-center space-x-12">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs font-medium tracking-[0.2em] uppercase hover:text-white/60 transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <button className="text-xs font-medium tracking-[0.2em] uppercase border border-white/30 px-6 py-2 hover:bg-white hover:text-black transition-all duration-300">
              Tickets
            </button>
          </nav>

          {/* Mobile Menu Trigger */}
          <button
            className="md:hidden flex flex-col space-y-1.5 group"
            onClick={() => setMenuOpen(true)}
          >
            <div className="w-8 h-px bg-current group-hover:w-6 transition-all" />
            <div className="w-8 h-px bg-current" />
            <div className="w-8 h-px bg-current group-hover:w-6 transition-all self-end" />
          </button>
        </div>
      </motion.header>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[60] bg-[#0a0a0a] flex flex-col items-center justify-center"
          >
            <button 
              className="absolute top-10 right-6 text-white p-4"
              onClick={() => setMenuOpen(false)}
            >
              Close [x]
            </button>
            
            <nav className="flex flex-col items-center space-y-8">
               {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-4xl font-serif text-white hover:text-primary transition-colors italic"
                >
                  {link.name}
                </Link>
              ))}
               <button className="mt-8 text-sm tracking-[0.3em] uppercase border-b border-primary text-primary pb-2">
                Book Tickets
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
