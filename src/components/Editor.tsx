/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CardData, CardTheme } from '../types';
import { THEMES, TEMPLATES } from '../constants';
import { Wand2, Download, Share2, Printer, Type, Palette, Layout, User, MessageCircle, Sparkles, Image as ImageIcon, X } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface EditorProps {
  data: CardData;
  onChange: (data: CardData) => void;
  onExport: (type: 'png' | 'pdf' | 'print') => void;
  isExporting: boolean;
}

export default function Editor({ data, onChange, onExport, isExporting }: EditorProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ ...data, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    onChange({ ...data, imageUrl: undefined });
  };

  const generateAImessage = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Buatkan pesan ucapan selamat ulang tahun yang hangat dan sangat singkat dalam Bahasa Indonesia untuk ${data.recipientName} yang berusia ${data.age || ''} tahun. Pesan WAJIB hanya 1 kalimat pendek. Jangan gunakan judul atau label seperti 'Pesan:', langsung berikan ucapannya.`,
      });
      
      const aiMessage = response.text || '';
      onChange({ ...data, message: aiMessage.replace(/^"|"$/g, '').trim() });
    } catch (error) {
      console.error("AI Generation failed", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const fonts: { id: CardData['fontFamily']; label: string }[] = [
    { id: 'font-display', label: 'Elegansi (Serif)' },
    { id: 'font-serif', label: 'Klasik (Garamond)' },
    { id: 'font-sans', label: 'Modern (Sans)' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-neutral-100 overflow-hidden sticky top-24">
      <div className="bg-neutral-50 px-6 py-5 border-b border-neutral-100">
        <h3 className="text-sm font-bold flex items-center gap-2 text-neutral-900 uppercase tracking-[0.1em]">
          <Palette size={16} className="text-neutral-400" />
          Card Customizer
        </h3>
      </div>

      <div className="p-6 space-y-8 max-h-[65vh] overflow-y-auto">
        {/* Templates Selection */}
        <section className="space-y-4">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 flex items-center gap-2">
            <Layout size={12} /> Simple Templates
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {TEMPLATES.map((template) => (
              <button
                key={template.id}
                onClick={() => onChange({ ...data, ...template.data })}
                className="group relative flex flex-col items-center justify-center p-3 rounded-xl border border-neutral-100 hover:border-neutral-300 hover:bg-neutral-50 transition-all text-center"
              >
                <div 
                  className="w-10 h-10 rounded-full mb-2 flex items-center justify-center text-white shadow-md transform group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: template.data.accentColor }}
                >
                  <Sparkles size={16} />
                </div>
                <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-tight">{template.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Recipients & Sender */}
        <section className="space-y-4">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 flex items-center gap-2">
            <User size={12} /> Contact Details
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-[9px] text-neutral-400 font-bold uppercase">Recipient</span>
              <input
                type="text"
                value={data.recipientName}
                onChange={(e) => onChange({ ...data, recipientName: e.target.value })}
                className="w-full bg-neutral-50 rounded-lg px-3 py-2.5 focus:bg-white focus:ring-1 focus:ring-neutral-200 transition-all outline-none text-sm font-medium border border-transparent focus:border-neutral-200"
                placeholder="Aini"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[9px] text-neutral-400 font-bold uppercase">Age</span>
              <input
                type="number"
                value={data.age || ''}
                onChange={(e) => onChange({ ...data, age: parseInt(e.target.value) || undefined })}
                className="w-full bg-neutral-50 rounded-lg px-3 py-2.5 focus:bg-white focus:ring-1 focus:ring-neutral-200 transition-all outline-none text-sm font-medium border border-transparent focus:border-neutral-200"
                placeholder="Optional"
              />
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-[9px] text-neutral-400 font-bold uppercase">From</span>
            <input
              type="text"
              value={data.senderName}
              onChange={(e) => onChange({ ...data, senderName: e.target.value })}
              className="w-full bg-neutral-50 rounded-lg px-3 py-2.5 focus:bg-white focus:ring-1 focus:ring-neutral-200 transition-all outline-none text-sm font-medium border border-transparent focus:border-neutral-200"
              placeholder="Your Name"
            />
          </div>
        </section>

        {/* Photo Upload */}
        <section className="space-y-4">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 flex items-center gap-2">
            <ImageIcon size={12} /> Featured Photo
          </label>
          {data.imageUrl ? (
            <div className="relative group aspect-video rounded-xl overflow-hidden border border-neutral-100 bg-neutral-50">
              <img src={data.imageUrl} alt="Birthday person" className="w-full h-full object-cover" />
              <button 
                onClick={removeImage}
                className="absolute top-2 right-2 bg-neutral-900/80 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full aspect-video border border-dashed border-neutral-200 rounded-xl cursor-pointer hover:bg-neutral-50 hover:border-neutral-300 transition-all">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <ImageIcon className="w-6 h-6 mb-2 text-neutral-400" />
                <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">Click to upload photo</p>
                <p className="text-[9px] text-neutral-400 mt-1 uppercase">PNG, JPG or GIF</p>
              </div>
              <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
            </label>
          )}
        </section>

        {/* Message */}
        <section className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 flex items-center gap-2">
              <MessageCircle size={12} /> Personal Message
            </label>
            <button
              onClick={generateAImessage}
              disabled={isGenerating}
              className="text-[9px] bg-neutral-900 text-white px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 hover:bg-neutral-800 transition-all disabled:opacity-50"
            >
              <Wand2 size={10} className={isGenerating ? "animate-spin" : ""} />
              {isGenerating ? "CRAFTING..." : "AI ASSIST"}
            </button>
          </div>
          <textarea
            value={data.message}
            onChange={(e) => onChange({ ...data, message: e.target.value })}
            className="w-full bg-neutral-50 border border-transparent rounded-xl p-4 min-h-[120px] focus:bg-white focus:ring-1 focus:ring-neutral-100 focus:border-neutral-200 outline-none transition-all text-sm leading-relaxed resize-none font-serif"
            placeholder="Write something heartfelt..."
          />
        </section>

        {/* Theme Select */}
        <section className="space-y-4">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 flex items-center gap-2">
            <Layout size={12} /> Visual Style
          </label>
          <div className="grid grid-cols-5 gap-2">
            {THEMES.map((theme) => (
              <button
                key={theme.id}
                onClick={() => onChange({ ...data, theme: theme.id, accentColor: theme.colors[0] })}
                className={`p-2.5 rounded-xl border transition-all flex flex-col items-center gap-1.5 ${
                  data.theme === theme.id ? 'border-neutral-300 bg-neutral-50 shadow-sm' : 'border-neutral-100 hover:border-neutral-200 hover:bg-neutral-50'
                }`}
              >
                <div className="flex gap-0.5">
                  {theme.colors.map(c => (
                    <div key={c} className="w-2 h-2 rounded-full ring-1 ring-black/5" style={{ backgroundColor: c }} />
                  ))}
                </div>
                <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-tighter">{theme.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Fonts */}
        <section className="space-y-4">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 flex items-center gap-2">
            <Type size={12} /> Typography
          </label>
          <div className="flex flex-wrap gap-2">
            {fonts.map((f) => (
              <button
                key={f.id}
                onClick={() => onChange({ ...data, fontFamily: f.id })}
                className={`px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all border ${
                  data.fontFamily === f.id
                    ? 'bg-neutral-900 text-white border-neutral-900'
                    : 'bg-white text-neutral-500 border-neutral-100 hover:border-neutral-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="p-6 bg-neutral-50/50 border-t border-neutral-100">
        <button
          onClick={() => {
             window.scrollTo({ top: 0, behavior: 'smooth' });
             setTimeout(() => {
               (window as any).setIsFinished?.(true);
             }, 300);
          }}
          className="w-full bg-neutral-900 text-white py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-neutral-800 transition-all shadow-lg shadow-neutral-900/10 uppercase tracking-[0.1em]"
        >
          Preview Final Result
          <Sparkles size={16} />
        </button>
      </div>
    </div>
  );
}
