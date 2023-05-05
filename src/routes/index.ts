import express, { Application } from 'express'
import Lojista from './lojista.routes'
import errorInterceptor from '../middlewares/errors.midleware'

const routes = (app: Application) => {

  app.get('/', (_req, res) => {
    res.send('.')
  })

  app.use(
    express.json(),
    Lojista
  )

  app.use(errorInterceptor)
}

export default routes