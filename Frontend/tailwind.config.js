/** @type {import('tailwindcss').Config} */

import colors from 'tailwindcss/colors'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'backdrop1': "linear-gradient(to bottom right, #ffa0a080, #ffc7c780), url('/assets/images/backdrop1.jpg')"
      },
      screens: {
        mobile: '475px',
        tablet: '640px',
        laptop: '1024px',
        desktop: '1280px' 
      },
      fontFamily: {
        noto : ['"Noto Sans"', ...defaultTheme.fontFamily.sans],
        'noto-serif': ['"Noto Serif"', ...defaultTheme.fontFamily.serif],
        roboto: ['Roboto', ...defaultTheme.fontFamily.sans]
      },
      fontSize: {
        xsmall: defaultTheme.fontSize.xs,       /* 12px */
        small: defaultTheme.fontSize.sm,        /* 14px */
        normal: defaultTheme.fontSize.base,     /* 16px */
        subHeading: defaultTheme.fontSize.lg,   /* 18px */
        heading: defaultTheme.fontSize['2xl'],  /* 24px */
        xheading:defaultTheme.fontSize['3xl']   /* 30px */
      },
      colors: {
        'red': {
          '50': '#fff1f1',  /* container bg */
          '100': '#ffe0e0', /* Background */
          '200': '#ffc7c7',
          '300': '#ffa0a0', /* container border, form input border, Dialog bg */
          '400': '#ff6a6a', /* focus:form input border, Dialog border, diabled: btn bg */
          '500': '#f83b3b', /* container box-shadow, focus:form input box-shadow */
          '600': '#e61e1e', /* button bg */
          '700': '#c11414', /* hover:button, radio btn color */
          '800': '#a01414',
          '900': '#841818', /* Heading Text*/
          '950': '#480707', /* Text */
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
      boxShadow: {
        container: '0 2px 8px rgba(248, 59, 59,0.2), 0 4px 16px rgba(248, 59, 59, 0.1)',
        formfield: '0 0 10px 1px rgba(248, 59, 59, .4)',
        activeButton: '0 0 10px 1px rgba(248, 59, 59, .5)'
      }
    },
  },
  plugins: [],
}

