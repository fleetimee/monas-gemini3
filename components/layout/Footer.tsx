"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 pt-20 pb-10 relative z-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Link href="/" className="text-3xl font-serif font-bold tracking-widest text-primary mb-6 block">
                MONAS
              </Link>
              <p className="text-muted-foreground max-w-md leading-relaxed">
                The National Monument (Monas) symbolizes the fight for Indonesia. 
                It stands tall to commemorate the struggle for Indonesian independence.
              </p>
            </motion.div>
          </div>
          
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-white font-serif font-semibold mb-6 tracking-wide">VISIT</h3>
              <ul className="space-y-4 text-muted-foreground">
                <li>Gambir, Central Jakarta</li>
                <li>Jakarta, Indonesia</li>
                <li className="pt-4">Tue - Sun: 08:00 - 16:00</li>
                <li>Closed on Mondays</li>
              </ul>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="text-white font-serif font-semibold mb-6 tracking-wide">CONTACT</h3>
              <ul className="space-y-4 text-muted-foreground">
                <li>info@monas.id</li>
                <li>+62 21 1234 5678</li>
                <li className="pt-4 flex space-x-4">
                  <a href="#" className="hover:text-primary transition-colors">Instagram</a>
                  <a href="#" className="hover:text-primary transition-colors">Twitter</a>
                  <a href="#" className="hover:text-primary transition-colors">Facebook</a>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground"
        >
          <p>&copy; {new Date().getFullYear()} Monas National Monument. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white">Privacy Policy</Link>
            <Link href="#" className="hover:text-white">Terms of Service</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

