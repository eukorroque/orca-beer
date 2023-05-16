import { Pedido, Prisma } from "@prisma/client"
import prisma from "../config/prisma"
import prismaErros from "../utils/prismaErros.util"

export default class PedidoModel implements Pedido {
  id!: number
  produtos!: Prisma.JsonValue
  prazoEntrega!: Date
  lojistaId!: number
  statusId!: number
  observacoes!: string | null
  fornecedoresAlcancados!: Prisma.JsonValue
  criadoEm!: Date
  atualizadoEm!: Date





  async getAll(params?: {
    skip?: number
    take?: number
    cursor?: Prisma.PedidoWhereUniqueInput
    where?: Prisma.PedidoWhereInput
    orderBy?: Prisma.PedidoOrderByWithRelationInput
    include?: Prisma.PedidoInclude
    select?: Prisma.PedidoSelect
  }
  ): Promise<Pedido[]> {
    try {

      const pedidos = await prisma.pedido.findMany({
        ...params
      })

      return pedidos

    } catch (error: any) {
      throw new Error(prismaErros(error))

    }
  }

  async getOne(params: {
    where: Prisma.PedidoWhereUniqueInput
    include?: Prisma.PedidoInclude
    select?: Prisma.PedidoSelect
  }): Promise<Pedido | null> {
    try {

      const pedido = await prisma.pedido.findUnique({
        ...params
      })

      return pedido

    } catch (error: any) {
      throw new Error(prismaErros(error))

    }
  }


  async create(
    pedidoData: Prisma.PedidoCreateInput
  ): Promise<number> {
    try {
      const pedido = await prisma.pedido.create({
        data: {
          ...pedidoData,
        }
      })


      return pedido.id

    } catch (error: any) {

      throw new Error(prismaErros(error))
    }
  }

  async update(params: {
    where: Prisma.PedidoWhereUniqueInput
    data: Prisma.PedidoUpdateInput
  }): Promise<Pedido | null> {
    try {
      const pedido = await prisma.pedido.update({
        ...params
      })

      return pedido

    } catch (error: any) {

      throw new Error(prismaErros(error))
    }
  }
}