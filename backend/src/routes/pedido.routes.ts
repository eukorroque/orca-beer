import { Router } from 'express'
import PedidoController from '../controllers/pedido.controller'
import PedidoService from '../services/pedido.service'
import PedidoModel from '../models/pedido.model'
import ProdutoModel from '../models/produto.model'
import ProdutoTempModel from '../models/produtoTemp.model'
import UsuarioModel from '../models/usuario.model'
import isLoggedInterceptor from '../middlewares/isLogged.middleware'
import PropostaService from '../services/proposta.service'
import PropostaModel from '../models/proposta.model'
import ComissaoModel from '../models/comissao.model'

const pedidoModel = new PedidoModel
const produtoModel = new ProdutoModel
const produtoTempModel = new ProdutoTempModel
const usuarioModel = new UsuarioModel
const propostaModel = new PropostaModel
const comissaoModel = new ComissaoModel
const propostaService = new PropostaService(propostaModel, comissaoModel, pedidoModel)
const pedidoService = new PedidoService(pedidoModel, produtoModel, produtoTempModel, usuarioModel, propostaService)
const Controller = new PedidoController(pedidoService)

const router = Router()

router
  .post('/pedido', isLoggedInterceptor(['lojista']), Controller.create.bind(Controller))
  .get('/pedidos/:idFornecedor', isLoggedInterceptor(['fornecedor']), Controller.getByIdFornecedor.bind(Controller))
  .put('/pedido/:idPedido/fornecedor-feedback/:bool', isLoggedInterceptor(['fornecedor']), Controller.fornecedorFeedback.bind(Controller))

export default router