/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // evtl. müssten in dies Zeile die selbst generierten tailwind classes
      // backgroundImage: {
      //   'custom-gradient': 'linear'
      // }
    },
  },
  plugins: [],
}

