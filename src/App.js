import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Pause, Play, Globe } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// --- IMPORTS ---
import { CONTENT } from './data';
import { PatternBackground, FallingConfetti } from './components';
import Page1 from './Page1'; // Ensure this exists (your landing page)
import Page2 from './Page2';
import Page3 from './Page3';
import PdfGenerator from './PdfGenerator';

// --- MAIN COMPONENT ---
const WeddingInvite = () => {
  const [lang, setLang] = useState('en');
  const [pageIndex, setPageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [gatesOpened, setGatesOpened] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const printRef = useRef(null);

  const t = CONTENT[lang];
  const isArabic = lang === 'ld';
  const totalPages = 3;

  // Auto-slide logic
  useEffect(() => {
    let interval;
    if (isPlaying && gatesOpened) {
      interval = setInterval(() => {
        paginate(1);
      }, 7000); // 7 seconds per slide
    }
    return () => clearInterval(interval);
  }, [isPlaying, pageIndex, gatesOpened]);

  const paginate = useCallback((newDirection) => {
    setPageIndex((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = totalPages - 1;
      if (next >= totalPages) next = 0;
      return next;
    });
  }, []);

  const handleDownloadPDF = async () => {
    setIsGeneratingPdf(true);
    setIsPlaying(false);
    
    // Wait a brief moment for any images to settle (optional but safe)
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      if (!printRef.current) return;
      const doc = new jsPDF('p', 'pt', 'a4'); // Points, A4
      const elements = printRef.current.children;
      
      for (let i = 0; i < elements.length; i++) {
        // High quality scale (2)
        const canvas = await html2canvas(elements[i], {
          scale: 2,
          useCORS: true, 
          backgroundColor: '#FDFBF7'
        });
        
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = doc.internal.pageSize.getHeight();
        
        if (i > 0) doc.addPage();
        doc.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      }
      doc.save(`${t.groom_name}_${t.bride_name}_Invite.pdf`);
    } catch (err) {
      console.error("PDF Gen Error:", err);
      alert("Error generating PDF. Please try again.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const renderSlide = (index) => {
    switch (index) {
      case 0: return <Page1 gatesOpened={gatesOpened} setGatesOpened={setGatesOpened} t={t} isArabic={isArabic} />;
      case 1: return <Page2 t={t} isArabic={isArabic} />;
      case 2: return <Page3 t={t} isArabic={isArabic} handleDownloadPDF={handleDownloadPDF} isGeneratingPdf={isGeneratingPdf} />;
      default: return null;
    }
  };

  return (
    <div className={`h-[100dvh] w-full bg-[#FDFBF7] text-[#0F172A] overflow-hidden relative ${isArabic ? 'font-arabic' : 'font-english'}`}>
      
      {/* GLOBAL BACKGROUND */}
      <PatternBackground />
      <FallingConfetti />

      {/* TOP CONTROLS */}
      <div className="fixed top-4 right-4 z-50 flex gap-3">
        <button onClick={() => setIsPlaying(!isPlaying)} className="bg-white/80 backdrop-blur p-2 rounded-full shadow-lg text-[#0F172A] border border-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition">
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>
        <button onClick={() => setLang(prev => prev === 'en' ? 'ld' : 'en')} className="flex items-center gap-2 bg-[#0F172A] text-white px-4 py-2 rounded-full shadow-xl border border-[#D4AF37] hover:scale-105 transition">
          <Globe size={14} />
          <span className="text-xs font-bold">{lang === 'en' ? 'عربي' : 'ENG'}</span>
        </button>
      </div>

      {/* SLIDER CONTENT */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <AnimatePresence mode='wait'>
          <motion.div
            key={pageIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute w-full h-full flex items-center justify-center"
          >
            {renderSlide(pageIndex)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* NAVIGATION ARROWS */}
      {gatesOpened && (
        <>
          <button onClick={() => { setIsPlaying(false); paginate(-1); }} className="absolute left-2 top-1/2 -translate-y-1/2 p-3 bg-white/50 hover:bg-white text-[#0F172A] rounded-full shadow-lg backdrop-blur z-40 transition-all">
            <ChevronLeft size={24} />
          </button>
          <button onClick={() => { setIsPlaying(false); paginate(1); }} className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-white/50 hover:bg-white text-[#0F172A] rounded-full shadow-lg backdrop-blur z-40 transition-all">
            <ChevronRight size={24} />
          </button>
        </>
      )}
      
      {/* PAGE INDICATORS */}
      {gatesOpened && (
        <div className="absolute bottom-6 w-full flex justify-center gap-2 z-50">
          {[...Array(totalPages)].map((_, i) => (
            <div key={i} className={`h-1 rounded-full transition-all duration-500 shadow-sm ${i === pageIndex ? 'bg-[#D4AF37] w-8' : 'bg-[#D4AF37]/40 w-2'}`} />
          ))}
        </div>
      )}

      {/* HIDDEN PDF RENDERER */}
      <PdfGenerator ref={printRef} t={t} isArabic={isArabic} />

      {/* FONTS INJECTION */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Great+Vibes&family=Cinzel:wght@400;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
        .font-arabic { font-family: 'Amiri', serif; }
        .font-calligraphy { font-family: 'Great Vibes', cursive; }
        .font-english { font-family: 'Cinzel', serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
      `}</style>
    </div>
  );
};

export default WeddingInvite;