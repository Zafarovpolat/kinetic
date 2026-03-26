import { motion } from "motion/react";
import { Menu, X, Instagram, Globe } from "lucide-react";
import { useState } from "react";

export default function Header({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-[100] flex justify-between items-center p-6 md:p-10 mix-blend-difference">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => onNavigate('home')}
          className="text-2xl font-display tracking-[0.2em] cursor-pointer"
        >
          KINETIC
        </motion.div>
        
        <div className="hidden md:flex gap-12 text-[10px] font-mono uppercase tracking-[0.3em] items-center">
          <button onClick={() => onNavigate('collection')} className="hover:opacity-50 transition-opacity">Collection</button>
          <button onClick={() => onNavigate('archive')} className="hover:opacity-50 transition-opacity">Archive</button>
          <button onClick={() => onNavigate('studio')} className="hover:opacity-50 transition-opacity">Studio</button>
        </div>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-4 group"
        >
          <div className="w-10 h-10 flex items-center justify-center border border-white/10 rounded-full group-hover:bg-white group-hover:text-black transition-all duration-500">
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </div>
        </button>
      </nav>

      {/* Fullscreen Menu Overlay */}
      <motion.div 
        initial={{ y: "-100%" }}
        animate={{ y: isMenuOpen ? "0%" : "-100%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 bg-white text-black z-[90] flex flex-col justify-center p-10 md:p-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="space-y-10">
            {['Collection', 'Archive', 'Studio'].map((item, i) => (
              <motion.div 
                key={item}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: isMenuOpen ? 1 : 0, x: isMenuOpen ? 0 : -50 }}
                transition={{ delay: 0.2 + (i * 0.1) }}
              >
                <button 
                  onClick={() => {
                    onNavigate(item.toLowerCase());
                    setIsMenuOpen(false);
                  }}
                  className="text-6xl md:text-9xl font-display tracking-tighter hover:italic hover:pl-10 transition-all duration-500"
                >
                  {item}
                </button>
              </motion.div>
            ))}
          </div>
          <div className="flex flex-col justify-end gap-10">
            <div className="grid grid-cols-2 gap-10 font-mono text-[10px] uppercase tracking-widest">
              <div className="space-y-4">
                <p className="opacity-30">Social</p>
                <ul className="space-y-2">
                  <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity flex items-center gap-2"><Instagram size={12} /> Instagram</a></li>
                  <li><a href="https://t.me" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity flex items-center gap-2"><Globe size={12} /> Telegram</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <p className="opacity-30">Studio</p>
                <p>Berlin / DE <br /> Studio A / 10117</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
