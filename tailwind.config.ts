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
        primary: {
          DEFAULT: '#FF69B4', // Hot Pink
          light: '#FFB6C1', // Light Pink
          dark: '#DB7093', // Dark Pink
        },
        secondary: {
          DEFAULT: '#D4AF37', // Gold
          light: '#F4E4BC', // Light Gold
          dark: '#B8860B', // Dark Gold
        },
      },
    },
  },
  plugins: [],
};

export default config; 