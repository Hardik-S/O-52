/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto'],
      },
      colors: {
        brand: {
          cat: "#f9a8d4",
          space: "#60a5fa",
          data: "#34d399",
        },
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0px rgba(255,255,255,0.0)' },
          '50%': { boxShadow: '0 0 30px rgba(255,255,255,0.35)' },
        },
        floaty: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        unlockBurst: {
          '0%': { transform: 'scale(0.6)', opacity: 0 },
          '60%': { transform: 'scale(1.1)', opacity: 1 },
          '100%': { transform: 'scale(1)', opacity: 0 },
        },
      },
      animation: {
        pulseGlow: 'pulseGlow 2.4s ease-in-out infinite',
        floaty: 'floaty 6s ease-in-out infinite',
        unlockBurst: 'unlockBurst 900ms ease-out forwards',
      }
    },
  },
  plugins: [],
};
