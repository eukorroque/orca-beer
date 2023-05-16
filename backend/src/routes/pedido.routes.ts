import { Router } from 'express'
import PedidoController from '../controllers/pedido.controller'
import PedidoService from '../services/pedido.service'
import PedidoModel from '../models/pedido.model'

const pedidoModel = new PedidoModel
const pedidoService = new PedidoService(pedidoModel)
const Controller = new PedidoController(pedidoService)

const router = Router()

router
  .post('/pedido', Controller.create.bind(Controller))

export default router