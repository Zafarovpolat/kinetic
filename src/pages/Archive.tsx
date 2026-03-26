import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ArrowDownRight, Search, Filter, ChevronRight } from "lucide-react";
import React, { useRef, useState, ReactNode } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

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

const ArchiveRow: React.FC<{ year: string; title: string; category: string; status: string; delay: number }> = ({ year, title, category, status, delay }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="group grid grid-cols-12 gap-4 py-8 border-b border-white/10 items-center cursor-pointer hover:bg-white hover:text-black transition-all duration-500 px-4 md:px-8"
    >
      <div className="col-span-2 font-mono text-[10px] opacity-30 group-hover:opacity-100">{year}</div>
      <div className="col-span-5 md:col-span-6">
        <h3 className="text-2xl md:text-4xl font-display tracking-tighter group-hover:italic transition-all">{title}</h3>
      </div>
      <div className="col-span-3 md:col-span-2 font-mono text-[10px] uppercase tracking-widest opacity-30 group-hover:opacity-100">{category}</div>
      <div className="col-span-2 flex justify-end">
        <div className="w-8 h-8 rounded-full border border-current flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
          <ChevronRight size={16} />
        </div>
      </div>
    </motion.div>
  );
};

const Archive: React.FC<{ onBack: () => void; onNavigate: (view: string) => void }> = ({ onBack, onNavigate }) => {
  const [filter, setFilter] = useState('ALL');
  const archiveItems = [
    { year: "2025", title: "CYBER-ORGANIC SHELL", category: "OUTERWEAR", status: "RELEASED" },
    { year: "2025", title: "KINETIC TROUSERS V2", category: "BOTTOMS", status: "RELEASED" },
    { year: "2024", title: "DISTORTION KNIT", category: "KNITWEAR", status: "ARCHIVED" },
    { year: "2024", title: "LIQUID ACCESSORY SET", category: "HARDWARE", status: "ARCHIVED" },
    { year: "2024", title: "VOID ARMOR PROTOTYPE", category: "OUTERWEAR", status: "TESTING" },
    { year: "2023", title: "NEURAL INTERFACE HOODIE", category: "TECHWEAR", status: "ARCHIVED" },
    { year: "2023", title: "GLITCH CARGO SYSTEM", category: "BOTTOMS", status: "ARCHIVED" },
    { year: "2022", title: "ORIGIN SERIES 01", category: "COLLECTION", status: "LEGACY" },
  ];

  const filteredItems = filter === 'ALL' ? archiveItems : archiveItems.filter(item => item.category === filter);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-black text-white min-h-screen pb-10"
    >
      <Header onNavigate={onNavigate} />

      {/* Hero Section */}
      <section className="pt-40 px-6 md:px-20 mb-20">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
            <div className="md:col-span-8">
              <Reveal>
                <h1 className="text-[12vw] font-display tracking-tighter leading-[0.8] mb-10">
                  THE <br /> RECORDS.
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="max-w-md text-lg font-light leading-relaxed opacity-50">
                  A chronological database of experimental silhouettes, material studies, and digital distortions from the Kinetic Studio laboratory.
                </p>
              </Reveal>
            </div>
            <div className="md:col-span-4 flex flex-col items-end gap-6">
              <div className="w-full h-px bg-white/10" />
              <div className="flex gap-4 font-mono text-[10px] uppercase tracking-widest">
                {['ALL', 'OUTERWEAR', 'BOTTOMS', 'KNITWEAR'].map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-4 py-2 border rounded-full transition-all ${filter === cat ? 'bg-white text-black border-white' : 'border-white/10 hover:border-white/50'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Grid */}
      <section className="px-6 md:px-20">
        <div className="max-w-screen-2xl mx-auto">
          {/* Grid Header */}
          <div className="grid grid-cols-12 gap-4 py-4 border-y border-white/10 font-mono text-[10px] uppercase tracking-widest opacity-30 px-4 md:px-8">
            <div className="col-span-2">Year</div>
            <div className="col-span-5 md:col-span-6">Project Name</div>
            <div className="col-span-3 md:col-span-2">Category</div>
            <div className="col-span-2 text-right">Action</div>
          </div>

          {/* Grid Rows */}
          <div className="flex flex-col">
            {filteredItems.map((item, i) => (
              <ArchiveRow 
                key={item.title}
                year={item.year}
                title={item.title}
                category={item.category}
                status={item.status}
                delay={i * 0.05}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-60 mb-32 px-6 md:px-20 text-center">
        <Reveal>
          <div className="inline-block group cursor-pointer">
            <h2 className="text-6xl md:text-9xl font-display tracking-tighter group-hover:italic transition-all duration-500">
              STAY DISTORTED.
            </h2>
            <div className="mt-10 flex items-center justify-center gap-4">
              <div className="w-20 h-px bg-white/20 group-hover:w-40 transition-all duration-500" />
              <p className="font-mono text-[10px] uppercase tracking-widest">Join the system</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Background Technical Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]">
        <div className="absolute top-0 left-0 w-full h-full grid grid-cols-12 gap-px">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="border-r border-white h-full" />
          ))}
        </div>
      </div>
      <Footer onNavigate={onNavigate} />
    </motion.div>
  );
};

export default Archive;
