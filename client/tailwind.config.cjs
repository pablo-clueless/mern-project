/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      'grotesk': ['Space Grotesk', 'sans-serif'],
      'inter': ['Inter', 'sans-serif'],
    },
    extend: {
      colors: {
        'primary': '#6C63FF',
      },
      backgroundColor: {
        'primary': '#6C63FF',
      },
      textColor: {
        'primary': '#6C63FF',
      },
      width: {
        100: '100px',
        150: '150px',
        200: '200px',
        250: '250px',
        300: '300px',
        400: '400px',
        500: '500px',
        600: '600px',
        700: '700px',
        800: '800px',
        900: '900px',
        90: '90%',
        95: '95%',
        98: '98%',
      },
      height: {
        100: '100px',
        150: '150px',
        200: '200px',
        300: '300px',
        400: '400px',
        450: '450px',
        500: '500px',
        600: '600px',
        700: '700px',
        90: '90%',
        95: '95%',
        98: '98%',
      },
      borderWidth: {
        'thin': '0.5px',
      },
      borderColor: {
        'primary': '#6C63FF',
        'secondary': '#FF589B',
        'light': '#F5EBFF',
        'dark': '#484554',
      },
      backgroundImage: {
        'welcome': "url('./src/assets/images/welcome.svg')",
        'login': "url('./src/assets/images/login.svg')",
        'pw-reset': "url('./src/assets/images/forgotten-password.svg')",
      }
    },
  },
  plugins: [],
}