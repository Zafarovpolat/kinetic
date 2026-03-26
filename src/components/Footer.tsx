import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";

const Reveal = ({ children, delay = 0 }: { children: ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

export default function Footer({ onNavigate }: { onNavigate: (view: string) => void }) {
  return (
    <footer className="py-20 px-6 md:px-20 border-t border-white/10 bg-black relative z-10">
      <Reveal>
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-start gap-20">
          <div className="space-y-10">
            <h3 className="text-7xl md:text-9xl font-display tracking-tighter">KINETIC</h3>
            <div className="grid grid-cols-2 gap-20 font-mono text-[10px] uppercase tracking-[0.3em]">
              <div className="space-y-4">
                <p className="opacity-50">Navigation</p>
                <ul className="space-y-2">
                  <li><button onClick={() => onNavigate('home')} className="hover:text-white/50 transition-colors duration-300">Home</button></li>
                  <li><button onClick={() => onNavigate('collection')} className="hover:text-white/50 transition-colors duration-300">Collection</button></li>
                  <li><button onClick={() => onNavigate('archive')} className="hover:text-white/50 transition-colors duration-300">Archive</button></li>
                  <li><button onClick={() => onNavigate('studio')} className="hover:text-white/50 transition-colors duration-300">Studio</button></li>
                </ul>
              </div>
              <div className="space-y-4">
                <p className="opacity-50">Legal</p>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white/50 transition-colors duration-300">Privacy</a></li>
                  <li><a href="#" className="hover:text-white/50 transition-colors duration-300">Terms</a></li>
                  <li><a href="#" className="hover:text-white/50 transition-colors duration-300">Cookies</a></li>
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
      </Reveal>
    </footer>
  );
}
