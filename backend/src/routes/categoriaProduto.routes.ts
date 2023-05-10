import { Router } from 'express'
import CategoriaProdutoModel from '../models/categoriaProduto.model'
import CategoriaProdutoController from '../controllers/categoriaProduto.controller'

const Model = new CategoriaProdutoModel
const Controller = new CategoriaProdutoController(Model)

const router = Router()

router
  .get('/categorias/produtos', Controller.getAll.bind(Controller))
  .post('/categorias/produtos', Controller.create.bind(Controller))

export default router