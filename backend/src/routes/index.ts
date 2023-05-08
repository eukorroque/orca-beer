import express, { Application } from 'express'
import Usuario from './usuario.routes'
import Produto from './produto.routes'
import errorInterceptor from '../middlewares/errors.midleware'

const routes = (app: Application) => {

  app.use(
    express.json(),
    Usuario,
    Produto
  )

  app.use(errorInterceptor)
}

export default routes