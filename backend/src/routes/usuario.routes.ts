import { Router } from 'express'
import UsuarioModel from '../models/usuario.model'
import UsuarioController from '../controllers/usuario.controller'
import StatusUsuarioModel from '../models/statusUsuario.model'
import UsuarioService from '../services/usuario.service'

const usuarioModel = new UsuarioModel
const statusUsuarioModel = new StatusUsuarioModel
const usuarioService = new UsuarioService(usuarioModel, statusUsuarioModel)

const usuarioController = new UsuarioController(usuarioModel, usuarioService)

const router = Router()

router
  .post('/usuario/login', usuarioController.login.bind(usuarioController))
  .get('/usuarios/:type', usuarioController.getAll.bind(usuarioController))
  .post('/usuario/:type', usuarioController.create.bind(usuarioController))
  .put('/usuario/:id/alterar-status/:status', usuarioController.updateStatus.bind(usuarioController))

export default router