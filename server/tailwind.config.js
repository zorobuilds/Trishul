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
        primary: {
          DEFAULT: '#14b8a6', // teal-600
          light: '#5eead4',   // teal-300
          dark: '#0f766e',    // teal-800
        },
        accent: {
          DEFAULT: '#f59e0b', // orange-500
          light: '#fdc68a',   // orange-300
          dark: '#b45309',    // orange-700
        }
      }
    },
  },
  plugins: [],
}
