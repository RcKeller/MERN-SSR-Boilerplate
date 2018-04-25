import express from 'express'
import webpack from 'webpack'
import db from './db'
import initPassport from './init/passport'
import initExpress from './init/express'
import initRoutes from './init/routes'
import renderMiddleware from './render/middleware'

const config = require('../config/')
const { env, protocol, domain, port, redirect } = config

console.log('APP: Initializing...')
const app = express()
db.connect()

if (env === 'development') {
  // enable webpack hot module replacement
  console.log('DEV: Loading Webpack HRM middleware and compilers')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const webpackConfig = require('../webpack/webpack.config')
  const devBrowserConfig = webpackConfig({ browser: true })
  const compiler = webpack(devBrowserConfig)
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: devBrowserConfig.output.publicPath }))
  app.use(webpackHotMiddleware(compiler))
  console.log('DEV: Starting hot-reloading webpack server')
  app.listen(port)
}

//  Bootstrap application settings
initExpress(app, config)
//  Initialize API routes
initRoutes(app, config)
//  Initialize authZ systems and associated routes
initPassport(app, config)

/*
 * This is where the magic happens. We take the locals data we have already
 * fetched and seed our stores with data.
 * renderMiddleware matches the URL with react-router and renders the app into
 * HTML
 */
app.get('*', renderMiddleware)
//  Starts a UNIX socket and listens for connections on the given path. This method is identical to Node’s http.Server.listen().
if (env === 'production') {
  //  NOTE: Using require() syntax for cert loading and filesystem ops, improves dev server build times.
  const http = require('http')
  const https = require('https')
  const path = require('path')
  const fs = require('fs')

  console.log(`PROD: Bootstrapping ${protocol}://${domain}:${port}`)
  console.log(`PROD: HTTP redirects ${redirect} to secure port ${port})`)
  const key = fs.readFileSync(
    path.resolve(process.cwd(), 'config', 'priv-key.ppk'),
    'utf-8'
  )
  const cert = fs.readFileSync(
    path.resolve(process.cwd(), 'config', 'pub-cert.ppk'),
    'utf-8'
  )
  const httpsServer = https.createServer({ key, cert }, app)
  httpsServer.listen(port, () => console.log(`HTTPS: Live on ${httpsServer.address().port}`))

  //  HTTP redirects users to secure endpoints.
  //  This is a best practice, also necessary for uw-shib
  const httpServer = http.createServer((req, res) => {
    let redirectURL = `https://${domain}:${port}${req.url}`
    res.writeHead(301, {'Location': redirectURL})
    res.end()
    console.log(`HTTP: Redirect to: ${redirectURL}`)
  })
  httpServer.listen(redirect, () => console.log(`HTTP: Live on ${httpServer.address().port}`))
}
