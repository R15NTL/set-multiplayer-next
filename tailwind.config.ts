/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
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
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
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
          DEFAULT: "var(--muted)",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "hsl(var(--card-foreground))",
        },

        multiplayer: {
          DEFAULT: "hsl(var(--multiplayer))",
        },

        "single-player": {
          DEFAULT: "hsl(var(--single-player))",
        },

        settings: {
          DEFAULT: "hsl(var(--settings))",
        },

        "multiplayer-dark": "#ef4444",
        "multiplayer-mid": "#f87171",
        "multiplayer-light": "#fca5a5",

        "single-player-dark": "#9233ea",
        "single-player-mid": "#a955f7",
        "single-player-light": "#c084fc",

        "settings-dark": "#15803d",
        "settings-mid": "#16a34a",
        "settings-light": "#22c55e",
      },
      padding: {
        "header-height": "var(--header-height)",
        "page-x-padding": "1.25rem",
        "page-y-padding": "2.5rem",
      },
      margin: {
        "header-height": "var(--header-height)",
        "page-x-margin": "1.25rem",
        "page-y-margin": "2.5rem",
      },
      height: {
        "header-height": "var(--header-height)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
