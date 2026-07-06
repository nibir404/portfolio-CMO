import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Pure B&W — black ink, white paper. No greys, no creams, no golds.
        ink: {
          DEFAULT: "#0A0A0A",
          50: "#0A0A0A",
          100: "#0A0A0A",
          200: "#0A0A0A",
          300: "#0A0A0A",
          400: "#0A0A0A",
        },
        paper: {
          DEFAULT: "#FFFFFF",
          50: "#FFFFFF",
          100: "#FFFFFF",
          200: "#FFFFFF",
        },
      },
      fontFamily: {
        // Display = SF Pro on macOS/iOS, then Helvetica Neue, Helvetica,
        // Arial, generic sans. Same stack Apple itself uses.
        display: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Display"',
          '"SF Pro"',
          '"Helvetica Neue"',
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        body: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
        quote: ["var(--font-quote)", "Cormorant Garamond", "serif"],
      },
      fontSize: {
        // Display Headlines: 100px-180px
        mega: ["clamp(4rem, 12vw, 11rem)", { lineHeight: "0.95", letterSpacing: "-0.04em" }],
        hero: ["clamp(3rem, 8vw, 7rem)", { lineHeight: "1", letterSpacing: "-0.03em" }],
        // Section Headlines: 60px-90px
        section: ["clamp(2.5rem, 5.5vw, 5.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
      },
      letterSpacing: {
        tightest: "-0.05em",
        widest2: "0.3em",
      },
      animation: {
        "fade-up": "fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slow-zoom": "slowZoom 20s ease-in-out infinite alternate",
        marquee: "marquee 30s linear infinite",
        grain: "grain 8s steps(10) infinite",
        "blink": "blink 1.2s steps(2) infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slowZoom: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.08)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "20%": { transform: "translate(-15%, 5%)" },
          "30%": { transform: "translate(7%, -25%)" },
          "40%": { transform: "translate(-5%, 25%)" },
          "50%": { transform: "translate(-15%, 10%)" },
          "60%": { transform: "translate(15%, 0%)" },
          "70%": { transform: "translate(0%, 15%)" },
          "80%": { transform: "translate(3%, 35%)" },
          "90%": { transform: "translate(-10%, 10%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;