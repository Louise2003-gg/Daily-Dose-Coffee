/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        grand:    ['"Grand Hotel"', 'cursive'],
        lobster:  ['"Lobster"', 'cursive'],
        pacifico: ['"Pacifico"', 'cursive'],
        playfair: ['"Playfair Display"', 'serif'],
        poppins:  ['"Poppins"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

