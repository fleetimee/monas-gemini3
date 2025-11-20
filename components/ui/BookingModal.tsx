"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { X, Calendar, Users, Mail, CheckCircle } from "lucide-react";
import { useState } from "react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } },
  exit: { opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }
};

const modalVariants: Variants = {
  hidden: { 
    clipPath: "inset(50% 50% 50% 50%)",
    scale: 1.1,
    opacity: 0,
  },
  visible: { 
    clipPath: "inset(0% 0% 0% 0%)",
    scale: 1,
    opacity: 1,
    transition: { 
      duration: 0.8, 
      ease: [0.87, 0, 0.13, 1], // Cinematic easing
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  exit: { 
    clipPath: "inset(50% 50% 50% 50%)",
    scale: 1.1,
    opacity: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.87, 0, 0.13, 1] 
    }
  }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0, filter: "blur(10px)" },
  visible: { 
    y: 0, 
    opacity: 1, 
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState<"form" | "success">("form");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setStep("success");
    }, 1500);
  };

  const resetForm = () => {
    setStep("form");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[60] cursor-pointer"
          />
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 m-auto z-[70] w-[90vw] max-w-md h-fit bg-[#0a0a0a] border border-white/10 p-8 shadow-2xl overflow-hidden"
          >
            {/* Decorative Lines */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-10"
            >
              <X size={20} />
            </button>

            <AnimatePresence mode="wait">
              {step === "form" ? (
                <motion.div
                  key="form"
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                >
                  <motion.div variants={itemVariants}>
                    <h3 className="font-serif text-4xl text-white mb-2 tracking-tight">Book Tickets</h3>
                    <p className="text-muted-foreground text-sm mb-8 font-light tracking-wide">
                      SECURE YOUR PASSAGE TO HISTORY
                    </p>
                  </motion.div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div variants={itemVariants} className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-primary/80 font-bold">Date</label>
                      <div className="relative group">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-primary transition-colors" size={16} />
                        <input
                          type="date"
                          required
                          className="w-full bg-white/5 border border-white/10 py-4 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all duration-300 placeholder:text-white/20 font-light"
                        />
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-primary/80 font-bold">Visitors</label>
                      <div className="relative group">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-primary transition-colors" size={16} />
                        <select className="w-full bg-white/5 border border-white/10 py-4 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all duration-300 appearance-none font-light">
                          <option value="1" className="bg-black">1 Person</option>
                          <option value="2" className="bg-black">2 People</option>
                          <option value="3" className="bg-black">3 People</option>
                          <option value="4" className="bg-black">4+ People</option>
                        </select>
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-primary/80 font-bold">Email</label>
                      <div className="relative group">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-primary transition-colors" size={16} />
                        <input
                          type="email"
                          required
                          placeholder="you@example.com"
                          className="w-full bg-white/5 border border-white/10 py-4 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all duration-300 placeholder:text-white/20 font-light"
                        />
                      </div>
                    </motion.div>

                    <motion.button
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-white text-black font-bold uppercase tracking-[0.2em] py-5 hover:bg-primary hover:text-white transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed mt-8 relative overflow-hidden group"
                    >
                      <span className="relative z-10">{isSubmitting ? "Processing..." : "Confirm Booking"}</span>
                      <div className="absolute inset-0 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </motion.button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-center py-12"
                >
                  <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.2 }}
                    className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/50"
                  >
                    <CheckCircle size={40} />
                  </motion.div>
                  <h3 className="font-serif text-3xl text-white mb-4">Booking Confirmed</h3>
                  <p className="text-muted-foreground text-sm mb-12 font-light leading-relaxed max-w-[80%] mx-auto">
                    We&apos;ve sent the tickets to your email. <br/>We look forward to seeing you at Monas.
                  </p>
                  <button
                    onClick={resetForm}
                    className="text-xs uppercase tracking-[0.3em] text-primary hover:text-white transition-colors border-b border-primary/30 hover:border-white pb-1"
                  >
                    Close Window
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
