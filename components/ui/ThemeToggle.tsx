"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useThemeTransition } from "@/components/ui/ThemeTransition";

export function ThemeToggle() {
  const { resolvedTheme } = useTheme();
  const { toggleTheme } = useThemeTransition();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10" />; // Placeholder to avoid hydration mismatch
  }

  const isDark = resolvedTheme === "dark";

  return (
    <motion.button
      onClick={toggleTheme}
      className={cn(
        "relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border",
        isDark 
          ? "bg-neutral-900 border-[#c6a87c]/30 hover:border-[#c6a87c] hover:bg-neutral-800" 
          : "bg-[#f4f4f5] border-[#c6a87c]/30 hover:border-[#c6a87c] hover:bg-white"
      )}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? "dark" : "light"}
          initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.5, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.3, ease: "backOut" }}
        >
          {isDark ? (
            <Moon size={18} className="text-[#c6a87c]" />
          ) : (
            <Sun size={18} className="text-[#c6a87c]" />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}
