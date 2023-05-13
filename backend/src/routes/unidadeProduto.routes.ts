import { Router } from 'express'
import UnidadeProdutoModel from '../models/unidadeProduto.model'
import UnidadeProdutoController from '../controllers/unidadeProduto.controller'

const Model = new UnidadeProdutoModel
const Controller = new UnidadeProdutoController(Model)

const router = Router()

router
  .get('/unidades/produtos', Controller.getAll.bind(Controller))
  .post('/unidades/produtos', Controller.create.bind(Controller))
  .put('/unidades/:id', Controller.update.bind(Controller))

export default router