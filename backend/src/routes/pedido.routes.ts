import { Router } from 'express'
import PedidoController from '../controllers/pedido.controller'
import PedidoService from '../services/pedido.service'
import PedidoModel from '../models/pedido.model'
import ProdutoModel from '../models/produto.model'
import ProdutoTempModel from '../models/produtoTemp.model'
import UsuarioModel from '../models/usuario.model'

const pedidoModel = new PedidoModel
const produtoModel = new ProdutoModel
const produtoTempModel = new ProdutoTempModel
const usuarioModel = new UsuarioModel
const pedidoService = new PedidoService(pedidoModel, produtoModel, produtoTempModel, usuarioModel)
const Controller = new PedidoController(pedidoService)

const router = Router()

router
  .post('/pedido', Controller.create.bind(Controller))
  .get('/pedido/:idFornecedor', Controller.getByIdFornecedor.bind(Controller))

export default router