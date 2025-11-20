"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { ImmersionDetail } from "./ImmersionDetail";

const collections = [
  { title: "The Proclamation", category: "History", image: "/museum-diorama.jpg", desc: "Witness the birth of a nation." },
  { title: "Garuda", category: "Symbolism", image: "/monas-view.jpg", desc: "The mythical bird of independence." },
  { title: "Reliefs", category: "Architecture", image: "/monas-relief.jpg", desc: "Stories carved in stone." },
  { title: "Independence", category: "Space", image: "/museum-diorama.jpg", desc: "The hall of freedom." },
];

export function Collections() {
  const targetRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState<typeof collections[0] | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  const textParallax = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={targetRef} id="collections" className="relative h-[300vh] bg-[#050505]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        <motion.div style={{ x }} className="flex gap-20 pl-20">
          
          {/* Intro Card */}
          <div className="w-[80vw] md:w-[40vw] shrink-0 flex flex-col justify-center">
             <motion.h2 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               className="text-primary text-xs tracking-[0.5em] uppercase mb-8"
             >
               Exhibitions
             </motion.h2>
             <h3 className="font-serif text-6xl md:text-8xl text-white mb-8 leading-none">
               Curated <br />
               <span className="text-white/30">Gallery</span>
             </h3>
             <p className="text-muted-foreground text-xl max-w-md leading-relaxed">
               Explore the detailed dioramas and architectural marvels that chronicle Indonesia&apos;s journey.
             </p>
          </div>

          {/* Collection Items */}
          {collections.map((item, index) => (
            <div 
              key={index} 
              className="group relative h-[70vh] w-[80vw] md:w-[50vw] shrink-0 overflow-hidden bg-[#101010] cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover opacity-60 transition-all duration-1000 group-hover:scale-110 group-hover:opacity-100 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 p-12 w-full">
                <div className="overflow-hidden mb-4">
                  <motion.p 
                    className="text-primary text-sm tracking-widest uppercase transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                  >
                    {item.category}
                  </motion.p>
                </div>
                <motion.h4 
                  style={{ x: textParallax }}
                  className="text-4xl md:text-5xl font-serif text-white mb-4"
                >
                  {item.title}
                </motion.h4>
                <p className="text-white/60 max-w-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 translate-y-4 group-hover:translate-y-0 transition-transform">
                  {item.desc}
                </p>
              </div>
              
              <div className="absolute top-12 right-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-6xl font-serif text-white/10">0{index + 1}</span>
              </div>
            </div>
          ))}
          
          {/* End padding */}
          <div className="w-[20vw] shrink-0" />
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <ImmersionDetail 
            item={selectedItem} 
            onClose={() => setSelectedItem(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}
