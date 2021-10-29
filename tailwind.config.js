module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        site: '#001E26',
        siteLite: '#003543',
        gem: '#379761',
        codeLite: '#FBFBFD'
      },
      transitionProperty: 'hover',
    },
  },
  variants: {
    extend: {
      scrollbar: ['dark', 'rounded']
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}