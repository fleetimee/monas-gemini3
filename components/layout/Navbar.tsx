"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useBookingModal } from "@/components/ui/BookingModalProvider";

const navLinks = [
  { name: "History", href: "#history" },
  { name: "Collections", href: "#collections" },
  { name: "Visit", href: "#visit" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { open } = useBookingModal();

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
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out text-foreground",
          scrolled ? "py-6 bg-background/80 backdrop-blur-md border-b border-border/10" : "py-10 bg-transparent"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="group relative z-50">
            <span className="text-xl font-bold tracking-[0.3em] uppercase block group-hover:opacity-70 transition-opacity">
              Monas
            </span>
          </Link>

          {/* Desktop Nav - Minimal */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs font-medium tracking-[0.2em] uppercase hover:text-foreground/60 transition-colors relative group overflow-hidden"
              >
                <span className="block transition-transform duration-500 group-hover:-translate-y-full">
                  {link.name}
                </span>
                <span className="absolute top-0 left-0 block transition-transform duration-500 translate-y-full group-hover:translate-y-0 text-primary">
                  {link.name}
                </span>
              </Link>
            ))}
            <div className="w-px h-4 bg-border/20 mx-4" />
            <ThemeToggle />
            <button 
              onClick={open}
              className="text-xs font-medium tracking-[0.2em] uppercase border border-foreground/30 px-6 py-2 hover:bg-foreground hover:text-background transition-all duration-300"
            >
              Tickets
            </button>
          </nav>

          {/* Mobile Menu Trigger */}
          <button
            className="md:hidden flex flex-col space-y-1.5 group z-50 relative"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <motion.div 
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
              className="w-8 h-px bg-current origin-center transition-all" 
            />
            <motion.div 
              animate={{ opacity: menuOpen ? 0 : 1 }}
              className="w-8 h-px bg-current transition-all" 
            />
            <motion.div 
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
              className="w-8 h-px bg-current origin-center transition-all" 
            />
          </button>
        </div>
      </motion.header>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(100% 0 0 0)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center space-y-8">
               {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-5xl md:text-7xl font-serif text-white hover:text-primary transition-colors italic tracking-tighter"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
               <button
                 onClick={() => {
                   setMenuOpen(false);
                   open();
                 }}
                 className="mt-8 text-sm tracking-[0.3em] uppercase border-b border-primary text-primary pb-2"
               >
                 <motion.span
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: 0.6 }}
                 >
                  Book Tickets
                 </motion.span>
               </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}
