"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Calendar, ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";

const MonasMap = dynamic(() => import("@/components/ui/MonasMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#1a1a1a] text-muted-foreground">
      Loading Map...
    </div>
  ),
});

export function Visit() {
  return (
    <section id="visit" className="min-h-screen bg-black relative flex flex-col md:flex-row">
      
      {/* Info Side */}
      <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center border-r border-white/5 z-10 bg-black">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <span className="block text-primary text-xs tracking-[0.3em] uppercase mb-8">
            Plan Your Visit
          </span>
          <h3 className="font-serif text-5xl md:text-6xl text-white mb-16 leading-tight">
            Experience <br />
            <span className="italic text-white/50">The Monument</span>
          </h3>
          
          <div className="space-y-12">
            <div className="group cursor-pointer">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-2 group-hover:border-primary transition-colors">
                <h4 className="text-xl font-medium text-white">Opening Hours</h4>
                <Clock className="text-white/30 group-hover:text-primary transition-colors" size={20} />
              </div>
              <p className="text-muted-foreground font-light">Tue - Sun: 08:00 - 16:00 (Closed Mondays)</p>
            </div>

             <div className="group cursor-pointer">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-2 group-hover:border-primary transition-colors">
                <h4 className="text-xl font-medium text-white">Location</h4>
                <MapPin className="text-white/30 group-hover:text-primary transition-colors" size={20} />
              </div>
              <p className="text-muted-foreground font-light">Merdeka Square, Gambir, Central Jakarta</p>
            </div>
            
             <div className="group cursor-pointer">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-2 group-hover:border-primary transition-colors">
                <h4 className="text-xl font-medium text-white">Tickets</h4>
                <Calendar className="text-white/30 group-hover:text-primary transition-colors" size={20} />
              </div>
              <div className="flex justify-between items-end">
                <p className="text-muted-foreground font-light">From IDR 4,000 to IDR 15,000</p>
                <button className="flex items-center space-x-2 text-primary text-sm uppercase tracking-widest hover:text-white transition-colors">
                  <span>Book Now</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Map Side */}
      <div className="w-full md:w-1/2 min-h-[50vh] md:min-h-screen relative grayscale hover:grayscale-0 transition-all duration-1000">
         <MonasMap />
         <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
