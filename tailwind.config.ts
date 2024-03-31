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
      fontFamily: {
        system: "Inconsolata, serif",
        text: "Inconsolata, monospace",
        title: "Newsreader, serif",
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
  plugins: [],
};
