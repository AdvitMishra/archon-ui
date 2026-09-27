import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],

  theme: {
    extend: {
      colors: {
        // Your custom palette
        text: '#0c1005',
        background: '#f8fcf3',
        primary: '#4d295f',
        secondary: '#90aedf',
        accent: '#190c31',

        // Keep existing zinc colors
        zinc: {
          950: '#09090B',
          900: '#18181B',
        },
      },

      fontFamily: {
        sans: [
          'var(--font-inter)',
          'var(--font-plus-jakarta)',
          'system-ui',
          'sans-serif',
        ],

        mono: [
          'var(--font-jetbrains)',
          'monospace',
        ],
      },
    },
  },

  plugins: [],
};

export default config;
