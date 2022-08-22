/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      'aboreto': ['Aboreto', 'cursive'],
      'monty': ['Montserrat', 'sans-serif'],
    },
    extend: {
      colors: {
        'primary': '#6C63FF',
        'secondary': '#FF589B',
        'light': '#F5EBFF',
        'dark': '#484554',
      },
      backgroundColor: {
        'primary': '#6C63FF',
        'secondary': '#FF589B',
        'light': '#F5EBFF',
        'dark': '#484554',
      },
      textColor: {
        'primary': '#6C63FF',
        'secondary': '#FF589B',
        'light': '#F5EBFF',
        'dark': '#484554',
      },
      width: {
        100: '100px',
        200: '200px',
        300: '300px',
        400: '400px',
        500: '500px',
        600: '600px',
        700: '700px',
      },
      height: {
        100: '100px',
        200: '200px',
        300: '300px',
        400: '400px',
        500: '500px',
        600: '600px',
        700: '700px',
      },
      borderWidth: {
        1: '1px',
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