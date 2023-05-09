import { HttpStatus } from "../enums/httpStatus.enum";
import UnidadeProdutoModel from "../models/unidadeProduto.model";
import { NextFunction, Request, Response } from 'express'

export default class UnidadeProdutoController {

  private _unidadeProdutoModel: UnidadeProdutoModel


  constructor(unidadeProdutoModel: UnidadeProdutoModel) {
    this._unidadeProdutoModel = unidadeProdutoModel
  }
 
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

      const unidades = await this._unidadeProdutoModel.getAll()

      if (unidades.length <= 0) {
        return next('Ainda não há unidades cadastradas')
      }

      res.status(HttpStatus.OK).json({
        ok: true,
        data: unidades
      })

    } catch (error) {
      return next('Ocorreu um erro ao tentar listar as unidades.')
    }
  }
}
