import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Pause, Play, Globe } from 'lucide-react';

import { CONTENT } from './data';
import { PatternBackground, FallingConfetti } from './components';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';

const WeddingInvite = () => {
  const [lang, setLang] = useState('en');
  const [pageIndex, setPageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [gatesOpened, setGatesOpened] = useState(false);
  const touchStartX = useRef(null);

  const t = CONTENT[lang];
  const isArabic = lang === 'ld';
  const totalPages = 3;

  useEffect(() => {
    let interval;
    if (isPlaying && gatesOpened) {
      interval = setInterval(() => { paginate(1); }, 7000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, pageIndex, gatesOpened]);

  const paginate = useCallback((dir) => {
    setPageIndex(prev => {
      let next = prev + dir;
      if (next < 0) next = totalPages - 1;
      if (next >= totalPages) next = 0;
      return next;
    });
  }, []);

  const handleDownloadPDF = () => {
    const link = document.createElement('a');
    link.href = '/Ibrahim_Weds_Zenab.pdf';
    link.download = 'Ibrahim_Weds_Zenab.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Swipe support
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null || !gatesOpened) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { setIsPlaying(false); paginate(diff > 0 ? 1 : -1); }
    touchStartX.current = null;
  };

  const renderSlide = (index) => {
    switch (index) {
      case 0: return <Page1 gatesOpened={gatesOpened} setGatesOpened={setGatesOpened} t={t} isArabic={isArabic} />;
      case 1: return <Page2 t={t} isArabic={isArabic} />;
      case 2: return <Page3 t={t} isArabic={isArabic} handleDownloadPDF={handleDownloadPDF} isGeneratingPdf={false} />;
      default: return null;
    }
  };

  return (
    <div
      className={`h-[100dvh] w-full bg-[#f8f5f0] text-[#0a192f] overflow-hidden relative ${isArabic ? 'font-arabic' : 'font-english'}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <PatternBackground />
      <FallingConfetti />

      {/* Top controls */}
      <div className="fixed top-4 right-4 z-50 flex gap-3">
        <button onClick={() => setIsPlaying(!isPlaying)}
          className="bg-white/80 p-2 rounded-full shadow-lg border border-[#b38728] text-[#1e3a8a] hover:scale-110 transition-transform">
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>
        <button onClick={() => setLang(prev => prev === 'en' ? 'ld' : 'en')}
          className="flex items-center gap-2 bg-[#1e3a8a] text-white px-4 py-2 rounded-full shadow-xl border border-[#b38728] hover:scale-105 transition-transform">
          <Globe size={14} />
          <span className="text-xs font-bold">{lang === 'en' ? 'عربي' : 'ENG'}</span>
        </button>
      </div>

      {/* Slide area */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={pageIndex}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
            className="absolute w-full h-full flex items-center justify-center"
          >
            {renderSlide(pageIndex)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav arrows + dots */}
      {gatesOpened && (
        <>
          <button
            onClick={() => { setIsPlaying(false); paginate(-1); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/60 backdrop-blur-sm rounded-full z-40 text-[#1e3a8a] border border-[#b38728]/30 hover:scale-110 transition-transform shadow-md"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => { setIsPlaying(false); paginate(1); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/60 backdrop-blur-sm rounded-full z-40 text-[#1e3a8a] border border-[#b38728]/30 hover:scale-110 transition-transform shadow-md"
          >
            <ChevronRight size={20} />
          </button>
          <div className="absolute bottom-5 w-full flex justify-center gap-2 z-50">
            {[...Array(totalPages)].map((_, i) => (
              <motion.div
                key={i}
                onClick={() => { setIsPlaying(false); setPageIndex(i); }}
                className="cursor-pointer rounded-full"
                animate={{
                  width: i === pageIndex ? 28 : 8,
                  backgroundColor: i === pageIndex ? '#b38728' : 'rgba(179,135,40,0.35)',
                }}
                transition={{ duration: 0.4 }}
                style={{ height: 4 }}
              />
            ))}
          </div>
        </>
      )}

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Great+Vibes&family=Cinzel:wght@400;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
        .font-arabic { font-family: 'Amiri', serif; }
        .font-calligraphy { font-family: 'Great Vibes', cursive; }
        .font-english { font-family: 'Cinzel', serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default WeddingInvite;
