import http from 'node:http'

import handler from './routes.js'

const hostname = '127.0.0.1'
const port = 8989

const server = http.createServer((req, res) => handler(req, res))

server.listen({
  hostname,
  port
}, () => {
  console.log(`Server run at: http://${hostname}:${port}`)
})
