import { Router } from 'express'
import ProdutoTempModel from '../models/produtoTemp.model'
import ProdutoModel from '../models/produto.model'
import CategoriaProdutoModel from '../models/categoriaProduto.model'
import UnidadeProdutoModel from '../models/unidadeProduto.model'
import ProdutoTempController from '../controllers/produtoTemp.controller'

const ModelProdutoTemp = new ProdutoTempModel
const ModelProduto = new ProdutoModel
const ModelCategoria = new CategoriaProdutoModel
const ModelUnidade = new UnidadeProdutoModel
const Controller = new ProdutoTempController(ModelProdutoTemp, ModelProduto, ModelCategoria, ModelUnidade)

const router = Router()

router
  .get('/produtos-temp', Controller.getAll.bind(Controller))
  .post('/produto-temp', Controller.create.bind(Controller))

export default router