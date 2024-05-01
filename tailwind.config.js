/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    fontSize: {
      first: '2rem'
    },
    extend: {
      backgroundColor: {
        'sky': '# błę7f2', // Replace with your desired hex code
        'dark-green': '#204020',
      },
      fontSize: {
        '2x': '2rem' 
      }
    },
  },
  plugins: [],
}

