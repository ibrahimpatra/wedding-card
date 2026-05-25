import React from 'react';
import { motion } from 'framer-motion';
import { FatemiArchSVG, FloralCorner, GateOpening, SparkleField, PulsingHeart } from './components';

const Page1 = ({ gatesOpened, setGatesOpened, t, isArabic }) => {
  return (
    <div className="relative h-full w-full flex items-center justify-center overflow-hidden">

      {!gatesOpened && <GateOpening onOpenComplete={() => setGatesOpened(true)} />}

      {/* Portrait card — matches Page2 sizing formula */}
      <div
        className="relative bg-[#fdfbf7] border border-[#b38728]/30 shadow-2xl overflow-hidden flex flex-col items-center justify-center"
        style={{
          height: 'calc(100dvh - 20px)',
          width: 'min(calc(100vw - 16px), calc((100dvh - 20px) * 0.62))',
          borderRadius: '2px',
        }}
      >
        {/* Arch fills the card */}
        <FatemiArchSVG showInner={true} />

        {/* Corners */}
        <FloralCorner rotate={0}   style={{ top: 0, left: 0 }} />
        <FloralCorner rotate={90}  style={{ top: 0, right: 0 }} />
        <FloralCorner rotate={180} style={{ bottom: 0, right: 0 }} />
        <FloralCorner rotate={270} style={{ bottom: 0, left: 0 }} />

        {/* Sparkles after gates open */}
        {gatesOpened && <SparkleField count={20} />}

        {/* Pulsing rings */}
        {gatesOpened && (
          <>
            <motion.div className="absolute rounded-full border border-[#b38728]/20 pointer-events-none"
              style={{ width: '72%', paddingBottom: '72%' }}
              animate={{ scale: [1, 1.04, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div className="absolute rounded-full border border-[#b38728]/10 pointer-events-none"
              style={{ width: '86%', paddingBottom: '86%' }}
              animate={{ scale: [1.04, 1, 1.04], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
            />
          </>
        )}

        {/* Content */}
        <div className="z-10 flex flex-col items-center justify-center w-full h-full text-center"
          style={{ padding: 'clamp(20px, 5vh, 60px) clamp(16px, 4vw, 48px)' }}>

          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: gatesOpened ? 1 : 0, y: gatesOpened ? 0 : -8 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-[#b38728] font-bold tracking-[0.22em] uppercase"
            style={{ fontSize: 'clamp(9px, 1.4vh, 12px)', marginBottom: 'clamp(12px, 3vh, 28px)' }}
          >
            ✦ The Wedding Celebration Of ✦
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: gatesOpened ? 1 : 0, scale: gatesOpened ? 1 : 0.9 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-col items-center w-full"
          >
            {/* Groom */}
            <motion.h1
              className={`text-[#1e3a8a] leading-none ${isArabic ? 'font-arabic' : 'font-calligraphy'}`}
              style={{ fontSize: 'clamp(3rem, 13vh, 8rem)', marginBottom: 0 }}
              animate={{ textShadow: ['0 0 0px #b38728', '0 0 20px rgba(179,135,40,0.35)', '0 0 0px #b38728'] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              {t.groom_name}
            </motion.h1>

            {/* Heart divider */}
            <div className="flex items-center gap-3" style={{ margin: 'clamp(8px, 2vh, 18px) 0' }}>
              <motion.div className="h-[1px] bg-[#b38728]"
                initial={{ width: 0 }} animate={{ width: gatesOpened ? '3rem' : 0 }}
                transition={{ delay: 1.2, duration: 0.8 }} />
              <PulsingHeart />
              <motion.div className="h-[1px] bg-[#b38728]"
                initial={{ width: 0 }} animate={{ width: gatesOpened ? '3rem' : 0 }}
                transition={{ delay: 1.2, duration: 0.8 }} />
            </div>

            {/* Bride */}
            <motion.h1
              className={`text-[#1e3a8a] leading-none ${isArabic ? 'font-arabic' : 'font-calligraphy'}`}
              style={{ fontSize: 'clamp(3rem, 13vh, 8rem)', marginBottom: 0 }}
              animate={{ textShadow: ['0 0 0px #b38728', '0 0 20px rgba(179,135,40,0.35)', '0 0 0px #b38728'] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            >
              {t.bride_name}
            </motion.h1>
          </motion.div>

          {/* Date pill */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: gatesOpened ? 1 : 0, y: gatesOpened ? 0 : 14 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="border border-[#b38728] rounded-full"
            style={{ marginTop: 'clamp(14px, 3.5vh, 32px)', padding: 'clamp(5px, 1.2vh, 10px) clamp(14px, 3vw, 26px)' }}
          >
            <span className="text-[#b38728] font-bold uppercase tracking-[0.3em]"
              style={{ fontSize: 'clamp(8px, 1.3vh, 12px)' }}>
              19 August • Fakhri Manzil, Pune
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Page1;
