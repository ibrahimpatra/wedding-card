import React from 'react';
import { motion } from 'framer-motion';
import { Download, MapPin } from 'lucide-react';
import { FloralCorner, GoldDivider, SparkleField } from './components';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' }
});

const Page3 = ({ t, isArabic, handleDownloadPDF, isGeneratingPdf }) => {
  return (
    <div className="relative h-full w-full flex items-center justify-center overflow-hidden">

      {/* Portrait card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-[#fdfbf7] shadow-2xl border border-[#b38728]/30 overflow-hidden flex flex-col"
        style={{
          height: 'calc(100dvh - 20px)',
          width: 'min(calc(100vw - 16px), calc((100dvh - 20px) * 0.62))',
          borderRadius: '2px',
          overflowY: 'auto',
          scrollbarWidth: 'none',
        }}
      >
        <SparkleField count={14} />

        <FloralCorner rotate={0}   style={{ top: 0, left: 0 }} />
        <FloralCorner rotate={90}  style={{ top: 0, right: 0 }} />
        <FloralCorner rotate={180} style={{ bottom: 0, right: 0 }} />
        <FloralCorner rotate={270} style={{ bottom: 0, left: 0 }} />

        <motion.div className="absolute inset-0 pointer-events-none z-20"
          animate={{ boxShadow: ['inset 0 0 0 1px rgba(179,135,40,0.1)', 'inset 0 0 0 1.5px rgba(179,135,40,0.45)', 'inset 0 0 0 1px rgba(179,135,40,0.1)'] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Inner layout */}
        <div className="relative z-10 flex flex-col flex-1 items-center text-center"
          style={{ padding: 'clamp(14px, 3.5vh, 36px) clamp(14px, 3.5vw, 32px)' }}>

          {/* ── Header (smaller for mobile) ── */}
          <motion.div {...fadeUp(0.1)} className="flex flex-col items-center"
            style={{ flex: '1.2', justifyContent: 'center', minHeight: 0 }}>
            <h2 className={`text-[#1e3a8a] ${isArabic ? 'font-arabic font-bold' : 'font-calligraphy'}`}
              style={{ fontSize: 'clamp(1.6rem, 5.8vh, 3.2rem)', margin: 0 }}>
              {t.events_title}
            </h2>
          </motion.div>

          <GoldDivider delay={0.25} />

          {/* ── Event cards ── */}
          <motion.div className="w-full flex flex-col justify-center" style={{ flex: '3.5', minHeight: 0, gap: 'clamp(8px, 2vh, 16px)' }}>
            {t.events.map((evt, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.15, duration: 0.6 }}
                className="bg-white border border-[#b38728]/25 shadow-md relative overflow-hidden flex items-stretch"
                style={{ borderRadius: '8px' }}
              >
                <div className="absolute inset-0 bg-[#b38728]/3 pointer-events-none" />

                {/* LEFT: Date box */}
                <div
                  className="bg-[#1e3a8a] flex flex-col items-center justify-center shrink-0 relative z-10"
                  style={{
                    width: 'clamp(58px, 16vw, 82px)',
                    padding: 'clamp(10px, 2.5vh, 18px) clamp(6px, 1.5vw, 10px)',
                    borderRadius: '8px 0 0 8px',
                  }}
                >
                  {/* gold glow pulse on date box */}
                  <motion.div
                    className="absolute inset-0 rounded-l-lg"
                    animate={{ opacity: [0, 0.35, 0] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
                    style={{ background: 'radial-gradient(circle, rgba(179,135,40,0.4) 0%, transparent 70%)' }}
                  />
                  <span
                    className="font-bold text-center relative z-10 font-serif"
                    style={{
                      color: '#f0c040',
                      fontSize: 'clamp(11px, 2.8vh, 18px)',
                      lineHeight: 1.3,
                      letterSpacing: '0.03em',
                    }}
                  >
                    {evt.date}
                  </span>
                </div>

                {/* RIGHT: Event name + venue */}
                <div className="flex flex-col justify-center relative z-10 text-left"
                  style={{ padding: 'clamp(10px, 2.5vh, 18px) clamp(10px, 2.5vw, 16px)', flex: 1 }}>
                  <h3 className={`text-[#1e3a8a] font-bold m-0 ${isArabic ? 'font-arabic' : 'font-serif'}`}
                    style={{ fontSize: 'clamp(13px, 3.2vh, 21px)', marginBottom: 'clamp(4px, 1vh, 7px)', lineHeight: 1.2 }}>
                    {evt.title}
                  </h3>
                  <div className="flex items-center gap-1"
                    style={{ fontSize: 'clamp(10px, 2.1vh, 14px)' }}>
                    <MapPin size={12} className="text-[#b38728] shrink-0" style={{ marginTop: '1px' }} />
                    <span className="font-bold text-[#b38728]" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.02em' }}>
                      {evt.loc}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <GoldDivider delay={0.6} />

          {/* ── Compliments ── */}
          <motion.div {...fadeUp(0.7)} className="flex flex-col items-center justify-center w-full"
            style={{ flex: '4', minHeight: 0 }}>
            <p className="text-[#b38728] font-bold uppercase tracking-widest m-0"
              style={{ fontSize: 'clamp(8px, 1.5vh, 11px)', marginBottom: 'clamp(8px, 2vh, 18px)' }}>
              {t.compliments_title}
            </p>
            <div className="flex flex-col items-center" style={{ gap: 'clamp(4px, 1.2vh, 10px)' }}>
              {t.family_list.map((name, idx) => {
                const isHussaina = name.toLowerCase().includes('hussaina');
                return (
                  <motion.span key={idx}
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.85 + idx * 0.1 }}
                    className={`block ${
                      isHussaina
                        ? `font-bold tracking-[0.05em] ${isArabic ? 'font-arabic' : 'font-serif italic'} text-[#b38728]`
                        : `opacity-90 ${isArabic ? 'font-arabic' : 'font-serif italic'} text-[#1e3a8a]`
                    }`}
                    style={{
                      fontSize: isHussaina
                        ? 'clamp(11px, 2.3vh, 16px)'
                        : 'clamp(10px, 2vh, 14px)',
                      lineHeight: 1.5,
                    }}>
                    {name}
                  </motion.span>
                );
              })}
            </div>
          </motion.div>

          <GoldDivider delay={0.9} />

          {/* ── Download ── */}
          <motion.div {...fadeUp(1.0)} className="flex justify-center items-center"
            style={{ flex: '1.5', minHeight: 0 }}>
            <motion.button
              onClick={handleDownloadPDF}
              disabled={isGeneratingPdf}
              className="group relative inline-flex items-center justify-center overflow-hidden font-medium text-[#b38728] border border-[#b38728] rounded-full shadow-md"
              style={{ padding: 'clamp(7px, 1.5vh, 12px) clamp(18px, 4vw, 32px)' }}
              animate={{ boxShadow: ['0 0 0px rgba(179,135,40,0)', '0 0 18px rgba(179,135,40,0.45)', '0 0 0px rgba(179,135,40,0)'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <span className="absolute inset-0 w-full h-full bg-[#b38728] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              <span className="relative flex items-center gap-2 font-bold uppercase tracking-wider group-hover:text-white transition-colors duration-300"
                style={{ fontSize: 'clamp(9px, 1.8vh, 12px)' }}>
                <Download size={13} /> {t.download_btn}
              </span>
            </motion.button>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
};

export default Page3;
