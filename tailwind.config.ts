import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "purple": "#633CFF",
        "purple-hover": "#BEADFF",
        "light-purple": "#EFEBFF",
        "dark-grey": "#333333",
        "grey": "#737373",
        "borders": "#D9D9D9",
        "light-grey": "#FAFAFA",
        "red": "#FF3939",
        "github": "#1A1A1A",
        "youtube": "#EE3939",
        "linkedin": "#2D68FF",
        "codewars": "#8A1A50",
        "freecodecamp": "#302267",
      }
    },
  },
  plugins: [],
};
export default config;
