import { Router } from 'express'
import isLoggedInterceptor from '../middlewares/isLogged.middleware'
import PropostaModel from '../models/proposta.model'
import PropostaController from '../controllers/proposta.controller'
import PropostaService from '../services/proposta.service'
import ComissaoModel from '../models/comissao.model'
import PedidoModel from '../models/pedido.model'

const propostaModel = new PropostaModel
const comissaoModel = new ComissaoModel
const pedidoModel = new PedidoModel
const propostaService = new PropostaService(propostaModel, comissaoModel, pedidoModel)
const Controller = new PropostaController(propostaService)

const router = Router()

router
  .post('/proposta', isLoggedInterceptor(), Controller.create.bind(Controller))
  .put('/proposta/:idProposta/nova-alteracao-produtos', isLoggedInterceptor(['fornecedor', 'lojista']), Controller.updateProdutosArr.bind(Controller))
  .put('/proposta/:idProposta/finalizar', isLoggedInterceptor(['fornecedor', 'lojista']), Controller.finalizarProposta.bind(Controller))
  .get('/proposta-by-lojista-id', isLoggedInterceptor(['lojista']), Controller.getByLojistaId.bind(Controller))

export default router