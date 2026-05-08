// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-deep": "#060911",
        "bg-dark": "#0C1220",
        "bg-card": "#111927",
        "border-subtle": "#1A2540",
        "border-med": "#243050",
        "amber-glow": "#F5A623",
        "amber-dark": "#E09018",
        "cyan-bright": "#22D3EE",
        "green-bright": "#10B981",
        "purple-bright": "#A78BFA",
        "text-light": "#E2E8F0",
        "text-muted": "#64748B",
        "subtle-bg": "#1E2D42",
      },
      fontFamily: {
        syne: ["Syne", "sans-serif"],
        dm: ["DM Sans", "sans-serif"],
        "mono-custom": ["JetBrains Mono", "monospace"],
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease both",
        "grid-pulse": "gridPulse 8s ease-in-out infinite",
        "orb-float": "orbFloat 10s ease-in-out infinite",
        "float-card": "floatCard 6s ease-in-out infinite",
        "bar-grow": "barGrow 3s ease-in-out infinite",
        "pulse-dot": "pulse 2s ease-in-out infinite",
        "fade-down": "fadeDown 0.6s ease both",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeDown: {
          "0%": { opacity: "0", transform: "translateY(-12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        gridPulse: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        orbFloat: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -20px) scale(1.05)" },
          "66%": { transform: "translate(-20px, 30px) scale(0.95)" },
        },
        floatCard: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        barGrow: {
          "0%": { width: "30%" },
          "50%": { width: "85%" },
          "100%": { width: "30%" },
        },
        pulse: {
          "0%, 100%": { boxShadow: "0 0 4px #10B981" },
          "50%": { boxShadow: "0 0 12px #10B981" },
        },
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(26,37,64,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(26,37,64,0.4) 1px, transparent 1px)",
        "radial-glow": "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)",
      },
    },
  },
  plugins: [],
};