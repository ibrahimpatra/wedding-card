import React from 'react';
import { FatemiBorder, BismillahImage, COLORS } from './components';

const Page2 = ({ t, isArabic }) => {
  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center p-4 md:p-8">
      
      {/* THE CARD CONTAINER */}
      <div className="relative w-full max-w-xl bg-[#FDFBF7] shadow-2xl p-8 md:p-12 border border-[#D4AF37]/30 rounded-sm overflow-hidden flex flex-col items-center text-center">
        
        {/* Decorative Inner Border */}
        <div className="absolute inset-3 border border-[#D4AF37] opacity-40 pointer-events-none"></div>
        <div className="absolute inset-4 border border-[#D4AF37] opacity-20 pointer-events-none"></div>

        {/* Content */}
        <div className="z-10 w-full flex flex-col items-center">
          <BismillahImage />

          <p className={`text-[#0F172A] px-2 leading-relaxed opacity-80 mb-8
            ${isArabic ? 'font-arabic text-lg' : 'font-serif text-sm italic'}`}>
            {t.spiritual_body}
          </p>

          <FatemiBorder />

          <p className="text-[#D4AF37] uppercase tracking-[0.2em] text-xs font-bold mt-8 mb-4">
            {t.invite_line}
          </p>

          {/* Names Block */}
          <div className="py-4 space-y-2">
             <h1 className={`text-[#0F172A] text-5xl md:text-7xl ${isArabic ? 'font-arabic font-bold' : 'font-calligraphy'}`}>
               {t.groom_name}
             </h1>
             <p className="text-[#D4AF37] text-xl font-serif italic">&</p>
             <h1 className={`text-[#0F172A] text-5xl md:text-7xl ${isArabic ? 'font-arabic font-bold' : 'font-calligraphy'}`}>
               {t.bride_name}
             </h1>
          </div>

          <p className="text-[#0F172A] mt-6 text-xs uppercase tracking-widest opacity-60">
            {t.bride_parents_line}
          </p>

          <div className="mt-8 bg-[#0F172A]/5 px-6 py-2 rounded-full border border-[#D4AF37]/30">
             <p className={`text-[#0F172A] font-semibold ${isArabic ? 'font-arabic' : 'text-xs uppercase tracking-wide'}`}>
               <span className="text-[#D4AF37] mr-2">📍</span> 
               {t.nikah_loc}
             </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Page2;