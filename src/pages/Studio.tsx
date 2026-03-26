import { motion, useScroll, useTransform } from "motion/react";
import { Globe, MapPin, Instagram } from "lucide-react";
import React, { useRef, ReactNode } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Reveal: React.FC<{ children: ReactNode; delay?: number; blur?: boolean; y?: number; className?: string }> = ({ children, delay = 0, blur = true, y = 30, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: y, filter: blur ? "blur(10px)" : "none" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Studio: React.FC<{ onBack: () => void; onNavigate: (view: string) => void }> = ({ onBack, onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  const bgOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.5]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-black text-white min-h-screen selection:bg-white selection:text-black"
    >
      <Header onNavigate={onNavigate} />

      {/* Hero Section - Vertical Typography */}
      <section className="relative h-screen flex items-center justify-center px-6 md:px-20 z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 w-full max-w-screen-2xl items-center">
          <div className="md:col-span-1 hidden md:block">
            <div className="writing-vertical-rl rotate-180 font-mono text-[10px] uppercase tracking-[1em] opacity-30">
              ESTABLISHED 2024 BERLIN
            </div>
          </div>
          <div className="md:col-span-10 text-center md:text-left">
            <Reveal y={100}>
              <h1 className="text-[15vw] md:text-[12vw] font-display tracking-tighter leading-[0.8] mb-10">
                KINETIC <br /> 
                <span className="italic pl-[5vw]">LABORATORY.</span>
              </h1>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-20">
              <Reveal delay={0.3}>
                <p className="text-xl md:text-2xl font-light leading-relaxed opacity-60">
                  We operate at the intersection of digital distortion and physical reality. Our studio is a space for experimental silhouettes and high-performance urban gear.
                </p>
              </Reveal>
              <Reveal delay={0.4} className="flex flex-col justify-end items-end">
                <div className="text-right">
                  <p className="font-mono text-[10px] uppercase tracking-widest mb-4 opacity-30">Our Mission</p>
                  <p className="text-lg italic">"To redefine the modern urban landscape through kinetic energy and digital precision."</p>
                </div>
              </Reveal>
            </div>
          </div>
          <div className="md:col-span-1 hidden md:block flex justify-end">
             <div className="writing-vertical-rl font-mono text-[10px] uppercase tracking-[1em] opacity-30">
              SCROLL TO EXPLORE
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto Section - Split Layout */}
      <section className="relative py-40 px-6 md:px-20 z-10 border-t border-white/5">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-40">
            <div className="space-y-20">
              <Reveal>
                <div className="space-y-6">
                  <span className="font-mono text-[10px] uppercase tracking-widest opacity-30">01 / Philosophy</span>
                  <h2 className="text-5xl md:text-7xl font-display tracking-tighter">DIGITAL <br /> DISTORTION.</h2>
                  <p className="opacity-50 leading-relaxed max-w-md">
                    We embrace the glitch. In a world of perfect renders, we find beauty in the artifacts of digital processing. Our garments reflect this controlled chaos.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="space-y-6">
                  <span className="font-mono text-[10px] uppercase tracking-widest opacity-30">02 / Materiality</span>
                  <h2 className="text-5xl md:text-7xl font-display tracking-tighter">KINETIC <br /> FABRICS.</h2>
                  <p className="opacity-50 leading-relaxed max-w-md">
                    High-performance textiles that move with the body. We source materials that react to light, heat, and movement, creating a living interface between human and environment.
                  </p>
                </div>
              </Reveal>
            </div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl group">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                src="https://images.unsplash.com/photo-1558304970-abd589baebe5?auto=format&fit=crop&q=80&w=1200" 
                alt="Studio Space"
                className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-10 flex flex-col justify-end">
                <p className="font-mono text-[10px] uppercase tracking-widest mb-2">Location 01</p>
                <h3 className="text-3xl font-display tracking-tighter italic">Berlin Mitte / Headquarters</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Process - Horizontal Scroll Feel */}
      <section className="py-40 bg-white text-black z-10 relative">
        <div className="px-6 md:px-20 max-w-screen-2xl mx-auto">
          <Reveal>
            <h2 className="text-[10vw] font-display tracking-tighter leading-none mb-20">THE PROCESS.</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-20">
            {[
              { step: "01", title: "CONCEPT", desc: "Digital sketching and neural network exploration to define the core silhouette." },
              { step: "02", title: "PROTOTYPE", desc: "3D modeling and physical draping to test kinetic movement and material stress." },
              { step: "03", title: "DISTORT", desc: "Applying digital artifacts and final hardware integration for the urban landscape." }
            ].map((item, i) => (
              <Reveal key={item.step} delay={i * 0.2}>
                <div className="space-y-6 group cursor-default">
                  <div className="text-6xl font-display tracking-tighter opacity-10 group-hover:opacity-100 transition-opacity duration-500">{item.step}</div>
                  <h3 className="text-4xl font-display tracking-tighter">{item.title}</h3>
                  <p className="opacity-60 leading-relaxed">{item.desc}</p>
                  <div className="w-full h-px bg-black/10 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Location - Redesigned */}
      <section className="py-60 px-6 md:px-20 z-10 relative overflow-hidden">
        {/* Background Technical Grid */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
            {/* Left Side - Massive Heading */}
            <div className="lg:col-span-7">
              <Reveal y={50}>
                <div className="space-y-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.5em] opacity-30">Connect with the system</p>
                  <h2 className="text-[12vw] font-display tracking-tighter leading-[0.8] mb-20">
                    GET IN <br /> 
                    <span className="italic">TOUCH.</span>
                  </h2>
                </div>
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">
                <Reveal delay={0.2}>
                  <a href="#" className="group block space-y-4 border-l border-white/10 pl-8 py-4 hover:border-white transition-all duration-500">
                    <p className="font-mono text-[10px] uppercase tracking-widest opacity-30 group-hover:opacity-100 transition-opacity">Digital Presence</p>
                    <h3 className="text-4xl font-display tracking-tighter group-hover:italic transition-all">INSTAGRAM</h3>
                    <p className="text-sm opacity-50">@kinetic.system</p>
                  </a>
                </Reveal>
                <Reveal delay={0.3}>
                  <a href="#" className="group block space-y-4 border-l border-white/10 pl-8 py-4 hover:border-white transition-all duration-500">
                    <p className="font-mono text-[10px] uppercase tracking-widest opacity-30 group-hover:opacity-100 transition-opacity">Direct Channel</p>
                    <h3 className="text-4xl font-display tracking-tighter group-hover:italic transition-all">TELEGRAM</h3>
                    <p className="text-sm opacity-50">@kinetic_system</p>
                  </a>
                </Reveal>
              </div>
            </div>

            {/* Right Side - Technical Status Card */}
            <div className="lg:col-span-5">
              <Reveal delay={0.4} y={100}>
                <div className="relative p-1 bg-gradient-to-br from-white/20 to-transparent rounded-[2rem]">
                  <div className="bg-zinc-950 rounded-[1.9rem] p-10 md:p-16 space-y-12">
                    <div className="flex justify-between items-start">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          <span className="font-mono text-[10px] uppercase tracking-widest opacity-50">System Online</span>
                        </div>
                        <h3 className="text-5xl font-display tracking-tighter">BERLIN HQ</h3>
                      </div>
                      <MapPin className="opacity-30" size={32} />
                    </div>

                    <div className="space-y-8">
                      <div className="space-y-2">
                        <p className="font-mono text-[10px] uppercase tracking-widest opacity-30">Coordinates</p>
                        <p className="text-xl font-mono">52.5200° N, 13.4050° E</p>
                      </div>
                      <div className="space-y-2">
                        <p className="font-mono text-[10px] uppercase tracking-widest opacity-30">Physical Access</p>
                        <p className="text-xl leading-relaxed">
                          Torstraße 101, 10117 Berlin <br />
                          Germany / EU
                        </p>
                      </div>
                    </div>

                    <div className="pt-12 border-t border-white/5 flex justify-between items-end">
                      <div className="space-y-2">
                        <p className="font-mono text-[10px] uppercase tracking-widest opacity-30">Current Time</p>
                        <p className="text-4xl font-display tracking-tighter">16:44 <span className="text-sm font-mono opacity-30">CET</span></p>
                      </div>
                      <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center animate-spin-slow">
                        <Globe size={24} className="opacity-30" />
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </motion.div>
  );
};

export default Studio;
