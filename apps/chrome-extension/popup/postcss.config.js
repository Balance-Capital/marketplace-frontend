const { join } = require('path');

module.exports = {
  plugins: {
    tailwindcss: {
      config: join(__dirname, 'tailwind.config.js'),
    },
    '@thedutchcoder/postcss-rem-to-px': { baseValue: 16 },
    autoprefixer: {},
  },
};
