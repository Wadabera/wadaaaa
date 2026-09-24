/** @type {import('tailwindcss').Config} */

// Helper: build a color that reads from a CSS variable so the same Tailwind
// class works in both dark and light themes. The variable holds an "R G B"
// triplet, letting us still use Tailwind's /opacity modifiers.
const withVar = (name) => `rgb(var(${name}) / <alpha-value>)`;

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // ---- Brand: a single, disciplined emerald accent ----
        brand: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
          DEFAULT: "#10b981",
          glow: "#34d399",
        },

        // ---- Theme-aware surface tokens (driven by CSS vars in index.css) ----
        bg: withVar("--c-bg"),
        surface: withVar("--c-surface"),
        card: withVar("--c-card"),
        line: withVar("--c-border"),
        ink: withVar("--c-text"),
        muted: withVar("--c-muted"),

        // ---- Backwards-compatible aliases so legacy class names keep working
        //      while sections are migrated. All map to the new token set. ----
        magazine: {
          bg: withVar("--c-bg"),
          card: withVar("--c-card"),
          border: withVar("--c-border"),
          text: withVar("--c-text"),
          muted: withVar("--c-muted"),
        },
        accent: {
          // legacy accent.* now all collapse onto the brand emerald so old
          // markup renders on-palette until each component is rewritten.
          yellow: "#10b981",
          orange: "#059669",
          pink: "#34d399",
          purple: "#10b981",
          blue: "#34d399",
          green: "#10b981",
          red: "#ef4444",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Sora", "Poppins", "system-ui", "sans-serif"],
        heading: ["Sora", "Poppins", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        "float-slow": "float 12s ease-in-out infinite",
        "float-3d": "float-3d 6s ease-in-out infinite",
        glow: "glow 3s ease-in-out infinite alternate",
        "neon-glow": "neon-glow 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        gradient: "gradient 12s ease infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "spin-slow": "spin 14s linear infinite",
        "rotate-3d": "rotate-3d 20s ease-in-out infinite",
        aurora: "aurora 18s ease-in-out infinite",
        blink: "blink 1s step-end infinite",
        "fade-up": "fadeUp 0.7s ease-out both",
        morph: "morph 8s ease-in-out infinite",
        shine: "shine 1.5s ease-in-out",
        holographic: "holographic 8s ease infinite",
        "text-glow": "text-glow 2s ease-in-out infinite",
        "cyber-glitch": "cyber-glitch 0.3s ease-in-out",
        "particle-float": "particle-float 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-18px)" },
        },
        "float-3d": {
          "0%, 100%": {
            transform: "translateY(0) translateZ(0) rotateX(0) rotateY(0)",
          },
          "25%": {
            transform: "translateY(-20px) translateZ(30px) rotateX(5deg) rotateY(5deg)",
          },
          "50%": {
            transform: "translateY(-10px) translateZ(50px) rotateX(-3deg) rotateY(-3deg)",
          },
          "75%": {
            transform: "translateY(-25px) translateZ(40px) rotateX(4deg) rotateY(-4deg)",
          },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(16,185,129,0.25)" },
          "100%": { boxShadow: "0 0 45px rgba(16,185,129,0.55)" },
        },
        "neon-glow": {
          "0%, 100%": {
            boxShadow:
              "0 0 5px rgba(16, 185, 129, 0.5), 0 0 20px rgba(16, 185, 129, 0.4), 0 0 40px rgba(16, 185, 129, 0.3), 0 0 80px rgba(16, 185, 129, 0.2)",
          },
          "50%": {
            boxShadow:
              "0 0 10px rgba(16, 185, 129, 0.8), 0 0 30px rgba(16, 185, 129, 0.6), 0 0 60px rgba(16, 185, 129, 0.5), 0 0 100px rgba(16, 185, 129, 0.4)",
          },
        },
        "pulse-glow": {
          "0%, 100%": {
            filter:
              "drop-shadow(0 0 10px rgba(16, 185, 129, 0.5)) drop-shadow(0 0 20px rgba(16, 185, 129, 0.3))",
          },
          "50%": {
            filter:
              "drop-shadow(0 0 20px rgba(16, 185, 129, 0.8)) drop-shadow(0 0 40px rgba(16, 185, 129, 0.5))",
          },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "rotate-3d": {
          "0%": {
            transform: "perspective(1000px) rotateY(0deg) rotateX(0deg)",
          },
          "25%": {
            transform: "perspective(1000px) rotateY(5deg) rotateX(5deg)",
          },
          "50%": {
            transform: "perspective(1000px) rotateY(0deg) rotateX(10deg)",
          },
          "75%": {
            transform: "perspective(1000px) rotateY(-5deg) rotateX(5deg)",
          },
          "100%": {
            transform: "perspective(1000px) rotateY(0deg) rotateX(0deg)",
          },
        },
        aurora: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(6%, -4%) scale(1.1)" },
          "66%": { transform: "translate(-5%, 5%) scale(0.95)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        morph: {
          "0%, 100%": {
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          },
          "50%": {
            borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%",
          },
        },
        shine: {
          "0%": {
            transform: "translateX(-100%) translateY(-100%) rotate(45deg)",
          },
          "100%": {
            transform: "translateX(200%) translateY(200%) rotate(45deg)",
          },
        },
        holographic: {
          "0%, 100%": {
            backgroundPosition: "0% 50%",
            filter: "hue-rotate(0deg)",
          },
          "50%": {
            backgroundPosition: "100% 50%",
            filter: "hue-rotate(20deg)",
          },
        },
        "text-glow": {
          "0%, 100%": {
            textShadow:
              "0 0 10px rgba(16, 185, 129, 0.5), 0 0 20px rgba(16, 185, 129, 0.3), 0 0 30px rgba(16, 185, 129, 0.2)",
          },
          "50%": {
            textShadow:
              "0 0 20px rgba(16, 185, 129, 0.8), 0 0 40px rgba(16, 185, 129, 0.6), 0 0 60px rgba(16, 185, 129, 0.4)",
          },
        },
        "cyber-glitch": {
          "0%, 90%, 100%": {
            transform: "translate(0)",
            filter: "hue-rotate(0deg)",
          },
          "92%": {
            transform: "translate(-2px, 2px)",
            filter: "hue-rotate(90deg)",
          },
          "94%": {
            transform: "translate(2px, -2px)",
            filter: "hue-rotate(-90deg)",
          },
          "96%": {
            transform: "translate(-2px, -2px)",
            filter: "hue-rotate(45deg)",
          },
        },
        "particle-float": {
          "0%, 100%": {
            transform: "translate(0, 0)",
            opacity: "0",
          },
          "10%": {
            opacity: "1",
          },
          "90%": {
            opacity: "1",
          },
          "100%": {
            transform: "translate(100px, -100px)",
            opacity: "0",
          },
        },
      },
      backgroundSize: {
        "300%": "300% 300%",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(148,163,184,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.07) 1px, transparent 1px)",
      },
      boxShadow: {
        emerald: "0 0 24px rgba(16,185,129,0.30)",
        "emerald-lg": "0 0 60px rgba(16,185,129,0.45)",
        soft: "0 10px 40px rgba(0,0,0,0.25)",
        "soft-lg": "0 24px 70px rgba(0,0,0,0.40)",
      },
    },
  },
  plugins: [],
};
