import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Clock, MapPin, Heart, ChevronRight, ChevronLeft, Pause, Play } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// NOTE: Ensure your ./data file is present.
import { CONTENT } from './data';

// --- 1. DESIGN COMPONENTS ---

// Modified to accept props for PDF usage (static positioning vs fixed)
export const FallingConfetti = ({ isPdf = false }) => {
  const [pieces, setPieces] = useState([]);
  useEffect(() => {
    const newPieces = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100, // For PDF static placement
      delay: Math.random() * 5,
      duration: 6 + Math.random() * 4,
      size: 3 + Math.random() * 5,
      type: Math.random() > 0.5 ? 'circle' : 'square'
    }));
    setPieces(newPieces);
  }, []);

  return (
    <div className={`${isPdf ? 'absolute' : 'fixed'} inset-0 pointer-events-none z-50 overflow-hidden h-full w-full`}>
      {pieces.map((p) => (
        isPdf ? (
            // STATIC CONFETTI FOR PDF
            <div key={p.id} className="absolute bg-[#b38728] opacity-60"
            style={{ 
                left: `${p.x}%`, 
                top: `${p.y}%`,
                width: p.size, 
                height: p.size, 
                borderRadius: p.type === 'circle' ? '50%' : '0%' 
            }} />
        ) : (
            // ANIMATED CONFETTI FOR WEB
            <motion.div
            key={p.id}
            className="absolute bg-[#b38728] opacity-60"
            style={{
                left: `${p.x}%`,
                width: p.size,
                height: p.size,
                borderRadius: p.type === 'circle' ? '50%' : '0%',
                top: -20
            }}
            animate={{ y: ['0vh', '110vh'], rotate: [0, 360], opacity: [0, 1, 0] }}
            transition={{ duration: p.duration, ease: "linear", repeat: Infinity, delay: p.delay }}
            />
        )
      ))}
    </div>
  );
};

export const PatternBackground = () => (
  <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundColor: '#f8f5f0' }}>
      {/* Background Image */}
      <div className="absolute inset-0 opacity-200" // Increased opacity
        style={{
            backgroundImage: `url('https://i.ibb.co/mrxnkSrh/bg.png')`, // NEW LINK
            backgroundRepeat: 'repeat',
            backgroundSize: '150px auto'
        }}
      />
      {/* Darker Overlay to make BG pop */}
      <div className="absolute inset-0 bg-black/5 mix-blend-multiply" /> 
  </div>
);

export const BismillahImage = () => (
  <img
    src="https://i.ibb.co/PZb45z9p/Gemini-Generated-Image-8fmttb8fmttb8fmt-removebg-preview.png" // NEW LINK
    alt="Bismillah"
    className="h-12 md:h-20 mx-auto object-contain drop-shadow-sm mb-4"
    style={{ filter: 'brightness(0) saturate(100%) invert(14%) sepia(35%) saturate(3821%) hue-rotate(205deg) brightness(91%) contrast(96%)' }}
  />
);

export const FatemiArchSVG = ({ className, showInner = true }) => (
  <svg viewBox="0 0 400 600" className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}>
    <motion.path
      d="M 10,600 L 10,150 Q 10,10 200,10 Q 390,10 390,150 L 390,600"
      fill="none" stroke="#b38728" strokeWidth="3"
      initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2 }}
    />
    {showInner && (
      <motion.path
        d="M 25,600 L 25,160 Q 25,30 200,30 Q 375,30 375,160 L 375,600"
        fill="none" stroke="#1e3a8a" strokeWidth="1.5" strokeDasharray="4, 4"
        initial={{ opacity: 0 }} whileInView={{ opacity: 0.5 }} transition={{ delay: 1, duration: 1 }}
      />
    )}
  </svg>
);

export const FloralCorner = ({ rotate = 0, style }) => (
  <svg viewBox="0 0 100 100" className="absolute w-20 h-20 md:w-48 md:h-48 z-10 pointer-events-none" style={{ transform: `rotate(${rotate}deg)`, ...style }}>
    <path d="M0,0 Q60,0 100,100 L0,100 Z" fill="#1e3a8a" opacity="0.1" />
    <path d="M10,10 C50,10 60,60 90,90" stroke="#1e3a8a" strokeWidth="2" fill="none" />
    <circle cx="90" cy="90" r="4" fill="#b38728" />
    <path d="M20,20 C50,20 30,80 80,80" stroke="#b38728" strokeWidth="1.5" fill="none" />
  </svg>
);

export const FatemiBorder = ({ className }) => (
  <div className={`h-8 w-full bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-60 border-y-2 border-[#b38728] ${className}`}></div>
);

// --- 2. GATE ANIMATION ---
const GateOpening = ({ onOpenComplete }) => {
  return (
    <div className="absolute inset-0 z-40 flex pointer-events-none">
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
        className="w-1/2 h-full bg-[#1e3a8a] border-r-4 border-[#b38728] relative flex items-center justify-end"
      >
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
        <div className="mr-4 w-4 h-24 rounded-full bg-[#b38728]/50 blur-md"></div>
      </motion.div>
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "100%" }}
        transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
        onAnimationComplete={onOpenComplete}
        className="w-1/2 h-full bg-[#1e3a8a] border-l-4 border-[#b38728] relative flex items-center justify-start"
      >
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
        <div className="ml-4 w-4 h-24 rounded-full bg-[#b38728]/50 blur-md"></div>
      </motion.div>
    </div>
  );
};

// --- 3. ANIMATIONS (CHANGED TO FADE AS REQUESTED) ---
const fadeVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.8, ease: "easeOut" } 
  },
  exit: { 
      opacity: 0, 
      scale: 1.05, 
      transition: { duration: 0.4 } 
  }
};

// --- 4. MAIN APP ---

const WeddingInvite = () => {
  const [lang, setLang] = useState('en');
  const [pageIndex, setPageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [gatesOpened, setGatesOpened] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const printRef = useRef(null);

  const t = CONTENT[lang];
  const isArabic = lang === 'ld';
  const totalPages = 4;

  // Autoplay Logic
  useEffect(() => {
    let interval;
    if (isPlaying && gatesOpened) {
      interval = setInterval(() => {
        paginate(1);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, pageIndex, gatesOpened]);

  // SCROLL SUPPORT ADDED
  useEffect(() => {
      const handleWheel = (e) => {
          if (isGeneratingPdf) return;
          if (e.deltaY > 50) {
              setIsPlaying(false);
              paginate(1);
          } else if (e.deltaY < -50) {
              setIsPlaying(false);
              paginate(-1);
          }
      };
      
      // Debounce simple implementation
      let timeout;
      const debouncedWheel = (e) => {
          if(timeout) return;
          handleWheel(e);
          timeout = setTimeout(() => { timeout = null }, 500);
      };

      window.addEventListener('wheel', debouncedWheel);
      return () => window.removeEventListener('wheel', debouncedWheel);
  }, [isGeneratingPdf]);

  const paginate = useCallback((newDirection) => {
    setPageIndex((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = totalPages - 1;
      if (next >= totalPages) next = 0;
      return next;
    });
  }, []);

  // PDF Generation Logic
  const handleDownloadPDF = async () => {
    setIsGeneratingPdf(true);
    setIsPlaying(false);

    try {
      if (!printRef.current) return;
      
      const doc = new jsPDF('p', 'mm', 'a4');
      const elements = printRef.current.children;
      
      for (let i = 0; i < elements.length; i++) {
        const canvas = await html2canvas(elements[i], {
          scale: 2, 
          useCORS: true,
          logging: false
        });
        
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = doc.internal.pageSize.getHeight();
        
        if (i > 0) doc.addPage();
        doc.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      }
      
      doc.save(`${t.groom_name}_${t.bride_name}_Invite.pdf`);
    } catch (err) {
      console.error("PDF Gen Error:", err);
      alert("Could not generate PDF. Please try again.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const renderSlide = (index) => {
    switch (index) {
      // PAGE 1: COVER
      case 0:
        return (
          <div className="relative h-full w-full flex flex-col items-center justify-center p-4 overflow-hidden">
            {!gatesOpened && <GateOpening onOpenComplete={() => setGatesOpened(true)} />}
            
            <FatemiArchSVG showInner={false} />
            <FloralCorner rotate={0} style={{ top: 0, left: 0 }} />
            <FloralCorner rotate={90} style={{ top: 0, right: 0 }} />
            <FloralCorner rotate={180} style={{ bottom: 0, right: 0 }} />
            <FloralCorner rotate={270} style={{ bottom: 0, left: 0 }} />

            <div className="z-10 flex flex-col items-center justify-center w-full h-full text-center">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: gatesOpened ? 1 : 0 }}
                transition={{ delay: 0.2 }}
                className="text-[#b38728] font-bold tracking-[0.2em] uppercase text-[10px] md:text-sm mb-6"
              >
                The Wedding Celebration Of
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: gatesOpened ? 1 : 0, scale: gatesOpened ? 1 : 0.8 }}
                transition={{ duration: 1, ease: "backOut", delay: 0.5 }}
                className="flex flex-col items-center w-full"
              >
                <h1 className={`text-[#1e3a8a] drop-shadow-lg leading-none ${isArabic ? 'font-arabic' : 'font-calligraphy'}`} style={{ fontSize: 'clamp(4rem, 18vw, 10rem)' }}>
                  {t.groom_name}
                </h1>
                <div className="flex items-center gap-4 opacity-90 my-2">
                  <div className="h-[2px] bg-[#b38728] w-8 md:w-16"></div>
                  <Heart size={18} fill="#b38728" className="text-[#b38728]" />
                  <div className="h-[2px] bg-[#b38728] w-8 md:w-16"></div>
                </div>
                <h1 className={`text-[#1e3a8a] drop-shadow-lg leading-none ${isArabic ? 'font-arabic' : 'font-calligraphy'}`} style={{ fontSize: 'clamp(4rem, 18vw, 10rem)' }}>
                  {t.bride_name}
                </h1>
              </motion.div>
            </div>
          </div>
        );

      // PAGE 2: FORMAL INVITE (FIXED: Overflow & Fonts)
      case 1:
        return (
          <div className="relative h-full w-full flex flex-col bg-white/60 p-6 md:p-12">
             <FatemiBorder className="absolute top-0 left-0 right-0 z-20" />
            
            {/* Boxed Container - ADDED OVERFLOW-Y-AUTO */}
            <div className="flex-1 flex flex-col items-center justify-between border-2 border-[#b38728] bg-white/40 backdrop-blur-sm p-4 rounded-lg relative shadow-lg h-full overflow-y-auto">
              
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#1e3a8a]"></div>
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#1e3a8a]"></div>
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#1e3a8a]"></div>
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#1e3a8a]"></div>

              {/* Top: Spiritual */}
              <div className="w-full text-center z-10 mt-4 shrink-0">
                <BismillahImage />
                <p className={`text-[#0f1f4b] font-semibold text-sm md:text-lg px-4 mb-4 leading-relaxed ${isArabic ? 'text-justify font-arabic text-xl md:text-2xl' : 'text-center'}`}>
                  {t.spiritual_body}
                </p>
                <div className="mt-2 md:mt-6 px-2">
                  <p className={`text-[#b38728] font-bold uppercase tracking-widest text-sm md:text-xl leading-relaxed ${isArabic ? 'font-arabic text-xl' : 'font-serif'}`}>
                    {t.invite_line}
                  </p>
                </div>
              </div>

              {/* Middle: BIG NAMES */}
              <div className="flex-1 flex flex-col justify-center items-center w-full z-10 py-4 shrink-0">
                <h1 className={`text-[#1e3a8a] leading-none text-center ${isArabic ? 'font-arabic py-2' : 'font-calligraphy'}`} style={{ fontSize: 'clamp(3rem, 12vw, 7rem)' }}>
                  {t.groom_name}
                </h1>
                <p className={`text-[#b38728] text-2xl md:text-4xl my-1 md:my-2 ${isArabic ? 'font-arabic' : 'font-calligraphy'}`}>
                  {t.connector}
                </p>
                <h1 className={`text-[#1e3a8a] leading-none text-center ${isArabic ? 'font-arabic py-2' : 'font-calligraphy'}`} style={{ fontSize: 'clamp(3rem, 12vw, 7rem)' }}>
                  {t.bride_name}
                </h1>
                <p className={`text-[#0a192f] text-xs md:text-base font-bold uppercase tracking-wider mt-4 opacity-90 pb-4`}>
                  {t.bride_parents_line}
                </p>
              </div>

              {/* Bottom: Nikah Location */}
              <div className="w-full bg-[#1e3a8a] text-white p-3 md:p-4 text-center z-10 rounded-b-sm mt-auto shrink-0">
                <p className={`text-[#fcf6ba] font-semibold ${isArabic ? 'text-lg md:text-xl' : 'text-xs md:text-sm uppercase tracking-widest'}`}>
                  {t.nikah_loc}
                </p>
              </div>
            </div>
          </div>
        );

      // PAGE 3: PROGRAMS
      case 2:
        return (
          <div className="relative h-full w-full flex flex-col pt-12 pb-8 px-4 bg-[#f8f5f0] overflow-hidden">
            <FloralCorner rotate={180} style={{ top: 0, right: 0 }} />
            <FloralCorner rotate={270} style={{ bottom: 0, left: 0 }} />
            <div className="text-center mb-6 z-10 shrink-0">
              <h2 className={`text-[#1e3a8a] ${isArabic ? 'text-4xl font-arabic' : 'text-5xl font-calligraphy'}`}>{t.events_title}</h2>
              <div className="w-16 h-[2px] bg-[#b38728] mx-auto mt-2 rounded-full"></div>
            </div>

            <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 w-full max-w-5xl mx-auto z-10 h-full justify-center overflow-y-auto pb-10">
              {t.events.map((evt, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white border-l-4 border-[#b38728] p-3 md:p-6 shadow-sm flex flex-row md:flex-col items-center md:text-center gap-4 rounded-r-lg w-full"
                >
                  <div className="bg-[#1e3a8a] text-white px-3 py-1 md:py-2 rounded-lg md:rounded-full shrink-0 min-w-[60px] text-center">
                    <span className="text-xs md:text-lg font-bold">{evt.date}</span>
                  </div>
                  <div className="flex-1 text-left md:text-center">
                    <h3 className={`text-[#1e3a8a] font-bold text-lg md:text-2xl ${isArabic ? 'font-arabic' : 'font-serif'}`}>{evt.title}</h3>
                    <div className="flex flex-col md:flex-row md:justify-center gap-1 md:gap-4 text-[10px] md:text-sm text-[#555] mt-1">
                      <span className="flex items-center gap-1"><Clock size={10} className="text-[#b38728]" />{evt.time}</span>
                      <span className="flex items-center gap-1"><MapPin size={10} className="text-[#b38728]" />{evt.loc}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      // PAGE 4: COMPLIMENTS
      case 3:
        return (
          <div className="relative h-full w-full flex flex-col items-center justify-center p-4 bg-[#0a192f] text-white">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
            <div className="z-10 w-full max-w-xl text-center border-2 border-[#b38728] p-6 rounded-lg bg-[#0a192f]/90 backdrop-blur-md shadow-2xl">
              <Heart className="mx-auto text-[#b38728] mb-4" size={24} fill="#b38728" />
              <h3 className={`text-[#fcf6ba] mb-6 font-bold ${isArabic ? 'text-2xl font-arabic' : 'text-xl font-serif uppercase tracking-widest'}`}>
                {t.compliments_title}
              </h3>
              <div className="flex flex-col gap-2 mb-8">
                {t.family_list.map((name, idx) => (
                  <div key={idx} className={`text-white text-sm md:text-lg opacity-90 ${isArabic ? 'font-arabic' : 'font-serif'}`}>{name}</div>
                ))}
              </div>
              <button
                onClick={handleDownloadPDF}
                disabled={isGeneratingPdf}
                className="bg-[#b38728] text-[#0a192f] px-6 py-3 rounded-full text-xs md:text-sm font-bold flex items-center gap-2 mx-auto hover:bg-white transition-colors"
              >
                {isGeneratingPdf ? (
                  <span>Generating PDF...</span>
                ) : (
                  <>
                    <Download size={16} /> {t.download_btn}
                  </>
                )}
              </button>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className={`h-[100dvh] w-full bg-[#f8f5f0] text-[#0a192f] overflow-hidden relative ${isArabic ? 'font-arabic' : 'font-english'}`}>
      
      {/* GLOBAL BACKGROUNDS */}
      <PatternBackground />
      <FallingConfetti />
      
      {/* CONTROLS & LANGUAGE */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        {/* Play/Pause Button */}
        <button onClick={() => setIsPlaying(!isPlaying)} className="bg-white/80 p-2 rounded-full shadow-md text-[#1e3a8a] border border-[#d4af37]">
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
        {/* Lang Toggle */}
        <button onClick={() => setLang(prev => prev === 'en' ? 'ld' : 'en')} className="flex items-center gap-2 bg-[#1e3a8a] text-white px-3 py-1.5 rounded-full shadow-2xl border border-[#d4af37]">
          <span className={`text-xs font-bold ${lang === 'en' ? 'opacity-100' : 'opacity-60'}`}>ENG</span>
          <span className="h-3 w-[1px] bg-[#d4af37]"></span>
          <span className={`text-xs font-bold font-arabic ${lang === 'ld' ? 'opacity-100' : 'opacity-60'}`}>عربي</span>
        </button>
      </div>

      {/* MAIN CONTAINER WITH FADE TRANSITION */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <AnimatePresence mode='wait'>
          <motion.div
            key={pageIndex}
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute w-full h-full shadow-2xl"
          >
            {renderSlide(pageIndex)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* NAVIGATION ARROWS */}
      <div className="absolute inset-y-0 left-0 z-30 flex items-center">
        <button onClick={() => { setIsPlaying(false); paginate(-1); }} className="p-2 bg-white/30 hover:bg-white/60 text-[#1e3a8a] rounded-r-lg transition-all">
          <ChevronLeft size={32} />
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 z-30 flex items-center">
        <button onClick={() => { setIsPlaying(false); paginate(1); }} className="p-2 bg-white/30 hover:bg-white/60 text-[#1e3a8a] rounded-l-lg transition-all">
          <ChevronRight size={32} />
        </button>
      </div>
      
      {/* PAGE INDICATORS */}
      <div className="absolute bottom-6 w-full flex justify-center gap-2 z-50">
        {[...Array(totalPages)].map((_, i) => (
          <div 
            key={i} 
            className={`h-1.5 rounded-full transition-all duration-300 ${i === pageIndex ? 'bg-[#b38728] w-6' : 'bg-[#b38728]/30 w-1.5'}`}
          />
        ))}
      </div>

      {/* --- HIDDEN PRINT CONTAINER (A4 Size) - REPLICATING DESIGN FOR PDF --- */}
      <div className="fixed left-[-9999px] top-0 overflow-hidden" style={{ width: '595px', height: 'auto' }}>
        <div ref={printRef}>
            {/* Slide 1 Print Version */}
            <div className="w-[595px] h-[842px] relative flex flex-col items-center justify-center p-8 border-b border-gray-300">
                <PatternBackground />
                <FallingConfetti isPdf={true} /> {/* CONFETTI ADDED */}
                <FatemiArchSVG showInner={false} />
                <div className="z-10 flex flex-col items-center justify-center text-center">
                  <p className="text-[#b38728] font-bold uppercase text-sm mb-6">The Wedding Celebration Of</p>
                  <h1 className="text-[#1e3a8a] font-calligraphy text-6xl my-4">{t.groom_name}</h1>
                  <Heart size={24} fill="#b38728" className="text-[#b38728] my-2" />
                  <h1 className="text-[#1e3a8a] font-calligraphy text-6xl my-4">{t.bride_name}</h1>
               </div>
            </div>

            {/* Slide 2 Print Version - DESIGN MATCHED */}
            <div className="w-[595px] h-[842px] relative flex flex-col p-12 border-b border-gray-300">
              <PatternBackground />
              <FallingConfetti isPdf={true} />
              <FatemiBorder className="absolute top-0 left-0 right-0 opacity-100 z-20" />
              
              <div className="mt-12 bg-white/60 border-2 border-[#b38728] flex-1 flex flex-col items-center justify-between p-8 relative rounded-lg">
                  <BismillahImage />
                  <p className={`text-[#0f1f4b] text-center px-8 ${isArabic ? 'font-arabic text-xl' : 'text-sm'}`}>{t.spiritual_body}</p>
                  <p className="text-[#b38728] font-bold uppercase text-lg mt-4">{t.invite_line}</p>
                  <div className="my-8 text-center">
                    <h1 className="text-[#1e3a8a] font-calligraphy text-5xl">{t.groom_name}</h1>
                    <p className="text-[#b38728] text-2xl my-2">&</p>
                    <h1 className="text-[#1e3a8a] font-calligraphy text-5xl">{t.bride_name}</h1>
                  </div>
                  <p className="text-center text-sm font-bold uppercase">{t.bride_parents_line}</p>
                  <div className="bg-[#1e3a8a] text-white p-4 w-full text-center mt-4 rounded">
                      <p className="text-[#fcf6ba] text-sm uppercase">{t.nikah_loc}</p>
                  </div>
              </div>
            </div>

            {/* Slide 3 Print Version */}
            <div className="w-[595px] h-[842px] relative p-12 border-b border-gray-300">
                <PatternBackground />
                <FallingConfetti isPdf={true} />
                <div className="text-center mb-8 relative z-10">
                  <h2 className="text-[#1e3a8a] text-4xl font-calligraphy">{t.events_title}</h2>
                </div>
                <div className="flex flex-col gap-6 relative z-10">
                  {t.events.map((evt, i) => (
                    <div key={i} className="border-l-4 border-[#b38728] p-4 bg-white flex items-center gap-4 shadow-sm">
                      <div className="bg-[#1e3a8a] text-white px-4 py-2 rounded-full font-bold">{evt.date}</div>
                      <div>
                        <h3 className="text-[#1e3a8a] font-bold text-xl">{evt.title}</h3>
                        <p className="text-sm text-gray-600">{evt.time} | {evt.loc}</p>
                      </div>
                    </div>
                  ))}
                </div>
            </div>

            {/* Slide 4 Print Version */}
            <div className="w-[595px] h-[842px] bg-[#0a192f] relative flex flex-col items-center justify-center p-12 text-white">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
                <div className="border-2 border-[#b38728] p-12 text-center rounded-lg w-full z-10 bg-[#0a192f]/90">
                   <Heart className="mx-auto text-[#b38728] mb-4" size={32} fill="#b38728" />
                   <h3 className="text-[#fcf6ba] text-2xl font-serif uppercase tracking-widest mb-8">{t.compliments_title}</h3>
                   {t.family_list.map((name, idx) => (
                      <div key={idx} className="text-white text-lg mb-2">{name}</div>
                   ))}
                </div>
            </div>
        </div>
      </div>

      {/* STYLES */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Great+Vibes&family=Cinzel:wght@400;700;900&family=Playfair+Display:wght@400;700&display=swap');
        .font-arabic { font-family: 'Amiri', serif; }
        .font-calligraphy { font-family: 'Great Vibes', cursive; }
        .font-english { font-family: 'Cinzel', serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
      `}</style>
    </div>
  );
};

export default WeddingInvite;