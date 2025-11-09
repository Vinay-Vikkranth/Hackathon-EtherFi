/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d7fe',
          300: '#a5bbfc',
          400: '#8194f8',
          500: '#6366f1',
          600: '#5451e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        dark: {
          900: '#0f0a1e',
          800: '#1a1333',
          700: '#251b47',
          600: '#30245c',
        }
      },
    },
  },
  plugins: [],
}
