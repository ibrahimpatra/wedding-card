/* App.js */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Clock, MapPin, Heart, ChevronDown } from 'lucide-react';

import { CONTENT } from './data';
import { FatemiArchSVG, FloralCorner, FatemiBorder, PatternBackground, BismillahImage, FallingConfetti } from './DesignComponents';

/* --- ANIMATIONS --- */
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: "backOut" } }
};

/* --- MAIN APP --- */
const WeddingInvite = () => {
  const [lang, setLang] = useState('en');
  const t = CONTENT[lang];
  const isArabic = lang === 'ld';

  return (
    <div className={`h-screen w-full bg-[#f8f5f0] text-[#0a192f] overflow-y-scroll snap-y snap-mandatory scroll-smooth overflow-x-hidden ${isArabic ? 'font-arabic' : 'font-english'}`}>
      
      {/* 1. BACKGROUNDS & EFFECTS */}
      <PatternBackground />
      <FallingConfetti /> {/* Continuous Confetti */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(248,245,240,0.8)_100%)] z-0" />

      {/* 2. LANGUAGE TOGGLE */}
      <div className="fixed top-4 right-4 z-50">
        <button 
          onClick={() => setLang(prev => prev === 'en' ? 'ld' : 'en')}
          className="flex items-center gap-2 bg-[#1e3a8a] text-white px-4 py-2 rounded-full shadow-2xl hover:scale-110 transition-transform border-2 border-[#d4af37]"
        >
          <span className={`text-xs font-bold ${lang === 'en' ? 'opacity-100' : 'opacity-60'}`}>ENG</span>
          <span className="h-3 w-[1px] bg-[#d4af37]"></span>
          <span className={`text-xs font-bold font-arabic ${lang === 'ld' ? 'opacity-100' : 'opacity-60'}`}>عربي</span>
        </button>
      </div>

      {/* =========================================
          PAGE 1: GRAND COVER (MASSIVE NAMES)
      ========================================= */}
      <section className="relative h-screen w-full snap-start flex flex-col items-center justify-center p-4 overflow-hidden">
        <FatemiArchSVG showInner={false} />
        <FloralCorner rotate={0} style={{ top: 0, left: 0 }} />
        <FloralCorner rotate={90} style={{ top: 0, right: 0 }} />
        <FloralCorner rotate={180} style={{ bottom: 0, right: 0 }} />
        <FloralCorner rotate={270} style={{ bottom: 0, left: 0 }} />

        <div className="z-10 flex flex-col items-center justify-center w-full h-full text-center">
            {/* Top Intro Text */}
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="text-[#b38728] font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-4 md:mb-8"
            >
              The Wedding Celebration Of
            </motion.p>

            {/* Names Container - Using VW to ensure it fits screen width exactly */}
            <motion.div 
               variants={scaleIn}
               initial="hidden"
               whileInView="visible"
               className="flex flex-col items-center w-full"
            >
               {/* Groom Name - MASSIVE & RESPONSIVE */}
               <h1 className={`text-[#1e3a8a] drop-shadow-lg leading-none ${isArabic ? 'font-arabic' : 'font-calligraphy'}`}
                   style={{ fontSize: 'clamp(3rem, 15vw, 9rem)' }} // Scales with viewport width
               >
                 {t.names.groom}
               </h1>
               
               {/* Connector */}
               <div className="flex items-center gap-4 opacity-90 my-2 md:my-4">
                  <div className="h-[2px] bg-[#b38728] w-8 md:w-16"></div>
                  <Heart size={20} fill="#b38728" className="text-[#b38728] animate-pulse" />
                  <div className="h-[2px] bg-[#b38728] w-8 md:w-16"></div>
               </div>

               {/* Bride Name - MASSIVE & RESPONSIVE */}
               <h1 className={`text-[#1e3a8a] drop-shadow-lg leading-none ${isArabic ? 'font-arabic' : 'font-calligraphy'}`}
                   style={{ fontSize: 'clamp(3rem, 15vw, 9rem)' }} // Scales with viewport width
               >
                 {t.names.bride}
               </h1>
            </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-6 text-[#1e3a8a]"
        >
           <ChevronDown size={28} />
        </motion.div>
      </section>

      {/* =========================================
          PAGE 2: SPIRITUAL + PARENTS (SCROLLABLE ON MOBILE)
      ========================================= */}
      <section className="relative min-h-screen w-full snap-start flex flex-col bg-white/60 backdrop-blur-sm">
        <FatemiBorder className="absolute top-0 z-20" />
        
        {/* Main Content Container */}
        <div className="flex-1 flex flex-col md:justify-center pt-16 pb-20 px-4 md:px-8 space-y-6 md:space-y-0 overflow-y-auto">
            
            {/* Spiritual Section */}
            <motion.div 
               initial="hidden" 
               whileInView="visible" 
               variants={fadeInUp}
               className="z-10 w-full max-w-2xl mx-auto bg-white/90 p-6 md:p-8 rounded-2xl shadow-xl border border-[#b38728]/30 mb-4 md:mb-10"
            >
               <BismillahImage />
               <p className={`text-[#1e3a8a] text-sm md:text-lg font-bold leading-relaxed ${isArabic ? 'text-justify' : 'text-center font-serif'}`}>
                 {t.spiritual_body}
               </p>
            </motion.div>

            {/* Parents Section - Blue Box */}
            <div className="w-full bg-[#1e3a8a] text-[#fcf6ba] rounded-xl relative flex flex-col items-center justify-center p-6 md:p-10 shadow-lg">
                 {/* Decorative BG */}
                 <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] rounded-xl"></div>
                 
                 <div className="z-10 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 text-center items-center">
                     {/* Groom Parents */}
                     <div className="border-b md:border-b-0 md:border-r border-[#b38728]/50 pb-6 md:pb-0 md:pr-6">
                        <h2 className={`text-[#b38728] ${isArabic ? 'text-3xl font-arabic' : 'text-4xl font-calligraphy'} mb-2`}>{t.names.groom}</h2>
                        <p className="text-white font-bold text-xs md:text-base uppercase tracking-wider leading-relaxed">{t.parents.groom}</p>
                     </div>

                     {/* Bride Parents */}
                     <div className="pt-2 md:pt-0 md:pl-6">
                        <h2 className={`text-[#b38728] ${isArabic ? 'text-3xl font-arabic' : 'text-4xl font-calligraphy'} mb-2`}>{t.names.bride}</h2>
                        <p className="text-white font-bold text-xs md:text-base uppercase tracking-wider leading-relaxed">{t.parents.bride}</p>
                     </div>
                 </div>
            </div>

            {/* Nikah Location Strip (Stays below parents) */}
            <div className="w-full max-w-2xl mx-auto bg-[#0a192f] border border-[#b38728] p-3 rounded-lg text-center shadow-lg mt-4">
                <p className={`text-[#d4af37] ${isArabic ? 'text-sm font-bold' : 'text-[10px] md:text-xs font-bold uppercase tracking-widest'}`}>
                   {t.nikah_loc}
                </p>
            </div>
        </div>
      </section>

      {/* =========================================
          PAGE 3: PROGRAMS (RESPONSIVE GRID)
      ========================================= */}
      <section className="relative min-h-screen w-full snap-start flex flex-col pt-16 pb-10 px-4 bg-[#f8f5f0] overflow-y-auto">
        <FloralCorner rotate={180} style={{ top: 0, right: 0 }} />
        <FloralCorner rotate={270} style={{ bottom: 0, left: 0 }} />

        {/* Header */}
        <div className="text-center mb-8 md:mb-12 z-10 shrink-0">
            <h2 className={`text-[#1e3a8a] drop-shadow-sm ${isArabic ? 'text-5xl font-arabic' : 'text-6xl font-calligraphy'}`}>{t.events_title}</h2>
            <div className="w-24 h-[3px] bg-[#b38728] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* RESPONSIVE GRID: 1 Col Mobile, 3 Col Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full max-w-6xl mx-auto z-10 pb-10">
            {t.events.map((evt, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border-2 border-[#b38728] p-5 rounded-xl shadow-xl flex flex-col items-center text-center relative overflow-hidden group w-full"
              >
                  {/* Date Badge */}
                  <div className="bg-[#1e3a8a] text-white px-4 py-1 rounded-full mb-3 shadow-md w-fit">
                     <span className="text-sm font-bold">{evt.date}</span>
                  </div>
                  
                  {/* Title */}
                  <h3 className={`text-[#1e3a8a] font-black text-xl mb-2 ${isArabic ? 'font-arabic' : 'font-serif'}`}>
                    {evt.title}
                  </h3>

                  <div className="w-12 h-[1px] bg-[#b38728] mb-3 opacity-50"></div>

                  {/* Details */}
                  <div className="space-y-1 text-[#0a192f] w-full">
                    <p className="text-xs font-bold uppercase flex items-center justify-center gap-2">
                      <Clock size={14} className="text-[#b38728]" /> {evt.time}
                    </p>
                    <p className="text-xs font-bold uppercase flex items-center justify-center gap-2">
                      <MapPin size={14} className="text-[#b38728]" /> {evt.loc}
                    </p>
                  </div>
              </motion.div>
            ))}
        </div>
      </section>

      {/* =========================================
          PAGE 4: COMPLIMENTS & DOWNLOAD
      ========================================= */}
      <section className="relative h-screen w-full snap-start flex flex-col items-center justify-center p-4 bg-[#0a192f] text-white overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
        
        <div className="z-10 w-full max-w-2xl text-center border-4 border-double border-[#b38728] p-6 md:p-12 rounded-lg bg-[#0a192f]/90 backdrop-blur-md shadow-2xl flex flex-col justify-center h-auto max-h-[90vh] overflow-y-auto">
            
            <Heart className="mx-auto text-[#b38728] mb-4 md:mb-6 animate-bounce shrink-0" size={32} fill="#b38728" />

            <h3 className={`text-[#fcf6ba] mb-6 font-bold ${isArabic ? 'text-3xl font-arabic' : 'text-2xl font-serif uppercase tracking-widest'}`}>
                {t.compliments_title}
            </h3>
            
            <div className="flex flex-col gap-2 mb-8 overflow-y-auto">
                {t.family_list.map((name, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`text-white text-base md:text-xl font-medium tracking-wide ${isArabic ? 'font-arabic' : 'font-serif'}`}
                  >
                     {name}
                  </motion.div>
                ))}
            </div>

            <button 
              onClick={() => window.print()} 
              className="bg-gradient-to-r from-[#b38728] to-[#fcf6ba] text-[#0a192f] px-8 py-3 rounded-full text-sm md:text-lg font-bold flex items-center gap-2 mx-auto hover:shadow-[0_0_20px_rgba(179,135,40,0.6)] transition-all transform hover:scale-105 shrink-0"
            >
                <Download size={20} /> {t.download_btn}
            </button>
        </div>
      </section>

      {/* GLOBAL STYLES */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Great+Vibes&family=Cinzel:wght@400;700;900&family=Playfair+Display:wght@700&display=swap');
        
        .font-arabic { font-family: 'Amiri', serif; }
        .font-calligraphy { font-family: 'Great Vibes', cursive; }
        .font-english { font-family: 'Cinzel', serif; }
        .font-serif { font-family: 'Playfair Display', serif; }
        
        .snap-y::-webkit-scrollbar { display: none; }
        .snap-y { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default WeddingInvite;