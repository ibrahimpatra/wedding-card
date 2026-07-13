import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { MUSIC_SRC } from './musicConfig';
import { trackPlay } from './analytics';
import { PatternBackground, FallingConfetti } from './components';
import { CONTENT } from './data';
import Page1 from './Page1';
import EventInvitePage from './EventInvitePage';

const SLIDE_DURATION = 7000;

const CardSlider = () => {
  const [pageIndex,    setPageIndex]    = useState(0);
  const [isPlaying,    setIsPlaying]    = useState(true);
  const [gatesOpened,  setGatesOpened]  = useState(false);
  const [isMuted,      setIsMuted]      = useState(false);
  const [progressKey,  setProgressKey]  = useState(0);
  const touchStartX = useRef(null);
  const audioRef    = useRef(null);
  const totalPages  = 2;
  const t           = CONTENT['en'];

  /* ── Music ── */
  useEffect(() => {
    const audio = new Audio(MUSIC_SRC);
    audio.loop = true; audio.volume = 0.45;
    audioRef.current = audio;
    const onInteract = () => {
      audio.play().catch(() => {});
      document.removeEventListener('touchstart', onInteract);
      document.removeEventListener('click',      onInteract);
    };
    audio.play().catch(() => {
      document.addEventListener('touchstart', onInteract);
      document.addEventListener('click',      onInteract);
    });
    trackPlay('/card');
    return () => { audio.pause(); audio.src = ''; };
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = isMuted;
  }, [isMuted]);

  /* ── Auto-advance ── */
  useEffect(() => {
    if (!isPlaying || !gatesOpened) return;
    const id = setInterval(() => paginate(1), SLIDE_DURATION);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, pageIndex, gatesOpened]);

  const paginate = useCallback((dir) => {
    setPageIndex(prev => {
      let n = prev + dir;
      if (n < 0)           n = totalPages - 1;
      if (n >= totalPages) n = 0;
      return n;
    });
    setProgressKey(k => k + 1);
  }, []);

  /* ── Swipe ── */
  const onTouchStart = e => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = e => {
    if (!touchStartX.current || !gatesOpened) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { setIsPlaying(false); paginate(diff > 0 ? 1 : -1); }
    touchStartX.current = null;
  };

  const renderSlide = (idx) => {
    switch (idx) {
      case 0:
        return (
          <Page1
            gatesOpened={gatesOpened}
            setGatesOpened={setGatesOpened}
            t={t}
            isArabic={false}
          />
        );
      case 1:
        /* disableAudio — CardSlider owns the audio player */
        return <EventInvitePage eventKey="reception" count={null} disableAudio />;
      default:
        return null;
    }
  };

  return (
    <div
      className="h-[100dvh] w-full bg-[#f8f5f0] overflow-hidden relative font-english"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <PatternBackground />
      <FallingConfetti />

      {/* ── Progress bar ── */}
      {gatesOpened && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          height: 3, zIndex: 200,
          background: 'rgba(179,135,40,0.18)',
        }}>
          <div
            key={`pb-${progressKey}-${pageIndex}`}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg,#b38728 0%,#f5d060 50%,#b38728 100%)',
              transformOrigin: 'left center',
              animation: `wc-progress ${SLIDE_DURATION}ms linear forwards`,
              animationPlayState: isPlaying ? 'running' : 'paused',
            }}
          />
        </div>
      )}

      {/* ── Mute + Pause buttons ── */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={() => setIsMuted(m => !m)}
          className="bg-white/80 p-2 rounded-full shadow-lg border border-[#b38728] text-[#1e3a8a] hover:scale-110 transition-transform"
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
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

      <style>{`
        @keyframes wc-progress {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
};

export default CardSlider;
