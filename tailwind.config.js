/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#1a1a1a',     // глубокий чёрный
        secondary: '#4a4a4a',   // мягкий тёмно-серый
        accent: '#D4AF37',      // золотистый акцент
        background: '#f5f5f5',  // светлый фон
        muted: '#888888',       // приглушённый серый
        light: '#ffffff',       // белый
        dark: '#121212',        // почти чёрный для dark mode
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        luxury: "0 4px 20px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
}
