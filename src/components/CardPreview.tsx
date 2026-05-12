/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CardData } from '../types';
import Markdown from 'react-markdown';
import { Cake, Sparkles, Heart, Gift, PartyPopper } from 'lucide-react';
import { motion } from 'motion/react';

interface CardPreviewProps {
  data: CardData;
  cardRef: React.RefObject<HTMLDivElement>;
}

export default function CardPreview({ data, cardRef }: CardPreviewProps) {
  const getThemeStyles = () => {
    switch (data.theme) {
      case 'playful':
        return 'bg-pink-50 border-pink-200';
      case 'modern':
        return 'bg-blue-50 border-blue-200';
      case 'elegant':
        return 'bg-white border-neutral-950 text-neutral-950';
      case 'minimal':
        return 'bg-neutral-50 border-neutral-200';
      default:
        return 'bg-white border-neutral-100';
    }
  };

  const getAccentBg = () => {
    return { backgroundColor: data.accentColor };
  };

  const getAccentText = () => {
    return { color: data.accentColor };
  };

  return (
    <div className="flex justify-center items-center p-0">
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`relative w-full aspect-[4/5] shadow-sm rounded-3xl overflow-hidden border ${getThemeStyles()} transition-all duration-500`}
        style={{
          backgroundImage: `
            radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.02) 100%),
            url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")
          `,
          backgroundBlendMode: 'overlay',
          opacity: 0.98,
        }}
        id="birthday-card"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-8 left-8"
          >
            <Sparkles size={18} style={getAccentText()} />
          </motion.div>

          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-20"
          >
            <Heart size={14} style={getAccentText()} />
          </motion.div>

          <motion.div 
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-12 left-14"
          >
            <Gift size={20} style={getAccentText()} />
          </motion.div>

          <motion.div 
            animate={{ rotate: [-8, 8, -8] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-24 right-12"
          >
            <PartyPopper size={18} style={getAccentText()} />
          </motion.div>
        </div>

        {/* Professional Elegant Theme Refinement */}
        {data.theme === 'elegant' && (
          <div className="absolute inset-4 border border-neutral-900/10 rounded-2xl pointer-events-none" />
        )}

        {/* Main Content */}
        <div className="z-10 flex flex-col h-full w-full p-6 sm:p-12 text-neutral-900 transition-all duration-500 overflow-hidden">
          {/* Top Section: Name and Age */}
          <header className="flex flex-col items-start gap-1 sm:gap-2 shrink-0">
             <div className="space-y-1">
                <h2 className={`${data.fontFamily} text-[7px] sm:text-[9px] uppercase tracking-[0.4em] text-neutral-400 font-bold opacity-80 text-left`}>
                  Untuk Kamu yang Berulang Tahun
                </h2>
                <div className="h-[1px] w-6 sm:w-10 bg-neutral-900/10" />
             </div>
             
             <h1 className={`${data.fontFamily} ${
               data.recipientName.length > 20 ? 'text-xl sm:text-3xl' : 
               data.recipientName.length > 15 ? 'text-2xl sm:text-4xl' : 
               'text-3xl sm:text-5xl'
             } font-bold tracking-tighter text-neutral-950 text-left leading-tight break-words max-w-full`}>
               {data.recipientName}
             </h1>
             
             {data.age && (
               <motion.div
                 initial={{ opacity: 0, x: -10 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="flex items-center gap-2 mt-1"
               >
                 <div className="w-4 sm:w-6 h-px bg-neutral-900/10" />
                 <div 
                   className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-white text-[7px] sm:text-[9px] font-bold tracking-widest uppercase shadow-sm"
                   style={getAccentBg()}
                 >
                   {data.age} Yrs Old
                 </div>
               </motion.div>
             )}
          </header>

          {/* Middle Section: Photo and Message */}
          <div className="flex-grow flex flex-row items-center justify-center gap-2 sm:gap-10 my-2 sm:my-8 overflow-hidden w-full px-1 sm:px-2">
             {data.imageUrl && (
               <div className="w-[40%] sm:w-1/2 h-full flex justify-center items-center shrink-0">
                 <div className="w-full aspect-square relative group max-w-[120px] sm:max-w-[340px]">
                    <div className="absolute inset-0 bg-neutral-900/5 blur-2xl rounded-full scale-110 -z-10" />
                    <div className="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden border-2 sm:border-4 border-white shadow-xl rotate-1 group-hover:rotate-0 transition-transform duration-500">
                      <img src={data.imageUrl} alt="Birthday" className="w-full h-full object-cover" />
                    </div>
                 </div>
               </div>
             )}
             
             <div className={`flex items-center ${data.imageUrl ? 'w-[60%] sm:w-1/2 justify-start' : 'w-full justify-center text-center'} h-full py-1`}>
                <div className={`markdown-body ${data.fontFamily} w-full leading-tight sm:leading-relaxed text-neutral-600 italic ${data.imageUrl ? 'text-left' : 'text-center'} transition-all duration-500
                  ${data.imageUrl 
                    ? (data.message.length > 250 ? 'text-[7px] sm:text-[9px]' :
                       data.message.length > 200 ? 'text-[8px] sm:text-[10px]' : 
                       data.message.length > 150 ? 'text-[9px] sm:text-xs' : 
                       data.message.length > 100 ? 'text-[10px] sm:text-sm' : 
                       'text-[11px] sm:text-base')
                    : (data.message.length > 250 ? 'text-[11px] sm:text-base' :
                       data.message.length > 200 ? 'text-xs sm:text-lg' :
                       data.message.length > 150 ? 'text-sm sm:text-xl' :
                       data.message.length > 100 ? 'text-base sm:text-2xl' :
                       'text-lg sm:text-3xl')
                  }
                `}>
                   <Markdown>{data.message}</Markdown>
                </div>
             </div>
          </div>

          {/* Bottom Section: From */}
          <footer className="mt-auto flex flex-col items-end shrink-0 pt-4 sm:pt-6 border-t border-neutral-100/50">
             <div className="flex items-center gap-2 mb-1">
               <div className="w-4 sm:w-6 h-px bg-neutral-200" />
               <p className={`${data.fontFamily} text-[7px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400`}>
                 From:
               </p>
             </div>
             <p className={`${data.fontFamily} ${
               data.senderName.length > 15 ? 'text-sm sm:text-lg' : 'text-base sm:text-2xl'
             } font-bold tracking-tight text-neutral-950 transition-all duration-500`}>
               {data.senderName}
             </p>
          </footer>
        </div>
      </motion.div>
    </div>
  );
}
