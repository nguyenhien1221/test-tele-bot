import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'selector',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '375px',
        main: '1440px',
      },
      fontFamily: {
        scp: ['var(--font-scp)'],
        tomorrow: ['var(--font-tomorrow)'],
      },
    },
  },
  plugins: [],
  important: true,
};
export default config;
