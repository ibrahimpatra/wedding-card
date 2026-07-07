import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Pause, Play, Volume2, VolumeX } from 'lucide-react';

import { CONTENT } from './data';
import { parseInviteCode } from './inviteCode';
import { PatternBackground, FallingConfetti } from './components';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import PdfGenerator from './PdfGenerator';
import EventInvitePage from './EventInvitePage';
import AdminPage from './AdminPage';

const SLIDE_DURATION = 7000;

/* ── Play Overlay ── */
const PlayOverlay = ({ onPlay }) => (
  <motion.div
    key="play-overlay"
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.7 }}
    style={{
      position: 'fixed', inset: 0, zIndex: 999,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(160deg, #0a192f 0%, #1e3a8a 55%, #0a192f 100%)',
    }}
  >
    {/* Arabesque pattern */}
    <div style={{
      position: 'absolute', inset: 0, opacity: 0.1,
      backgroundImage: "url('https://www.transparenttextures.com/patterns/arabesque.png')",
    }} />

    {/* Pulsing gold rings */}
    <motion.div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', border: '1px solid rgba(179,135,40,0.25)' }}
      animate={{ scale: [1, 1.06, 1], opacity: [0.25, 0.5, 0.25] }}
      transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }} />
    <motion.div style={{ position: 'absolute', width: 420, height: 420, borderRadius: '50%', border: '1px solid rgba(179,135,40,0.12)' }}
      animate={{ scale: [1.05, 1, 1.05], opacity: [0.15, 0.35, 0.15] }}
      transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }} />

    {/* Content */}
    <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>

      {/* Play button */}
      <motion.button
        onClick={onPlay}
        initial={{ scale: 0.75, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        whileTap={{ scale: 0.93 }}
        whileHover={{ scale: 1.08 }}
        style={{
          width: 96, height: 96, borderRadius: '50%',
          background: 'rgba(255,255,255,0.12)',
          border: '2.5px solid rgba(255,255,255,0.88)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 0 0 0 rgba(255,255,255,0.3)',
          marginBottom: 22,
        }}
      >
        {/* Triangle play icon */}
        <svg width="32" height="36" viewBox="0 0 32 36" fill="none">
          <path d="M3 2 L30 18 L3 34 Z" fill="white" />
        </svg>
      </motion.button>

      {/* "Tap to Play" label */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        style={{
          color: 'rgba(255,255,255,0.82)',
          fontFamily: "'Cinzel', serif",
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          margin: 0,
        }}
      >
        Tap to Play
      </motion.p>

      {/* Gold ornament below text */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.7, delay: 0.55 }}
        style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14 }}
      >
        <div style={{ height: 1, width: 36, background: 'linear-gradient(to right, transparent, #b38728)' }} />
        <svg width="10" height="10" viewBox="0 0 28 28">
          <path d="M14 2 L16 12 L26 14 L16 16 L14 26 L12 16 L2 14 L12 12 Z" fill="#b38728" opacity="0.9" />
        </svg>
        <div style={{ height: 1, width: 36, background: 'linear-gradient(to left, transparent, #b38728)' }} />
      </motion.div>

      {/* Music hint */}
      {/* <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        style={{ color: 'rgba(255,255,255,0.28)', fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 12 }}
      >
        🎵 &nbsp; With music
      </motion.p> */}
    </div>
  </motion.div>
);

/* ── Main App ── */
// ── Event-page routes: /mehendi /majlis /nikah /mamamusala (+optional /1 /2 /a) ──
const EVENT_SLUGS = ['mehendi', 'majlis', 'nikah', 'mamamusala'];

const EVENT_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Great+Vibes&family=Cinzel:wght@400;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Caveat:wght@500;700&display=swap');
  .font-arabic     { font-family: 'Amiri', serif; }
  .font-calligraphy{ font-family: 'Great Vibes', cursive; }
  .font-english    { font-family: 'Cinzel', serif; }
  .font-serif      { font-family: 'Playfair Display', serif; }
  .font-handwritten{ font-family: 'Caveat', cursive; }
  ::-webkit-scrollbar { display: none; }
`;

// ── MainCard: all the existing sliding-card logic (hooks safe here) ──
const MainCard = () => {
  const [splashDone, setSplashDone] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [gatesOpened, setGatesOpened] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const [pdfGenerating, setPdfGenerating] = useState(false);

  const touchStartX = useRef(null);
  const audioRef = useRef(null);
  const pdfRef = useRef(null);

  const t = CONTENT['en'];
  const isArabic = false;
  const totalPages = 3;

  /* ── Invitee route code, e.g. site.com/FZ1KXA ──
   * null → no/invalid code → show both events, no invitee count (default)
   */
  const inviteCode = useMemo(
    () => parseInviteCode(window.location.pathname),
    []
  );

  /* ── /NB = No Buttons mode — hides all UI chrome for clean screenshots ── */
  const noButtons = useMemo(
    () => window.location.pathname.replace(/^\/+|\/+$/g,'').toUpperCase() === 'NB',
    []
  );

  /* ── Audio element — do NOT auto-play ── */
  useEffect(() => {
    const audio = new Audio('/wedding-music.mp3');
    audio.loop = true;
    audio.volume = 0.45;
    audio.preload = 'auto';
    audioRef.current = audio;
    return () => { audio.pause(); audio.src = ''; };
  }, []);

  /* ── Mute ── */
  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = isMuted;
  }, [isMuted]);

  /* ── Slideshow timer — only after gates open ── */
  useEffect(() => {
    let timer;
    if (isPlaying && gatesOpened) {
      timer = setInterval(() => paginate(1), SLIDE_DURATION);
    }
    return () => clearInterval(timer);
  }, [isPlaying, pageIndex, gatesOpened]);

  /* ── Play button tap — user gesture gives iOS permission to play audio ── */
  const handlePlay = useCallback(() => {
    if (audioRef.current) audioRef.current.play().catch(() => { });
    setSplashDone(true);
  }, []);

  const paginate = useCallback((dir) => {
    setPageIndex(prev => {
      let next = prev + dir;
      if (next < 0) next = totalPages - 1;
      if (next >= totalPages) next = 0;
      return next;
    });
    setProgressKey(k => k + 1);
  }, []);


  const handleDownloadPDF = () => {
    const link = document.createElement('a');
    link.href = '/Ibrahim_Weds_Zenab.pdf';
    link.download = 'Ibrahim_Weds_Zenab.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  // /* ── PDF generation: html2canvas each hidden page → jsPDF ── */
  // const handleDownloadPDF = useCallback(async () => {
  //   if (pdfGenerating || !pdfRef.current) return;
  //   setPdfGenerating(true);
  //   try {
  //     const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
  //       import('html2canvas'),
  //       import('jspdf'),
  //     ]);

  //     const pdf = new jsPDF({ orientation:'portrait', unit:'mm', format:'a4' });
  //     const pages = pdfRef.current.children;

  //     for (let i = 0; i < pages.length; i++) {
  //       const canvas = await html2canvas(pages[i], {
  //         scale: 2,
  //         useCORS: true,
  //         allowTaint: true,
  //         backgroundColor: '#fdfbf7',
  //         logging: false,
  //       });
  //       const imgData = canvas.toDataURL('image/jpeg', 0.92);
  //       if (i > 0) pdf.addPage();
  //       pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
  //     }

  //     pdf.save('Ibrahim_Weds_Zenab.pdf');
  //   } catch (err) {
  //     console.error('PDF generation failed:', err);
  //   } finally {
  //     setPdfGenerating(false);
  //   }
  // }, [pdfGenerating]);

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
      case 2: return <Page3 t={t} isArabic={isArabic} handleDownloadPDF={handleDownloadPDF} isGeneratingPdf={pdfGenerating} inviteCode={inviteCode} noButtons={noButtons} />;
      default: return null;
    }
  };

  /* ── Show only play button until tapped — nothing else mounts ── */
  if (!splashDone) {
    return (
      <>
        <div style={{ position: 'fixed', inset: 0, background: '#fdfbf7' }} />
        <PlayOverlay onPlay={handlePlay} />
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&display=swap');
        `}</style>
      </>
    );
  }

  return (
    <>
      {/* Hidden PDF pages — rendered off-screen for html2canvas capture */}
      <PdfGenerator ref={pdfRef} t={t} isArabic={isArabic} />

      {/* Main card */}
      <div
        className="h-[100dvh] w-full bg-[#f8f5f0] text-[#0a192f] overflow-hidden relative font-english"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <PatternBackground />
        <FallingConfetti />

        {/* Progress bar */}
        {gatesOpened && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 3, zIndex: 200, background: 'rgba(179,135,40,0.18)' }}>
            <div key={`pb-${progressKey}-${pageIndex}`} style={{
              height: '100%',
              background: 'linear-gradient(90deg, #b38728 0%, #f5d060 50%, #b38728 100%)',
              transformOrigin: 'left center',
              animation: `wc-progress ${SLIDE_DURATION}ms linear forwards`,
              animationPlayState: isPlaying ? 'running' : 'paused',
            }} />
          </div>
        )}

        {/* Mute + pause — hidden in /NB mode */}
        {!noButtons && (
          <div className="fixed top-4 right-4 z-50 flex gap-2">
            <button onClick={() => setIsMuted(m => !m)}
              className="bg-white/80 p-2 rounded-full shadow-lg border border-[#b38728] text-[#1e3a8a] hover:scale-110 transition-transform">
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <button onClick={() => { setIsPlaying(p => !p); setProgressKey(k => k + 1); }}
              className="bg-white/80 p-2 rounded-full shadow-lg border border-[#b38728] text-[#1e3a8a] hover:scale-110 transition-transform">
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
          </div>
        )}

        {/* Slides */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div key={pageIndex}
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.6 }}
              className="absolute w-full h-full flex items-center justify-center">
              {renderSlide(pageIndex)}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Nav arrows + dots — hidden in /NB mode */}
        {gatesOpened && !noButtons && (
          <>
            <button onClick={() => { setIsPlaying(false); paginate(-1); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-3 bg-white/80 backdrop-blur-sm rounded-full z-40 text-[#1e3a8a] border border-[#b38728] hover:scale-110 transition-transform shadow-lg">
              <ChevronLeft size={24} />
            </button>
            <button onClick={() => { setIsPlaying(false); paginate(1); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-white/80 backdrop-blur-sm rounded-full z-40 text-[#1e3a8a] border border-[#b38728] hover:scale-110 transition-transform shadow-lg">
              <ChevronRight size={24} />
            </button>
            <div className="absolute bottom-5 w-full flex justify-center gap-2 z-50">
              {[...Array(totalPages)].map((_, i) => (
                <motion.div key={i}
                  onClick={() => { setIsPlaying(false); setPageIndex(i); setProgressKey(k => k + 1); }}
                  className="cursor-pointer rounded-full"
                  animate={{ width: i === pageIndex ? 28 : 8, backgroundColor: i === pageIndex ? '#b38728' : 'rgba(179,135,40,0.35)' }}
                  transition={{ duration: 0.4 }}
                  style={{ height: 4 }} />
              ))}
            </div>
          </>
        )}

        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Great+Vibes&family=Cinzel:wght@400;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Caveat:wght@500;700&display=swap');
          .font-arabic      { font-family: 'Amiri', serif; }
          .font-calligraphy { font-family: 'Great Vibes', cursive; }
          .font-english     { font-family: 'Cinzel', serif; }
          .font-serif       { font-family: 'Playfair Display', serif; }
          .font-handwritten { font-family: 'Caveat', cursive; }
          ::-webkit-scrollbar { display: none; }
          @keyframes wc-progress {
            from { transform: scaleX(0); }
            to   { transform: scaleX(1); }
          }
        `}</style>
      </div>
    </>
  );
};

// ── WeddingInvite: top-level router — no hooks, just routing ────────
const WeddingInvite = () => {
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  const slugLower = pathParts[0]?.toLowerCase();
  const countRaw  = pathParts[1]?.toLowerCase();

  // ── /admin route ────────────────────────────────────────────────
  if (slugLower === 'admin') {
    return (
      <div className="font-english" style={{ minHeight: '100dvh' }}>
        <AdminPage />
        <style>{EVENT_STYLES}</style>
      </div>
    );
  }

  if (EVENT_SLUGS.includes(slugLower)) {
    const count = countRaw === '1' ? '1'
                : countRaw === '2' ? '2'
                : countRaw === 'a' ? 'A'
                : null;
    return (
      <div className="h-[100dvh] w-full bg-[#f8f5f0] overflow-hidden relative font-english">
        <PatternBackground />
        <FallingConfetti />
        <EventInvitePage eventKey={slugLower} count={count} />
        <style>{EVENT_STYLES}</style>
      </div>
    );
  }

  return <MainCard />;
};

export default WeddingInvite;