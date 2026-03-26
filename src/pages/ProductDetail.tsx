import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Share2, Download, ShieldCheck, Zap } from "lucide-react";
import React, { ReactNode } from "react";
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

export interface ProductData {
  id?: string;
  title: string;
  category: string;
  img?: string;
  year?: string;
  status?: string;
  description?: string;
  specs?: string[];
}

const ProductDetail: React.FC<{ data: ProductData; onBack: () => void; onNavigate: (view: string) => void }> = ({ data, onBack, onNavigate }) => {
  const defaultImg = "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1200";
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-black text-white min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative min-h-[120vh] flex flex-col md:flex-row">
        {/* Left: Image */}
        <div className="w-full md:w-1/2 h-[70vh] md:h-screen sticky top-0 overflow-hidden">
          <motion.img 
            initial={{ scale: 1.2, filter: "blur(20px)" }}
            animate={{ scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: "circOut" }}
            src={data.img || defaultImg} 
            alt={data.title}
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
          
          {/* Technical Specs Overlay */}
          <div className="absolute bottom-10 left-10 font-alt text-[8px] uppercase tracking-[0.5em] space-y-2 opacity-40">
            <p>MODEL: {data.id || "KS-ARCHIVE"}</p>
            <p>LAT: 52.5200° N, LONG: 13.4050° E</p>
            <p>SYSTEM: KINETIC_OS_v4.2</p>
          </div>
        </div>

        {/* Right: Content */}
        <div className="w-full md:w-1/2 p-6 md:p-20 pt-20 md:pt-40 space-y-20">
          <div className="space-y-6">
            <Reveal>
              <div className="flex items-center gap-4 font-alt text-[10px] uppercase tracking-widest opacity-40">
                <span>{data.year || "2025"}</span>
                <span className="w-1 h-1 bg-white rounded-full" />
                <span>{data.category}</span>
                {data.status && (
                  <>
                    <span className="w-1 h-1 bg-white rounded-full" />
                    <span className="text-white opacity-100 border border-white/20 px-2 py-0.5 rounded-full">{data.status}</span>
                  </>
                )}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-6xl md:text-9xl font-display tracking-tighter leading-[0.8]">
                {data.title.split(' ').map((word, i) => (
                  <React.Fragment key={i}>
                    {i === 1 ? <span className="italic pl-4 md:pl-10">{word}</span> : word}
                    {i < data.title.split(' ').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h1>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="max-w-md space-y-8">
              <p className="text-xl font-light leading-relaxed opacity-60">
                {data.description || "A systematic exploration of kinetic silhouettes and digital distortion. Engineered for high-performance urban movement and adaptive environments."}
              </p>
              
              <div className="grid grid-cols-2 gap-8 pt-10 border-t border-white/10">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-alt text-[10px] uppercase tracking-widest opacity-30">
                    <ShieldCheck size={12} />
                    <span>Protection</span>
                  </div>
                  <p className="text-sm">Level 4 Kinetic Armor</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-alt text-[10px] uppercase tracking-widest opacity-30">
                    <Zap size={12} />
                    <span>Weight</span>
                  </div>
                  <p className="text-sm">420g Ultralight Shell</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="space-y-10">
              <h4 className="font-alt text-[10px] uppercase tracking-widest opacity-30">Technical Specifications</h4>
              <ul className="space-y-4">
                {(data.specs || ["Water-repellent membrane", "Laser-cut ventilation", "Magnetic closure system", "Internal device pocket"]).map((spec, i) => (
                  <li key={i} className="flex items-center gap-4 group">
                    <div className="w-1 h-1 bg-white rounded-full group-hover:scale-150 transition-transform" />
                    <span className="text-sm opacity-60 group-hover:opacity-100 transition-opacity">{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="flex flex-wrap gap-4 pt-10">
              <button className="px-10 py-4 bg-white text-black font-alt text-[10px] uppercase tracking-widest hover:bg-transparent hover:text-white border border-white transition-all duration-500 flex items-center gap-4">
                Acquire Unit <ArrowRight size={14} />
              </button>
              <button className="p-4 border border-white/10 hover:border-white transition-all duration-500">
                <Share2 size={16} />
              </button>
              <button className="p-4 border border-white/10 hover:border-white transition-all duration-500">
                <Download size={16} />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related / Next Section */}
      <section className="py-40 px-6 md:px-20 border-t border-white/10 overflow-hidden">
        <motion.div 
          whileHover="hover"
          className="max-w-screen-2xl mx-auto flex justify-between items-end cursor-pointer group"
        >
          <div className="space-y-4">
            <motion.p 
              variants={{ hover: { x: 10, opacity: 1 } }}
              className="font-alt text-[10px] uppercase tracking-widest opacity-30 transition-all"
            >
              Next Project
            </motion.p>
            <motion.h2 
              variants={{ hover: { x: 20, skewX: -10 } }}
              className="text-4xl md:text-8xl font-display tracking-tighter transition-all duration-500"
            >
              KINETIC <span className="italic pl-4">PANT V2</span>
            </motion.h2>
          </div>
          <motion.div
            variants={{ hover: { x: 50, opacity: 0 } }}
            className="transition-all duration-500"
          >
            <ArrowRight size={40} className="opacity-20" />
          </motion.div>
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            variants={{ hover: { x: 0, opacity: 1 } }}
            className="absolute right-20 transition-all duration-500"
          >
            <ArrowRight size={80} className="text-white" />
          </motion.div>
        </motion.div>
      </section>

      <Footer onNavigate={onNavigate} />
    </motion.div>
  );
};

export default ProductDetail;
