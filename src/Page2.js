import React from 'react';
import { motion } from 'framer-motion';
import { BismillahImage, FloralCorner, GoldDivider, SpinningRing, FloatingPetals } from './components';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' }
});

const Page2 = ({ t, isArabic }) => {
  return (
    <div className="relative h-full w-full flex items-center justify-center overflow-hidden">

      {/* Page-level petals float in the bg */}
      <FloatingPetals />

      {/* Portrait card — fills screen height, portrait-ratio width on desktop */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9 }}
        className="relative bg-white shadow-2xl border border-[#b38728]/40 flex flex-col items-center text-center overflow-hidden"
        style={{
          height: 'calc(100dvh - 20px)',
          width: 'min(calc(100vw - 16px), calc((100dvh - 20px) * 0.62))',
          borderRadius: '2px',
          overflowY: 'auto',
          scrollbarWidth: 'none',
        }}
      >
        {/* Shimmer border pulse */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-20"
          animate={{ boxShadow: ['inset 0 0 0 1px rgba(179,135,40,0.1)', 'inset 0 0 0 1.5px rgba(179,135,40,0.5)', 'inset 0 0 0 1px rgba(179,135,40,0.1)'] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Corners sit on top of card content */}
        <FloralCorner rotate={0}   style={{ top: 0, left: 0 }} />
        <FloralCorner rotate={90}  style={{ top: 0, right: 0 }} />
        <FloralCorner rotate={180} style={{ bottom: 0, right: 0 }} />
        <FloralCorner rotate={270} style={{ bottom: 0, left: 0 }} />

        {/* Spinning ring behind names */}
        <SpinningRing />

        {/* Inner content — flex column fills full height, space-between */}
        <div className="relative z-10 w-full flex flex-col flex-1"
          style={{ padding: 'clamp(14px, 3.5vh, 36px) clamp(12px, 3.5vw, 32px)' }}>

          {/* ── SECTION 1: Spiritual ── flex-grow keeps proportional */}
          <motion.div {...fadeUp(0.1)} className="flex flex-col justify-center bg-[#b38728]/5 border border-[#b38728]/15 rounded-lg"
            style={{ flex: '3', minHeight: 0, padding: 'clamp(8px, 2vh, 18px) clamp(8px, 2vw, 16px)' }}>
            <BismillahImage />
            <p className={`text-[#1e3a8a] leading-relaxed opacity-90 ${isArabic ? 'font-arabic' : 'font-serif italic'}`}
              style={{ fontSize: 'clamp(9px, 1.55vh, 13px)', margin: 0 }}>
              {t.spiritual_body}
            </p>
          </motion.div>

          <GoldDivider delay={0.35} />

          {/* ── SECTION 2: Names ── */}
          <motion.div {...fadeUp(0.45)} className="flex flex-col items-center justify-center"
            style={{ flex: '4', minHeight: 0 }}>

            <p className={`text-[#b38728] font-bold uppercase tracking-[0.12em] ${isArabic ? 'font-arabic' : ''}`}
              style={{ fontSize: 'clamp(7px, 1.3vh, 11px)', lineHeight: 1.55, margin: '0 0 clamp(6px,1.5vh,14px)' }}>
              {t.invite_line}
            </p>

            {/* Groom */}
            <motion.h1
              className={`text-[#1e3a8a] leading-none ${isArabic ? 'font-arabic font-bold' : 'font-calligraphy'}`}
              style={{ fontSize: 'clamp(2.4rem, 9vh, 5.5rem)', margin: 0 }}
              animate={{ textShadow: ['0 0 0px transparent', '0 0 14px rgba(179,135,40,0.25)', '0 0 0px transparent'] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            >
              {t.groom_name}
            </motion.h1>

            {/* & separator */}
            <motion.div className="flex items-center gap-2"
              style={{ margin: 'clamp(4px, 1vh, 10px) 0' }}
              initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}>
              <div className="h-[1px] w-5 bg-[#b38728]/50" />
              <span className="text-[#b38728] font-serif italic" style={{ fontSize: 'clamp(1rem, 3vh, 1.5rem)' }}>&</span>
              <div className="h-[1px] w-5 bg-[#b38728]/50" />
            </motion.div>

            {/* Bride */}
            <motion.h1
              className={`text-[#1e3a8a] leading-none ${isArabic ? 'font-arabic font-bold' : 'font-calligraphy'}`}
              style={{ fontSize: 'clamp(2.4rem, 9vh, 5.5rem)', margin: 0 }}
              animate={{ textShadow: ['0 0 0px transparent', '0 0 14px rgba(179,135,40,0.25)', '0 0 0px transparent'] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
            >
              {t.bride_name}
            </motion.h1>

            <motion.p {...fadeUp(1)} className="text-[#0a192f]/55 uppercase tracking-widest"
              style={{ fontSize: 'clamp(7px, 1.2vh, 10px)', margin: 'clamp(6px, 1.4vh, 12px) 0 0' }}>
              {t.bride_parents_line}
            </motion.p>
          </motion.div>

          <GoldDivider delay={0.75} />

          {/* ── SECTION 3: Location ── */}
          <motion.div {...fadeUp(0.85)} className="flex flex-col justify-center"
            style={{ flex: '2', minHeight: 0 }}>
            <motion.div
              className="bg-[#1e3a8a] text-white rounded border border-[#b38728]"
              style={{ padding: 'clamp(8px, 2vh, 16px) clamp(8px, 2vw, 16px)' }}
              animate={{ boxShadow: ['0 0 0px rgba(179,135,40,0)', '0 4px 22px rgba(179,135,40,0.35)', '0 0 0px rgba(179,135,40,0)'] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <p className={`font-semibold m-0 ${isArabic ? 'font-arabic text-base' : 'uppercase tracking-wide'}`}
                style={{ fontSize: isArabic ? undefined : 'clamp(8px, 1.5vh, 11px)' }}>
                <span className="text-[#b38728] mr-2">✦</span>
                {t.nikah_loc}
              </p>
            </motion.div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
};

export default Page2;
