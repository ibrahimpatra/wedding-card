import React from 'react';
import { motion } from 'framer-motion';
import { FatemiArchSVG, FloralCorner, GateOpening, SparkleField, PulsingHeart } from './components';

const Page1 = ({ gatesOpened, setGatesOpened, t, isArabic }) => {
  return (
    <div className="relative h-full w-full flex items-center justify-center overflow-hidden">

      {!gatesOpened && <GateOpening onOpenComplete={() => setGatesOpened(true)} />}

      {/* Portrait card */}
      <div
        className="relative bg-[#fdfbf7] border border-[#b38728]/30 shadow-2xl overflow-hidden flex flex-col items-center justify-center"
        style={{
          height: 'calc(100dvh - 20px)',
          width: 'min(calc(100vw - 16px), calc((100dvh - 20px) * 0.62))',
          borderRadius: '2px',
        }}
      >
        <FatemiArchSVG showInner={true} />

        <FloralCorner rotate={0}   style={{ top: 0, left: 0 }} />
        <FloralCorner rotate={90}  style={{ top: 0, right: 0 }} />
        <FloralCorner rotate={180} style={{ bottom: 0, right: 0 }} />
        <FloralCorner rotate={270} style={{ bottom: 0, left: 0 }} />

        {gatesOpened && <SparkleField count={20} />}

        {/* Content */}
        <div className="z-10 flex flex-col items-center justify-center w-full h-full text-center"
          style={{ padding: 'clamp(20px, 5vh, 60px) clamp(16px, 4vw, 48px)', gap: 0 }}>

          {/* ── Tagline ── */}
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: gatesOpened ? 1 : 0, y: gatesOpened ? 0 : -8 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-[#b38728] font-bold tracking-[0.22em] uppercase"
            style={{ fontSize: 'clamp(9px, 1.4vh, 12px)', marginBottom: 'clamp(10px, 2.5vh, 24px)' }}
          >
            ✦ The Wedding Celebration Of ✦
          </motion.p>

          {/* ── Logo: bigger, rings wrapped inside container ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: gatesOpened ? 1 : 0, scale: gatesOpened ? 1 : 0.82 }}
            transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
            className="relative flex items-center justify-center"
            style={{
              width: 'clamp(190px, 40vh, 310px)',
              height: 'clamp(190px, 40vh, 310px)',
              marginBottom: 'clamp(6px, 1.5vh, 14px)',
            }}
          >
            {/* Inner ring — hugs the heart */}
            {gatesOpened && (
              <motion.div
                className="absolute rounded-full border border-[#b38728]/25 pointer-events-none"
                style={{
                  width: '118%', height: '118%',
                  top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.65, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
            {/* Outer ring */}
            {gatesOpened && (
              <motion.div
                className="absolute rounded-full border border-[#b38728]/12 pointer-events-none"
                style={{
                  width: '144%', height: '144%',
                  top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{ scale: [1.05, 1, 1.05], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
              />
            )}

            {/* The heart image — side-glow blink, no scale pulse */}
            <motion.img
              src="/logo-heart.png"
              alt="Ibrahim & Zenab"
              className="relative z-10"
              style={{ width: '100%', height: 'auto', display: 'block' }}
              animate={gatesOpened ? {
                filter: [
                  'drop-shadow(-12px 0 10px rgba(179,135,40,0.0))  drop-shadow(12px 0 10px rgba(179,135,40,0.0))',
                  'drop-shadow(-14px 0 18px rgba(179,135,40,0.85)) drop-shadow(14px 0 6px  rgba(179,135,40,0.2))',
                  'drop-shadow(-6px  0 8px  rgba(179,135,40,0.3))  drop-shadow(6px  0 8px  rgba(179,135,40,0.3))',
                  'drop-shadow(-6px  0 6px  rgba(179,135,40,0.2))  drop-shadow(14px 0 18px rgba(179,135,40,0.85))',
                  'drop-shadow(-12px 0 10px rgba(179,135,40,0.0))  drop-shadow(12px 0 10px rgba(179,135,40,0.0))',
                ],
              } : {}}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: 'easeInOut',
                repeatDelay: 0.8,
              }}
            />
          </motion.div>

          {/* ── Heart divider ── */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: gatesOpened ? 1 : 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            style={{ marginBottom: 'clamp(6px, 1.5vh, 12px)' }}
          >
            <motion.div className="h-[1px] bg-[#b38728]"
              initial={{ width: 0 }} animate={{ width: gatesOpened ? '3rem' : 0 }}
              transition={{ delay: 1.2, duration: 0.8 }} />
            <PulsingHeart />
            <motion.div className="h-[1px] bg-[#b38728]"
              initial={{ width: 0 }} animate={{ width: gatesOpened ? '3rem' : 0 }}
              transition={{ delay: 1.2, duration: 0.8 }} />
          </motion.div>

          {/* ── Names below logo ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: gatesOpened ? 1 : 0, y: gatesOpened ? 0 : 12 }}
            transition={{ delay: 1.1, duration: 0.9 }}
            className="flex flex-col items-center"
          >
            <motion.h2
              className="text-[#1e3a8a] leading-none font-calligraphy"
              style={{ fontSize: 'clamp(2rem, 7vh, 4.5rem)', margin: 0 }}
              animate={{
                textShadow: [
                  '0 0 0px #b38728',
                  '0 0 18px rgba(179,135,40,0.4)',
                  '0 0 0px #b38728',
                ],
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            >
              Ibrahim & Zenab
            </motion.h2>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Page1;
