import React, { useState, useEffect, forwardRef, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Clock, MapPin, Music, Volume2, VolumeX, ChevronDown } from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* CONSTANTS                                   */
/* -------------------------------------------------------------------------- */

export const IMAGES = {
  // Pattern for background opacity
  bg: "https://i.ibb.co/qLZHKxLm/download.png", 
  // Arch design element
  archPattern: "https://img.sanishtech.com/u/a9518ef80b35f2ff572ebc6f078f6f61.png",
  // Subtle geometric pattern
  borderPattern: "https://www.transparenttextures.com/patterns/arabesque.png",
  // Calligraphic Bismillah
  bismillah: "https://i.ibb.co/PZb45z9p/Gemini-Generated-Image-8fmttb8fmttb8fmt-removebg-preview.png"
};

export const COLORS = {
  blue: "#1e3a8a",
  gold: "#b38728",
  cream: "#f8f5f0",
  darkBlue: "#0a192f"
};

/* -------------------------------------------------------------------------- */
/* UI / SCREEN COMPONENTS                           */
/* -------------------------------------------------------------------------- */

/**
 * Animated confetti that falls down the screen.
 * Can be rendered statically for PDF context if isPdf is true.
 */
export const FallingConfetti = ({ isPdf = false }) => {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    // Generate random confetti pieces
    const newPieces = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // Random horizontal position
      y: Math.random() * 100, // Random vertical position (for PDF static view)
      delay: Math.random() * 5,
      duration: 6 + Math.random() * 4,
      size: 4 + Math.random() * 6,
      type: Math.random() > 0.5 ? 'circle' : 'square'
    }));
    setPieces(newPieces);
  }, []);

  return (
    <div className={`${isPdf ? 'absolute' : 'fixed'} inset-0 pointer-events-none z-50 overflow-hidden h-full w-full`}>
      {pieces.map((p) => (
        isPdf ? (
          // Static version for PDF
          <div key={p.id} className="absolute opacity-60"
            style={{ 
              backgroundColor: COLORS.gold,
              left: `${p.x}%`, 
              top: `${p.y}%`, 
              width: p.size, 
              height: p.size, 
              borderRadius: p.type === 'circle' ? '50%' : '0%' 
            }} 
          />
        ) : (
          // Animated version for Screen
          <motion.div
            key={p.id}
            className="absolute opacity-60"
            style={{
              backgroundColor: COLORS.gold,
              left: `${p.x}%`, 
              width: p.size, 
              height: p.size,
              borderRadius: p.type === 'circle' ? '50%' : '0%', 
              top: -20
            }}
            animate={{ 
              y: ['0vh', '110vh'], 
              rotate: [0, 360], 
              opacity: [0, 1, 0] 
            }}
            transition={{ 
              duration: p.duration, 
              ease: "linear", 
              repeat: Infinity, 
              delay: p.delay 
            }}
          />
        )
      ))}
    </div>
  );
};

export const PatternBackground = () => (
  <div className="absolute inset-0 z-0 pointer-events-none bg-[#fdfbf7]">
    <div 
      className="absolute inset-0 opacity-10" 
      style={{ backgroundImage: `url('${IMAGES.borderPattern}')` }} 
    />
  </div>
);

export const BismillahImage = ({ className = "" }) => (
  <img
    src={IMAGES.bismillah}
    alt="Bismillah"
    className={`h-16 md:h-20 mx-auto object-contain drop-shadow-sm mb-4 ${className}`}
    style={{ 
      // CSS Filter to turn the black image into Gold
      filter: 'brightness(0) saturate(100%) invert(56%) sepia(35%) saturate(735%) hue-rotate(6deg) brightness(92%) contrast(89%)' 
    }}
  />
);

export const FatemiArchSVG = ({ className, showInner = true }) => (
  <svg viewBox="0 0 400 600" className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}>
    <motion.path
      d="M 10,600 L 10,150 Q 10,10 200,10 Q 390,10 390,150 L 390,600"
      fill="none" 
      stroke={COLORS.gold} 
      strokeWidth="2"
      initial={{ pathLength: 0, opacity: 0 }} 
      whileInView={{ pathLength: 1, opacity: 1 }} 
      viewport={{ once: true }}
      transition={{ duration: 2.5, ease: "easeInOut" }}
    />
  </svg>
);

export const FloralCorner = ({ rotate = 0, style }) => (
  <svg viewBox="0 0 100 100" className="absolute w-20 h-20 md:w-32 md:h-32 z-10 pointer-events-none opacity-80" style={{ transform: `rotate(${rotate}deg)`, ...style }}>
    <motion.path 
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.5 }}
      d="M10,10 C50,10 60,60 90,90" stroke={COLORS.blue} strokeWidth="1.5" fill="none" 
    />
    <motion.circle 
      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 2 }}
      cx="90" cy="90" r="3" fill={COLORS.gold} 
    />
    <motion.path 
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.8 }}
      d="M20,20 C50,20 30,80 80,80" stroke={COLORS.gold} strokeWidth="1" fill="none" 
    />
  </svg>
);

export const FatemiBorder = ({ className }) => (
  <div className={`h-6 w-full opacity-60 border-y border-[#b38728] ${className}`}
       style={{ backgroundImage: `url('${IMAGES.borderPattern}')` }}>
  </div>
);

/**
 * An animated gate opening effect for the landing page.
 */
export const GateOpening = ({ onOpenComplete }) => (
  <div className="absolute inset-0 z-50 flex pointer-events-none overflow-hidden">
    {/* Left Door */}
    <motion.div
      initial={{ x: 0 }} 
      animate={{ x: "-100%" }}
      transition={{ duration: 2.5, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.5 }}
      className="w-1/2 h-full bg-[#1e3a8a] border-r-4 border-[#b38728] relative flex items-center justify-end shadow-2xl"
    >
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url('${IMAGES.borderPattern}')` }}></div>
      <div className="w-16 h-16 rounded-full border-4 border-[#b38728] -mr-8 z-10 bg-[#1e3a8a] flex items-center justify-center">
        <div className="w-4 h-4 rounded-full bg-[#b38728]"></div>
      </div>
    </motion.div>

    {/* Right Door */}
    <motion.div
      initial={{ x: 0 }} 
      animate={{ x: "100%" }}
      transition={{ duration: 2.5, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.5 }}
      onAnimationComplete={onOpenComplete}
      className="w-1/2 h-full bg-[#1e3a8a] border-l-4 border-[#b38728] relative flex items-center justify-start shadow-2xl"
    >
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url('${IMAGES.borderPattern}')` }}></div>
      <div className="w-16 h-16 rounded-full border-4 border-[#b38728] -ml-8 z-10 bg-[#1e3a8a] flex items-center justify-center">
        <div className="w-4 h-4 rounded-full bg-[#b38728]"></div>
      </div>
    </motion.div>
  </div>
);

/**
 * Background Music Controller
 */
export const AudioController = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Autoplay prevented", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio ref={audioRef} src={audioSrc} loop />
      <button 
        onClick={togglePlay}
        className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg border border-[#b38728] text-[#1e3a8a] hover:scale-110 transition-transform"
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>
    </div>
  );
};

export const ScrollIndicator = () => (
  <motion.div 
    className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-[#b38728]"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1, y: [0, 10, 0] }}
    transition={{ delay: 3, duration: 2, repeat: Infinity }}
  >
    <span className="text-xs uppercase tracking-widest mb-1">Scroll</span>
    <ChevronDown size={24} />
  </motion.div>
);

/* -------------------------------------------------------------------------- */
/* PDF SPECIFIC COMPONENTS                          */
/* -------------------------------------------------------------------------- */

const PdfFloralCorner = ({ rotate = 0, style }) => (
  <svg viewBox="0 0 100 100" className="absolute w-48 h-48 z-10 pointer-events-none" style={{ transform: `rotate(${rotate}deg)`, ...style }}>
    <path d="M0,0 Q60,0 100,100 L0,100 Z" fill={COLORS.blue} opacity="0.1" />
    <path d="M10,10 C50,10 60,90 90,90" stroke={COLORS.blue} strokeWidth="2" fill="none" />
    <circle cx="90" cy="90" r="4" fill={COLORS.gold} />
    <path d="M20,20 C50,20 30,80 80,80" stroke={COLORS.gold} strokeWidth="1.5" fill="none" />
  </svg>
);

const PdfFatemiBorder = () => (
  <div 
    className="h-8 w-full opacity-60 border-y-2 border-[#b38728]"
    style={{ backgroundImage: `url('${IMAGES.borderPattern}')` }}
  ></div>
);

/**
 * The Printable Component.
 * This is hidden from the screen but rendered by react-to-print.
 * It includes fixed pixel dimensions to ensure A4 fidelity.
 */
export const PdfHiddenContent = forwardRef(({ t, isArabic }, ref) => {
  // A4 Dimensions in Pixels (Standard for 96DPI: 794px x 1123px)
  const styles = {
    page: { 
      width: '794px', 
      height: '1123px', 
      position: 'relative', 
      overflow: 'hidden', 
      backgroundColor: COLORS.cream, 
      display: 'flex', 
      flexDirection: 'column' 
    },
    bgPattern: { 
      position: 'absolute', 
      inset: 0, 
      opacity: 0.1, 
      backgroundImage: `url('${IMAGES.archPattern}')`,
      backgroundSize: 'cover'
    },
    textArabic: { fontFamily: 'Amiri, serif' }, // Ensure you load this font or similar
    textEnglish: { fontFamily: 'Great Vibes, cursive' } // Ensure you load this font
  };

  const getFontClass = () => isArabic ? 'font-arabic' : 'font-calligraphy';

  return (
    <div className="hidden">
      <div ref={ref}>
        {[0, 1, 2, 3].map((pageId) => (
          <div key={pageId} style={styles.page} className="print-page-break">
            {/* --- STATIC BACKGROUND LAYER --- */}
            <div style={styles.bgPattern} />
            
            {/* --- CORNER DECORATIONS --- */}
            <PdfFloralCorner rotate={0} style={{ top: 0, left: 0 }} />
            <PdfFloralCorner rotate={90} style={{ top: 0, right: 0 }} />
            <PdfFloralCorner rotate={180} style={{ bottom: 0, right: 0 }} />
            <PdfFloralCorner rotate={270} style={{ bottom: 0, left: 0 }} />

            {/* --- PAGE 1: COVER --- */}
            {pageId === 0 && (
              <div className="h-full flex flex-col items-center justify-center p-16 relative z-10">
                <div className="border-4 border-double border-[#b38728] h-full w-full flex flex-col items-center justify-center p-8 rounded-xl bg-white/30">
                   <p className="text-[#b38728] font-bold tracking-widest uppercase text-xl mb-12">The Wedding Celebration Of</p>
                   
                   <h1 className={`text-[#1e3a8a] text-8xl my-8 ${getFontClass()}`}>{t.groom_name}</h1>
                   <Heart size={40} fill={COLORS.gold} className="text-[#b38728] my-4" />
                   <h1 className={`text-[#1e3a8a] text-8xl my-8 ${getFontClass()}`}>{t.bride_name}</h1>
                   
                   <div className="mt-12 text-[#0a192f] font-semibold text-lg uppercase tracking-wider">
                     {t.events?.[0]?.date}
                   </div>
                </div>
              </div>
            )}

            {/* --- PAGE 2: MAIN INVITATION --- */}
            {pageId === 1 && (
              <div className="h-full flex flex-col relative z-10 p-12">
                 <div className="mt-12 w-full"><PdfFatemiBorder /></div>
                 
                 <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                    {/* Bismillah using CSS filter for gold color */}
                    <img 
                      src={IMAGES.bismillah} 
                      alt="Bismillah" 
                      className="h-24 object-contain mb-8" 
                      style={{ filter: 'brightness(0) saturate(100%) invert(56%) sepia(35%) saturate(735%) hue-rotate(6deg) brightness(92%) contrast(89%)' }}
                    />
                    
                    <p className={`text-[#0f1f4b] font-semibold text-xl px-12 leading-loose ${isArabic ? 'text-justify' : 'text-center'}`}>
                      {t.spiritual_body}
                    </p>
                    
                    <p className="text-[#b38728] font-bold uppercase tracking-widest text-2xl mt-12 mb-8">
                      {t.invite_line}
                    </p>
 
                    <div className="py-8 border-y border-[#b38728]/30 w-full">
                      <h1 className={`text-[#1e3a8a] text-6xl ${getFontClass()}`}>{t.groom_name}</h1>
                      <span className="text-[#b38728] text-3xl block my-2">&</span>
                      <h1 className={`text-[#1e3a8a] text-6xl ${getFontClass()}`}>{t.bride_name}</h1>
                    </div>
 
                    <p className="text-[#0a192f] text-sm font-bold uppercase tracking-wider mt-8">{t.bride_parents_line}</p>
                 </div>
 
                 <div className="mb-12 w-full bg-[#1e3a8a] text-white p-6 text-center rounded-lg shadow-sm print:shadow-none">
                    <p className="text-[#fcf6ba] text-xl font-bold uppercase">{t.nikah_loc}</p>
                 </div>
              </div>
            )}

            {/* --- PAGE 3: EVENT DETAILS --- */}
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
                          <span className="flex items-center gap-2"><Clock size={20} className="text-[#b38728]"/> {evt.time}</span>
                          <span className="flex items-center gap-2"><MapPin size={20} className="text-[#b38728]"/> {evt.loc}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Decorative footer element */}
                <div className="mt-auto opacity-50"><PdfFatemiBorder /></div>
              </div>
            )}

            {/* --- PAGE 4: COMPLIMENTS / FAMILY --- */}
            {pageId === 3 && (
              <div className="h-full flex flex-col items-center justify-center p-16 bg-[#0a192f] text-white relative print-bg-force">
                {/* Note: print-bg-force is a hint. Browsers need 'Background Graphics' enabled in print dialog */}
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url('${IMAGES.borderPattern}')` }}></div>
                
                <div className="z-10 w-full border-4 border-[#b38728] p-16 rounded-2xl bg-[#0a192f] text-center">
                  <Heart className="mx-auto text-[#b38728] mb-8" size={64} fill={COLORS.gold} />
                  
                  <h3 className={`text-[#fcf6ba] mb-12 font-bold ${isArabic ? 'text-5xl font-arabic' : 'text-4xl font-serif uppercase tracking-widest'}`}>
                    {t.compliments_title}
                  </h3>
                  
                  <div className="flex flex-col gap-6">
                    {t.family_list && t.family_list.map((name, idx) => (
                      <div key={idx} className={`text-white text-3xl opacity-90 ${isArabic ? 'font-arabic' : 'font-serif'}`}>
                        {name}
                      </div>
                    ))}
                  </div>

                  <div className="mt-16 pt-8 border-t border-white/20">
                     <p className="text-sm tracking-widest uppercase text-[#b38728]">RSVP</p>
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

// Explicitly set displayName for debugging
PdfHiddenContent.displayName = 'PdfHiddenContent';