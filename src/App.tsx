import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Archive from "./pages/Archive";
import Studio from "./pages/Studio";
import Header from "./components/Header";

export default function App() {
  const [view, setView] = useState('home');
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Re-init Lenis on view change
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [view]);

  return (
    <div ref={containerRef} className="grain min-h-screen bg-black font-sans selection:bg-white selection:text-black">
      <Header onNavigate={setView} />
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
        <motion.div
          key={view}
          initial={{ opacity: 0, x: 20, filter: "blur(20px)", scale: 0.98 }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)", scale: 1 }}
          exit={{ opacity: 0, x: -20, filter: "blur(20px)", scale: 1.02 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          {view === 'home' && (
            <Home onNavigate={setView} />
          )}
          {view === 'collection' && (
            <Collection onBack={() => setView('home')} onNavigate={setView} />
          )}
          {view === 'archive' && (
            <Archive onBack={() => setView('home')} onNavigate={setView} />
          )}
          {view === 'studio' && (
            <Studio onBack={() => setView('home')} onNavigate={setView} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* SVG Distortion Filter */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
        <filter id="distortionFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.1" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" />
        </filter>
      </svg>
    </div>
  );
}
