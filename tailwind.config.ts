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
        sans: ['Geist', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
      },
      colors: {
        primary: {
          DEFAULT: '#d9a705',
          hover: '#b88c04',
          light: '#e6b618',
          dark: '#947203',
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      typography: ({ theme }: { theme: (path: string) => string }) => ({
        zinc: {
          css: {
            '--tw-prose-body': theme('colors.zinc[300]'),
            '--tw-prose-headings': theme('colors.zinc[100]'),
            '--tw-prose-lead': theme('colors.zinc[300]'),
            '--tw-prose-links': theme('colors.primary.DEFAULT'),
            '--tw-prose-bold': theme('colors.zinc[100]'),
            '--tw-prose-counters': theme('colors.zinc[400]'),
            '--tw-prose-bullets': theme('colors.zinc[600]'),
            '--tw-prose-hr': theme('colors.zinc[700]'),
            '--tw-prose-quotes': theme('colors.zinc[100]'),
            '--tw-prose-quote-borders': theme('colors.zinc[700]'),
            '--tw-prose-captions': theme('colors.zinc[400]'),
            '--tw-prose-code': theme('colors.zinc[100]'),
            '--tw-prose-pre-code': theme('colors.zinc[300]'),
            '--tw-prose-pre-bg': 'rgb(0 0 0 / 0.4)',
            '--tw-prose-th-borders': theme('colors.zinc[600]'),
            '--tw-prose-td-borders': theme('colors.zinc[700]'),
          },
        },
      }),
      spacing: {
        '1.45rem': '1.45rem',
      },
    },
  },
  plugins: [typography],
};

export default config;
