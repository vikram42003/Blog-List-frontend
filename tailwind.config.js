/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        fredoka: ["Fredoka", "sans-serif"],
      },
      colors: {
        "electric-purple": {
          DEFAULT: "hsl(285, 100%, 70%)",
          dark: "hsl(285, 100%, 50%)",
        },
      },
    },
  },
  plugins: [],
};
