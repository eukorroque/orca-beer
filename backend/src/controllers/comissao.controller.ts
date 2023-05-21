import { HttpStatus } from "../enums/httpStatus.enum"
import ComissaoModel from "../models/comissao.model"
import { NextFunction, Request, Response } from 'express'

export default class ComissaoController {

  constructor (
    private comissaoModel: ComissaoModel,
  ) {
  }

  async getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

      const comissoes = await this.comissaoModel.getAll()

      if (comissoes.length <= 0) {
        return next('Não há comissões cadastradas')
      }

      res.status(HttpStatus.OK).json({
        ok: true,
        data: comissoes
      })

    } catch (error) {
      return next('Ocorreu um erro ao tentar listar as comissões.')
    }
  }


}
