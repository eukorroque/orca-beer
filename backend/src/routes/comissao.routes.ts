import { Router } from 'express'
import ComissaoController from '../controllers/comissao.controller'
import ComissaoModel from '../models/comissao.model'

const comissaoModel = new ComissaoModel
const Controller = new ComissaoController(comissaoModel)

const router = Router()

router
  .get('/comissoes', Controller.getAll.bind(Controller))

export default router