import React from 'react';
import { motion } from 'framer-motion';
import { Download, Calendar, MapPin } from 'lucide-react';
import { FloralCorner, COLORS } from './components';

const Page3 = ({ t, isArabic, handleDownloadPDF, isGeneratingPdf }) => {
  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center p-4 md:p-8">
      
      {/* THE CARD CONTAINER */}
      <div className="relative w-full max-w-xl bg-[#FDFBF7] shadow-2xl p-8 border border-[#D4AF37]/30 rounded-sm overflow-hidden h-auto min-h-[600px] flex flex-col">
        
        <FloralCorner rotate={180} style={{ top: 0, right: 0 }} />
        <FloralCorner rotate={270} style={{ bottom: 0, left: 0 }} />

        {/* HEADER */}
        <div className="text-center mb-8 z-10 mt-4">
            <h2 className={`text-[#0F172A] text-4xl ${isArabic ? 'font-arabic font-bold' : 'font-calligraphy'}`}>
              {t.events_title}
            </h2>
            <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto mt-2"></div>
        </div>

        {/* EVENTS TIMELINE */}
        <div className="flex-1 flex flex-col gap-4 z-10 px-2 md:px-6 overflow-y-auto max-h-[40vh] md:max-h-none">
          {t.events.map((evt, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              className="bg-white border-l-[3px] border-[#D4AF37] shadow-sm p-4 flex justify-between items-center group hover:bg-[#FDFBF7] transition-colors"
            >
               <div>
                  <h3 className={`text-[#0F172A] text-xl font-bold ${isArabic ? 'font-arabic' : 'font-serif'}`}>
                    {evt.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-[#0F172A]/60 text-xs uppercase tracking-wide">
                     <MapPin size={12} className="text-[#D4AF37]" /> {evt.loc}
                  </div>
               </div>
               <div className="text-right">
                  <div className="text-[#D4AF37] font-bold text-sm bg-[#D4AF37]/10 px-2 py-1 rounded inline-block">
                     {evt.date}
                  </div>
                  <div className="text-[#0F172A]/40 text-xs mt-1">{evt.time}</div>
               </div>
            </motion.div>
          ))}
        </div>

        {/* FOOTER & DOWNLOAD */}
        <div className="mt-auto pt-8 z-10 text-center space-y-6">
           <div>
              <p className="text-[#D4AF37] text-xs uppercase tracking-widest mb-2 font-bold">{t.compliments_title}</p>
              <div className="flex flex-wrap justify-center gap-4">
                 {t.family_list.map((name, idx) => (
                    <span key={idx} className={`text-[#0F172A] text-lg opacity-80 ${isArabic ? 'font-arabic' : 'font-calligraphy'}`}>
                       {name}
                    </span>
                 ))}
              </div>
           </div>

           <button
              onClick={handleDownloadPDF}
              disabled={isGeneratingPdf}
              className="bg-[#0F172A] text-[#D4AF37] px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 mx-auto disabled:opacity-50"
           >
              {isGeneratingPdf ? 'Generating...' : <><Download size={16} /> {t.download_btn}</>}
           </button>
        </div>

      </div>
    </div>
  );
};

export default Page3;