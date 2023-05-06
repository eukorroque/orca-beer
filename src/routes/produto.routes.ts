import { Router } from 'express'
import ProdutoModel from '../models/produto.model'
import ProdutoController from '../controllers/produto.controller'

const Model = new ProdutoModel
const Controller = new ProdutoController(Model)

const router = Router()

router
  .get('/produtos', Controller.getAll.bind(Controller))

export default router