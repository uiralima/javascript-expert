const http = require('http')
const PORT = 3000
const DEFAULT_USER = { username: "usuario", password: "senha" }

const routes = {
  '/contact:get': (request, response) => {
    return response.end('Contact Us page')
  },
  '/login:post': async (request, response) => {
    for await (const data of request) {
      const user = JSON.parse(data)
      if (user.username !== DEFAULT_USER.username || user.password !== DEFAULT_USER.password) {
        response.writeHead(401)
        response.write('Login failed')
        return response.end()
      }
    }
    return response.end('Login has succeeded')
  },
  default: (request, response) => {
    return response.end('Hello World')
  }
}

const handler = function(request, response) {
  const { url, method } = request
  const routKey = `${url}:${method.toLowerCase()}`
  const chosen = routes[routKey] || routes.default
  if (routKey === null) {
    return
  }
  response.writeHead(200, {
    'Content-Type': 'text/html'
  })
  return chosen(request, response)
}

const app = http.createServer(handler)
  .listen(PORT, () => console.log(`app running at ${`PORT`}`))

module.exports = app