import { join } from 'path'
require('dotenv').config()
const { API_URL, head, HOST, HTTP_ENDPOINT, WS_ENDPOINT } = require('./config')
const PROXY = process.env.API_URL || API_URL

export default {
  mode: 'spa',
  head,
  // loading: "~/components/ui/Loading.vue",
  css: ['assets/css/swal.css'],
  plugins: [
    '~/plugins/filters.js',
    { src: '~/plugins/init.js', mode: 'client' },
    { src: '~/plugins/lazy.js', mode: 'client' },
    { src: '~/plugins/carousel.js', mode: 'client' },
    { src: '~/plugins/swal.js', mode: 'client' },
    { src: '~/plugins/social.js', ssr: false },
    { src: '~/plugins/scroll.js', ssr: false },
    { src: '~/plugins/vue-slider-component', mode: 'client' } // Price slider
  ],
  buildModules: ['@nuxtjs/tailwindcss'],
  modules: [
    '@nuxtjs/apollo',
    '@nuxtjs/proxy',
    [
      'vue-sweetalert2/nuxt',
      {
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
      }
    ],
    '@nuxtjs/dotenv',
    // "~/modules/routes",
    '@nuxtjs/robots',
    '@nuxtjs/font-awesome',
    '@nuxtjs/pwa',
    // "@nuxtjs/onesignal",
    '@nuxtjs/toast',
    'cookie-universal-nuxt'
  ],
  apollo: {
    // errorHandler: "~/apollo/customErrorHandler.js",
    clientConfigs: {
      default: {
        httpEndpoint: '/graphql',
        wsEndpoint: process.env.WS_ENDPOINT
      }
    },
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache'
      }
    }
  },
  toast: {
    theme: 'bubble',
    position: 'top-center',
    singleton: true
  },
  proxy: {
    '/graphql': process.env.HTTP_ENDPOINT,
    '/api/': PROXY,
    '/auth': PROXY,
    '/images': process.env.HTTP_ENDPOINT
  },
  generate: {
    dir: 'dist',
    fallback: true
  },
  build: {
    postcss: {
      plugins: {
        tailwindcss: join(__dirname, 'tailwind.config.js'),
        'postcss-pxtorem': {
          propList: ['*', '!border*']
        }
      }
    }
  }
}
