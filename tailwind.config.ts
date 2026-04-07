import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '"Noto Sans SC"', 'system-ui', 'sans-serif'],
        serif: ['"Noto Serif SC"', '"Source Serif Pro"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      colors: {
        background: '#ffffff',
        surface: '#fcfcfc',
        'surface-hover': '#f5f5f5',
        primary: {
          DEFAULT: '#800000', // Deep Academy Red
          hover: '#660000',
          light: '#fff1f1',
          dark: '#4a0000',
        },
        secondary: {
          DEFAULT: '#37352f', // Neutral for text/secondary
          hover: '#000000',
        },
        accent: {
          orange: '#d9730d',
          yellow: '#dfab01',
          green: '#0f7b6c',
          blue: '#1a5fb4', // More classic blue
          purple: '#6940a5',
          pink: '#ad1a72',
          red: '#800000',
        },
        text: {
          main: '#1a1a1a', // Slightly darker for academic reading
          muted: '#595959',
          light: '#8c8c8c',
        },
        border: {
          DEFAULT: '#e5e5e5',
          dark: '#b3b3b3',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.3s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      typography: ({ theme }: { theme: (path: string) => string }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.text.main'),
            '--tw-prose-headings': theme('colors.primary.DEFAULT'), // Headings in Deep Red
            '--tw-prose-lead': theme('colors.text.muted'),
            '--tw-prose-links': theme('colors.primary.DEFAULT'),
            '--tw-prose-bold': theme('colors.text.main'),
            '--tw-prose-counters': theme('colors.text.muted'),
            '--tw-prose-bullets': theme('colors.primary.DEFAULT'),
            '--tw-prose-hr': theme('colors.border.DEFAULT'),
            '--tw-prose-quotes': theme('colors.text.main'),
            '--tw-prose-quote-borders': theme('colors.primary.DEFAULT'),
            '--tw-prose-captions': theme('colors.text.muted'),
            '--tw-prose-code': theme('colors.primary.DEFAULT'),
            '--tw-prose-pre-code': theme('colors.text.main'),
            '--tw-prose-pre-bg': theme('colors.surface'),
            '--tw-prose-th-borders': theme('colors.border.DEFAULT'),
            '--tw-prose-td-borders': theme('colors.border.DEFAULT'),
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;
