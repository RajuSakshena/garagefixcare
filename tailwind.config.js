/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brandRed: "#e50914",      // Netflix-style red
        brandRedDark: "#b20710",  // Darker hover shade
      },
      // --- MARQUEE ANIMATION ADDITION ---
      animation: {
        // This is the utility class you will use in your React component: animate-marquee
        marquee: 'marquee 60s linear infinite', 
      },
      keyframes: {
        // This defines the actual movement for the marquee animation
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      // ------------------------------------
    },
  },
  plugins: [],
};