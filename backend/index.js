import express from 'express'
import mongoose from 'mongoose'
import { dbURI, port } from './config/environment.js'
import router from './config/router.js'

const app = express()

app.use((req, _res, next) => {
  console.log(`incoming requests: ${req.method} - ${req.url}`)
  next()
})

app.use(express.json())

const startServer = async () => {
  try {
    await mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    console.log('THE DATABASE IS CONNECTED!!!!!')
  } catch (error) {
    console.log('something has gone wrong. see below for info')
    console.log(error)
  }
  app.listen(port, () => console.log(`express is running on port ${port}`))
}

startServer()
app.use('/api', router)