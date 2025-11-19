"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const timelineEvents = [
  { year: "1961", title: "Construction Begins", desc: "President Soekarno lays the first concrete pile, marking the start of the National Monument's construction." },
  { year: "1965", title: "Structure Complete", desc: "The main structure reaches its full height of 132 meters, dominating the Jakarta skyline." },
  { year: "1975", title: "Official Opening", desc: "Monas is officially opened to the public by President Soeharto, becoming a national icon." },
  { year: "1995", title: "Golden Jubilee", desc: "Celebration of 50 years of Indonesian independence, with Monas as the centerpiece." },
];

export function Timeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={containerRef} className="py-32 bg-black relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <span className="text-primary text-xs tracking-[0.5em] uppercase block mb-6">
            Chronology
          </span>
          <h2 className="font-serif text-5xl md:text-6xl text-white">
            Journey Through Time
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent -translate-x-1/2" />

          <div className="space-y-24">
            {timelineEvents.map((event, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`flex items-center ${isEven ? "flex-row" : "flex-row-reverse"}`}
                >
                  {/* Content Side */}
                  <div className={`w-1/2 ${isEven ? "pr-12 text-right" : "pl-12 text-left"}`}>
                    <span className="text-primary font-serif text-4xl md:text-5xl block mb-4 opacity-80">
                      {event.year}
                    </span>
                    <h3 className="text-white text-2xl font-serif mb-4">{event.title}</h3>
                    <p className="text-white/50 leading-relaxed font-light">
                      {event.desc}
                    </p>
                  </div>

                  {/* Center Dot */}
                  <div className="relative z-10 flex items-center justify-center w-8 h-8">
                    <div className="w-3 h-3 bg-primary rounded-full shadow-[0_0_20px_rgba(255,215,0,0.5)]" />
                    <div className="absolute inset-0 border border-white/20 rounded-full scale-0 animate-ping" />
                  </div>

                  {/* Empty Side */}
                  <div className="w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
