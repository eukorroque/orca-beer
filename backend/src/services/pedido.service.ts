import { Pedido } from "@prisma/client"
import classValidatorErros from "../utils/classValidatorErros.util"
import { validate } from "class-validator"
import PedidoModel from "../models/pedido.model"

export default class PedidoService {

  constructor (
    private pedidoModel: PedidoModel
  ) { }

  async create(pedido: Pedido): Promise<number> {
    try {

      const errors = await validate(Object.assign(new PedidoModel(), pedido), {
        stopAtFirstError: true
      })

      if (errors.length > 0) {
        const newError = classValidatorErros(errors)

        console.log(newError)

        throw new Error(newError)

      }

      const data: any = {
        ...pedido,
      }


      const idPedido = await this.pedidoModel.create({
        ...data
      })


      return idPedido

    } catch (error: any) {
      throw new Error(error.message)
    }
  }

}