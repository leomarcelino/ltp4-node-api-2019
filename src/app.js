import express from 'express'
import mongoose from 'mongoose'

import routes from './routes'
import databaseConfig from './config/database'

class Application {
  constructor() {
    this.express = express()
    this.connectDatabase()
    this.initMiddlewares()
    this.loadRoutes()
  }

  connectDatabase() {
    mongoose.connect(databaseConfig.uri, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    })
  }

  initMiddlewares() {
    this.express.use(express.json())
  }

  loadRoutes() {
    this.express.use(routes)
  }
}

export default new Application().express
