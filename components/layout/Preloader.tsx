"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0f0f10]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <h1 className="font-serif text-4xl md:text-6xl text-primary font-bold tracking-widest">
                MONAS
              </h1>
            </motion.div>
            <motion.div
              className="h-px w-0 bg-white/20 mx-auto"
              animate={{ width: "100px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            <motion.p
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.5 }}
               className="text-xs text-muted-foreground mt-2 tracking-[0.3em] uppercase"
            >
              Jakarta, Indonesia
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

