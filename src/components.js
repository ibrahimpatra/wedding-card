import React, { useState, useEffect, forwardRef, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Clock, MapPin, Music, Volume2, VolumeX, ChevronDown } from 'lucide-react';

export const IMAGES = {
  bg: "https://i.ibb.co/qLZHKxLm/download.png", 
  archPattern: "https://img.sanishtech.com/u/a9518ef80b35f2ff572ebc6f078f6f61.png",
  borderPattern: "https://www.transparenttextures.com/patterns/arabesque.png",
  bismillah: "https://i.ibb.co/PZb45z9p/Gemini-Generated-Image-8fmttb8fmttb8fmt-removebg-preview.png"
};

export const COLORS = {
  blue: "#1e3a8a",
  gold: "#b38728",
  cream: "#f8f5f0",
  darkBlue: "#0a192f"
};

/* ── Falling Confetti ── */
export const FallingConfetti = ({ isPdf = false }) => {
  const [pieces, setPieces] = useState([]);
  useEffect(() => {
    const newPieces = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 6,
      duration: 7 + Math.random() * 5,
      size: 3 + Math.random() * 5,
      type: Math.random() > 0.6 ? 'diamond' : Math.random() > 0.5 ? 'circle' : 'square'
    }));
    setPieces(newPieces);
  }, []);

  return (
    <div className={`${isPdf ? 'absolute' : 'fixed'} inset-0 pointer-events-none z-50 overflow-hidden h-full w-full`}>
      {pieces.map((p) => (
        isPdf ? (
          <div key={p.id} className="absolute opacity-50"
            style={{ backgroundColor: COLORS.gold, left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, borderRadius: p.type === 'circle' ? '50%' : '0%' }} />
        ) : (
          <motion.div key={p.id} className="absolute opacity-0"
            style={{ backgroundColor: COLORS.gold, left: `${p.x}%`, width: p.size, height: p.size,
              borderRadius: p.type === 'circle' ? '50%' : p.type === 'diamond' ? '1px' : '0%',
              transform: p.type === 'diamond' ? 'rotate(45deg)' : 'none', top: -20 }}
            animate={{ y: ['0vh', '110vh'], rotate: [0, 360], opacity: [0, 0.7, 0] }}
            transition={{ duration: p.duration, ease: "linear", repeat: Infinity, delay: p.delay }}
          />
        )
      ))}
    </div>
  );
};

/* ── Floating Petals (Page 2 background) ── */
export const FloatingPetals = () => {
  const [petals, setPetals] = useState([]);
  useEffect(() => {
    setPetals(Array.from({ length: 18 }).map((_, i) => ({
      id: i, x: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 10 + Math.random() * 8,
      size: 6 + Math.random() * 10,
      drift: (Math.random() - 0.5) * 60
    })));
  }, []);
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map(p => (
        <motion.div key={p.id}
          style={{ position: 'absolute', left: `${p.x}%`, top: -30, width: p.size, height: p.size * 1.4,
            background: 'radial-gradient(ellipse, rgba(179,135,40,0.25) 0%, rgba(179,135,40,0.05) 100%)',
            borderRadius: '50% 20% 50% 20%' }}
          animate={{ y: ['0vh', '110vh'], x: [0, p.drift, 0, -p.drift, 0], rotate: [0, 180, 360], opacity: [0, 0.6, 0.6, 0] }}
          transition={{ duration: p.duration, ease: "linear", repeat: Infinity, delay: p.delay }}
        />
      ))}
    </div>
  );
};

/* ── Sparkle Field ── */
export const SparkleField = ({ count = 20 }) => {
  const [sparks, setSparks] = useState([]);
  useEffect(() => {
    setSparks(Array.from({ length: count }).map((_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      delay: Math.random() * 4, size: 3 + Math.random() * 5
    })));
  }, [count]);
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {sparks.map(s => (
        <motion.div key={s.id}
          style={{ position: 'absolute', left: `${s.x}%`, top: `${s.y}%` }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
          transition={{ duration: 2.5 + Math.random() * 2, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
        >
          <svg width={s.size * 2} height={s.size * 2} viewBox="0 0 20 20">
            <path d="M10 0 L11.5 8.5 L20 10 L11.5 11.5 L10 20 L8.5 11.5 L0 10 L8.5 8.5 Z"
              fill="#b38728" opacity="0.7" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

/* ── Pattern Background ── */
export const PatternBackground = () => (
  <div className="absolute inset-0 z-0 pointer-events-none bg-[#fdfbf7]">
    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url('${IMAGES.borderPattern}')` }} />
  </div>
);

/* ── Bismillah Image ── */
export const BismillahImage = ({ className = "" }) => (
  <motion.img
    src={IMAGES.bismillah}
    alt="Bismillah"
    className={`h-12 md:h-16 mx-auto object-contain drop-shadow-sm mb-3 ${className}`}
    style={{ filter: 'brightness(0) saturate(100%) invert(56%) sepia(35%) saturate(735%) hue-rotate(6deg) brightness(92%) contrast(89%)' }}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1, delay: 0.2 }}
  />
);

/* ── Fatemi Arch ── */
export const FatemiArchSVG = ({ className, showInner = true }) => (
  <svg viewBox="0 0 400 600" className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}>
    <motion.path
      d="M 10,600 L 10,150 Q 10,10 200,10 Q 390,10 390,150 L 390,600"
      fill="none" stroke={COLORS.gold} strokeWidth="2"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 2.5, ease: "easeInOut" }}
    />
    {showInner && (
      <motion.path
        d="M 30,600 L 30,160 Q 30,30 200,30 Q 370,30 370,160 L 370,600"
        fill="none" stroke={COLORS.gold} strokeWidth="1" opacity="0.4"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.4 }}
        viewport={{ once: true }}
        transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
      />
    )}
  </svg>
);

/* ── Enhanced Floral Corner ── */
export const FloralCorner = ({ rotate = 0, style }) => (
  <svg viewBox="0 0 120 120" className="absolute w-20 h-20 md:w-28 md:h-28 z-10 pointer-events-none" style={{ transform: `rotate(${rotate}deg)`, ...style }}>
    <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.2, delay: 0.3 }}
      d="M5,5 C60,5 70,70 110,110" stroke={COLORS.blue} strokeWidth="1.5" fill="none" />
    <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.2, delay: 0.6 }}
      d="M18,5 C60,18 80,70 110,95" stroke={COLORS.gold} strokeWidth="1" fill="none" opacity="0.7" />
    <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.9 }}
      d="M5,18 C18,60 70,80 95,110" stroke={COLORS.gold} strokeWidth="0.8" fill="none" opacity="0.5" />
    <motion.circle initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4, delay: 2.2 }}
      cx="110" cy="110" r="4" fill={COLORS.gold} />
    <motion.circle initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4, delay: 2.5 }}
      cx="95" cy="110" r="2.5" fill={COLORS.gold} opacity="0.6" />
    <motion.circle initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4, delay: 2.7 }}
      cx="110" cy="95" r="2.5" fill={COLORS.gold} opacity="0.6" />
    <motion.path initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.4 }} transition={{ duration: 1, delay: 1.5 }}
      d="M5,5 L18,5 L5,18 Z" stroke={COLORS.gold} strokeWidth="1" fill="rgba(179,135,40,0.1)" />
  </svg>
);

/* ── Gold Ornament Divider ── */
export const GoldDivider = ({ delay = 0 }) => (
  <div className="flex items-center w-full my-2 md:my-3">
    <motion.div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#b38728]"
      initial={{ scaleX: 0, originX: 1 }} animate={{ scaleX: 1 }}
      transition={{ duration: 1.2, delay, ease: 'easeOut' }} />
    <motion.svg width="28" height="28" viewBox="0 0 28 28" className="mx-2 shrink-0"
      initial={{ opacity: 0, rotate: -45, scale: 0 }} animate={{ opacity: 1, rotate: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: delay + 0.6 }}>
      <path d="M14 2 L16 12 L26 14 L16 16 L14 26 L12 16 L2 14 L12 12 Z" fill="#b38728" opacity="0.85" />
      <circle cx="14" cy="14" r="3" fill="#f8f5f0" />
    </motion.svg>
    <motion.div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#b38728]"
      initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }}
      transition={{ duration: 1.2, delay, ease: 'easeOut' }} />
  </div>
);

/* ── Spinning Ring ornament (behind names on Page 2) ── */
export const SpinningRing = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden opacity-10">
    <motion.svg width="280" height="280" viewBox="0 0 280 280"
      animate={{ rotate: 360 }} transition={{ duration: 40, ease: 'linear', repeat: Infinity }}>
      <circle cx="140" cy="140" r="130" fill="none" stroke="#b38728" strokeWidth="1" strokeDasharray="8 6" />
      <circle cx="140" cy="140" r="110" fill="none" stroke="#1e3a8a" strokeWidth="0.5" strokeDasharray="4 10" />
    </motion.svg>
    <motion.svg width="200" height="200" viewBox="0 0 200 200" className="absolute"
      animate={{ rotate: -360 }} transition={{ duration: 28, ease: 'linear', repeat: Infinity }}>
      {[0,45,90,135,180,225,270,315].map(a => (
        <path key={a} d="M100 10 L103 97 L100 100 L97 97 Z" fill="#b38728" opacity="0.6"
          transform={`rotate(${a} 100 100)`} />
      ))}
    </motion.svg>
  </div>
);

/* ── Pulsing Heart ── */
export const PulsingHeart = () => (
  <motion.div
    animate={{ scale: [1, 1.25, 1], opacity: [0.8, 1, 0.8] }}
    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
  >
    <Heart size={18} fill="#b38728" className="text-[#b38728]" />
  </motion.div>
);

/* ── Fatemi Border ── */
export const FatemiBorder = ({ className }) => (
  <div className={`h-6 w-full opacity-60 border-y border-[#b38728] ${className}`}
    style={{ backgroundImage: `url('${IMAGES.borderPattern}')` }}>
  </div>
);

/* ── Gate Opening ── */
export const GateOpening = ({ onOpenComplete }) => (
  <div className="absolute inset-0 z-50 flex pointer-events-none overflow-hidden">
    <motion.div initial={{ x: 0 }} animate={{ x: "-100%" }}
      transition={{ duration: 2.5, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.5 }}
      className="w-1/2 h-full bg-[#1e3a8a] border-r-4 border-[#b38728] relative flex items-center justify-end shadow-2xl">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url('${IMAGES.borderPattern}')` }}></div>
      <SparkleField count={8} />
      <div className="w-16 h-16 rounded-full border-4 border-[#b38728] -mr-8 z-10 bg-[#1e3a8a] flex items-center justify-center">
        <div className="w-4 h-4 rounded-full bg-[#b38728]"></div>
      </div>
    </motion.div>
    <motion.div initial={{ x: 0 }} animate={{ x: "100%" }}
      transition={{ duration: 2.5, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.5 }}
      onAnimationComplete={onOpenComplete}
      className="w-1/2 h-full bg-[#1e3a8a] border-l-4 border-[#b38728] relative flex items-center justify-start shadow-2xl">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url('${IMAGES.borderPattern}')` }}></div>
      <div className="w-16 h-16 rounded-full border-4 border-[#b38728] -ml-8 z-10 bg-[#1e3a8a] flex items-center justify-center">
        <div className="w-4 h-4 rounded-full bg-[#b38728]"></div>
      </div>
    </motion.div>
  </div>
);

/* ── Audio Controller ── */
export const AudioController = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) { audioRef.current.pause(); }
      else { audioRef.current.play().catch(e => console.log("Autoplay prevented", e)); }
      setIsPlaying(!isPlaying);
    }
  };
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio ref={audioRef} src={audioSrc} loop />
      <button onClick={togglePlay}
        className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg border border-[#b38728] text-[#1e3a8a] hover:scale-110 transition-transform">
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>
    </div>
  );
};

export const ScrollIndicator = () => (
  <motion.div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-[#b38728]"
    initial={{ opacity: 0 }} animate={{ opacity: 1, y: [0, 10, 0] }}
    transition={{ delay: 3, duration: 2, repeat: Infinity }}>
    <span className="text-xs uppercase tracking-widest mb-1">Scroll</span>
    <ChevronDown size={24} />
  </motion.div>
);

/* ── PDF Hidden Content ── */
const PdfFloralCorner = ({ rotate = 0, style }) => (
  <svg viewBox="0 0 100 100" className="absolute w-48 h-48 z-10 pointer-events-none" style={{ transform: `rotate(${rotate}deg)`, ...style }}>
    <path d="M0,0 Q60,0 100,100 L0,100 Z" fill={COLORS.blue} opacity="0.1" />
    <path d="M10,10 C50,10 60,90 90,90" stroke={COLORS.blue} strokeWidth="2" fill="none" />
    <circle cx="90" cy="90" r="4" fill={COLORS.gold} />
    <path d="M20,20 C50,20 30,80 80,80" stroke={COLORS.gold} strokeWidth="1.5" fill="none" />
  </svg>
);

const PdfFatemiBorder = () => (
  <div className="h-8 w-full opacity-60 border-y-2 border-[#b38728]"
    style={{ backgroundImage: `url('${IMAGES.borderPattern}')` }}></div>
);

export const PdfHiddenContent = forwardRef(({ t, isArabic }, ref) => {
  const styles = {
    page: { width: '794px', height: '1123px', position: 'relative', overflow: 'hidden', backgroundColor: COLORS.cream, display: 'flex', flexDirection: 'column' },
    bgPattern: { position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: `url('${IMAGES.archPattern}')`, backgroundSize: 'cover' },
  };
  const getFontClass = () => isArabic ? 'font-arabic' : 'font-calligraphy';
  return (
    <div className="hidden">
      <div ref={ref}>
        {[0, 1, 2, 3].map((pageId) => (
          <div key={pageId} style={styles.page} className="print-page-break">
            <div style={styles.bgPattern} />
            <PdfFloralCorner rotate={0} style={{ top: 0, left: 0 }} />
            <PdfFloralCorner rotate={90} style={{ top: 0, right: 0 }} />
            <PdfFloralCorner rotate={180} style={{ bottom: 0, right: 0 }} />
            <PdfFloralCorner rotate={270} style={{ bottom: 0, left: 0 }} />
            {pageId === 0 && (
              <div className="h-full flex flex-col items-center justify-center p-16 relative z-10">
                <div className="border-4 border-double border-[#b38728] h-full w-full flex flex-col items-center justify-center p-8 rounded-xl bg-white/30">
                  <p className="text-[#b38728] font-bold tracking-widest uppercase text-xl mb-12">The Wedding Celebration Of</p>
                  <h1 className={`text-[#1e3a8a] text-8xl my-8 ${getFontClass()}`}>{t.groom_name}</h1>
                  <Heart size={40} fill={COLORS.gold} className="text-[#b38728] my-4" />
                  <h1 className={`text-[#1e3a8a] text-8xl my-8 ${getFontClass()}`}>{t.bride_name}</h1>
                  <div className="mt-12 text-[#0a192f] font-semibold text-lg uppercase tracking-wider">{t.events?.[0]?.date}</div>
                </div>
              </div>
            )}
            {pageId === 1 && (
              <div className="h-full flex flex-col relative z-10 p-12">
                <div className="mt-12 w-full"><PdfFatemiBorder /></div>
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                  <img src={IMAGES.bismillah} alt="Bismillah" className="h-24 object-contain mb-8"
                    style={{ filter: 'brightness(0) saturate(100%) invert(56%) sepia(35%) saturate(735%) hue-rotate(6deg) brightness(92%) contrast(89%)' }} />
                  <p className={`text-[#0f1f4b] font-semibold text-xl px-12 leading-loose ${isArabic ? 'text-justify' : 'text-center'}`}>{t.spiritual_body}</p>
                  <p className="text-[#b38728] font-bold uppercase tracking-widest text-2xl mt-12 mb-8">{t.invite_line}</p>
                  <div className="py-8 border-y border-[#b38728]/30 w-full">
                    <h1 className={`text-[#1e3a8a] text-6xl ${getFontClass()}`}>{t.groom_name}</h1>
                    <span className="text-[#b38728] text-3xl block my-2">&</span>
                    <h1 className={`text-[#1e3a8a] text-6xl ${getFontClass()}`}>{t.bride_name}</h1>
                  </div>
                  <p className="text-[#0a192f] text-sm font-bold uppercase tracking-wider mt-8">{t.bride_parents_line}</p>
                </div>
                <div className="mb-12 w-full bg-[#1e3a8a] text-white p-6 text-center rounded-lg shadow-sm">
                  <p className="text-[#fcf6ba] text-xl font-bold uppercase">{t.nikah_loc}</p>
                </div>
              </div>
            )}
            {pageId === 2 && (
              <div className="h-full flex flex-col relative z-10 p-16">
                <div className="text-center mb-16">
                  <h2 className={`text-[#1e3a8a] text-7xl ${getFontClass()}`}>{t.events_title}</h2>
                  <div className="w-32 h-1 bg-[#b38728] mx-auto mt-4 rounded-full"></div>
                </div>
                <div className="flex flex-col gap-8">
                  {t.events && t.events.map((evt, i) => (
                    <div key={i} className="bg-white border-l-8 border-[#b38728] p-8 shadow-sm flex items-center gap-8 rounded-r-xl">
                      <div className="bg-[#1e3a8a] text-white w-24 h-24 rounded-full flex items-center justify-center font-bold text-2xl border-2 border-[#d4af37] shrink-0">
                        {evt.date.split(' ')[0]}
                      </div>
                      <div>
                        <h3 className={`text-[#1e3a8a] font-bold text-4xl mb-2 ${isArabic ? 'font-arabic' : 'font-serif'}`}>{evt.title}</h3>
                        <div className="text-xl text-gray-600 flex gap-6 mt-2">
                          <span className="flex items-center gap-2"><MapPin size={20} className="text-[#b38728]" /> {evt.loc}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-auto opacity-50"><PdfFatemiBorder /></div>
              </div>
            )}
            {pageId === 3 && (
              <div className="h-full flex flex-col items-center justify-center p-16 bg-[#0a192f] text-white relative">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url('${IMAGES.borderPattern}')` }}></div>
                <div className="z-10 w-full border-4 border-[#b38728] p-16 rounded-2xl bg-[#0a192f] text-center">
                  <Heart className="mx-auto text-[#b38728] mb-8" size={64} fill={COLORS.gold} />
                  <h3 className={`text-[#fcf6ba] mb-12 font-bold ${isArabic ? 'text-5xl font-arabic' : 'text-4xl font-serif uppercase tracking-widest'}`}>{t.compliments_title}</h3>
                  <div className="flex flex-col gap-6">
                    {t.family_list && t.family_list.map((name, idx) => (
                      <div key={idx} className={`text-white text-3xl opacity-90 ${isArabic ? 'font-arabic' : 'font-serif'}`}>{name}</div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
});
PdfHiddenContent.displayName = 'PdfHiddenContent';
