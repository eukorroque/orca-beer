import { HttpStatus } from "../enums/httpStatus.enum"
import { NextFunction, Request, Response } from 'express'
import PedidoService from '../services/pedido.service'

export default class UsuarioController {

  constructor (
    private pedidoService: PedidoService
  ) {
  }


  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { pedido } = req.body


      if (!pedido || !pedido.produtos) {
        return next('Não foram passados todos os dados necessários para o cadastro')
      }

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


}
