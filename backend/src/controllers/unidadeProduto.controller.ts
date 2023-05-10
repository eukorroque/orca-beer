import { HttpStatus } from "../enums/httpStatus.enum";
import UnidadeProdutoModel from "../models/unidadeProduto.model";
import { NextFunction, Request, Response } from 'express'

export default class UnidadeProdutoController {

  constructor(
    private unidadeProdutoModel: UnidadeProdutoModel
  ) {
  }
 
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

      const unidades = await this.unidadeProdutoModel.getAll()

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

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

      const { unidade } = req.body

      if (!unidade) {
        return next('Não foram passados todos os dados necessários para o cadastro')
      }
      
      const idUnidade = await this.unidadeProdutoModel.create({
        ...unidade
      })

      res.status(HttpStatus.CREATED).json({
        ok: true,
        id: idUnidade
      })

    } catch (error: any) {
      return next(error.message)
    }

  }
}
