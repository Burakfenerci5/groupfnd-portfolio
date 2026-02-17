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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-border": "glow-border 3s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
      },
      keyframes: {
        "glow-border": {
          "0%, 100%": {
            boxShadow:
              "0 0 15px rgba(56,189,248,0.3), 0 0 40px rgba(56,189,248,0.1), inset 0 0 15px rgba(56,189,248,0.05)",
          },
          "50%": {
            boxShadow:
              "0 0 25px rgba(56,189,248,0.5), 0 0 60px rgba(56,189,248,0.2), inset 0 0 25px rgba(56,189,248,0.1)",
          },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
