import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
      },
      colors: {
        neon: {
          mint: "#00FFB3",
          cyan: "#4BE1EC",
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        blob: "blob 7s infinite",
        "gradient-x": "gradient-x 3s ease infinite",
        "shine": "shine 2.5s infinite linear",
        "bounce-slow": "bounce-slow 3s infinite",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center"
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center"
          }
        },
        shine: {
          "0%": { left: "-100%" },
          "20%": { left: "100%" },
          "100%": { left: "100%" }
        },
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15%)" }
        },
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;

