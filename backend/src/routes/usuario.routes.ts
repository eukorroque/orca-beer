import { Router } from 'express'
import UsuarioModel from '../models/usuario.model'
import UsuarioController from '../controllers/usuario.controller'
import StatusUsuarioModel from '../models/statusUsuario.model'

const Usuario = new UsuarioModel
const Status = new StatusUsuarioModel
const Controller = new UsuarioController(Usuario, Status)

const router = Router()

router
  .post('/usuario/login', Controller.login.bind(Controller))
  .get('/usuarios/:type', Controller.getAll.bind(Controller))
  .post('/usuario/:type', Controller.create.bind(Controller))
  .put('/usuario/:id/alterar-status/:status', Controller.updateStatus.bind(Controller))

export default router