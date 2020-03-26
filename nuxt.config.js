import { join } from "path";
require('dotenv').config()
const { head, LOCAL_HTTP_ENDPOINT, LOCAL_WS_ENDPOINT, REMOTE_HTTP_ENDPOINT, REMOTE_WS_ENDPOINT } = require("./config");
const { NODE_ENV = 'development' } = process.env
const IN_PROD = NODE_ENV === 'production'
const HTTP_ENDPOINT = IN_PROD ? REMOTE_HTTP_ENDPOINT : LOCAL_HTTP_ENDPOINT
const WS_ENDPOINT = IN_PROD ? REMOTE_WS_ENDPOINT : LOCAL_WS_ENDPOINT

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
    { src: '~/plugins/social.js', mode: "client" },
    { src: '~/plugins/scroll.js', mode: "client" },
    { src: '~/plugins/vue-slider-component', mode: 'client' } // Price slider
  ],
  buildModules: ['@nuxtjs/tailwindcss'],
  modules: [
    '@nuxtjs/apollo',
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
    '@nuxtjs/proxy',
    '@nuxtjs/font-awesome',
    '@nuxtjs/pwa',
    // "@nuxtjs/onesignal",4
    '@nuxtjs/toast',
    'cookie-universal-nuxt'
  ],
  apollo: {
    watchLoading: '~/plugins/apollo-watch-loading-handler.js',
    errorHandler: '~/plugins/apollo-error-handler.js',
    clientConfigs: {
      default: {
        httpEndpoint: '/graphql'
      }
    },
    defaultOptions: {
      $query: {
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
    '/graphql': HTTP_ENDPOINT,
    '/auth': HTTP_ENDPOINT,
    '/images': HTTP_ENDPOINT
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
