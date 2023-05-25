import { Router } from 'express'
import ProdutoTempModel from '../models/produtoTemp.model'
import CategoriaProdutoModel from '../models/categoriaProduto.model'
import ProdutoTempController from '../controllers/produtoTemp.controller'
import ProdutoModel from '../models/produto.model'
import ProdutoTempService from '../services/produtoTemp.service'

const produtoTempModel = new ProdutoTempModel
const categoriaProdutoModel = new CategoriaProdutoModel
const produtoModel = new ProdutoModel
const produtoTempService = new ProdutoTempService(produtoTempModel, categoriaProdutoModel, produtoModel)
const Controller = new ProdutoTempController(produtoTempModel, produtoTempService)

const router = Router()

router
  .get('/produtos-temp', Controller.getAll.bind(Controller))
  .post('/produto-temp', Controller.create.bind(Controller))

export default router