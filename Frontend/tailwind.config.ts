
import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#14b8a6",
        surface: "#ffffff",
        bg: "#eef1f4",
        text: "#0f2027",
        muted: "#64748b",
        disabled: "#d1d5db",
        accent: "#0d9488",
      },
      boxShadow: {
        card: "0 8px 22px rgba(15, 32, 39, 0.08)",
      },
      animation: {
        "fade-up": "fadeUp 220ms ease-out",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
