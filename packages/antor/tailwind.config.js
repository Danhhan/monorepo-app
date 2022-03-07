const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    container: {
      center: true,
    },
    colors: {
      primary: '#00C081',
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
