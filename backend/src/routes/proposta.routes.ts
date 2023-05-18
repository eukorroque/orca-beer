import { Router } from 'express'
import isLoggedInterceptor from '../middlewares/isLogged.middleware'
import PropostaModel from '../models/proposta.model'
import PropostaController from '../controllers/proposta.controller'
import PropostaService from '../services/proposta.service'

const propostaModel = new PropostaModel
const propostaService = new PropostaService(propostaModel)
const Controller = new PropostaController(propostaService)

const router = Router()

router
  .post('/proposta', isLoggedInterceptor(), Controller.create.bind(Controller))

export default router