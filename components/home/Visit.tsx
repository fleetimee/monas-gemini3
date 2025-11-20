"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Clock, Calendar, ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { useBookingModal } from "@/components/ui/BookingModalProvider";

const MonasMap = dynamic(() => import("@/components/ui/MonasMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
      Loading Map...
    </div>
  ),
});

export function Visit() {
  const containerRef = useRef(null);
  const { open } = useBookingModal();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const textX = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);

  return (
    <section ref={containerRef} id="visit" className="min-h-screen bg-background relative flex flex-col md:flex-row overflow-hidden">
      
      {/* Background Typography */}
      <motion.div 
        style={{ x: textX }}
        className="absolute top-20 right-0 pointer-events-none select-none opacity-[0.03] whitespace-nowrap z-0"
      >
        <span className="font-serif text-[20vw] font-bold text-foreground leading-none">LOCATION</span>
      </motion.div>

      {/* Info Side */}
      <div className="w-full md:w-1/2 p-6 md:p-24 flex flex-col justify-center border-r border-foreground/5 z-10 bg-background/80 backdrop-blur-sm">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="block text-primary text-xs tracking-[0.3em] uppercase mb-8">
            Plan Your Visit
          </span>
          <h3 className="font-serif text-4xl md:text-6xl text-foreground mb-16 leading-tight">
            Experience <br />
            <span className="italic text-muted-foreground">The Monument</span>
          </h3>
          
          <div className="space-y-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
              className="group cursor-pointer"
            >
              <div className="flex items-center justify-between border-b border-foreground/10 pb-4 mb-2 group-hover:border-primary transition-colors duration-500">
                <h4 className="text-xl font-medium text-foreground">Opening Hours</h4>
                <Clock className="text-foreground/30 group-hover:text-primary transition-colors duration-500" size={20} />
              </div>
              <p className="text-muted-foreground font-light">Tue - Sun: 08:00 - 16:00 (Closed Mondays)</p>
            </motion.div>

             <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
              className="group cursor-pointer"
            >
              <div className="flex items-center justify-between border-b border-foreground/10 pb-4 mb-2 group-hover:border-primary transition-colors duration-500">
                <h4 className="text-xl font-medium text-foreground">Location</h4>
                <MapPin className="text-foreground/30 group-hover:text-primary transition-colors duration-500" size={20} />
              </div>
              <p className="text-muted-foreground font-light">Merdeka Square, Gambir, Central Jakarta</p>
            </motion.div>
            
             <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
              className="group cursor-pointer"
            >
              <div className="flex items-center justify-between border-b border-foreground/10 pb-4 mb-2 group-hover:border-primary transition-colors duration-500">
                <h4 className="text-xl font-medium text-foreground">Tickets</h4>
                <Calendar className="text-foreground/30 group-hover:text-primary transition-colors duration-500" size={20} />
              </div>
              <div className="flex justify-between items-end">
                <p className="text-muted-foreground font-light">From IDR 4,000 to IDR 15,000</p>
                <button 
                  onClick={open}
                  className="flex items-center space-x-2 text-primary text-sm uppercase tracking-widest hover:text-foreground transition-colors duration-300 group/btn"
                >
                  <span>Book Now</span>
                  <ArrowRight size={16} className="transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Map Side */}
      <motion.div 
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        whileInView={{ clipPath: "inset(0 0 0 0)" }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.87, 0, 0.13, 1] }}
        className="w-full md:w-1/2 min-h-[40vh] md:min-h-screen relative grayscale hover:grayscale-0 transition-all duration-1000 z-10"
      >
         <MonasMap />
         <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent pointer-events-none" />
      </motion.div>
    </section>
  );
}
