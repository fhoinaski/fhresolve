/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    'dark:bg-opacity-10',
    'dark:border-opacity-20',
    'dark:bg-[var(--color-neutral)]',
    'dark:border-[var(--color-neutral)]'
  ],
  theme: {
    extend: {
      fontFamily: {
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
      },
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        neutral: 'var(--color-neutral)',
        'text-color': 'var(--color-text)',
        dark: 'var(--color-dark)',
        light: 'var(--color-light)',
        gray: 'var(--color-gray)',
        paralel: 'var(--color-paralel)',
        'accent-dark': 'var(--color-accent-dark)',
        // Novas cores da paleta
        black: '#252525',
        'gray-medium': '#8D9192',
        'light-gray': '#EDEDED',
        white: '#FFFFFF',
        teal: '#2B8D9A',
        accent: {
          DEFAULT: 'var(--color-accent)',
          20: 'rgba(var(--color-accent-rgb), 0.2)', // Adiciona suporte explícito
        },
      },
      borderColor: {
        'neutral-30': 'rgba(var(--color-neutral-rgb), 0.3)',
        'accent-20': 'rgba(var(--color-accent-rgb), 0.2)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      transitionProperty: {
        'width': 'width',
        'height': 'height',
        'spacing': 'margin, padding',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'inner-sm': 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'custom-sm': 'var(--shadow-sm)',
        'custom-md': 'var(--shadow-md)',
        'custom-lg': 'var(--shadow-lg)',
        'custom-xl': 'var(--shadow-xl)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
};