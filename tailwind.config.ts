/** @type {import('tailwindcss').Config} */
import { themeExtention } from "./src/theme";

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      ...themeExtention,
    },
  },
  plugins: [],
};
