import express, { Application } from 'express'
import Usuario from './usuario.routes'
import Produto from './produto.routes'
import CategoriaProduto from './categoriaProduto.routes'
import UnidadeProduto from './unidadeProduto.routes'
import ProdutoTemp from './produtoTemp.routes'
import Admin from './admin.routes'
import errorInterceptor from '../middlewares/errors.midleware'

const routes = (app: Application) => {

  app.use(
    express.json(),
    Admin,
    Usuario,
    Produto,
    CategoriaProduto,
    UnidadeProduto,
    ProdutoTemp
  )

  app.use(errorInterceptor)
}

export default routes