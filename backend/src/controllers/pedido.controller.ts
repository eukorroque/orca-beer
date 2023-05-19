import { HttpStatus } from "../enums/httpStatus.enum"
import { NextFunction, Request, Response } from 'express'
import PedidoService from '../services/pedido.service'
import IUserSession from "../interfaces/IUserSession"

export default class PedidoController {

  constructor (
    private pedidoService: PedidoService
  ) {
  }


  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { pedido } = req.body
      const userSession: IUserSession = req.body.userSession

      if (!pedido || !pedido.produtos) {
        return next('Não foram passados todos os dados necessários para o cadastro')
      }

      pedido.lojistaId = userSession.id
      const idPedido = await this.pedidoService.create(pedido)

      res.status(HttpStatus.CREATED).json({
        ok: true,
        msg: 'Pedido cadastrado com sucesso',
        id: idPedido
      })

    } catch (error: any) {
      return next(error.message)
    }

  }

  /**
   * Retorna todos os pedidos que não foram finalizado com base no id do fornecedor
   */
  async getByIdFornecedor(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { idFornecedor } = req.params

      if (!idFornecedor || !Number.isInteger(parseInt(idFornecedor))) {
        return next('Informe o id do fornecedor que deseja obter as informações sobre pedidos.')
      }

      const pedidos = await this.pedidoService.getByIdFornecedor(parseInt(idFornecedor))

      res.status(HttpStatus.OK).json({
        ok: true,
        pedidos
      })

    } catch (error: any) {
      return next(error.message)
    }

  }


  /**
   * Endpoint para o fornecedor aceitar um pedido
   */
  async aceitarPedido(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { idPedido } = req.params
      const userSession: IUserSession = req.body.userSession

      if (!idPedido || !Number.isInteger(parseInt(idPedido))) {
        return next('Informe o id do pedido que deseja aceitar.')
      }

      const pedido = await this.pedidoService.aceitarPedido(parseInt(idPedido), userSession.id)

      if (!pedido) {
        return next('Não foi possível aceitar o pedido. Tente novamente mais tarde.')
      }

      res.status(HttpStatus.OK).json({
        ok: true,
        msg: 'Pedido aceito com sucesso'
      })

    } catch (error: any) {
      return next(error.message)
    }
  }


}
