/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {},
      fontFamily: {
        system: "Inconsolata",
        text: "inconsolata",
        title: "Newsreader",
        inter: "Inter",
      },
      colors: {
        secondary: "#979797",
        black: "#000000",
        text: "#F7F7F7",
        bg: "#161616",
        white: "#ffffff",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
