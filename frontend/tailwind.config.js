/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
     backgroundImage:{
      'image1': "url(./assets/image1.jpg)",
      'image2': "url(./assets/image2.jpg)",
      'image3': "url(./assets/image3.jpeg)"
     }
    },
  },
  plugins: [],
}

