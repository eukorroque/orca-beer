import { HttpStatus } from "../enums/httpStatus.enum"
import { NextFunction, Request, Response } from 'express'
import PropostaService from "../services/proposta.service"
import IUserSession from "../interfaces/IUserSession"

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


  async updateProdutosArr(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { idProposta } = req.params
      const { novoIndice } = req.body
      const userSession: IUserSession = req.body.userSession


      if (!idProposta || !Number.isInteger(parseInt(idProposta))) {
        return next('Informe o id da proposta')
      }

      if (!novoIndice) {
        return next('Não foram passados todos os dados necessários para completar a requisição')
      }

      novoIndice.responsavelId = userSession.id
      const updated = await this.propostaService.updateProdutosArr(parseInt(idProposta), novoIndice)

      if (!updated) {
        return next('Proposta não encontrada')
      }

      res.status(HttpStatus.OK).json({
        ok: true,
        msg: 'Proposta atualizada com sucesso',
      })

    } catch (error: any) {
      return next(error.message)
    }
  }

  /**
   * Caso o lojista que chame esse endpoint. Ele aceitará a proposta. 
   * Caso o fornecedor chame esse endpoint e o lojista ja tenha aceitado, a proposta é finalizada e a comissão é gerada.
   */
  async finalizarProposta(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { idProposta } = req.params
      const userSession: IUserSession = req.body.userSession

      if (!idProposta || !Number.isInteger(parseInt(idProposta))) {
        return next('Informe o id da proposta')
      }

      const updatedMsg = await this.propostaService.finalizarProposta(parseInt(idProposta), userSession)

      res.status(HttpStatus.OK).json({
        ok: true,
        msg: updatedMsg
      })

    } catch (error: any) {
      return next(error.message)
    }
  }

}
