/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'bounce-slow': 'bounce 4s infinite',
        type: 'type 2.7s ease-out .8s infinite alternate both',
        'type-second': 'type-second 2.7s ease-out .8s infinite alternate both',
        cursor: 'cursor .6s linear infinite alternate',
        fill: 'fill .5s ease-out .0s   ',
        shake: 'shake 0.2s ease-in-out 0s 2',
      },
      keyframes: {
        type: {
          '0%': { width: '0ch' },
          '10%': { width: '2ch' },
          ' 20%': { width: '4ch' },
          ' 30%': { width: '6ch' },
          ' 40%': { width: '8ch' },
          ' 50%': { width: '10ch' },
          ' 60%': { width: '12ch' },
          ' 70%': { width: '14ch' },
          ' 80%': { width: '16ch' },
          ' 90%,100%': { width: '17ch' },
        },
        'type-second': {
          '0%': { width: '0ch' },
          '10%': { width: '2ch' },
          ' 20%': { width: '4ch' },
          ' 30%': { width: '6ch' },
          ' 40%': { width: '8ch' },
          ' 50%': { width: '10ch' },
          ' 60%': { width: '12ch' },
          ' 70%': { width: '14ch' },
          ' 80%': { width: '16ch' },
          ' 90%,100%': { width: '17ch' },
        },
        cursor: {
          '0%': { opacity: '0' },

          ' 30%': { opacity: '1' },

          ' 60%': { opacity: '0' },

          ' 90%': { opacity: '1' },
        },
        fill: {
          '0%': { width: '0' },
          // '10%': { width: '10%' },
          // '100%': { width: '100%' },
        },
        shake: {
          '0%': { marginLeft: '0rem' },
          '25%': { marginLeft: '1rem' },
          '75%': { marginLeft: '-1rem' },
          '100%': { marginLeft: '0rem' },
        },
      },
    },
  },
  plugins: [require('prettier-plugin-tailwindcss')],
};
