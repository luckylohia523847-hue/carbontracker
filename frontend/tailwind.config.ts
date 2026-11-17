import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        carbon: {
          50: '#f3faf5',
          100: '#dff7e6',
          200: '#bfeed4',
          300: '#8ed7a6',
          400: '#5ebc7d',
          500: '#3da267',
          700: '#1f5135',
          900: '#102b1e',
        },
      },
      boxShadow: {
        soft: '0 16px 40px rgba(16, 43, 30, 0.12)',
      },
    },
  },
  plugins: [],
};

export default config;
