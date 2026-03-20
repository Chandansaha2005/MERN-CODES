/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#faf8f6',
          100: '#f7f4f0',
          200: '#eee7dc',
          300: '#e5dcc6',
          400: '#dccfb0',
          500: '#d3c29a',
          600: '#bea97a',
          700: '#a68f5a',
          800: '#8e753a',
          900: '#765b1a',
        },
        secondary: {
          50: '#f0f6ff',
          100: '#d4e5ff',
          200: '#a8ccff',
          300: '#7ca8e6',
          400: '#6082b6',
          500: '#4a5fa6',
          600: '#3d4fa0',
          700: '#324099',
          800: '#253092',
          900: '#1a208b',
        }
      }
    },
  },
  plugins: [],
}
