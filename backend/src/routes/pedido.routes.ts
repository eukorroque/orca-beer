import { Router } from 'express'
import PedidoController from '../controllers/pedido.controller'
import PedidoService from '../services/pedido.service'
import PedidoModel from '../models/pedido.model'
import ProdutoModel from '../models/produto.model'
import ProdutoTempModel from '../models/produtoTemp.model'

const pedidoModel = new PedidoModel
const produtoModel = new ProdutoModel
const produtoTempModel = new ProdutoTempModel
const pedidoService = new PedidoService(pedidoModel, produtoModel, produtoTempModel)
const Controller = new PedidoController(pedidoService)

const router = Router()

router
  .post('/pedido', Controller.create.bind(Controller))

export default router