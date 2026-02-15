import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { FatemiArchSVG, FloralCorner, GateOpening } from './components';

const Page1 = ({ gatesOpened, setGatesOpened, t, isArabic }) => {
  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center p-4 overflow-hidden">
      {!gatesOpened && <GateOpening onOpenComplete={() => setGatesOpened(true)} />}
      
      <FatemiArchSVG showInner={false} />
      <FloralCorner rotate={0} style={{ top: 0, left: 0 }} />
      <FloralCorner rotate={90} style={{ top: 0, right: 0 }} />
      <FloralCorner rotate={180} style={{ bottom: 0, right: 0 }} />
      <FloralCorner rotate={270} style={{ bottom: 0, left: 0 }} />

      <div className="z-10 flex flex-col items-center justify-center w-full h-full text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: gatesOpened ? 1 : 0 }}
          transition={{ delay: 0.2 }}
          className="text-[#b38728] font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs mb-6"
        >
          The Wedding Celebration Of
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: gatesOpened ? 1 : 0, scale: gatesOpened ? 1 : 0.9 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col items-center w-full"
        >
          <h1 className={`text-[#1e3a8a] drop-shadow-sm leading-none ${isArabic ? 'font-arabic' : 'font-calligraphy'}`} style={{ fontSize: 'clamp(4rem, 15vw, 8rem)' }}>
            {t.groom_name}
          </h1>
          
          <div className="flex items-center gap-3 opacity-80 my-2">
            <div className="h-[1px] bg-[#b38728] w-8 md:w-12"></div>
            <Heart size={14} fill="#b38728" className="text-[#b38728]" />
            <div className="h-[1px] bg-[#b38728] w-8 md:w-12"></div>
          </div>
          
          <h1 className={`text-[#1e3a8a] drop-shadow-sm leading-none ${isArabic ? 'font-arabic' : 'font-calligraphy'}`} style={{ fontSize: 'clamp(4rem, 15vw, 8rem)' }}>
            {t.bride_name}
          </h1>
        </motion.div>
      </div>
    </div>
  );
};

export default Page1;