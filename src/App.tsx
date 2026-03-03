import { useState, useEffect, useCallback, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Layout
import ProgressBar from './components/layout/ProgressBar';
import SideNav, { SLIDE_LABELS } from './components/layout/SideNav';
import NavControls from './components/layout/NavControls';

// Slides
import HeroSlide from './components/slides/HeroSlide';
import DataSlide from './components/slides/DataSlide';
import StackSlide from './components/slides/StackSlide';
import PreprocessingSlide from './components/slides/PreprocessingSlide';
import YuNetSlide from './components/slides/YuNetSlide';
import AnalyticsSlide from './components/slides/AnalyticsSlide';
import MobileNetSlide from './components/slides/MobileNetSlide';
import ThreadingSlide from './components/slides/ThreadingSlide';
import OptimizationSlide from './components/slides/OptimizationSlide';
import ConclusionSlide from './components/slides/ConclusionSlide';

import type { SlideDefinition } from './types';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  /**
   * Stable slides array — created once, never rebuilt on re-render.
   */
  const slides: SlideDefinition[] = useMemo(
    () => [
      { id: 'hero', content: <HeroSlide /> },
      { id: 'data', content: <DataSlide /> },
      { id: 'stack', content: <StackSlide /> },
      { id: 'preprocessing', content: <PreprocessingSlide /> },
      { id: 'yunet', content: <YuNetSlide /> },
      { id: 'analytics', content: <AnalyticsSlide /> },
      { id: 'mobilenet', content: <MobileNetSlide /> },
      { id: 'threading', content: <ThreadingSlide /> },
      { id: 'optimization', content: <OptimizationSlide /> },
      { id: 'conclusion', content: <ConclusionSlide /> },
    ],
    [],
  );

  /** Navigate to the next slide. Stable ref via `useCallback`. */
  const next = useCallback(
    () => setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1)),
    [slides.length],
  );

  /** Navigate to the previous slide. Stable ref via `useCallback`. */
  const prev = useCallback(
    () => setCurrentSlide(prev => Math.max(prev - 1, 0)),
    [],
  );

  /**
   * Keyboard navigation.
   *
   * Bug fixes applied:
   * 1. `next`/`prev` are stable `useCallback` refs — no stale-closure issue.
   * 2. `e.preventDefault()` is called for Space so the browser doesn't scroll
   *    the page while the user is navigating the presentation.
   */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') { next(); return; }
      if (e.key === 'ArrowLeft') { prev(); return; }
      if (e.key === ' ') {
        e.preventDefault(); // Prevent page scroll on Space
        next();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [next, prev]);

  return (
    <div className="fixed inset-0 bg-[#020617] text-slate-200 overflow-hidden font-sans selection:bg-emerald-500/30">
      {/* Ambient background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[200px] rounded-full pointer-events-none opacity-40" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-500/5 blur-[200px] rounded-full pointer-events-none opacity-40" />

      {/* Progress bar */}
      <ProgressBar current={currentSlide} total={slides.length} />

      {/* Side navigation dots */}
      <SideNav
        count={slides.length}
        current={currentSlide}
        labels={SLIDE_LABELS}
        onSelect={setCurrentSlide}
      />

      {/* Slide content */}
      <div className="relative z-10 w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div key={currentSlide} className="w-full h-full">
            {slides[currentSlide].content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom navigation */}
      <NavControls
        current={currentSlide}
        total={slides.length}
        onNext={next}
        onPrev={prev}
      />
    </div>
  );
}