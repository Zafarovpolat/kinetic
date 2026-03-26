import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Archive from "./pages/Archive";
import Studio from "./pages/Studio";

export default function App() {
  const [view, setView] = useState('home');
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Lenis initialization
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
  }, [view]); // Re-init on view change to reset scroll

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <div ref={containerRef} className="grain min-h-screen bg-black font-sans selection:bg-white selection:text-black">
      <AnimatePresence mode="wait">
        {view === 'home' && (
          <Home key="home" onNavigate={setView} />
        )}
        {view === 'collection' && (
          <Collection key="collection" onBack={() => setView('home')} onNavigate={setView} />
        )}
        {view === 'archive' && (
          <Archive key="archive" onBack={() => setView('home')} onNavigate={setView} />
        )}
        {view === 'studio' && (
          <Studio key="studio" onBack={() => setView('home')} onNavigate={setView} />
        )}
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
