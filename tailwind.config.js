/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        blue: {
          light: "#5B9BD5",
          DEFAULT: "#0078D7",
          dark: "#004C87",
        },
        green: {
          light: "#A9D18E",
          DEFAULT: "#70AD47",
          dark: "#44723F",
        },
        gray: {
          light: "#D6D6D6",
          DEFAULT: "#808080",
          dark: "#404040",
        },
        red: {
          light: "#F4CCCC",
          DEFAULT: "#FF0000",
          dark: "#990000",
        },
      },
    },
  },
  plugins: [],
};
