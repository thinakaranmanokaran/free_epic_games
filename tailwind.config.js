/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        alieronbold : ['alieronbold, sans-serif'] , 
        alieronsemi : ['alieronsemi, sans-serif'] , 
        alieronheavy : ['alieronheavy, sans-serif'] , 
        alieronregular : ['alieronregular, sans-serif'] , 
        alieronlight : ['alieronlight, sans-serif'] , 
      }
    },
  },
  plugins: [],
}