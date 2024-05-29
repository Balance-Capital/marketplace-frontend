/** @type {import('tailwindcss').Config} */

const { join } = require('path');
module.exports = {
  darkMode: 'class',
  content: [
    join(__dirname, './src/app/**/*.{js,ts,jsx,tsx}'),
    join(__dirname, '../content-script/src/app/**/*.{js,ts,jsx,tsx}'),
    join(
      __dirname,
      '../../../libs/generic-shared/components/**/*.{js,ts,jsx,tsx}'
    ),
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6563FF',
        secondary: '#74849D',
        success: '#37ac82',
        TxtColor: '#B1C1C9',
        colorYellow: '#EDB946',
        colorGreen: '#37AB81',
        colorRed: '#F54A6B',
        blackLight: '#171717',
        white: {
          0: '#FFF',
          50: '#FAFAFA',
          100: '#F3F3F4',
          200: '#E5E6E8',
        },
      },
      fontFamily: {
        PPNeueMachina: ['PPNeueMachina', 'sans-serif'],
        InterRegular: ['InterRegular', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
