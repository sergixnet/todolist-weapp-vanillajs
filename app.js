import express from 'express'
import favicon from 'serve-favicon'
import sassMiddleware from 'node-sass-middleware'
import autoprefixer from 'express-autoprefixer'
import routes from './src/app/routes'

const env = 'development'
const port = process.env.PORT || 3000
const publicDir = `${__dirname}/public`
const viewDir = `${__dirname}/src/views`
const faviconDir = `${__dirname}/public/images/favicon.png`
const app = express()

app
  .set('views', viewDir)
  .set('view engine', 'pug')
  .set('port', port)
  .set('env', env)

  .use((req, res, next) => {
    res.removeHeader('X-Powered-By')
    next()
  })
  .use(sassMiddleware({
    src: `${__dirname}/src/scss`,
    dest: publicDir,
    debug: false,
    outputStyle: 'compressed'
  }))
  .use(autoprefixer({
    browsers: '> 5%',
    cascade: false
  }))
  .use(express.static(publicDir))
  .use(favicon(faviconDir))
  .use(routes)

if (app.get(env) === 'production') {
  app.use((req, res, next) => {
    let err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.render('error', { err })
  })
}

export default app
