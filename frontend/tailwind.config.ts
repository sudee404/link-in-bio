/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
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
        border: {
          DEFAULT: "hsl(var(--border))",
          dark: "hsl(var(--border-dark))"
        },
      },
      borderRadius: {
        link: "9999px",
        button: "9999px",
        card: "1.5rem"
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
        toggleSlide: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "link-bounce": "bounce 0.6s ease-in-out",
        "link-fade": "fadeIn 0.3s ease-in-out",
        "theme-toggle": "toggleSlide 0.3s ease-in-out"
      },
      spacing: {
        "link-gap": "1rem",
        "section-gap": "4rem"
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}