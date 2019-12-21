const express = require('express')
const next = require('next')
const routes = require('./routes')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handler = routes.getRequestHandler(app)

app
  .prepare()
  .then(() => {

    const server = express()
    //server.use(require("./server/server"))

    server.use(handler);

    server.listen(3000, err => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch(ex => {
    console.log(ex)
    process.exit(1)
  })