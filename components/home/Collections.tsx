"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const collections = [
  { title: "The Proclamation", category: "History", image: "/museum-diorama.jpg", desc: "Witness the birth of a nation." },
  { title: "Garuda", category: "Symbolism", image: "/monas-view.jpg", desc: "The mythical bird of independence." },
  { title: "Reliefs", category: "Architecture", image: "/monas-relief.jpg", desc: "Stories carved in stone." },
  { title: "Independence", category: "Space", image: "/museum-diorama.jpg", desc: "The hall of freedom." },
];

export function Collections() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} id="collections" className="relative h-[300vh] bg-[#050505]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* Section Title - Absolute positioned to stay in view initially or part of the flow? 
            Let's make it part of the flow but the first item.
        */}
        
        <motion.div style={{ x }} className="flex gap-20 pl-20">
          
          {/* Intro Card */}
          <div className="w-[80vw] md:w-[40vw] shrink-0 flex flex-col justify-center">
             <h2 className="text-primary text-xs tracking-[0.5em] uppercase mb-8">Exhibitions</h2>
             <h3 className="font-serif text-6xl md:text-8xl text-white mb-8 leading-none">
               Curated <br />
               <span className="text-white/30">Gallery</span>
             </h3>
             <p className="text-muted-foreground text-xl max-w-md leading-relaxed">
               Explore the detailed dioramas and architectural marvels that chronicle Indonesia's journey.
             </p>
          </div>

          {/* Collection Items */}
          {collections.map((item, index) => (
            <div key={index} className="group relative h-[70vh] w-[80vw] md:w-[50vw] shrink-0 overflow-hidden bg-[#101010]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover opacity-60 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 p-12 w-full">
                <div className="overflow-hidden">
                  <p className="text-primary text-sm tracking-widest uppercase mb-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    {item.category}
                  </p>
                </div>
                <h4 className="text-4xl md:text-5xl font-serif text-white mb-4">
                  {item.title}
                </h4>
                <p className="text-white/60 max-w-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
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
    </section>
  );
}
