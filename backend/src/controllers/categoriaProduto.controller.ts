import { HttpStatus } from "../enums/httpStatus.enum";
import CategoriaProdutoModel from "../models/categoriaProduto.model";
import { NextFunction, Request, Response } from 'express'

export default class CategoriaProdutoController {

  constructor(
    private categoriaProdutoModel: CategoriaProdutoModel
    ) { 
    }
 
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

      const categorias = await this.categoriaProdutoModel.getAll()

      if (categorias.length <= 0) {
        return next('Ainda não há categorias cadastradas')
      }

      res.status(HttpStatus.OK).json({
        ok: true,
        data: categorias
      })

    } catch (error) {
      return next('Ocorreu um erro ao tentar listar as categorias.')
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

      const { categoria } = req.body

      if (!categoria) {
        return next('Não foram passados todos os dados necessários para o cadastro')
      }

      
      const idCategoria = await this.categoriaProdutoModel.create({
        ...categoria
      })

      res.status(HttpStatus.CREATED).json({
        ok: true,
        id: idCategoria
      })

    } catch (error: any) {
      return next(error.message)
    }

  }
}
