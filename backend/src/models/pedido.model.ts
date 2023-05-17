import { Pedido, Prisma } from "@prisma/client"
import prisma from "../config/prisma"
import prismaErros from "../utils/prismaErros.util"
import { IsDate, IsJSON, IsNotEmpty, Length, Matches } from "class-validator"
import NUMBER_REGEX from "../utils/regex/numberRegex"
import ALPHANUMERIC_REGEX from "../utils/regex/alphanumericRegex"

export default class PedidoModel implements Pedido {


  id!: number


  @IsJSON({ message: 'O campo produtos deve ser um JSON válido' })
  @IsNotEmpty({ message: 'Os produtos devem ser informados' })
  produtos!: Prisma.JsonValue

  @IsDate({ message: 'O campo prazo de entrega deve ser uma data válida' })
  @IsNotEmpty({ message: 'O prazo de entrega deve ser informado' })
  prazoEntrega!: Date

  @Matches(NUMBER_REGEX, { message: 'O id do lojista deve conter apenas números' })
  @IsNotEmpty({ message: 'O id do lojista deve ser informado' })
  lojistaId!: number


  @Matches(NUMBER_REGEX, { message: 'O id do status deve conter apenas números' })
  @IsNotEmpty({ message: 'O id do status deve ser informado' })
  statusId!: number

  @Matches(ALPHANUMERIC_REGEX, { message: 'O campo observações deve conter apenas caracteres alfanuméricos' })
  @Length(0, 255, { message: 'O campo observações deve ter no máximo 255 caracteres' })
  observacoes!: string | null

  @IsJSON({ message: 'O campo de fornecedores alcançados deve ser um JSON válido' })
  @IsNotEmpty({ message: 'Os fornecedores alcançados devem ser informados' })
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