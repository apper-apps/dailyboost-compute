/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B6B',
        secondary: '#4ECDC4',
        accent: '#FFE66D',
        success: '#51CF66',
        warning: '#FFD93D',
        error: '#FF6B9D',
        info: '#339AF0',
        surface: '#FFFFFF',
        background: '#F7F9FC',
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'sunrise-gradient': 'linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)',
        'teal-gradient': 'linear-gradient(135deg, #4ECDC4 0%, #51CF66 100%)',
        'coral-gradient': 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)',
        'pro-gradient': 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #FFE66D 100%)',
      },
      animation: {
        'quote-flip': 'flipIn 0.8s ease-out',
        'success-check': 'checkmark 0.6s ease-in-out',
      },
      keyframes: {
        flipIn: {
          '0%': { transform: 'rotateY(-90deg)', opacity: '0' },
          '50%': { transform: 'rotateY(0deg)', opacity: '0.8' },
          '100%': { transform: 'rotateY(0deg)', opacity: '1' },
        },
        checkmark: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '50%': { transform: 'scale(1.2)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}