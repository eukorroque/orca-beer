import { Router } from 'express'
import AdminController from '../controllers/admin.controller'
import AdminModel from '../models/admin.model'

const Admin = new AdminModel
const Controller = new AdminController(Admin)

const router = Router()

router
  .post('/admin', Controller.create.bind(Controller))

export default router