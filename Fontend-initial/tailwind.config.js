/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#C9748A",
        secondary: "#A78BCA",
        background: "#FAF7F2",
        card: "#FFFFFF",
        "text-primary": "#2D2D2D",
        "text-secondary": "#7A7A8A",
        "border-color": "#EDE8F0",
      },
      borderRadius: {
        'card': '16px',
        'input': '8px',
      },
      boxShadow: {
        'soft-lavender': '0 4px 20px -2px rgba(167, 139, 202, 0.15)',
        'modal': '0 20px 40px -10px rgba(45, 45, 45, 0.15)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'modal-slide-up': {
          '0%': { transform: 'translateY(20px) scale(0.98)', opacity: '0' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
        }
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease-out',
        'modal-slide-up': 'modal-slide-up 0.3s ease-out',
      }
    },
  },
  plugins: [],
}
