import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Dark theme colors inspired by Columbia Blue
        dark: {
          bg: "#1A1A1D",        // Very Dark Grey/Near Black
          surface: "#2C3E50",  // Dark Slate Blue
          primary: "#76C7E7",   // Brighter Blue
          secondary: "#6DB5D1", // Muted Columbia Blue
          muted: "#8EA0AA",    // Mid-tone blue-grey
          text: "#EAEAEA",     // Off-white
          textMuted: "#A9BCC6", // Lighter blue-grey
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "text-reveal": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "slide-in-left": {
          "0%": { transform: "translateX(-20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "button-glow": {
          "0%, 100%": { boxShadow: "0 0 5px rgba(118, 199, 231, 0.4)" },
          "50%": { boxShadow: "0 0 15px rgba(118, 199, 231, 0.7)" },
        },
        typing: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        blink: {
          "0%, 100%": { borderColor: "transparent" },
          "50%": { borderColor: "#EAEAEA" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        "accordion-up": "accordion-up 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        float: "float 6s cubic-bezier(0.16, 1, 0.3, 1) infinite",
        pulse: "pulse 3s cubic-bezier(0.16, 1, 0.3, 1) infinite",
        marquee: "marquee 25s linear infinite",
        "text-reveal": "text-reveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in-up": "fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scale-in": "scale-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-in-left": "slide-in-left 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-in-right": "slide-in-right 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "button-glow": "button-glow 3s cubic-bezier(0.16, 1, 0.3, 1) infinite",
        typing: "typing 3s cubic-bezier(0.16, 1, 0.3, 1)",
        "cursor-blink": "blink 0.75s step-end infinite",
      },
      fontFamily: {
        sans: ["'Rethink Sans Variable'", "system-ui", "sans-serif"],
        heading: ["'Neue Metana'", "serif"],
        outfit: ["var(--font-outfit)"],
        syne: ["var(--font-syne)"],
        thunder: ["THUNDER", "sans-serif"],
      },
      fontWeight: {
        light: '300',
        normal: '300',
        medium: '400',
        semibold: '500',
        bold: '600',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "noise-pattern": "url('/noise.png')",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
