"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-[120vh] w-full overflow-hidden bg-black">
      {/* Parallax Background Image */}
      <motion.div 
        style={{ y, opacity }} 
        className="absolute inset-0 z-0"
      >
        <Image
          src="/monas-view.jpg"
          alt="Monas National Monument"
          fill
          className="object-cover opacity-70 scale-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black" />
      </motion.div>

      <div className="relative z-10 h-screen flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p className="text-primary/80 text-sm md:text-lg tracking-[0.5em] uppercase mb-6 font-medium">
            Jakarta • Indonesia
          </p>
          
          <h1 className="font-serif text-[15vw] leading-[0.8] font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 tracking-tighter mix-blend-overlay">
            MONAS
          </h1>
          
          <div className="h-px w-24 bg-white/20 mx-auto my-8" />

          <p className="text-white/80 text-lg md:text-2xl max-w-xl mx-auto font-light tracking-wide leading-relaxed mix-blend-difference">
            The Spirit of Independence
          </p>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-6 flex items-center space-x-4 text-white/60 mix-blend-difference z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="h-px w-12 bg-current" />
        <span className="text-xs tracking-[0.2em] uppercase">Scroll to Explore</span>
      </motion.div>
    </section>
  );
}
