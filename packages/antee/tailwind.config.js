const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: process.env.NODE_ENV === 'production' && [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    container: {
      center: true,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    // eslint-disable-next-line func-names
    plugin(function ({ addBase }) {
      addBase({
        img: { borderStyle: 'none' },
      });
    }),
  ],
};
