/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [],
  order: {
    default: ["responsive", "group-hover", "focus", "hover", "active", "group"],
  },
};
