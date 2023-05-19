import express, { Application } from 'express'
import Usuario from './usuario.routes'
import Produto from './produto.routes'
import CategoriaProduto from './categoriaProduto.routes'
import UnidadeProduto from './unidadeProduto.routes'
import ProdutoTemp from './produtoTemp.routes'
import Admin from './admin.routes'
import pedido from './pedido.routes'
import errorInterceptor from '../middlewares/errors.midleware'
import Proposta from './proposta.routes'

const routes = (app: Application) => {

  app.use(
    express.json(),
    Admin,
    pedido,
    Usuario,
    Proposta,
    Produto,
    CategoriaProduto,
    UnidadeProduto,
    ProdutoTemp
  )

  app.use(errorInterceptor)
}

export default routes