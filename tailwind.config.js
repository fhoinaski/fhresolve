/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif'],
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
        paralel: 'var(--color-paralel)',
      },
    },
  },
  plugins: [],
};