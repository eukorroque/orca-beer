import { HttpStatus } from "../enums/httpStatus.enum";
import ProdutoModel from "../models/produto.model";
import { NextFunction, Request, Response } from 'express'

export default class ProdutoController {

  private _produtoModel: ProdutoModel


  constructor(produtoModel: ProdutoModel) {
    this._produtoModel = produtoModel
  }
 
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

      const produtos = await this._produtoModel.getAll()

      if (produtos.length <= 0) {
        return next('Ainda não há produtos cadastrados')
      }

      res.status(HttpStatus.OK).json({
        ok: true,
        data: produtos
      })

    } catch (error) {
      return next('Ocorreu um erro ao tentar listar os produtos')
    }
  }
}
