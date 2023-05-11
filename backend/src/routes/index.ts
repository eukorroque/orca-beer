import express, { Application } from 'express'
import Usuario from './usuario.routes'
import Produto from './produto.routes'
import CategoriaProduto from './categoriaProduto.routes'
import UnidadeProduto from './unidadeProduto.routes'
import Admin from './admin.routes'
import errorInterceptor from '../middlewares/errors.midleware'

const routes = (app: Application) => {

  app.get('/', (_req, res) => {
    res.send('.')
  })

  app.use(
    express.json(),
    Admin,
    Usuario,
    Produto,
    CategoriaProduto,
    UnidadeProduto
  )

  app.use(errorInterceptor)
}

export default routes