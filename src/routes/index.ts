import express, { Application } from 'express'
import Usuario from './usuario.routes'
import errorInterceptor from '../middlewares/errors.midleware'

const routes = (app: Application) => {

  app.get('/', (_req, res) => {
    res.send('.')
  })

  app.use(
    express.json(),
    Usuario
  )
  
  app.use(errorInterceptor)
}

export default routes