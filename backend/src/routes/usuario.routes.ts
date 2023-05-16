import { Router } from 'express'
import UsuarioModel from '../models/usuario.model'
import UsuarioController from '../controllers/usuario.controller'
import StatusUsuarioModel from '../models/statusUsuario.model'
import UsuarioService from '../services/usuario.service'
import SessionModel from '../models/session.model'


const usuarioModel = new UsuarioModel
const statusUsuarioModel = new StatusUsuarioModel
const sessionModel = new SessionModel
const usuarioService = new UsuarioService(usuarioModel, statusUsuarioModel)

const controller = new UsuarioController(usuarioModel, usuarioService, sessionModel)

const router = Router()

router
  .post('/usuario/login', controller.login.bind(controller))
  .get('/usuarios/:type', controller.getAll.bind(controller))
  .post('/usuario/:type', controller.create.bind(controller))
  .put('/usuario/:id/alterar-status/:status', controller.updateStatus.bind(controller))

export default router