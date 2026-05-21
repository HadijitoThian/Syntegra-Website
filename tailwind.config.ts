import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          navy: "#1e3a8a",
          royal: "#2563eb",
          sky: "#38bdf8",
          ink: "#0f172a",
          mist: "#f8fafc",
          amber: "#fbbf24",
        },
        product: {
          social: "#2563eb",
          pos: "#0d9488",
          synthia: "#0f172a",
        },
      },
      boxShadow: {
        soft: "0 10px 40px -10px rgba(15, 23, 42, 0.1)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
