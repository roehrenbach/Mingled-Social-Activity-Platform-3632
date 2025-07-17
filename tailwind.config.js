/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'questrial': ['Questrial', 'sans-serif'],
      },
      backgroundImage: {
        'mingled-gradient': 'linear-gradient(135deg, #8BDAE7 0%, #A9FF90 100%)',
      },
      colors: {
        'mingled': {
          'cyan': '#8BDAE7',
          'green': '#A9FF90',
        }
      }
    },
  },
  plugins: [],
}