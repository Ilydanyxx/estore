/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // управление тёмной темой через класс 'dark'
    theme: {
      extend: {
        colors: {
          primary: '#0D6EFD',
          secondary: '#6C757D',
          accent: '#198754',
          dark: '#212529',
          light: '#F8F9FA',
        },
        fontFamily: {
          sans: ['"Inter"', 'sans-serif'], // шрифт с макета
        },
      },
    },
    plugins: [],
  }
  