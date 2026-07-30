import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { FatemiArchSVG, FloralCorner, SparkleField, BismillahImage, PulsingHeart } from './components';
import { MUSIC_SRC } from './musicConfig';
import { trackPlay } from './analytics';

/*
 * A5 ratio card: 148mm × 210mm (width:height = 148:210)
 * CSS aspect-ratio ensures the card is ALWAYS exactly A5 proportioned.
 * Screenshot → crop to gold border → send to printer at A5 → fills perfectly.
 * Font sizes use vw so everything scales with card width on any device.
 */

const fd = (d = 0) => ({
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: d, ease: 'easeOut' },
});

const Divider = ({ delay = 0, light = false }) => (
  <motion.div style={{ display:'flex', alignItems:'center', width:'100%', gap:8 }}
    initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay }}>
    <motion.div style={{ flex:1, height:1, background: light ? 'rgba(179,135,40,0.4)' : '#b38728' }}
      initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ delay: delay+0.1, duration:0.8 }} />
    <div style={{ width:6, height:6, background:'#b38728', transform:'rotate(45deg)', flexShrink:0 }} />
    <motion.div style={{ flex:1, height:1, background: light ? 'rgba(179,135,40,0.4)' : '#b38728' }}
      initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ delay: delay+0.1, duration:0.8 }} />
  </motion.div>
);

const ReceptionA5 = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(MUSIC_SRC);
    audio.loop = true; audio.volume = 0.45;
    audioRef.current = audio;
    const onTouch = () => {
      audio.play().catch(() => {});
      document.removeEventListener('touchstart', onTouch);
      document.removeEventListener('click', onTouch);
    };
    audio.play().catch(() => {
      document.addEventListener('touchstart', onTouch);
      document.addEventListener('click', onTouch);
    });
    trackPlay('/reception');
    return () => { audio.pause(); audio.src = ''; };
  }, []);

  return (
    <div style={{
      minHeight: '100dvh', width: '100%',
      background: '#f0ece4',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px 12px',
    }}>

      {/* A5 card — width drives everything, height auto from aspect-ratio */}
      <div style={{
        /*
         * Width = smallest of:
         *   92vw   → fits phone width with small side gaps
         *   70dvh × (148/210) → stops card being taller than viewport
         * aspect-ratio locks the 148:210 (A5) shape permanently.
         */
        width: 'min(92vw, calc(70dvh * 148 / 210))',
        aspectRatio: '148 / 210',
        background: '#fdfbf7',
        border: '2px solid #b38728',
        borderRadius: 3,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 8px 40px rgba(30,58,138,0.18)',
        display: 'flex', flexDirection: 'column',
      }}>

        {/* ── Background decorations ── */}
        <FatemiArchSVG showInner />
        <FloralCorner rotate={0}   style={{ top:0, left:0 }} />
        <FloralCorner rotate={90}  style={{ top:0, right:0 }} />
        <FloralCorner rotate={180} style={{ bottom:0, right:0 }} />
        <FloralCorner rotate={270} style={{ bottom:0, left:0 }} />
        <SparkleField count={12} />

        {/* Shimmer border pulse */}
        <motion.div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:20 }}
          animate={{ boxShadow: ['inset 0 0 0 1px rgba(179,135,40,0.1)','inset 0 0 0 2px rgba(179,135,40,0.45)','inset 0 0 0 1px rgba(179,135,40,0.1)'] }}
          transition={{ duration:3.5, repeat:Infinity, ease:'easeInOut' }} />

        {/* ── Content — space-evenly fills the A5 height ── */}
        <div style={{
          position:'relative', zIndex:10,
          flex:1, minHeight:0,
          display:'flex', flexDirection:'column',
          alignItems:'center', textAlign:'center',
          justifyContent:'space-evenly',
          padding: 'clamp(6px,2vw,18px) clamp(10px,3.5vw,26px)',
        }}>

          {/* ── LOGO ── */}
          <motion.div initial={{ opacity:0, scale:0.85 }} animate={{ opacity:1, scale:1 }}
            transition={{ duration:0.9 }}>
            <motion.img src="/logo-heart.png" alt="logo"
              style={{ width:'clamp(48px,12vw,82px)', height:'auto', display:'block' }}
              animate={{
                scale: [1,1.1,0.97,1.07,1,1,1,1],
                filter: ['drop-shadow(0 0 3px rgba(179,135,40,0.2))','drop-shadow(0 0 16px rgba(179,135,40,0.8))','drop-shadow(0 0 5px rgba(179,135,40,0.35))','drop-shadow(0 0 16px rgba(179,135,40,0.8))','drop-shadow(0 0 3px rgba(179,135,40,0.2))','drop-shadow(0 0 3px rgba(179,135,40,0.2))'],
              }}
              transition={{ duration:2.6, repeat:Infinity, repeatDelay:0.6, times:[0,0.12,0.22,0.32,0.44,1] }} />
          </motion.div>

          {/* ── BISMILLAH ── */}
          <motion.div {...fd(0.2)}>
            <BismillahImage className="!h-7" />
          </motion.div>

          {/* ── INVITE TEXT + RECEPTION ── */}
          <motion.div {...fd(0.35)} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'clamp(2px,0.5vw,4px)' }}>
            <p style={{ fontFamily:"'Playfair Display',serif", fontStyle:'italic', fontWeight:700,
                         color:'#1e3a8a', opacity:0.75, fontSize:'clamp(9px,2.2vw,14px)', margin:0 }}>
              You are warmly invited to the
            </p>
            <motion.h1
              style={{ fontFamily:"'Great Vibes',cursive", color:'#1e3a8a', lineHeight:1,
                       fontSize:'clamp(1.4rem,6.8vw,3.2rem)', margin:0 }}
              animate={{ textShadow:['0 0 0px transparent','0 0 14px rgba(179,135,40,0.28)','0 0 0px transparent'] }}
              transition={{ duration:4, repeat:Infinity, delay:1 }}>
              Reception
            </motion.h1>
            <p style={{ fontFamily:"'Playfair Display',serif", fontStyle:'italic', fontWeight:700,
                         color:'#1e3a8a', opacity:0.75, fontSize:'clamp(9px,2.2vw,14px)', margin:0 }}>
              celebrating the wedding of
            </p>
          </motion.div>

          {/* ── NAMES — single line ── */}
          <motion.div {...fd(0.55)} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'clamp(3px,0.7vw,6px)' }}>
            <motion.h2
              style={{ fontFamily:"'Great Vibes',cursive", color:'#1e3a8a', lineHeight:1,
                       fontSize:'clamp(1.1rem,5.2vw,2.6rem)', whiteSpace:'nowrap', margin:0 }}
              animate={{ textShadow:['0 0 0px transparent','0 0 12px rgba(179,135,40,0.3)','0 0 0px transparent'] }}
              transition={{ duration:3.5, repeat:Infinity, delay:1.2 }}>
              Ibrahim &amp; Zenab
            </motion.h2>
            <div style={{ display:'flex', alignItems:'center', gap:8, width:'70%' }}>
              <motion.div style={{ flex:1, height:1, background:'rgba(179,135,40,0.6)' }}
                initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ delay:0.9, duration:0.8 }} />
              <PulsingHeart />
              <motion.div style={{ flex:1, height:1, background:'rgba(179,135,40,0.6)' }}
                initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ delay:0.9, duration:0.8 }} />
            </div>
          </motion.div>

          {/* ── DIVIDER ── */}
          <Divider delay={0.85} />

          {/* ── DATE + VENUE ── */}
          <motion.div {...fd(1.0)} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'clamp(3px,0.8vw,7px)', width:'100%' }}>
            <div style={{
              background:'#1e3a8a', borderRadius:6, border:'1.5px solid #b38728',
              padding:'clamp(5px,1.4vw,11px) clamp(12px,3.5vw,30px)',
            }}>
              <span style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, color:'#f0c040',
                              fontSize:'clamp(9px,2.3vw,15px)', letterSpacing:'0.03em' }}>
                20th August 2026&nbsp;&nbsp;·&nbsp;&nbsp;Evening
              </span>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:5 }}>
              <MapPin size={11} color="#b38728" />
              <span style={{ fontFamily:"'Playfair Display',serif", fontStyle:'italic', fontWeight:700,
                              color:'#b38728', fontSize:'clamp(9px,2.2vw,14px)' }}>
                Al Fakhar Manzil, Pune
              </span>
            </div>
          </motion.div>

          {/* ── DIVIDER light ── */}
          <Divider delay={1.1} light />

          {/* ── TO — three addressee lines ── */}
          {/* <motion.div {...fd(1.2)} style={{ width:'100%', display:'flex', flexDirection:'column', gap:'clamp(5px,1.2vw,9px)' }}>
            
            <div style={{ display:'flex', alignItems:'flex-end', gap:8 }}>
              <span style={{ fontFamily:"'Cinzel',serif", fontWeight:700, color:'#1e3a8a',
                              fontSize:'clamp(8px,2vw,13px)', letterSpacing:'0.1em', lineHeight:1, flexShrink:0 }}>
                To
              </span>
              <div style={{ flex:1, borderBottom:'1px solid rgba(30,58,138,0.3)', paddingBottom:2 }} />
            </div>
           
            {[0,1].map(i => (
              <div key={i} style={{ width:'100%', borderBottom:'1px solid rgba(30,58,138,0.3)', height:1 }} />
            ))}
          </motion.div> */}

          {/* ── COMPLIMENTS ── */}
          <motion.div {...fd(1.3)}>
            <p style={{ fontFamily:"'Playfair Display',serif", fontStyle:'italic', fontWeight:700,
                         color:'#b38728', fontSize:'clamp(8px,2.1vw,13px)', letterSpacing:'0.01em', margin:0 }}>
              With Best Compliments from Ibrahim Patrawala
            </p>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default ReceptionA5;
