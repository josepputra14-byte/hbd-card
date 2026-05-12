/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import CardPreview from './components/CardPreview';
import Editor from './components/Editor';
import { CardData, CardTheme } from './types';
import { INITIAL_CARD_DATA } from './constants';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';
import { Gift, Share2, Heart, Sparkles, Download, Printer, Facebook, Twitter, Instagram, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [cardData, setCardData] = useState<CardData>(INITIAL_CARD_DATA);
  const [isExporting, setIsExporting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Expose setIsFinished for the Editor component
  (window as any).setIsFinished = setIsFinished;

  const handleExport = async (type: 'png' | 'pdf' | 'print') => {
    if (!cardRef.current) return;
    
    setIsExporting(true);
    
    try {
      if (type === 'png') {
        const dataUrl = await toPng(cardRef.current, {
          cacheBust: true,
          pixelRatio: 3, // Higher quality for final result
          backgroundColor: cardData.theme === 'elegant' ? '#171717' : '#FDF9F3',
        });
        
        const link = document.createElement('a');
        link.download = `kartu-ulang-tahun-${cardData.recipientName.replace(/\s+/g, '-').toLowerCase()}.png`;
        link.href = dataUrl;
        link.click();
        
        confetti({
          particleCount: 200,
          spread: 80,
          origin: { y: 0.6 },
          colors: [cardData.accentColor, '#FFD700', '#FFFFFF']
        });
        
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else if (type === 'print') {
        window.print();
      }
    } catch (err) {
      console.error('Export failed', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-700 ${isFinished ? 'bg-neutral-50' : 'bg-white'}`}>
      {/* Header */}
      <header className={`px-6 py-5 border-b transition-all duration-500 ${isFinished ? 'bg-white/80 border-neutral-200' : 'bg-white border-neutral-100'} backdrop-blur-md sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-500 shadow-sm ${isFinished ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-900'}`}>
              <Gift size={18} />
            </div>
            <div>
              <h1 className="font-display text-lg font-bold tracking-tight text-neutral-900">HBD Card</h1>
              <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 font-bold">Premium Digital Cards</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
             {isFinished && (
               <button 
                 onClick={() => setIsFinished(false)}
                 className="text-[11px] font-bold px-5 py-2 rounded-lg border border-neutral-200 text-neutral-600 hover:bg-neutral-50 transition-all uppercase tracking-wider"
               >
                 Edit Card
               </button>
             )}
             <button className={`flex items-center gap-2 px-6 py-2 rounded-lg text-xs font-bold transition-all shadow-sm ${isFinished ? 'bg-neutral-900 text-white hover:bg-neutral-800' : 'bg-neutral-900 text-white hover:bg-neutral-800'}`}>
                <Share2 size={14} />
                Share
             </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-10 lg:pt-16 pb-20">
        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div 
              key="editor"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start"
            >
              {/* Left Side: Preview */}
              <div className="lg:col-span-7 flex flex-col items-center">
                <div className="w-full flex justify-between items-end mb-6">
                  <div className="text-neutral-900">
                    <h2 className="font-display text-2xl font-bold">Live Preview</h2>
                    <p className="text-neutral-400 text-xs mt-1">Real-time design visualization.</p>
                  </div>
                  <div className="flex gap-1.5 mb-1 opacity-20">
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                  </div>
                </div>
                
                <div className="relative group w-full bg-neutral-50/50 rounded-3xl p-4 sm:p-10 border border-neutral-100">
                   <CardPreview data={cardData} cardRef={cardRef} />
                </div>
              </div>

              {/* Right Side: Editor */}
              <div className="lg:col-span-5">
                <Editor 
                  data={cardData} 
                  onChange={setCardData} 
                  onExport={handleExport} 
                  isExporting={isExporting} 
                />
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-[70vh] py-10"
            >
              <div className="text-center mb-10">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-900 text-white rounded-full text-[9px] font-bold tracking-[0.2em] uppercase mb-6 shadow-xl shadow-neutral-900/10">
                    <Sparkles size={10} />
                    Final Masterpiece
                  </div>
                  <h2 className="font-display text-4xl sm:text-5xl font-bold text-neutral-900 mb-3 tracking-tight">Your card is ready.</h2>
                  <p className="text-neutral-400 max-w-md mx-auto text-sm">
                    A personalized greeting for <b>{cardData.recipientName}</b>.
                  </p>
                </motion.div>
              </div>

              <div className="relative w-full max-w-[400px] px-2 sm:px-4">
                <div className="shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden ring-1 ring-neutral-200/50">
                  <CardPreview data={cardData} cardRef={cardRef} />
                </div>
                
                <motion.div 
                  className="mt-12 flex flex-wrap justify-center gap-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <button
                    onClick={() => handleExport('png')}
                    className="bg-neutral-900 text-white px-10 py-4 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-neutral-800 transition-all shadow-xl shadow-neutral-900/20"
                  >
                    <Download size={18} />
                    Download PNG
                  </button>
                  <button
                    onClick={() => handleExport('print')}
                    className="bg-white text-neutral-900 px-10 py-4 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-3 border border-neutral-200 hover:bg-neutral-50 transition-all"
                  >
                    <Printer size={18} />
                    Print Card
                  </button>
                </motion.div>

                <motion.div 
                  className="mt-8 pt-8 border-t border-neutral-100 flex flex-col items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold mb-4">Share to Social Media</p>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                      className="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition-all"
                    >
                      <Facebook size={20} />
                    </button>
                    <button 
                      onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(`Check out this birthday card I made for ${cardData.recipientName}!`)}`, '_blank')}
                      className="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-sky-50 hover:text-sky-500 hover:border-sky-100 transition-all"
                    >
                      <Twitter size={20} />
                    </button>
                    <button 
                      className="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-pink-50 hover:text-pink-600 hover:border-pink-100 transition-all"
                      title="Instagram: Please download the PNG to share"
                    >
                      <Instagram size={20} />
                    </button>
                    <button 
                      onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`Check out this birthday card I made for ${cardData.recipientName}! ${window.location.href}`)}`, '_blank')}
                      className="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-green-50 hover:text-green-600 hover:border-green-100 transition-all"
                    >
                      <Send size={20} className="rotate-[-45deg] translate-x-0.5" />
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Subtle Background Textures */}
      {isFinished && (
        <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden opacity-[0.03]">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>
      )}

      {/* Global Toast Success */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-8 py-4 rounded-2xl shadow-2xl z-[100] flex items-center gap-3 font-bold"
          >
            <Heart fill="white" size={20} />
            KARTU BERHASIL DISIMPAN!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

