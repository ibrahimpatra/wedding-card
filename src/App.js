import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Pause, Play, Volume2, VolumeX } from 'lucide-react';

import { CONTENT } from './data';
import { PatternBackground, FallingConfetti } from './components';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';

const SLIDE_DURATION = 7000; // 7 seconds per slide

const WeddingInvite = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [gatesOpened, setGatesOpened] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progressKey, setProgressKey] = useState(0); // forces progress bar restart
  const touchStartX = useRef(null);
  const audioRef = useRef(null);

  // Always English — Arabic button removed
  const t = CONTENT['en'];
  const isArabic = false;
  const totalPages = 3;

  /* ── Audio setup — starts the moment the page loads ── */
  useEffect(() => {
    const audio = new Audio('/wedding-music.mp3');
    audio.loop = true;
    audio.volume = 0.45;
    audio.preload = 'auto'; // buffer ASAP so first-play is instant
    audioRef.current = audio;

    // Fire immediately (works if browser allows autoplay)
    audio.play().catch(() => {});

    // Also attach every possible early-interaction event so audio
    // starts the instant the user first touches/clicks — before
    // gates even finish opening.
    const onFirstInteraction = () => {
      audio.play().catch(() => {});
      document.removeEventListener('touchstart', onFirstInteraction, { capture: true });
      document.removeEventListener('touchend',   onFirstInteraction, { capture: true });
      document.removeEventListener('click',      onFirstInteraction, { capture: true });
      document.removeEventListener('keydown',    onFirstInteraction, { capture: true });
    };

    document.addEventListener('touchstart', onFirstInteraction, { capture: true, passive: true });
    document.addEventListener('touchend',   onFirstInteraction, { capture: true, passive: true });
    document.addEventListener('click',      onFirstInteraction, { capture: true });
    document.addEventListener('keydown',    onFirstInteraction, { capture: true });

    return () => {
      audio.pause();
      audio.src = '';
      document.removeEventListener('touchstart', onFirstInteraction, { capture: true });
      document.removeEventListener('touchend',   onFirstInteraction, { capture: true });
      document.removeEventListener('click',      onFirstInteraction, { capture: true });
      document.removeEventListener('keydown',    onFirstInteraction, { capture: true });
    };
  }, []);

  /* ── Mute toggle ── */
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  /* ── Auto-advance timer (5s) ── */
  useEffect(() => {
    let interval;
    if (isPlaying && gatesOpened) {
      interval = setInterval(() => { paginate(1); }, SLIDE_DURATION);
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
    setProgressKey(k => k + 1); // restart progress bar
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
      className="h-[100dvh] w-full bg-[#f8f5f0] text-[#0a192f] overflow-hidden relative font-english"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <PatternBackground />
      <FallingConfetti />

      {/* ── TOP PROGRESS BAR ── */}
      {gatesOpened && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0,
            height: '3px',
            zIndex: 200,
            background: 'rgba(179,135,40,0.18)',
          }}
        >
          <div
            key={`pb-${progressKey}-${pageIndex}`}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #b38728 0%, #f5d060 50%, #b38728 100%)',
              transformOrigin: 'left center',
              animation: `wc-progress ${SLIDE_DURATION}ms linear forwards`,
              animationPlayState: isPlaying ? 'running' : 'paused',
            }}
          />
        </div>
      )}

      {/* ── Top controls (pause + mute) ── */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        {/* Mute / Unmute */}
        <button
          onClick={() => setIsMuted(m => !m)}
          title={isMuted ? 'Unmute music' : 'Mute music'}
          className="bg-white/80 p-2 rounded-full shadow-lg border border-[#b38728] text-[#1e3a8a] hover:scale-110 transition-transform"
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>

        {/* Play / Pause */}
        <button
          onClick={() => { setIsPlaying(p => !p); setProgressKey(k => k + 1); }}
          className="bg-white/80 p-2 rounded-full shadow-lg border border-[#b38728] text-[#1e3a8a] hover:scale-110 transition-transform"
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>
      </div>

      {/* ── Slide area ── */}
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

      {/* ── Nav arrows + dots ── */}
      {gatesOpened && (
        <>
          <button
            onClick={() => { setIsPlaying(false); paginate(-1); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-3 bg-white/80 backdrop-blur-sm rounded-full z-40 text-[#1e3a8a] border border-[#b38728] hover:scale-110 transition-transform shadow-lg"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => { setIsPlaying(false); paginate(1); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-white/80 backdrop-blur-sm rounded-full z-40 text-[#1e3a8a] border border-[#b38728] hover:scale-110 transition-transform shadow-lg"
          >
            <ChevronRight size={24} />
          </button>
          <div className="absolute bottom-5 w-full flex justify-center gap-2 z-50">
            {[...Array(totalPages)].map((_, i) => (
              <motion.div
                key={i}
                onClick={() => { setIsPlaying(false); setPageIndex(i); setProgressKey(k => k + 1); }}
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
        .font-arabic     { font-family: 'Amiri', serif; }
        .font-calligraphy{ font-family: 'Great Vibes', cursive; }
        .font-english    { font-family: 'Cinzel', serif; }
        .font-serif      { font-family: 'Playfair Display', serif; }
        ::-webkit-scrollbar { display: none; }

        @keyframes wc-progress {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
};

export default WeddingInvite;
