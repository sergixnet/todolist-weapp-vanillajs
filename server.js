import http from 'http'
import app from './app'
import reload from 'ack-reload'

const server = http.createServer(app)

if (app.get('env') === 'development') {
  app.use(reload.middleware(`${__dirname}/public`, server))
}

server.listen(
  app.get('port'),
  () => console.log(`Server running on port: ${app.get('port')}`)
)
