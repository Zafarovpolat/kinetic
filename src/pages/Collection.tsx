import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ArrowDownRight } from "lucide-react";
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

const CollectionItem: React.FC<{ id: string; title: string; category: string; img: string; delay: number }> = ({ id, title, category, img, delay }) => {
  return (
    <Reveal delay={delay} y={50} className="group relative">
      <div className="aspect-[3/4] overflow-hidden bg-zinc-900 relative">
        <motion.img 
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 1.5, ease: "circOut" }}
          src={img} 
          alt={title} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
        
        {/* Technical Overlay */}
        <div className="absolute top-4 left-4 font-mono text-[8px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p>Ref: {id}</p>
          <p>Material: Kinetic-Poly</p>
        </div>
      </div>
      
      <div className="mt-6 flex justify-between items-start">
        <div className="space-y-1">
          <p className="font-mono text-[10px] uppercase tracking-widest opacity-30">{category}</p>
          <h3 className="text-2xl font-display tracking-tighter group-hover:italic transition-all">{title}</h3>
        </div>
        <motion.div 
          whileHover={{ rotate: 45 }}
          className="p-2 border border-white/10 rounded-full"
        >
          <ArrowDownRight size={16} />
        </motion.div>
      </div>
    </Reveal>
  );
};

const Collection: React.FC<{ onBack: () => void; onNavigate: (view: string) => void }> = ({ onBack, onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  const items = [
    { id: "KS-01", title: "CYBER SHELL", category: "Outerwear", img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800" },
    { id: "KS-02", title: "KINETIC PANT", category: "Bottoms", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800" },
    { id: "KS-03", title: "GLITCH KNIT", category: "Knitwear", img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800" },
    { id: "KS-04", title: "VOID ARMOR", category: "Outerwear", img: "https://images.unsplash.com/photo-1529139513402-f20a99117592?auto=format&fit=crop&q=80&w=800" },
    { id: "KS-05", title: "FLUID VEST", category: "Mid-Layer", img: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=800" },
    { id: "KS-06", title: "MOTION CAP", category: "Hardware", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-black text-white min-h-screen pb-10"
    >
      <Header onNavigate={onNavigate} />

      {/* Hero */}
      <section className="pt-40 px-6 md:px-20 mb-40">
        <div className="max-w-screen-2xl mx-auto">
          <Reveal>
            <h1 className="text-[15vw] font-display tracking-tighter leading-[0.8] mb-20">
              THE <br /> ARCHIVE.
            </h1>
          </Reveal>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
            <Reveal delay={0.2}>
              <p className="max-w-md text-lg font-light leading-relaxed opacity-50">
                A systematic exploration of kinetic silhouettes and digital distortion. 
                Each piece is a prototype for the future of urban movement.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="flex gap-20 font-mono text-[10px] uppercase tracking-widest">
                <div className="space-y-2">
                  <p className="opacity-30">Total Units</p>
                  <p>06 / 24</p>
                </div>
                <div className="space-y-2">
                  <p className="opacity-30">Status</p>
                  <p>In-Stock</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 md:px-20">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-32">
          {items.map((item, i) => (
            <CollectionItem key={item.id} {...item} delay={i * 0.1} />
          ))}
        </div>
      </section>

      {/* Horizontal Marquee Background */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden opacity-[0.03]">
        <motion.div 
          style={{ x }}
          className="flex whitespace-nowrap items-center h-full"
        >
          <span className="text-[60vh] font-display tracking-tighter">COLLECTION COLLECTION COLLECTION</span>
        </motion.div>
      </div>

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
      <Footer onNavigate={onNavigate} />
    </motion.div>
  );
};

export default Collection;
