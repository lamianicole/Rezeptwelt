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
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.label-style': {
          'display': 'block',
          'color': '#4a5568', /* text-gray-700 */
          'font-size': '0.875rem', /* text-sm */
          'font-weight': 'bold', /* font-bold */
          'margin-bottom': '0.5rem', /* mb-2 */
        },

        '.input-style': {
          'box-shadow': '0 1px 3px rgba(0, 0, 0, 0.1)', /* shadow */
          'appearance': 'none',
          'border': '1px solid #e2e8f0', /* border */
          'border-radius': '0.375rem', /* rounded */
          'width': '100%', /* w-full */
          'padding': '0.5rem 0.75rem', /* py-2 px-3 */
          'color': '#4a5568', /* text-gray-700 */
          'line-height': '1.25', /* leading-tight */
          'focus-outline': 'none',
          'focus-box-shadow': '0 0 0 3px rgba(66, 153, 225, 0.6)', 
        },
        '.btn-yellow': {
          'background-color': '#fde047', /* bg-yellow-300 */
          'padding': '0.5rem 1.25rem', /* py-2 px-5 */
          'border-radius': '0.5rem', /* rounded-2l */
          'hover-background-color': '#fb923c', /* hover:bg-orange-500 */
        },
      }, ['responsive', 'hover'])
    }
  ],
}