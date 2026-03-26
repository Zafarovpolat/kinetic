/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { ArrowRight, Menu, X, Instagram, Twitter, ArrowDownRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const Marquee = ({ text, speed = 20, reverse = false }: { text: string; speed?: number; reverse?: boolean }) => {
  return (
    <div className="flex overflow-hidden whitespace-nowrap border-y border-white/10 py-4 select-none">
      <motion.div
        initial={{ x: reverse ? "-50%" : "0%" }}
        animate={{ x: reverse ? "0%" : "-50%" }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        className="flex gap-8 pr-8 text-sm font-mono uppercase tracking-[0.2em]"
      >
        {[...Array(10)].map((_, i) => (
          <span key={i} className="flex items-center gap-8">
            {text} <span className="w-2 h-2 bg-white rounded-full" />
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -200]);

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="grain min-h-screen bg-black font-sans selection:bg-white selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-[100] flex justify-between items-center p-6 md:p-10 mix-blend-difference">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-display tracking-tighter"
        >
          KINETIC
        </motion.div>
        
        <div className="hidden md:flex gap-12 text-[10px] font-mono uppercase tracking-[0.3em]">
          <a href="#" className="hover:opacity-50 transition-opacity">Collection</a>
          <a href="#" className="hover:opacity-50 transition-opacity">Archive</a>
          <a href="#" className="hover:opacity-50 transition-opacity">Studio</a>
          <a href="#" className="hover:opacity-50 transition-opacity">Contact</a>
        </div>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 hover:scale-110 transition-transform"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Fullscreen Menu Overlay */}
      <motion.div
        initial={false}
        animate={{ y: isMenuOpen ? "0%" : "-100%" }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-[90] bg-white text-black p-10 flex flex-col justify-center"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-7xl mx-auto w-full">
          <div className="flex flex-col gap-4">
            {['Home', 'Events', 'Fashion', 'Tech', 'Contact'].map((item, i) => (
              <motion.a
                key={item}
                href="#"
                initial={{ opacity: 0, x: -50 }}
                animate={isMenuOpen ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="text-6xl md:text-8xl font-display tracking-tighter hover:italic transition-all"
              >
                {item}
              </motion.a>
            ))}
          </div>
          <div className="flex flex-col justify-end gap-10 font-mono text-xs uppercase tracking-widest">
            <div className="space-y-2">
              <p className="opacity-50">Location</p>
              <p>Berlin / Tokyo / NYC</p>
            </div>
            <div className="space-y-2">
              <p className="opacity-50">Social</p>
              <div className="flex gap-4">
                <Instagram size={16} />
                <Twitter size={16} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover grayscale brightness-50 contrast-125"
            referrerPolicy="no-referrer"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-ink-smoke-in-water-4464-large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Masked Kinetic Typography */}
        <motion.div 
          style={{ scale, opacity, y }}
          className="relative z-10 w-full h-full flex flex-col items-center justify-center text-mask-container"
        >
          <div className="flex flex-col items-center leading-[0.8] select-none">
            <motion.h1 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[25vw] font-display tracking-tighter liquid-text"
            >
              RAW
            </motion.h1>
            <motion.h1 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[25vw] font-display tracking-tighter liquid-text"
            >
              ENERGY
            </motion.h1>
          </div>
          
          {/* Floating Labels */}
          <div className="absolute bottom-10 left-10 md:left-20 text-[10px] font-mono uppercase tracking-[0.4em] text-black">
            <p>Spring Summer / 2026</p>
            <p>Experimental Series 01</p>
          </div>
          <div className="absolute bottom-10 right-10 md:right-20 text-black">
            <ArrowDownRight size={40} className="animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* Marquee Divider */}
      <Marquee text="KINETIC TYPOGRAPHY SYSTEM" speed={30} />

      {/* Content Section 01 - Swiss Grid */}
      <section className="py-40 px-6 md:px-20 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-20">
          <div className="md:col-span-5 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-5xl md:text-7xl font-display tracking-tighter leading-none">
                THE FUTURE <br /> IS LIQUID.
              </h2>
              <p className="text-lg text-white/60 max-w-md font-light leading-relaxed">
                Exploring the intersection of digital distortion and physical presence. 
                A collection designed for the high-velocity environment of the modern metropolis.
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ x: 10 }}
              className="inline-flex items-center gap-4 group cursor-pointer"
            >
              <span className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <ArrowRight size={20} />
              </span>
              <span className="font-mono text-xs uppercase tracking-widest">Explore Collection</span>
            </motion.div>
          </div>

          <div className="md:col-span-7 relative">
            <motion.div
              initial={{ scale: 1.1, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              className="aspect-[4/5] bg-zinc-900 overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000" 
                alt="Fashion" 
                className="w-full h-full object-cover grayscale hover:scale-110 transition-transform duration-[2s]"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="absolute -bottom-10 -left-10 md:-left-20 bg-white text-black p-8 md:p-12 hidden md:block">
              <p className="text-4xl font-display tracking-tighter">01 / 2026</p>
              <p className="font-mono text-[10px] uppercase tracking-widest mt-2">Volume One</p>
            </div>
          </div>
        </div>
      </section>

      {/* Big Text Section */}
      <section className="py-20 md:py-40 overflow-hidden">
        <motion.div 
          style={{ x: useTransform(smoothProgress, [0.3, 0.7], [100, -1000]) }}
          className="flex whitespace-nowrap"
        >
          <h2 className="text-[30vw] font-display tracking-tighter leading-none opacity-10">
            DISTORTION DISTORTION DISTORTION
          </h2>
        </motion.div>
      </section>

      {/* Grid Gallery */}
      <section className="px-6 md:px-20 pb-40">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {[
            "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1529139513402-f20a99117592?auto=format&fit=crop&q=80&w=600"
          ].map((url, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="aspect-[3/4] bg-zinc-900 overflow-hidden group"
            >
              <img 
                src={url} 
                alt={`Gallery ${i}`} 
                className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 p-10 md:p-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-20">
          <div className="space-y-10">
            <h3 className="text-7xl md:text-9xl font-display tracking-tighter">KINETIC</h3>
            <div className="grid grid-cols-2 gap-20 font-mono text-[10px] uppercase tracking-[0.3em]">
              <div className="space-y-4">
                <p className="opacity-50">Navigation</p>
                <ul className="space-y-2">
                  <li><a href="#">Home</a></li>
                  <li><a href="#">About</a></li>
                  <li><a href="#">Work</a></li>
                  <li><a href="#">Contact</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <p className="opacity-50">Legal</p>
                <ul className="space-y-2">
                  <li><a href="#">Privacy</a></li>
                  <li><a href="#">Terms</a></li>
                  <li><a href="#">Cookies</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-6 w-full md:w-auto">
            <div className="w-full md:w-80 border-b border-white/20 pb-4 flex justify-between items-center group cursor-pointer">
              <span className="font-mono text-[10px] uppercase tracking-widest">Newsletter</span>
              <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </div>
            <p className="font-mono text-[10px] opacity-30">© 2026 KINETIC STUDIO. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </footer>

      {/* SVG Distortion Filter */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
        <filter id="liquid-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" />
        </filter>
      </svg>
    </div>
  );
}
