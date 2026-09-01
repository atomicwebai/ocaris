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
        sepia: {
          50: '#fbf9f4',
          100: '#f5efe0',
          200: '#ebdcc2',
          300: '#dec29f',
          800: '#433422',
          900: '#2b2115',
        },
        liturgy: {
          red: '#c0392b',
          gold: '#d4af37',
          darkRed: '#96281b',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
