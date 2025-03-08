/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
      },
      colors: {
        primary: 'var(--color-primary)',
        accent: 'var(--color-accent)',
        secondary: 'var(--color-secondary)',
        neutral: 'var(--color-neutral)',
        'text-color': 'var(--color-text)',
        dark: 'var(--color-dark)',
        light: 'var(--color-light)',
        gray: 'var(--color-gray)',
        paralel: 'var(--color-paralel)', // Nota: Verifique se essa variável existe no index.css
      },
      borderColor: {
        // Adicionando suporte para bordas personalizadas com variáveis CSS e opacidade
        'neutral-30': 'rgba(var(--color-neutral-rgb), 0.3)',
        'accent-20': 'rgba(var(--color-accent-rgb), 0.2)', // Para .card-hover
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
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
      },
    },
  },
  plugins: [],
};