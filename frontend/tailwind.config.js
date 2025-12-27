/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Deep orange theme palette
        brand: {
          50: "#fff7ed",
          100: "#ffedd5",
          500: "#f97316", // Primary Orange
          600: "#ea580c",
          900: "#7c2d12",
        },
      },
    },
  },
  plugins: [],
};
