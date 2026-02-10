/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
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
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
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
        warm: {
          beige: '#d6bfa6',
          'beige-dark': '#c6b1a0',
        },
        charcoal: {
          DEFAULT: '#2a2a2a',
          light: '#3a3a3a',
        },
        midnight: {
          DEFAULT: '#1a1a2e',
          dark: '#151525',
        },
        gold: {
          DEFAULT: '#c9a961',
          light: '#e8d4a0', // This matches the cream/light gold color in the logo
        },
        cream: '#e8d4a0', // Alias for convenience
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body: ['Lato', 'sans-serif'],
        amita: ['Amita', 'cursive'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        'soft': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'soft-lg': '0 8px 40px rgba(0, 0, 0, 0.12)',
        'glow': '0 0 30px rgba(214, 191, 166, 0.4)',
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
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "breathe": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        "ken-burns": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.1)" },
        },
        "sound-wave": {
          "0%": { transform: "scale(0)", opacity: "0.6" },
          "100%": { transform: "scale(2.5)", opacity: "0" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(214, 191, 166, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(214, 191, 166, 0.6)" },
        },
        "fade-in-up": {
          "from": { opacity: "0", transform: "translateY(30px)" },
          "to": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          "from": { opacity: "0", transform: "translateX(-50px)" },
          "to": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          "from": { opacity: "0", transform: "translateX(50px)" },
          "to": { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "float": "float 6s ease-in-out infinite",
        "breathe": "breathe 8s ease-in-out infinite",
        "ken-burns": "ken-burns 20s ease-in-out infinite alternate",
        "sound-wave": "sound-wave 3s ease-out infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "slide-in-left": "slide-in-left 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        "slide-in-right": "slide-in-right 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards",
      },
      transitionTimingFunction: {
        'ambient': 'cubic-bezier(0.23, 1, 0.32, 1)',
        'breathe': 'cubic-bezier(0.45, 0, 0.55, 1)',
        'flow': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'dramatic': 'cubic-bezier(0.87, 0, 0.13, 1)',
        'elastic': 'cubic-bezier(0.68, -0.15, 0.265, 1.15)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
