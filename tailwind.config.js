/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./container/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0106e4",
          50: "#9EA0FF",
          100: "#8A8CFE",
          200: "#6165FE",
          300: "#383DFE",
          400: "#1015FE",
          500: "#0106E4",
          600: "#0105AC",
          700: "#010374",
          800: "#00023C",
          900: "#000005",
        },
        body: "#F3EEED",
      },
    },
  },
  important: "body",
}
