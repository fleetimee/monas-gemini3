"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";

interface TimelineEvent {
  year: string;
  title: string;
  desc: string;
  fullDescription: string;
  image: string;
  details: { label: string; value: string }[];
}

const timelineEvents: TimelineEvent[] = [
  { 
    year: "1961", 
    title: "Construction Begins", 
    desc: "President Soekarno lays the first concrete pile, marking the start of the National Monument's construction.",
    fullDescription: "On August 17, 1961, President Soekarno ceremoniously laid the first concrete pile, initiating the construction of Monas. This marked the beginning of a 14-year project to build a national symbol of independence. The design was chosen through a competition, with Frederich Silaban's vision ultimately being realized alongside R.M. Soedarsono's refinements.",
    image: "/timeline/1961.png",
    details: [
      { label: "Date", value: "Aug 17" },
      { label: "Initiator", value: "Soekarno" },
      { label: "Phase", value: "Foundation" }
    ]
  },
  { 
    year: "1965", 
    title: "Structure Complete", 
    desc: "The main structure reaches its full height of 132 meters, dominating the Jakarta skyline.",
    fullDescription: "By 1965, the towering obelisk had reached its full height of 132 meters. Despite political turbulence in the country, construction persevered. The structure's unique shape, resembling a 'Lingga' (phallus) and 'Yoni' (mortar), symbolizes fertility and eternal life, deeply rooted in Indonesian culture.",
    image: "/timeline/1965.png",
    details: [
      { label: "Height", value: "132m" },
      { label: "Material", value: "Marble" },
      { label: "Status", value: "Topped Out" }
    ]
  },
  { 
    year: "1975", 
    title: "Official Opening", 
    desc: "Monas is officially opened to the public by President Soeharto, becoming a national icon.",
    fullDescription: "After 14 years of construction, the National Monument was officially inaugurated on July 12, 1975, by President Soeharto. It immediately became a landmark of Jakarta and a source of national pride, open for the public to ascend to the observation deck and view the capital from above.",
    image: "/timeline/1975.png",
    details: [
      { label: "Opened By", value: "Soeharto" },
      { label: "Date", value: "July 12" },
      { label: "Access", value: "Public" }
    ]
  },
  { 
    year: "1995", 
    title: "Flame Restoration", 
    desc: "To celebrate the Golden Jubilee, the flame's gold coating is increased from 35kg to 50kg.",
    fullDescription: "In commemoration of Indonesia's 50th Independence Day, the Independence Flame underwent a significant restoration. The gold foil coating the bronze flame structure was increased from 35 kilograms to 50 kilograms. This enhancement ensured the flame would shine even brighter, symbolizing the undying spirit of the nation.",
    image: "/timeline/1995.png",
    details: [
      { label: "Gold Added", value: "15kg" },
      { label: "Total Gold", value: "50kg" },
      { label: "Event", value: "Jubilee" }
    ]
  },
  { 
    year: "2014", 
    title: "The Grand Cleaning", 
    desc: "A major conservation project cleans Monas for the first time in 22 years using German technology.",
    fullDescription: "In 2014, Monas underwent its first major cleaning in over two decades. The German cleaning equipment manufacturer Kärcher, as part of its cultural sponsorship program, used high-pressure hot water cleaners to remove years of dirt, pollution, and biological growth from the monument's marble surface, restoring its pristine white appearance.",
    image: "/timeline/2014.png",
    details: [
      { label: "Method", value: "High Pressure" },
      { label: "Partner", value: "Kärcher" },
      { label: "Area", value: "Exterior" }
    ]
  },
  { 
    year: "2018", 
    title: "Asian Games Glow", 
    desc: "Monas receives a lighting upgrade and park revitalization for the Asian Games.",
    fullDescription: "Welcoming the 2018 Asian Games, the Monas complex received significant upgrades. A new LED lighting system was installed to illuminate the monument in various colors, and the surrounding park was revitalized to better accommodate the influx of international visitors and athletes, cementing its status as a world-class landmark.",
    image: "/timeline/2018.png",
    details: [
      { label: "Event", value: "Asian Games" },
      { label: "Upgrade", value: "LED Lights" },
      { label: "Focus", value: "Tourism" }
    ]
  }
];

export function Timeline() {
  const containerRef = useRef(null);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={containerRef} className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-24"
        >
          <span className="text-primary text-xs tracking-[0.5em] uppercase block mb-6">
            Chronology
          </span>
          <h2 className="font-serif text-5xl md:text-6xl text-foreground">
            Journey Through Time
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Center Line */}
          <motion.div 
            style={{ scaleY: lineScale }}
            className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-foreground/20 to-transparent -translate-x-1/2 origin-top" 
          />

          <div className="space-y-24">
            {timelineEvents.map((event, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: [0.87, 0, 0.13, 1] }}
                  className={`flex flex-col md:flex-row items-center gap-6 md:gap-0 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Content Side */}
                  <div className={`w-full md:w-1/2 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"} text-left`}>
                    <motion.button
                      onClick={() => setSelectedEvent(event)}
                      className="group relative inline-block text-left"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className={`text-primary font-serif text-4xl md:text-5xl block mb-4 opacity-80 group-hover:opacity-100 transition-opacity ${isEven ? "md:text-right" : "md:text-left"}`}>
                        {event.year}
                      </span>
                      <h3 className={`text-foreground text-2xl font-serif mb-4 group-hover:text-primary transition-colors ${isEven ? "md:text-right" : "md:text-left"}`}>{event.title}</h3>
                      <p className={`text-muted-foreground leading-relaxed font-light group-hover:text-foreground/80 transition-colors ${isEven ? "md:text-right" : "md:text-left"}`}>
                        {event.desc}
                      </p>
                      <div className={`absolute -inset-4 border border-foreground/0 group-hover:border-foreground/10 rounded-xl transition-all duration-300 pointer-events-none`} />
                    </motion.button>
                  </div>

                  {/* Center Dot */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                    className="relative z-10 flex items-center justify-center w-8 h-8"
                  >
                    <div className="w-3 h-3 bg-primary rounded-full shadow-[0_0_20px_rgba(255,215,0,0.5)]" />
                    <div className="absolute inset-0 border border-foreground/20 rounded-full scale-0 animate-ping" />
                  </motion.div>

                  {/* Empty Side */}
                  <div className="hidden md:block w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Popover */}
      <AnimatePresence>
        {selectedEvent && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 cursor-pointer"
            />
            <motion.div
              initial={{ 
                clipPath: "inset(50% 50% 50% 50%)",
                scale: 0.9,
                opacity: 0
              }}
              animate={{ 
                clipPath: "inset(0% 0% 0% 0%)",
                scale: 1,
                opacity: 1,
                transition: { duration: 0.6, ease: [0.87, 0, 0.13, 1] }
              }}
              exit={{ 
                clipPath: "inset(50% 50% 50% 50%)",
                scale: 0.9,
                opacity: 0,
                transition: { duration: 0.4, ease: [0.87, 0, 0.13, 1] }
              }}
              className="fixed inset-0 m-auto z-50 w-[90vw] max-w-4xl h-fit max-h-[90vh] overflow-y-auto bg-background border border-foreground/10 p-0 shadow-2xl flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setSelectedEvent(null)}
                className="absolute top-6 right-6 z-10 text-foreground/50 hover:text-foreground transition-colors bg-background/50 p-2 rounded-full backdrop-blur-sm"
              >
                <X size={24} />
              </button>

              {/* Image Section */}
              <div className="w-full md:w-1/2 relative h-64 md:h-auto">
                <Image
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent md:bg-gradient-to-r" />
              </div>

              {/* Content Section */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <span className="text-primary text-xs tracking-[0.3em] uppercase block mb-4">{selectedEvent.year}</span>
                  <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-6">{selectedEvent.title}</h3>
                  
                  <div className="prose prose-invert prose-sm max-w-none mb-8">
                    <p className="text-muted-foreground font-light leading-relaxed">
                      {selectedEvent.fullDescription}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-6 pt-8 border-t border-foreground/10">
                    {selectedEvent.details.map((detail, idx) => (
                      <div key={idx}>
                        <p className="text-xl font-serif text-foreground">{detail.value}</p>
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{detail.label}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
