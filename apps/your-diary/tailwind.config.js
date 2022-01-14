const { createGlobPatternsForDependencies } = require('@nrwl/next/tailwind');

module.exports = {
  content: [
    './apps/your-diary/pages/**/*.{js,tsx,jsx,ts}',
    './apps/your-diary/components/**/*.{js,tsx,jsx,ts}',
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
