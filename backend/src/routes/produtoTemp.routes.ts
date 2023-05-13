import { Router } from 'express'
import ProdutoTempModel from '../models/produtoTemp.model'
import CategoriaProdutoModel from '../models/categoriaProduto.model'
import ProdutoTempController from '../controllers/produtoTemp.controller'

const ModelProdutoTemp = new ProdutoTempModel
const ModelCategoria = new CategoriaProdutoModel
const Controller = new ProdutoTempController(ModelProdutoTemp, ModelCategoria)

const router = Router()

router
  .get('/produtos-temp', Controller.getAll.bind(Controller))
  .post('/produto-temp', Controller.create.bind(Controller))

export default router