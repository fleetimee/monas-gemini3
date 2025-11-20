"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

interface ThemeTransitionContextType {
  toggleTheme: () => void;
}

const ThemeTransitionContext = createContext<ThemeTransitionContextType | undefined>(undefined);

export function ThemeTransitionProvider({ children }: { children: ReactNode }) {
  const { theme, setTheme } = useTheme();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const toggleTheme = async () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    // Wait for the "cover" animation to complete before switching theme
    setTimeout(() => {
      setTheme(theme === "dark" ? "light" : "dark");
    }, 150); // Match this with the animation duration

    // Wait for the "reveal" animation to complete
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <ThemeTransitionContext.Provider value={{ toggleTheme }}>
      {children}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden"
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={{ clipPath: "circle(150% at 50% 50%)" }}
            exit={{ clipPath: "circle(0% at 50% 50%)" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
             {/* Museum Style Gradient Background (Gold/Neutral) */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#c6a87c] via-[#1a1a1a] to-[#0f0f10] animate-gradient-xy" />
            
            {/* Noise Overlay for texture */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          </motion.div>
        )}
      </AnimatePresence>
    </ThemeTransitionContext.Provider>
  );
}

export function useThemeTransition() {
  const context = useContext(ThemeTransitionContext);
  if (context === undefined) {
    throw new Error("useThemeTransition must be used within a ThemeTransitionProvider");
  }
  return context;
}
