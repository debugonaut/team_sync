/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#0D0D0D',
        'electric-blue': '#00BFFF',
        'neon-purple': '#8A2BE2',
        'neon-teal': '#00E5A0',
        'dark-gray': '#1A1A1A',
        'medium-gray': '#2A2A2A'
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'space': ['Space Grotesk', 'sans-serif']
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '24px'
      },
      boxShadow: {
        'neon-blue': '0 0 20px rgba(0, 191, 255, 0.3)',
        'neon-purple': '0 0 20px rgba(138, 43, 226, 0.3)',
        'neon-teal': '0 0 20px rgba(0, 229, 160, 0.3)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
      },
      backdropBlur: {
        'glass': '10px'
      }
    },
  },
  plugins: [],
}