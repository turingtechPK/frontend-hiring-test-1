/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46F8',
        login: '#448ef7',
        bg1: '#f3eeee'
      },
      fontFamily: {
        avenirblack: ['AvenirLTStd-Black', 'Helvetica', 'Arial', 'sans-serif'],
        avenirbook: ['AvenirLTStd-Book', 'Helvetica', 'Arial', 'sans-serif'],
        avenirroman: ['AvenirLTStd-Roman', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}