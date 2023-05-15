import { Router } from 'express'
import UsuarioModel from '../models/usuario.model'
import UsuarioController from '../controllers/usuario.controller'
import StatusUsuarioModel from '../models/statusUsuario.model'
import UsuarioService from '../services/usuario.service'
import SessionModel from '../models/session.model'
import isLoggedInterceptor from '../middlewares/isLogged.middleware'

const usuarioModel = new UsuarioModel
const statusUsuarioModel = new StatusUsuarioModel
const sessionModel = new SessionModel
const usuarioService = new UsuarioService(usuarioModel, statusUsuarioModel)

const usuarioController = new UsuarioController(usuarioModel, usuarioService, sessionModel)

const router = Router()

router
  .post('/usuario/login', usuarioController.login.bind(usuarioController))
  .get('/usuarios/:type', isLoggedInterceptor(['lojista', 'fornecedor']), usuarioController.getAll.bind(usuarioController))
  .post('/usuario/:type', usuarioController.create.bind(usuarioController))
  .put('/usuario/:id/alterar-status/:status', usuarioController.updateStatus.bind(usuarioController))

export default router