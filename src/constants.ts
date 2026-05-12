import { CardData, CardTheme } from './types';

export const THEMES: { id: CardTheme; label: string; colors: string[] }[] = [
  { id: 'classic', label: 'Classic', colors: ['#D94E4E', '#C5A059', '#1A1A1A'] },
  { id: 'modern', label: 'Vibrant', colors: ['#6366F1', '#EC4899', '#8B5CF6'] },
  { id: 'playful', label: 'Sweet', colors: ['#F472B6', '#FBBF24', '#FB923C'] },
  { id: 'elegant', label: 'Noir', colors: ['#000000', '#D4AF37', '#333333'] },
  { id: 'minimal', label: 'Zen', colors: ['#64748B', '#94A3B8', '#CBD5E1'] },
];

export const TEMPLATES: { id: string; label: string; data: Partial<CardData> }[] = [
  {
    id: 'elegant-gold',
    label: 'Elegant Gold',
    data: {
      theme: 'elegant',
      accentColor: '#D4AF37',
      fontFamily: 'font-display',
      message: 'Selamat ulang tahun! Semoga harimu penuh pesona dan keanggunan, seindah setiap langkahmu menyongsong masa depan.',
    }
  },
  {
    id: 'modern-vibrant',
    label: 'Vibrant Party',
    data: {
      theme: 'modern',
      accentColor: '#6366F1',
      fontFamily: 'font-sans',
      message: 'Happy Birthday! 🎉 Mari rayakan hari ini dengan semangat dan kreativitas yang tak terbatas. Teruslah menginspirasi!',
    }
  },
  {
    id: 'classic-warm',
    label: 'Classic warmth',
    data: {
      theme: 'classic',
      accentColor: '#D94E4E',
      fontFamily: 'font-serif',
      message: 'Barakallah fii umrik. Semoga keberkahan dan kebahagiaan selalu menyertai setiap langkahmu di tahun yang baru ini.',
    }
  },
  {
    id: 'playful-sweet',
    label: 'Sweet Candy',
    data: {
      theme: 'playful',
      accentColor: '#F472B6',
      fontFamily: 'font-sans',
      message: 'HBD! 🎂 Semoga harimu semanis kue ini dan seceria warna-warni pelangi. Menjadi dewasa itu seru, dinikmati ya!',
    }
  },
  {
    id: 'minimal-zen',
    label: 'Minimalist',
    data: {
      theme: 'minimal',
      accentColor: '#64748B',
      fontFamily: 'font-sans',
      message: 'Sederhana namun bermakna. Selamat ulang tahun, semoga kedamaian selalu menyelimuti setiap hari dalam hidupmu.',
    }
  }
];
export const INITIAL_CARD_DATA: CardData = {
  recipientName: 'Aini',
  senderName: 'Temanmu',
  age: 25,
  message: 'Semoga di hari spesial ini, semua impianmu menjadi kenyataan. Teruslah bersinar dan jangan pernah berhenti mengejar mimpimu!',
  theme: 'classic',
  accentColor: '#d94e4e',
  fontFamily: 'font-display',
};
