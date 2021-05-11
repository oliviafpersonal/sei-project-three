import express from 'express'
import mongoose from 'mongoose'
import { dbURI, port } from './config/environment.js'
import router from './config/router.js'

import path from 'path'
const __dirname = path.resolve()

const app = express()

app.use((req, _res, next) => {
  console.log(`incoming requests: ${req.method} - ${req.url}`)
  next()
})

const startServer = async () => {
  try {
    //prettier-ignore
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    })

  } catch (error) {

    console.log(error)
  }
  app.listen(port, () => console.log(`express is running on port ${port}`))
}

startServer()

app.use(express.static(`${__dirname}/client/build`)) // <-- This line has been added before the express json middleware, it will allow the app to respond to a request with contents of this directory "build", which will contain our React App code.

app.use(express.json())

app.use('/api', router)

app.use('/*', (_, res) => res.sendFile(`${__dirname}/client/build/index.html`)) // <-- This additional route handler has been added between the router and error handler middleware it means that any incoming request that does not match a route in router should respond back with our frontend.
