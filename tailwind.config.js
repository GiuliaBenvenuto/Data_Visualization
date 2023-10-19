/** @type {import('tailwindcss').Config} */
config.colors = require('tailwindcss/colors')

module.exports = {
  content: ["./public/**/*.{html,js,css}"],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#ffffff',
        'neon_blue': '#2667FF',
        'chrysler_blue': '#3B28CC',
        
        'sky': {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
    },
  plugins: [],
  }
}
