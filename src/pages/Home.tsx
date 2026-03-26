import { motion, useScroll, useTransform, useInView } from "motion/react";
import { ArrowRight, Globe, Instagram, ArrowDownRight, Menu, X } from "lucide-react";
import React, { useState, useEffect, useRef, ReactNode } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

// Reveal Component for smooth entrance animations
const Reveal: React.FC<{ children: ReactNode; delay?: number; blur?: boolean; y?: number; className?: string }> = ({ children, delay = 0, blur = true, y = 30, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: y, filter: blur ? "blur(10px)" : "none" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Marquee: React.FC<{ text: string; speed?: number; reverse?: boolean }> = ({ text, speed = 20, reverse = false }) => {
  return (
    <div className="flex overflow-hidden whitespace-nowrap border-y border-white/10 py-4 select-none">
      <motion.div
        initial={{ x: reverse ? "-50%" : "0%" }}
        animate={{ x: reverse ? "0%" : "-50%" }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        className="flex gap-8 pr-8 text-sm font-alt uppercase tracking-[0.2em]"
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

const Home: React.FC<{ onNavigate: (view: string) => void }> = ({ onNavigate }) => {
  const { scrollYProgress } = useScroll();
  
  // Enhanced Hero Exit Animation
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.75]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.4], [0, -300]);
  const blur = useTransform(scrollYProgress, [0, 0.3], ["blur(0px)", "blur(20px)"]);

  return (
    <div className="grain min-h-screen bg-black font-sans selection:bg-white selection:text-black">
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
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-ink-smoke-in-water-4464-large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Masked Kinetic Typography */}
        <motion.div 
          style={{ scale, opacity, y, filter: blur }}
          className="relative z-10 w-full h-full flex flex-col items-center justify-center text-mask-container"
        >
          <div className="flex flex-col items-center leading-[0.8] select-none py-20">
            <motion.h1 
              initial={{ y: 100, opacity: 0, filter: "blur(20px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[22vw] font-display tracking-tighter liquid-text"
            >
              RAW
            </motion.h1>
            <motion.h1 
              initial={{ y: 100, opacity: 0, filter: "blur(20px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[22vw] font-display tracking-tighter liquid-text"
            >
              ENERGY
            </motion.h1>
          </div>
          
          {/* Floating Labels */}
          <div className="absolute bottom-10 left-10 md:left-20 text-[10px] font-alt uppercase tracking-[0.4em] text-black">
            <p>Spring Summer / 2026</p>
            <p>Experimental Series 01</p>
          </div>
          <div className="absolute bottom-10 right-10 md:right-20 text-black">
            <ArrowDownRight size={40} className="animate-bounce" />
          </div>
        </motion.div>
      </section>

      <Marquee text="KINETIC TYPOGRAPHY SYSTEM" speed={30} />

      {/* Split Section */}
      <section className="py-40 px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <Reveal>
              <h2 className="text-6xl md:text-8xl font-display tracking-tighter leading-none">
                RAW <br /> ENERGY.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg md:text-xl font-light max-w-md leading-relaxed opacity-70">
                We don't just design garments. We build kinetic interfaces that respond to high-velocity movement and digital noise.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <button 
                onClick={() => onNavigate('collection')}
                className="group flex items-center gap-6"
              >
                <div className="w-16 h-16 flex items-center justify-center border border-white/20 rounded-full group-hover:bg-white group-hover:text-black transition-all duration-500">
                  <ArrowRight size={24} />
                </div>
                <span className="font-alt text-[10px] uppercase tracking-[0.5em]">View Collection</span>
              </button>
            </Reveal>
          </div>
          <div className="relative">
            <Reveal delay={0.3} y={100}>
              <div className="aspect-[4/5] bg-zinc-900 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000" 
                  alt="Fashion" 
                  className="w-full h-full object-cover grayscale hover:scale-110 transition-transform duration-[2s]"
                  referrerPolicy="no-referrer"
                />
              </div>
            </Reveal>
            <Reveal delay={0.4} y={50}>
              <div className="absolute -bottom-10 -left-10 md:-left-20 bg-white text-black p-8 md:p-12 hidden md:block">
                <p className="text-4xl font-display tracking-tighter">01 / 2026</p>
                <p className="font-alt text-[10px] uppercase tracking-widest mt-2">Volume One</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="py-40 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 h-auto md:h-[80vh]">
          <div className="p-10 md:p-20 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10">
            <Reveal>
              <div className="flex gap-10">
                <div className="writing-vertical-rl rotate-180 text-[10px] font-alt uppercase tracking-[0.5em] opacity-30">
                  Philosophy / 001
                </div>
                <h2 className="text-6xl md:text-8xl font-display tracking-tighter leading-[0.9]">
                  WE DON'T <br /> FOLLOW. <br /> WE DISTORT.
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-sm font-alt uppercase tracking-widest opacity-50 mt-10 md:mt-0">
                Established in distortion / 2026
              </p>
            </Reveal>
          </div>
          <div className="p-10 md:p-20 flex flex-col justify-center bg-white text-black relative overflow-hidden">
            <motion.div 
              initial={{ scale: 1.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 0.05 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <span className="text-[40vw] font-display">X</span>
            </motion.div>
            <Reveal>
              <div className="space-y-8 relative z-10">
                <p className="text-2xl md:text-4xl tracking-tight leading-tight">
                  In a world of constant noise, we find clarity in the glitch. 
                  Our garments are not just clothing; they are interfaces between 
                  the biological and the digital.
                </p>
                <div className="h-px w-20 bg-black" />
                <p className="font-alt text-xs uppercase tracking-[0.2em]">
                  Kinetic System v2.0.4
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* New Black Section - Studio Philosophy */}
      <section className="py-40 px-6 md:px-20 border-t border-white/10">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <Reveal>
              <div className="aspect-square bg-zinc-900 relative overflow-hidden">
                <motion.img 
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 1.5 }}
                  src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000" 
                  alt="Studio" 
                  className="w-full h-full object-cover grayscale"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 mix-blend-overlay" />
              </div>
            </Reveal>
            <div className="space-y-12">
              <Reveal delay={0.2}>
                <h2 className="text-5xl md:text-7xl font-display tracking-tighter leading-none">
                  THE STUDIO <br /> AS A LAB.
                </h2>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="text-lg text-white/50 max-w-md font-light leading-relaxed">
                  We treat the design process as a laboratory experiment. 
                  Every seam, every magnetic closure, and every fabric choice 
                  is a hypothesis tested against the reality of urban movement.
                </p>
              </Reveal>
              <Reveal delay={0.4}>
                <div className="grid grid-cols-2 gap-10 font-alt text-[10px] uppercase tracking-[0.2em]">
                  <div className="space-y-2">
                    <p className="opacity-30">Location</p>
                    <p>Berlin / Studio A</p>
                  </div>
                  <div className="space-y-2">
                    <p className="opacity-30">Focus</p>
                    <p>Kinetic Materials</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Light Minimal Section - Theme Shift */}
      <section className="bg-white text-black py-40 px-6 md:px-20">
        <div className="max-w-screen-2xl mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-32 gap-10">
              <h2 className="text-6xl md:text-8xl font-display tracking-tighter leading-none">
                THE <br /> ESSENTIALS.
              </h2>
              <p className="max-w-xs font-alt text-[10px] uppercase tracking-widest opacity-50 leading-relaxed">
                Stripped back to the core. No noise. Just the pure kinetic form of the modern silhouette.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-4 border border-black/10">
            {[
              { title: "STRUCTURE", desc: "The architectural foundation of kinetic form." },
              { title: "MOTION", desc: "Dynamic response to urban velocity." },
              { title: "FLUIDITY", desc: "Seamless transition between states." },
              { title: "VOID", desc: "The presence of absence in design." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-12 group cursor-pointer overflow-hidden relative h-[500px] flex flex-col justify-between border-r border-black/10 last:border-r-0 transition-all duration-700 hover:bg-black hover:text-white">
                <Reveal delay={i * 0.1} className="h-full flex flex-col justify-between w-full relative z-10">
                  <div className="space-y-4">
                    <p className="font-alt text-[10px] tracking-[0.5em] opacity-30 group-hover:opacity-100 transition-opacity">0{i + 1}</p>
                    <motion.h3 
                      whileHover={{ filter: "blur(4px)", opacity: 0.5 }}
                      className="text-4xl font-display tracking-tighter transition-all duration-500"
                    >
                      {item.title}
                    </motion.h3>
                  </div>
                  
                  <div className="space-y-8">
                    <p className="text-sm font-light leading-relaxed opacity-0 group-hover:opacity-100 blur-md group-hover:blur-none transition-all duration-700 delay-100">
                      {item.desc}
                    </p>
                    <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                      <div className="w-8 h-px bg-current" />
                      <p className="font-alt text-[10px] uppercase tracking-widest">Explore</p>
                    </div>
                  </div>
                </Reveal>
                
                {/* Abstract Background Animation */}
                <motion.div 
                  className="absolute inset-0 bg-zinc-100 opacity-0 group-hover:opacity-10 transition-opacity duration-700"
                  initial={false}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Second Light Section - The Process */}
      <section className="bg-white text-black py-40 px-6 md:px-20 border-t border-black/5">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-20">
            <div className="md:col-span-4">
              <Reveal>
                <h2 className="text-6xl font-display tracking-tighter leading-none">THE <br /> PROCESS.</h2>
              </Reveal>
            </div>
            <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-20">
              <Reveal delay={0.1}>
                <div className="space-y-6">
                  <p className="font-alt text-[10px] uppercase tracking-widest opacity-30">01 / Concept</p>
                  <p className="text-xl leading-snug">Every piece begins with a digital distortion. We map the glitch onto the human form, creating a dialogue between the virtual and the physical.</p>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="space-y-6">
                  <p className="font-alt text-[10px] uppercase tracking-widest opacity-30">02 / Execution</p>
                  <p className="text-xl leading-snug">Using high-performance materials and magnetic hardware, we build garments that respond to the high-velocity movement of the city.</p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Third Light Section - Archive Preview */}
      <section className="bg-white text-black py-40 px-6 md:px-20 border-t border-black/5">
        <div className="max-w-screen-2xl mx-auto">
          <Reveal>
            <div 
              onClick={() => onNavigate('archive')}
              className="flex justify-between items-center mb-20 cursor-pointer group"
            >
              <h2 className="text-2xl font-alt uppercase tracking-[0.3em]">Archive / 01-04</h2>
              <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">
                <ArrowRight size={20} />
              </div>
            </div>
          </Reveal>
          <div className="space-y-px bg-black/10 border-y border-black/10">
            {[
              { year: "2025", title: "Cyber-Organic Shell", category: "Outerwear", img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1200" },
              { year: "2024", title: "Kinetic Trousers v1", category: "Bottoms", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1200" },
              { year: "2024", title: "Distortion Knit", category: "Knitwear", img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1200" },
              { year: "2023", title: "Liquid Accessory Set", category: "Hardware", img: "https://images.unsplash.com/photo-1529139513402-f20a99117592?auto=format&fit=crop&q=80&w=1200" }
            ].map((item, i) => (
              <div 
                key={i} 
                onClick={() => onNavigate('product-detail', item)}
                className="bg-white py-8 flex justify-between items-center group cursor-pointer hover:px-8 transition-all duration-500"
              >
                <div className="flex items-center gap-20">
                  <span className="font-alt text-[10px] opacity-30">{item.year}</span>
                  <h3 className="text-3xl font-display tracking-tighter group-hover:italic transition-all">{item.title}</h3>
                </div>
                <span className="font-alt text-[10px] uppercase tracking-widest opacity-30 group-hover:opacity-100">{item.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Big Text Section - Autoplay Marquee */}
      <section className="py-20 md:py-40 overflow-hidden border-y border-white/5">
        <div className="flex whitespace-nowrap select-none">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex"
          >
            {[...Array(4)].map((_, i) => (
              <h2 key={i} className="text-[30vw] font-display tracking-tighter leading-none opacity-10 pr-[10vw]">
                DISTORTION
              </h2>
            ))}
          </motion.div>
        </div>
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
            <Reveal key={i} delay={i * 0.1} y={50}>
              <motion.div
                whileHover={{ 
                  scale: 1.02,
                  rotate: i % 2 === 0 ? 1 : -1,
                  filter: "brightness(1.1) contrast(110%)"
                }}
                transition={{ duration: 0.4, ease: "circOut" }}
                className="aspect-[3/4] bg-zinc-900 overflow-hidden group cursor-crosshair relative"
              >
                <motion.img 
                  src={url} 
                  alt={`Gallery ${i}`} 
                  className="w-full h-full object-cover grayscale group-hover:scale-125 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default Home;
