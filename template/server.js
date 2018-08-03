process.env.NODE_ENV = process.env.NODE_ENV
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3003
const app = require('express')()
const { existsSync } = require('fs')
const { resolve } = require('path')
const { Nuxt, Builder } = require('nuxt')
const env = require('./.env.js')

if (!env) {
  console.error('> No .env file found. Please create one!')
  process.exit(1)
}

// Import and set Nuxt.js options
let config = require('./nuxt.config')
config.dev = !(process.env.NODE_ENV === 'production')

// Start Nuxt.js
const nuxt = new Nuxt(config)

// Start build process in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
} else {
  // Check if project is built for production
  const distDir = resolve(nuxt.options.rootDir, nuxt.options.buildDir || '.nuxt', 'dist')
  if (!existsSync(distDir)) {
    console.error('> No build files found, please run `yarn build` before launching `yarn start`')
    process.exit(1)
  }
}

// Give nuxt middleware to express
app.use(nuxt.render)

// Start express server
app.listen(port, host)
console.log('Server listening on http://' + host + ':' + port)
