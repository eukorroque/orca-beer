import { HttpStatus } from "../enums/httpStatus.enum";
import CategoriaProdutoModel from "../models/categoriaProduto.model";
import { NextFunction, Request, Response } from 'express'

export default class CategoriaProdutoController {

  private _categoriaProdutoModel: CategoriaProdutoModel


  constructor(categoriaProdutoModel: CategoriaProdutoModel) {
    this._categoriaProdutoModel = categoriaProdutoModel
  }
 
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

      const categorias = await this._categoriaProdutoModel.getAll()

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
}
