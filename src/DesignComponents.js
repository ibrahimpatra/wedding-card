/* DesignComponents.js */
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// --- NEW CONTINUOUS CONFETTI ---
export const FallingConfetti = () => {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    // Generate 30 random confetti pieces
    const newPieces = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // Random X position %
      delay: Math.random() * 5, // Random delay
      duration: 5 + Math.random() * 5, // Random speed
      size: 4 + Math.random() * 6, // Random size
      type: Math.random() > 0.5 ? 'circle' : 'square'
    }));
    setPieces(newPieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden h-full w-full">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-[#b38728] opacity-60"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            borderRadius: p.type === 'circle' ? '50%' : '0%',
            top: -20
          }}
          animate={{
            y: ['0vh', '110vh'],
            rotate: [0, 360],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: p.duration,
            ease: "linear",
            repeat: Infinity,
            delay: p.delay
          }}
        />
      ))}
    </div>
  );
};

export const PatternBackground = () => (
  <div 
    className="fixed inset-0 z-0 pointer-events-none opacity-15"
    style={{
      backgroundImage: `url('https://img.sanishtech.com/u/a9518ef80b35f2ff572ebc6f078f6f61.png')`,
      backgroundRepeat: 'repeat',
      backgroundSize: '150px auto' // Smaller pattern for better mobile look
    }}
  />
);

export const BismillahImage = () => (
  <img 
    src="https://img.sanishtech.com/u/045b93ddc9ea778a804192f6d4e1df52.png" 
    alt="Bismillah"
    className="h-12 md:h-20 mx-auto object-contain drop-shadow-sm mb-4"
    style={{ filter: 'brightness(0) saturate(100%) invert(14%) sepia(35%) saturate(3821%) hue-rotate(205deg) brightness(91%) contrast(96%)' }} 
  />
);

export const FatemiArchSVG = ({ className, showInner = true }) => (
  <svg viewBox="0 0 400 600" className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}>
    <defs>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#bf953f" />
        <stop offset="50%" stopColor="#fcf6ba" />
        <stop offset="100%" stopColor="#b38728" />
      </linearGradient>
    </defs>
    
    <motion.path 
      d="M10,600 L10,150 Q10,10 200,10 Q390,10 390,150 L390,600"
      fill="none"
      stroke="#b38728" 
      strokeWidth="3"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      transition={{ duration: 2, ease: "easeInOut" }}
    />
    
    {showInner && (
      <motion.path 
        d="M25,600 L25,160 Q25,30 200,30 Q375,30 375,160 L375,600"
        fill="none"
        stroke="#1e3a8a" 
        strokeWidth="1.5"
        strokeDasharray="4,4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.5 }}
        transition={{ delay: 1, duration: 1 }}
      />
    )}
  </svg>
);

export const FloralCorner = ({ rotate = 0, style }) => (
  <svg 
    viewBox="0 0 100 100" 
    className="absolute w-24 h-24 md:w-56 md:h-56 z-10 pointer-events-none"
    style={{ transform: `rotate(${rotate}deg)`, ...style }}
  >
    <path d="M0,0 Q60,0 100,100 L0,100 Z" fill="#1e3a8a" opacity="0.1" />
    <path d="M10,10 C50,10 60,60 90,90" stroke="#1e3a8a" strokeWidth="2" fill="none" />
    <circle cx="90" cy="90" r="4" fill="#b38728" />
    <path d="M20,20 C50,20 30,80 80,80" stroke="#b38728" strokeWidth="1.5" fill="none" />
  </svg>
);

export const FatemiBorder = ({ className }) => (
  <div className={`h-12 w-full bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-60 border-y-2 border-[#b38728] ${className}`}></div>
);