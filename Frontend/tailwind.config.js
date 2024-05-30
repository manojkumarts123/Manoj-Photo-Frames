/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'red': {
        '50': '#fff1f1',
        '100': '#ffe0e0',
        '200': '#ffc7c7',
        '300': '#ffa0a0',
        '400': '#ff6a6a',
        '500': '#f83b3b',
        '600': '#e61e1e',
        '700': '#c11414',
        '800': '#a01414',
        '900': '#841818',
        '950': '#480707',
      },
      'yellow': {
        '50': '#ffffea',
        '100': '#fffbc5',
        '200': '#fff885',
        '300': '#ffed46',
        '400': '#ffde1b',
        '500': '#ffc005',
        '600': '#e29300',
        '700': '#bb6802',
        '800': '#985008',
        '900': '#7c420b',
        '950': '#482200',
      },
      'lightyellow': {
        '50': '#fdffe7',
        '100': '#faffc1',
        '200': '#f9ff86',
        '300': '#feff41',
        '400': '#fff50d',
        '500': '#fbe300',
        '600': '#d1ab00',
        '700': '#a67b02',
        '800': '#89600a',
        '900': '#744e0f',
        '950': '#442904',
      },
      grey: colors.grey
    },
    extend: {
      
    },
  },
  plugins: [],
}

