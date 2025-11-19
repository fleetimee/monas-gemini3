"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const title = "MONAS";

  return (
    <section ref={containerRef} className="relative h-[100vh] md:h-[120vh] w-full overflow-hidden bg-black">
      {/* Parallax Background Image */}
      <motion.div 
        style={{ y, opacity }} 
        className="absolute inset-0 z-0"
      >
        <Image
          src="/monas-view.jpg"
          alt="Monas View"
          fill
          sizes="100vw"
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
      </motion.div>

      <div className="relative z-10 h-screen flex flex-col items-center justify-center px-6">
        <motion.div
          style={{ y: textY }}
          className="text-center flex flex-col items-center"
        >
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-primary/90 text-sm md:text-lg tracking-[0.5em] uppercase mb-8 font-medium"
          >
            Jakarta • Indonesia
          </motion.p>
          
          <h1 className="font-serif text-[18vw] leading-[0.8] font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/20 tracking-tighter mix-blend-overlay flex overflow-hidden">
            {title.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ 
                  duration: 1.2, 
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.1 
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </h1>
          
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
            className="h-px w-32 bg-white/30 mx-auto my-12" 
          />

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-white/70 text-lg md:text-2xl max-w-xl mx-auto font-light tracking-wide leading-relaxed mix-blend-screen"
          >
            The Spirit of Independence
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-12 left-8 flex items-center space-x-4 text-white/50 mix-blend-difference z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="h-px w-16 bg-current" />
        <span className="text-xs tracking-[0.2em] uppercase">Scroll to Explore</span>
      </motion.div>
    </section>
  );
}
