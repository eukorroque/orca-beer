import { Router } from 'express'
import CategoriaProdutoModel from '../models/categoriaProduto.model'
import CategoriaProdutoController from '../controllers/categoriaProduto.controller'

const Model = new CategoriaProdutoModel
const Controller = new CategoriaProdutoController(Model)

const router = Router()

router
  .get('/categorias/produtos', Controller.getAll.bind(Controller))

export default router