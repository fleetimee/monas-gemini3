"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { useEffect } from "react";

interface ImmersionDetailProps {
  item: {
    title: string;
    category: string;
    image: string;
    desc: string;
  };
  onClose: () => void;
}

export function ImmersionDetail({ item, onClose }: ImmersionDetailProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-black flex flex-col"
    >
      {/* Close Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        onClick={onClose}
        className="absolute top-8 right-8 z-50 p-4 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white backdrop-blur-md group"
      >
        <X size={32} className="group-hover:rotate-90 transition-transform duration-300" />
      </motion.button>

      <div className="flex flex-col md:flex-row h-full w-full">
        {/* Image Section - Full Height */}
        <motion.div 
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0 0 0)" }}
          exit={{ clipPath: "inset(0 100% 0 0)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full md:w-1/2 h-[40vh] md:h-full relative"
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-black" />
        </motion.div>

        {/* Content Section */}
        <div 
          className="w-full md:w-1/2 h-full overflow-y-auto bg-black overscroll-contain"
          data-lenis-prevent
        >
          <div className="p-8 md:p-20 flex flex-col min-h-full">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <span className="text-primary text-sm tracking-[0.5em] uppercase block mb-6">
                {item.category}
              </span>
              <h2 className="font-serif text-5xl md:text-8xl text-white mb-8 leading-[0.9]">
                {item.title}
              </h2>
              <p className="text-white/70 text-xl md:text-2xl leading-relaxed mb-12 font-light max-w-2xl">
                {item.desc}
              </p>
              
              <div className="w-full h-px bg-white/10 mb-12" />

              {/* Immersion Details */}
              <div className="space-y-12">
                <div>
                  <h3 className="text-white font-serif text-3xl mb-4">Immersion Details</h3>
                  <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-xl">
                    Experience the depth of history through this curated collection. 
                    Every artifact tells a story of resilience, culture, and the undying spirit of the nation.
                    Dive deeper into the narrative that shaped the identity of Indonesia.
                  </p>
                </div>
                
                {/* Image Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + (i * 0.1) }}
                      className="aspect-[4/3] relative bg-white/5 rounded-sm overflow-hidden group cursor-pointer"
                    >
                       <Image
                          src={item.image} // Reusing main image as placeholder
                          alt={`Detail ${i}`}
                          fill
                          className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                        />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
