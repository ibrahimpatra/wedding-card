import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { MUSIC_SRC } from './musicConfig';
import { trackPlay } from './analytics';
import { FatemiArchSVG, FloralCorner, SparkleField, BismillahImage, PulsingHeart } from './components';

const EVENT_DATA = {
  mehendi: {
    label: 'Mehendi Jaman',
    host:  'Sarrah Ben & Saifuddin Bhai Patrawala',
    date:  '17th August 2026', time: 'Evening',
    venue: 'Hatimi Hills',
  },
  majlis: {
    label: 'Majlis',
    host:  'Sarrah Ben & Saifuddin Bhai Patrawala',
    date:  '18th August 2026', time: 'Evening',
    venue: 'Fakhri Manzil, Pune',
  },
  nikah: {
    label: 'Nikah Darees',
    host:  'Sarrah Ben & Saifuddin Bhai Patrawala',
    date:  '19th August 2026', time: '',
    venue: 'Fakhri Manzil, Pune',
  },
  mamamusala: {
    label: 'Mama Musala',
    host:  'Lakdawala Family',
    date:  '18th August 2026', time: 'Morning',
    venue: 'Hatimi Hills',
  },
  reception: {
    label: 'Reception',
    host:  null,              // no host line — colleague invite
    date:  '20th August 2026', time: 'Evening',
    venue: 'Al Fakhar Manzil, Pune',
    isReception: true,
  },
};

const fmt = (c) => (c === 'A' ? 'All' : c);

const fd = (delay = 0) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: 'easeOut' },
});

const EventInvitePage = ({ eventKey, count }) => {
  const audioRef = useRef(null);
  const ev = EVENT_DATA[eventKey];

  useEffect(() => {
    const audio = new Audio(MUSIC_SRC);
    audio.loop = true; audio.volume = 0.45;
    audioRef.current = audio;
    const onTouch = () => { audio.play().catch(() => {}); document.removeEventListener('touchstart', onTouch); document.removeEventListener('click', onTouch); };
    audio.play().catch(() => { document.addEventListener('touchstart', onTouch); document.addEventListener('click', onTouch); });
    return () => { audio.pause(); audio.src = ''; };
  }, []);

  if (!ev) return null;
  const dateLine = ev.time ? `${ev.date}  ·  ${ev.time}` : ev.date;

  return (
    <div className="relative h-full w-full flex items-center justify-center overflow-hidden">
      <div
        className="relative bg-[#fdfbf7] shadow-2xl flex flex-col"
        style={{
          height: 'calc(100dvh - 20px)',
          width: 'min(calc(100vw - 16px), calc((100dvh - 20px) * 0.62))',
          borderRadius: '2px', overflow: 'hidden',
        }}
      >
        <FatemiArchSVG showInner />
        <FloralCorner rotate={0}   style={{ top: 0, left: 0 }} />
        <FloralCorner rotate={90}  style={{ top: 0, right: 0 }} />
        <FloralCorner rotate={180} style={{ bottom: 0, right: 0 }} />
        <FloralCorner rotate={270} style={{ bottom: 0, left: 0 }} />
        <SparkleField count={16} />

        <motion.div className="absolute inset-0 pointer-events-none z-20"
          animate={{ boxShadow: ['inset 0 0 0 1px rgba(179,135,40,0.1)','inset 0 0 0 2px rgba(179,135,40,0.5)','inset 0 0 0 1px rgba(179,135,40,0.1)'] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }} />

        {/* All sections distributed evenly — fits any mobile without scrolling */}
        <div className="relative z-10 flex flex-col items-center text-center"
          style={{ flex: 1, minHeight: 0, justifyContent: 'space-evenly',
                   padding: 'clamp(6px,1.8vh,18px) clamp(14px,3.5vw,32px)' }}>

          {/* ── LOGO ── */}
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
            <motion.img src="/logo-heart.png" alt="logo"
              style={{ width: 'clamp(60px,12vh,96px)', height: 'auto', display: 'block' }}
              animate={{ scale:[1,1.11,0.97,1.07,1,1,1,1],
                filter:['drop-shadow(0 0 3px rgba(179,135,40,0.2))','drop-shadow(0 0 18px rgba(179,135,40,0.8))','drop-shadow(0 0 6px rgba(179,135,40,0.4))','drop-shadow(0 0 18px rgba(179,135,40,0.8))','drop-shadow(0 0 3px rgba(179,135,40,0.2))','drop-shadow(0 0 3px rgba(179,135,40,0.2))'] }}
              transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 0.6, times:[0,0.12,0.22,0.32,0.44,1] }} />
          </motion.div>

          {/* ── BISMILLAH ── */}
          <motion.div {...fd(0.2)}>
            <BismillahImage className="!h-9" />
          </motion.div>

          {/* ── INVITE TEXT ── */}
          {ev.isReception ? (
            /* Reception: simple warm invite, no host */
            <motion.div {...fd(0.35)} className="flex flex-col items-center"
              style={{ gap: 'clamp(2px,0.5vh,5px)' }}>
              <p className="text-[#0a192f]/55 font-serif italic"
                style={{ fontSize: 'clamp(8.5px,1.6vh,13px)' }}>
                You are warmly invited to the
              </p>
              <motion.h1 className="font-calligraphy text-[#1e3a8a] leading-none"
                style={{ fontSize: 'clamp(2.2rem,7.5vh,4.6rem)' }}
                animate={{ textShadow:['0 0 0px transparent','0 0 14px rgba(179,135,40,0.3)','0 0 0px transparent'] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}>
                {ev.label}
              </motion.h1>
              <p className="text-[#0a192f]/55 font-serif italic"
                style={{ fontSize: 'clamp(8.5px,1.6vh,13px)' }}>
                celebrating the wedding of
              </p>
            </motion.div>
          ) : (
            /* Standard events: host invites you */
            <motion.div {...fd(0.35)} className="flex flex-col items-center"
              style={{ gap: 'clamp(2px,0.5vh,5px)' }}>
              <p className="font-serif italic font-bold text-[#b38728]"
                style={{ fontSize: 'clamp(10px,1.9vh,15px)', lineHeight: 1.35 }}>
                {ev.host}
              </p>
              <p className="text-[#0a192f]/55 font-serif italic"
                style={{ fontSize: 'clamp(8px,1.4vh,12px)' }}>
                invites you to the
              </p>
              <motion.h1 className="font-calligraphy text-[#1e3a8a] leading-none"
                style={{ fontSize: 'clamp(1.9rem,6.8vh,4.2rem)' }}
                animate={{ textShadow:['0 0 0px transparent','0 0 14px rgba(179,135,40,0.3)','0 0 0px transparent'] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}>
                {ev.label}
              </motion.h1>
              <p className="text-[#0a192f]/55 font-serif italic"
                style={{ fontSize: 'clamp(8px,1.4vh,12px)' }}>
                of the wedding of their son
              </p>
            </motion.div>
          )}

          {/* ── NAMES — single line ── */}
          <motion.div {...fd(0.55)} className="flex flex-col items-center"
            style={{ gap: 'clamp(3px,0.7vh,7px)' }}>
            <motion.h2 className="font-calligraphy text-[#1e3a8a] leading-none"
              style={{
                fontSize: 'clamp(1.5rem,5vh,2.9rem)',
                whiteSpace: 'nowrap',
              }}
              animate={{ textShadow:['0 0 0px transparent','0 0 16px rgba(179,135,40,0.35)','0 0 0px transparent'] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 1.2 }}>
              Ibrahim &amp; Zenab
            </motion.h2>
            <div className="flex items-center gap-2" style={{ width: '80%' }}>
              <motion.div className="flex-1 h-px bg-[#b38728]"
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }} />
              <PulsingHeart />
              <motion.div className="flex-1 h-px bg-[#b38728]"
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }} />
            </div>
          </motion.div>

          {/* ── GOLD DIVIDER ── */}
          <motion.div className="flex items-center w-full" style={{ gap: 10 }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            <motion.div className="flex-1 h-px bg-[#b38728]" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.9, duration: 0.8 }} />
            <div style={{ width: 8, height: 8, background: '#b38728', transform: 'rotate(45deg)', flexShrink: 0 }} />
            <motion.div className="flex-1 h-px bg-[#b38728]" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.9, duration: 0.8 }} />
          </motion.div>

          {/* ── DATE + VENUE ── */}
          <motion.div {...fd(1.0)} className="flex flex-col items-center"
            style={{ gap: 'clamp(4px,0.9vh,9px)' }}>
            <div className="bg-[#1e3a8a] rounded-lg flex items-center justify-center"
              style={{ padding: 'clamp(6px,1.4vh,12px) clamp(18px,4.5vw,44px)' }}>
              <span className="text-[#f0c040] font-bold font-serif text-center"
                style={{ fontSize: 'clamp(10px,2vh,16px)', letterSpacing: '0.04em', lineHeight: 1.3 }}>
                {dateLine}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={13} className="text-[#b38728] shrink-0" />
              <span className="font-serif italic font-bold text-[#b38728]"
                style={{ fontSize: 'clamp(10px,1.9vh,15px)' }}>
                {ev.venue}
              </span>
            </div>
          </motion.div>

          {/* ── INVITEES — navy box, same clean style as Nikah solemnized ── */}
          {count && !ev.isReception && (
            <motion.div {...fd(1.2)} className="w-full">
              <div
                className="rounded-lg w-full flex items-center justify-center gap-3"
                style={{ padding: 'clamp(10px,2vh,16px) clamp(16px,4vw,28px)', border: '1.5px solid #b38728' }}
              >
                <span style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(12px,2.2vh,17px)',
                               fontWeight:700, letterSpacing:'0.18em', color:'#b38728', textTransform:'uppercase' }}>
                  INVITEES
                </span>
                <span style={{ color:'#1e3a8a', fontSize:'clamp(14px,2.4vh,20px)' }}>·</span>
                <span className="font-handwritten font-bold text-[#1e3a8a]"
                  style={{ fontSize:'clamp(22px,4.5vh,36px)', lineHeight:1 }}>
                  ( {fmt(count)} )
                </span>
              </div>
            </motion.div>
          )}

          {/* ── RECEPTION: warm closing note ── */}
          {ev.isReception && (
            <motion.div {...fd(1.1)}>
              <p className="text-[#0a192f]/50 font-serif italic"
                style={{ fontSize: 'clamp(8px,1.4vh,11px)' }}>
                We look forward to celebrating with you
              </p>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
};

export default EventInvitePage;
