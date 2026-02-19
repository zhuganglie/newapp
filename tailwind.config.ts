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
        surface: '#f7f6f3',
        'surface-hover': '#efefed',
        primary: {
          DEFAULT: '#2383e2',
          hover: '#1a6dbe',
          light: '#e8f0fe',
          dark: '#155da0',
        },
        secondary: {
          DEFAULT: '#eb5757',
          hover: '#d44040',
        },
        accent: {
          orange: '#d9730d',
          yellow: '#dfab01',
          green: '#0f7b6c',
          blue: '#2383e2',
          purple: '#6940a5',
          pink: '#ad1a72',
        },
        text: {
          main: '#37352f',
          muted: '#787774',
          light: '#9b9a97',
        },
        border: {
          DEFAULT: '#e9e9e7',
          dark: '#d3d3d0',
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
            '--tw-prose-headings': theme('colors.text.main'),
            '--tw-prose-lead': theme('colors.text.muted'),
            '--tw-prose-links': theme('colors.primary.DEFAULT'),
            '--tw-prose-bold': theme('colors.text.main'),
            '--tw-prose-counters': theme('colors.text.muted'),
            '--tw-prose-bullets': theme('colors.text.light'),
            '--tw-prose-hr': theme('colors.border.DEFAULT'),
            '--tw-prose-quotes': theme('colors.text.main'),
            '--tw-prose-quote-borders': theme('colors.border.dark'),
            '--tw-prose-captions': theme('colors.text.muted'),
            '--tw-prose-code': theme('colors.secondary.DEFAULT'),
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
