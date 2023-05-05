import { Router } from 'express'
import UsuarioModel from '../models/usuario.model'
import UsuarioController from '../controllers/usuario.controller'

const Model = new UsuarioModel
const Controller = new UsuarioController(Model)

const router = Router()

router
  .get('/usuarios/:type', Controller.getAll.bind(Controller))
  .post('/usuario/:type', Controller.create.bind(Controller))
  .put('/usuario/:id', Controller.update.bind(Controller))

export default router