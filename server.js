process.env.NODE_ENV = process.env.NODE_ENV;
process.env.HOST = process.env.HOST || '127.0.0.1'
process.env.PORT = process.env.PORT || 3000

// const bodyParser = require('body-parser')
const app = require('express')()
const { Nuxt, Builder } = require('nuxt')

// Import and set Nuxt.js options
let config = require('./nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

const nuxt = new Nuxt(config)

// Start build process in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// Start express server
app.listen(process.env.PORT, process.env.HOST)