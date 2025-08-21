/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
        },
      },
      dark: {
        colors: {
          primary: '#6190b8ff',
          secondary: '#1a1d22',
          accent: '#FF4081',
          error: '#FF5252',
          info: '#1694faff',
          success: '#66BB6A',
          warning: '#FFA726',
          background: '#2d3036ff',
          surface: '#1a1c20ff',
        },
      },
    },
  },
})