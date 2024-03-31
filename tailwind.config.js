/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base1: '#354899',
        base2: '#384c9c'
      }
    }
  },
  plugins: [],
  darkMode: 'class'
}
