import { HttpStatus } from "../enums/httpStatus.enum"
import { NextFunction, Request, Response } from 'express'
import PropostaService from "../services/proposta.service"

export default class PropostaController {

  constructor (
    private propostaService: PropostaService
  ) {
  }


  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { proposta } = req.body

      if (!proposta) {
        return next('Não foram passados todos os dados necessários para o cadastro')
      }

      const idProposta = await this.propostaService.create(proposta)

      res.status(HttpStatus.CREATED).json({
        ok: true,
        msg: 'Proposta cadastrada com sucesso',
        id: idProposta
      })

    } catch (error: any) {
      return next(error.message)
    }

  }

}
