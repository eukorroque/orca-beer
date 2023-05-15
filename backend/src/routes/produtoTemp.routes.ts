import { Router } from 'express'
import ProdutoTempModel from '../models/produtoTemp.model'
import CategoriaProdutoModel from '../models/categoriaProduto.model'
import ProdutoTempController from '../controllers/produtoTemp.controller'
import ProdutoModel from '../models/produto.model'

const produtoTempModel = new ProdutoTempModel
const categoriaProdutoModel = new CategoriaProdutoModel
const produtoModel = new ProdutoModel
const Controller = new ProdutoTempController(produtoTempModel, categoriaProdutoModel, produtoModel)

const router = Router()

router
  .get('/produtos-temp', Controller.getAll.bind(Controller))
  .post('/produto-temp', Controller.create.bind(Controller))

export default router