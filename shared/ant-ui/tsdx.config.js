/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const postcss = require('rollup-plugin-postcss');

module.exports = {
  rollup(config) {
    config.plugins.push(
      postcss({
        extract: path.resolve('dist/ant_ui_compiled.css'),
      }),
    );
    return config;
  },
};
