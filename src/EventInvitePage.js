import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import {
  FatemiArchSVG, FloralCorner, SparkleField,
  BismillahImage, PulsingHeart, GoldDivider,
} from './components';

// ── Event definitions ───────────────────────────────────────────────
const EVENT_DATA = {
  mehendi: {
    label:  'Mehendi Jaman',
    host:   'Sarrah Ben & Saifuddin Bhai Patrawala',
    date:   '17th August 2026',
    time:   'Evening',
    venue:  'Hatimi Hills',
    nikahSolemnized: false,
  },
  majlis: {
    label:  'Majlis',
    host:   'Sarrah Ben & Saifuddin Bhai Patrawala',
    date:   '18th August 2026',
    time:   'Evening',
    venue:  'Fakhri Manzil, Pune',
    nikahSolemnized: false,
  },
  nikah: {
    label:  'Nikah Darees',
    host:   'Sarrah Ben & Saifuddin Bhai Patrawala',
    date:   '19th August 2026',
    time:   '',
    venue:  'Fakhri Manzil, Pune',
    nikahSolemnized: true,
  },
  mamamusala: {
    label:  'Mama Musala',
    host:   'Lakdawala Family',
    date:   '18th August 2026',
    time:   'Morning',
    venue:  'Hatimi Hills',
    nikahSolemnized: false,
  },
};

const fmt = (c) => (c === 'A' ? 'All' : c);

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' },
});

// ── Component ───────────────────────────────────────────────────────
const EventInvitePage = ({ eventKey, count }) => {
  const audioRef = useRef(null);
  const ev = EVENT_DATA[eventKey];

  /* Auto-play background music (same as main card) */
  useEffect(() => {
    const audio = new Audio('/wedding-music.mp3');
    audio.loop = true;
    audio.volume = 0.45;
    audioRef.current = audio;

    const onInteract = () => {
      audio.play().catch(() => {});
      document.removeEventListener('touchstart', onInteract);
      document.removeEventListener('click', onInteract);
    };
    audio.play().catch(() => {
      document.addEventListener('touchstart', onInteract);
      document.addEventListener('click', onInteract);
    });
    return () => { audio.pause(); audio.src = ''; };
  }, []);

  if (!ev) return null;

  const dateLine = ev.time ? `${ev.date}  ·  ${ev.time}` : ev.date;

  return (
    <div className="relative h-full w-full flex items-center justify-center overflow-hidden">

      {/* Portrait card */}
      <div
        className="relative bg-[#fdfbf7] shadow-2xl overflow-hidden flex flex-col"
        style={{
          height: 'calc(100dvh - 20px)',
          width: 'min(calc(100vw - 16px), calc((100dvh - 20px) * 0.62))',
          borderRadius: '2px',
          overflowY: 'auto',
          scrollbarWidth: 'none',
        }}
      >
        {/* Background decorations */}
        <FatemiArchSVG showInner />
        <FloralCorner rotate={0}   style={{ top: 0, left: 0 }} />
        <FloralCorner rotate={90}  style={{ top: 0, right: 0 }} />
        <FloralCorner rotate={180} style={{ bottom: 0, right: 0 }} />
        <FloralCorner rotate={270} style={{ bottom: 0, left: 0 }} />
        <SparkleField count={18} />

        {/* Shimmer border pulse */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-20"
          animate={{ boxShadow: [
            'inset 0 0 0 1px rgba(179,135,40,0.1)',
            'inset 0 0 0 1.5px rgba(179,135,40,0.45)',
            'inset 0 0 0 1px rgba(179,135,40,0.1)',
          ]}}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* ── Content ── */}
        <div
          className="relative z-10 flex flex-col items-center text-center flex-1"
          style={{ padding: 'clamp(16px,4vh,52px) clamp(16px,4vw,40px)', gap: 0 }}
        >

          {/* Logo with heartbeat glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            style={{ marginBottom: 'clamp(6px,1.5vh,14px)' }}
          >
            <motion.img
              src="/logo-heart.png"
              alt="Ibrahim & Zenab"
              style={{ width: 'clamp(72px,14vh,112px)', height: 'auto' }}
              animate={{
                scale: [1,1.12,0.97,1.08,1,1,1,1],
                filter: [
                  'drop-shadow(0 0 4px rgba(179,135,40,0.2))',
                  'drop-shadow(0 0 20px rgba(179,135,40,0.8))',
                  'drop-shadow(0 0 8px rgba(179,135,40,0.4))',
                  'drop-shadow(0 0 20px rgba(179,135,40,0.8))',
                  'drop-shadow(0 0 4px rgba(179,135,40,0.2))',
                  'drop-shadow(0 0 4px rgba(179,135,40,0.2))',
                ],
              }}
              transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 0.5,
                times: [0,0.12,0.22,0.32,0.44,0.58,0.78,1] }}
            />
          </motion.div>

          {/* Bismillah — same image as main card */}
          <BismillahImage />

          <GoldDivider delay={0.25} />

          {/* Host */}
          <motion.p {...fadeUp(0.35)}
            className="font-serif italic font-bold text-[#b38728]"
            style={{ fontSize: 'clamp(10px,1.9vh,15px)', lineHeight: 1.45,
                     margin: 'clamp(4px,1vh,10px) 0 0' }}
          >
            {ev.host}
          </motion.p>

          <motion.p {...fadeUp(0.42)}
            className="text-[#0a192f]/60 font-serif italic"
            style={{ fontSize: 'clamp(8px,1.4vh,11px)',
                     margin: 'clamp(2px,0.5vh,5px) 0' }}
          >
            invites you to the
          </motion.p>

          {/* Event name */}
          <motion.h1 {...fadeUp(0.52)}
            className="font-calligraphy text-[#1e3a8a] leading-none"
            style={{ fontSize: 'clamp(1.9rem,6.5vh,4rem)',
                     margin: 'clamp(2px,0.5vh,6px) 0',
                     textShadow: '0 0 0px transparent' }}
          >
            {ev.label}
          </motion.h1>

          <motion.p {...fadeUp(0.58)}
            className="text-[#0a192f]/60 font-serif italic"
            style={{ fontSize: 'clamp(8px,1.4vh,11px)',
                     margin: 'clamp(2px,0.5vh,5px) 0' }}
          >
            of the wedding of their son
          </motion.p>

          {/* Names */}
          <motion.div {...fadeUp(0.65)} className="flex flex-col items-center"
            style={{ margin: 'clamp(4px,1vh,10px) 0' }}>
            <h2 className="font-calligraphy text-[#1e3a8a] leading-none"
              style={{ fontSize: 'clamp(1.8rem,6vh,3.6rem)' }}>
              Ibrahim
            </h2>
            <div className="flex items-center gap-2"
              style={{ margin: 'clamp(2px,0.6vh,7px) 0' }}>
              <motion.div className="h-[1px] bg-[#b38728]"
                initial={{ width: 0 }} animate={{ width: '2rem' }}
                transition={{ delay: 0.9, duration: 0.6 }} />
              <PulsingHeart />
              <motion.div className="h-[1px] bg-[#b38728]"
                initial={{ width: 0 }} animate={{ width: '2rem' }}
                transition={{ delay: 0.9, duration: 0.6 }} />
            </div>
            <h2 className="font-calligraphy text-[#1e3a8a] leading-none"
              style={{ fontSize: 'clamp(1.8rem,6vh,3.6rem)' }}>
              Zenab
            </h2>
          </motion.div>

          <GoldDivider delay={0.9} />

          {/* Date + venue */}
          <motion.div {...fadeUp(1.0)} className="flex flex-col items-center w-full"
            style={{ margin: 'clamp(6px,1.5vh,14px) 0' }}>
            {/* Navy date pill */}
            <div
              className="bg-[#1e3a8a] rounded-lg flex items-center justify-center"
              style={{ padding: 'clamp(7px,1.6vh,14px) clamp(22px,4.5vw,44px)',
                       marginBottom: 'clamp(6px,1.2vh,12px)' }}
            >
              <span className="text-[#f0c040] font-bold font-serif tracking-wide text-center"
                style={{ fontSize: 'clamp(10px,2vh,15px)', lineHeight: 1.3 }}>
                {dateLine}
              </span>
            </div>

            {/* Venue */}
            <div className="flex items-center gap-1">
              <MapPin size={13} className="text-[#b38728] shrink-0" />
              <span className="font-serif italic font-bold text-[#b38728]"
                style={{ fontSize: 'clamp(10px,1.9vh,14px)' }}>
                {ev.venue}
              </span>
            </div>
          </motion.div>

          {/* Invitees count — handwritten */}
          {count && (
            <motion.div {...fadeUp(1.1)}
              className="flex items-baseline gap-1"
              style={{ margin: 'clamp(2px,0.6vh,8px) 0' }}
            >
              <span className="font-serif italic text-[#0a192f]/55"
                style={{ fontSize: 'clamp(8px,1.4vh,11px)' }}>
                Invitees (
              </span>
              <span className="font-handwritten text-[#1e3a8a]"
                style={{ fontSize: 'clamp(16px,3.2vh,24px)',
                         transform: 'rotate(-3deg)', display: 'inline-block' }}>
                {fmt(count)}
              </span>
              <span className="font-serif italic text-[#0a192f]/55"
                style={{ fontSize: 'clamp(8px,1.4vh,11px)' }}>
                )
              </span>
            </motion.div>
          )}

          {/* Nikah solemnized box — only for /nikah */}
          {ev.nikahSolemnized && (
            <motion.div {...fadeUp(1.2)}
              className="w-full bg-[#1e3a8a] rounded border border-[#b38728]"
              style={{ padding: 'clamp(7px,1.6vh,14px) clamp(10px,2vw,18px)',
                       marginTop: 'clamp(6px,1.4vh,14px)' }}
            >
              <p className="text-[#f0c040] font-bold uppercase tracking-wide text-center m-0"
                style={{ fontSize: 'clamp(7px,1.3vh,10px)', lineHeight: 1.5 }}>
                ✦ Nikah solemnized by Syedna Mufaddal Saifuddin (TUS) at Saifee Mahal, Mumbai
              </p>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
};

export default EventInvitePage;
