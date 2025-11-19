"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export function History() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const textX = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section id="history" className="py-20 md:py-40 bg-black relative overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20">
          
          <div className="w-full md:w-5/12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <span className="block text-primary text-xs tracking-[0.3em] uppercase mb-6">
                1961 — 1975
              </span>
              <h2 className="font-serif text-4xl md:text-7xl text-white mb-12 leading-[1.1]">
                The Flame of <br />
                <span className="text-white/50">Independence</span>
              </h2>
              
              <div className="space-y-8 text-muted-foreground text-lg font-light leading-relaxed">
                <p>
                  Commissioned by President Soekarno, the National Monument stands as a testament to the unyielding spirit of the Indonesian people.
                </p>
                <p>
                  At its pinnacle, a flame coated in 50kg of gold foil burns eternally—a beacon of hope and freedom visible from across the capital.
                </p>
              </div>

              <div className="mt-12 flex items-center space-x-8">
                <div>
                  <p className="text-4xl font-serif text-white">132<span className="text-sm text-primary ml-2">m</span></p>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mt-2">Height</p>
                </div>
                <div className="h-12 w-px bg-white/10" />
                 <div>
                  <p className="text-4xl font-serif text-white">14.5<span className="text-sm text-primary ml-2">ton</span></p>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mt-2">Bronze Flame</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="w-full md:w-6/12 relative">
             <motion.div style={{ y }} className="relative aspect-[3/4] md:aspect-[4/5] w-full">
                <motion.div
                  initial={{ clipPath: "inset(100% 0 0 0)" }}
                  whileInView={{ clipPath: "inset(0 0 0 0)" }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full"
                >
                  <Image
                    src="/monas-relief.jpg"
                    alt="Monas History Relief"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-1000"
                  />
                </motion.div>
                {/* Decorative frame */}
                <div className="absolute -inset-4 border border-white/10 -z-10" />
             </motion.div>
          </div>

        </div>
      </div>
      
      {/* Background Typography */}
      <motion.div 
        style={{ x: textX }}
        className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none select-none opacity-[0.03] whitespace-nowrap w-full"
      >
        <span className="font-serif text-[25vw] font-bold text-white leading-none">HERITAGE</span>
      </motion.div>
    </section>
  );
}
