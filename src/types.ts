export type CardTheme = 'classic' | 'modern' | 'playful' | 'elegant' | 'minimal';

export interface CardData {
  recipientName: string;
  senderName: string;
  age?: number;
  message: string;
  theme: CardTheme;
  accentColor: string;
  fontFamily: 'font-serif' | 'font-sans' | 'font-display';
  imageUrl?: string;
}
