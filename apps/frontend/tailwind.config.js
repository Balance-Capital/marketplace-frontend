/** @type {import('tailwindcss').Config} */

const { join } = require('path');
module.exports = {
  content: [
    join(__dirname, './pages/**/*.{js,ts,jsx,tsx}'),
    join(__dirname, './components/**/*.{js,ts,jsx,tsx}'),
    join(
      __dirname,
      '../../libs/generic-shared/components/**/*.{js,ts,jsx,tsx}'
    ),
  ],
  theme: {
    extend: {
      backgroundImage: {
        headerDesktop: `url('${process.env.IMAGE_HOST_CDN}/assets/images/png/header-bg.png')`,
        headerMobile: `url('${process.env.IMAGE_HOST_CDN}/assets/images/png/header-bg-mob.png')`,
        homeBanner: `url('${process.env.IMAGE_HOST_CDN}/assets/images/png/banner-bg.png')`,
        bannerDesktop: `url('${process.env.IMAGE_HOST_CDN}/assets/images/png/banner.png')`,
        bannerMobile: `url('${process.env.IMAGE_HOST_CDN}/assets/images/png/banner-mobile.png')`,
        copyModal: `url('${process.env.IMAGE_HOST_CDN}/assets/images/png/bg-copy-modal.png')`,
      },
      boxShadow: {
        '3xl': '0 0 50px 3px rgba(148,145,163,0.2)',
      },
      colors: {
        primary: '#6563FF',
        secondary: '#74849D',
      },
      screens: {
        sm: '350px',
        '1xl': '1535px',
        '2xl': '1920px',
      },
      fontFamily: {
        PPNeueMachina: ['PPNeueMachina', 'sans-serif'],
        InterBlack: ['InterBlack', 'sans-serif'],
        InterBold: ['InterBold', 'sans-serif'],
        InterExtraBold: ['InterExtraBold', 'sans-serif'],
        InterExtraLight: ['InterExtraLight', 'sans-serif'],
        InterLight: ['InterLight', 'sans-serif'],
        InterMedium: ['InterMedium', 'sans-serif'],
        InterRegular: ['InterRegular', 'sans-serif'],
        InterSemiBold: ['InterSemiBold', 'sans-serif'],
        InterThin: ['InterThin', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
