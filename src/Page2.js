import React from 'react';
import { FatemiBorder, BismillahImage, FloralCorner, COLORS } from './components';

const Page2 = ({ t, isArabic }) => {
  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center p-4">
      
      {/* Card Container */}
      <div className="relative w-full max-w-lg bg-white shadow-2xl border border-[#b38728]/30 p-6 md:p-10 overflow-hidden flex flex-col items-center text-center rounded-sm">
        
        {/* Animated Borders (Requested) */}
        <FloralCorner rotate={0} style={{ top: 0, left: 0 }} />
        <FloralCorner rotate={90} style={{ top: 0, right: 0 }} />
        <FloralCorner rotate={180} style={{ bottom: 0, right: 0 }} />
        <FloralCorner rotate={270} style={{ bottom: 0, left: 0 }} />

        {/* --- SECTION 1: SPIRITUAL (With Background Color) --- */}
        <div className="z-10 w-full mb-4 bg-[#b38728]/5 border border-[#b38728]/10 p-4 rounded-lg">
          <BismillahImage />
          <p className={`text-[#1e3a8a] leading-relaxed opacity-90 ${isArabic ? 'font-arabic text-lg' : 'font-serif text-xs md:text-sm italic'}`}>
            {t.spiritual_body}
          </p>
        </div>

        {/* --- SECTION 2: NAMES (Tightened Layout) --- */}
        <div className="flex-1 flex flex-col items-center justify-center w-full z-10 my-2">
            <p className="text-[#b38728] uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold mb-2">
                {t.invite_line}
            </p>

            {/* Names Block - Reduced Spacing */}
            <div className="flex flex-col items-center -space-y-2 md:-space-y-4">
                <h1 className={`text-[#1e3a8a] text-5xl md:text-6xl drop-shadow-sm ${isArabic ? 'font-arabic font-bold' : 'font-calligraphy'}`}>
                    {t.groom_name}
                </h1>
                
                <span className="text-[#b38728] text-lg font-serif italic my-1">&</span>
                
                <h1 className={`text-[#1e3a8a] text-5xl md:text-6xl drop-shadow-sm ${isArabic ? 'font-arabic font-bold' : 'font-calligraphy'}`}>
                    {t.bride_name}
                </h1>
            </div>

            <p className="text-[#0a192f] mt-4 text-[10px] uppercase tracking-widest opacity-60">
                {t.bride_parents_line}
            </p>
        </div>

        {/* --- SECTION 3: LOCATION (With Background Color) --- */}
        <div className="z-10 w-full mt-4">
           <div className="bg-[#1e3a8a] text-white p-3 rounded shadow-md border border-[#b38728]">
              <p className={`font-semibold ${isArabic ? 'font-arabic text-lg' : 'text-xs uppercase tracking-wide'}`}>
                <span className="text-[#b38728] mr-2">✦</span> 
                {t.nikah_loc}
              </p>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Page2;