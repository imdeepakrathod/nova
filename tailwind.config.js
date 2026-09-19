/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        nova: {
          black: '#020308',
          white: '#FFFFFF',
          muted: '#9CA3AF',
          accent: '#FF4D00',
          mars: '#B54A32',
          line: 'rgba(255,255,255,0.12)',
          panel: 'rgba(255,255,255,0.045)',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        display: [
          'Satoshi',
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'Segoe UI',
          'sans-serif',
        ],
      },
      boxShadow: {
        glow: '0 0 60px rgba(255, 77, 0, 0.16)',
      },
      backgroundImage: {
        'nova-radial':
          'radial-gradient(circle at 50% 20%, rgba(255,77,0,0.12), transparent 32%)',
      },
    },
  },
  plugins: [],
};
