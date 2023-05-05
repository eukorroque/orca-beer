import { Router } from 'express'
import LojistaModel from '../models/lojista.model'
import LojistaController from '../controllers/lojista.controller'

const Model = new LojistaModel
const Controller = new LojistaController(Model)

const router = Router()

router
  .get('/lojistas', Controller.getAll.bind(Controller))
  .post('/lojista', Controller.create.bind(Controller))
  .put('/lojista/:id', Controller.update.bind(Controller))

export default router