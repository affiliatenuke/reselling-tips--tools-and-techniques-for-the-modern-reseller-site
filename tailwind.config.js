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
        primary: '#f59e0b',
        secondary: '#2563eb',
        accent: '#64748b',
      },
      fontFamily: {
        heading: ['Lora', 'Georgia', 'serif'],
        body: ['Open Sans', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
