const env = require('./.env.js')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Nuxt Vuetify Boilerplate',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt Vuetify Boilerplate' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/img/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  plugins: [
    '~/plugins/vuetify.js',
    { src: '~/plugins/vue-swal.js', ssr: false },
    '~/plugins/vue-env.js'
  ],
  css: [
    '~/assets/style/app.styl'
  ],
  /*
  ** Router
  */
  router: {
    linkActiveClass: 'active-link'
  },
  /*
  ** Modules
  */
  modules: [
    '@nuxtjs/axios',
  ],
  axios: {
    baseURL: env.BASE_API_URL
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      '~/plugins/vuetify.js',
      'axios',
      'vue-swal',
      '~/plugins/vue-env.js'
    ],
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      // find the stylus loader
      let stylus = config.module.rules[0].options.loaders.stylus.find(e => e.loader == 'stylus-loader')

      // extend default options
      Object.assign(stylus.options, {
        import: [
          '~rupture/rupture/index.styl',
        ]
      })

      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        })
      }
    }
  }
}
