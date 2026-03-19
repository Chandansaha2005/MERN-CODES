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
          50: '#faf8f3',
          100: '#f5f1e8',
          200: '#ede6d9',
          300: '#e0d4c1',
          400: '#d4c9b9',
          500: '#c9c0b3',
          600: '#a89a8d',
          700: '#8b7a6f',
          800: '#6e6059',
          900: '#54483f',
        },
        accent: {
          50: '#fef5f1',
          100: '#fed9cd',
          200: '#fcb39e',
          300: '#fb8d6f',
          400: '#f9674d',
          500: '#f74d28',
          600: '#de3d1f',
          700: '#c53318',
          800: '#a82914',
          900: '#8b1f0d',
        }
      }
    },
  },
  plugins: [],
}
