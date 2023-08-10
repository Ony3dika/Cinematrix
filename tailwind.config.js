/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#fefefe",
        sub: "#3370e9",
        primaryDark: "#0d1017",
        txt:"#1f2125",
        purple: "#a246f5",
      },
    },
  },
  plugins: [],
};

