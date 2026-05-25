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

        {/* Corners */}
        <FloralCorner rotate={0}   style={{ top: 0, left: 0 }} />
        <FloralCorner rotate={90}  style={{ top: 0, right: 0 }} />
        <FloralCorner rotate={180} style={{ bottom: 0, right: 0 }} />
        <FloralCorner rotate={270} style={{ bottom: 0, left: 0 }} />

        {/* Shimmer border */}
        <motion.div className="absolute inset-0 pointer-events-none z-20"
          animate={{ boxShadow: ['inset 0 0 0 1px rgba(179,135,40,0.1)', 'inset 0 0 0 1.5px rgba(179,135,40,0.45)', 'inset 0 0 0 1px rgba(179,135,40,0.1)'] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Inner layout — flex column fills full height */}
        <div className="relative z-10 flex flex-col flex-1 items-center text-center"
          style={{ padding: 'clamp(14px, 3.5vh, 36px) clamp(14px, 3.5vw, 32px)' }}>

          {/* ── Header ── */}
          <motion.div {...fadeUp(0.1)} className="flex flex-col items-center"
            style={{ flex: '1.5', justifyContent: 'center', minHeight: 0 }}>
            <h2 className={`text-[#1e3a8a] ${isArabic ? 'font-arabic font-bold' : 'font-calligraphy'}`}
              style={{ fontSize: 'clamp(1.8rem, 7vh, 4rem)', margin: 0 }}>
              {t.events_title}
            </h2>
          </motion.div>

          <GoldDivider delay={0.25} />

          {/* ── Event card ── */}
          <motion.div className="w-full flex flex-col justify-center" style={{ flex: '3', minHeight: 0 }}>
            {t.events.map((evt, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.12, duration: 0.6 }}
                className="bg-white border-l-4 border-[#b38728] shadow-sm relative overflow-hidden"
                style={{ borderRadius: '0 6px 6px 0', padding: 'clamp(12px, 3vh, 24px) clamp(12px, 3vw, 20px)' }}
              >
                <div className="absolute inset-0 bg-[#b38728]/4 pointer-events-none" />
                <div className="relative z-10 flex justify-between items-center">
                  <div className="text-left">
                    <h3 className={`text-[#1e3a8a] font-bold m-0 ${isArabic ? 'font-arabic' : 'font-serif'}`}
                      style={{ fontSize: 'clamp(14px, 3vh, 20px)' }}>
                      {evt.title}
                    </h3>
                    <div className="flex items-center gap-1 text-[#0a192f]/55 uppercase tracking-wide mt-1"
                      style={{ fontSize: 'clamp(8px, 1.5vh, 11px)' }}>
                      <MapPin size={10} className="text-[#b38728] shrink-0" />
                      <span>{evt.loc}</span>
                    </div>
                  </div>
                  <motion.div className="text-right shrink-0 ml-3"
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}>
                    <div className="text-[#b38728] font-bold bg-[#b38728]/10 border border-[#b38728]/25 rounded inline-block"
                      style={{ fontSize: 'clamp(9px, 1.8vh, 12px)', padding: '4px 10px' }}>
                      {evt.date}
                    </div>
                  </motion.div>
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
              {t.family_list.map((name, idx) => (
                <motion.span key={idx}
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.85 + idx * 0.1 }}
                  className={`text-[#1e3a8a] opacity-90 block ${isArabic ? 'font-arabic' : 'font-serif italic'}`}
                  style={{ fontSize: 'clamp(10px, 2vh, 14px)', lineHeight: 1.5 }}>
                  {name}
                </motion.span>
              ))}
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
