import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-plus-jakarta' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' });

export const metadata: Metadata = {
  title: {
    default: 'Archon UI - Natural Language Web Component Synthesizer',
    template: '%s | Archon UI',
  },
  description:
    'Describe a web component in plain English or by voice. Archon UI generates production-ready React and Tailwind CSS code, renders it in a live sandbox, and scores the design in plain language.',
  keywords: ['React component generator', 'Tailwind CSS', 'AI UI builder', 'voice to code'],
  icons: { icon: '/icon.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen bg-zinc-950 font-sans text-zinc-200 antialiased">
        {children}
      </body>
    </html>
  );
}
