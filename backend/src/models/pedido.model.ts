import { Pedido, Prisma } from "@prisma/client"
import prisma from "../config/prisma"
import prismaErros from "../utils/prismaErros.util"
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, Length, Matches, Min } from "class-validator"
import ALPHANUMERIC_REGEX from "../utils/regex/alphanumericRegex"

export default class PedidoModel implements Pedido {


  id!: number

  @IsArray({ message: 'O campo de produtos deve ser um array' })
  @IsNotEmpty({ message: 'Os produtos devem ser informados' })
  produtos!: Prisma.JsonValue


  @IsOptional()
  @IsArray({ message: 'O campo de produtos temporários deve ser um array' })
  produtosTemp!: Prisma.JsonValue


  @IsDate({ message: 'O campo prazo de entrega deve ser uma data válida' })
  @IsNotEmpty({ message: 'O prazo de entrega deve ser informado' })
  prazoEntrega!: Date


  @Min(1, { message: 'O id do usuário deve ser maior que 0' })
  @IsNumber({}, { message: 'O id do usuário deve ser um número válido' })
  @IsNotEmpty({ message: 'O id do lojista deve ser informado' })
  lojistaId!: number


  @Min(1, { message: 'O id do status deve ser maior que 0' })
  @IsNumber({}, { message: 'O id do status deve ser um número válido' })
  @IsNotEmpty({ message: 'O id do status deve ser informado' })
  statusId!: number


  @IsOptional()
  @Matches(ALPHANUMERIC_REGEX, { message: 'O campo observações deve conter apenas caracteres alfanuméricos' })
  @Length(0, 255, { message: 'O campo observações deve ter no máximo 255 caracteres' })
  observacoes!: string | null

  @IsArray({ message: 'O campo de fornecedores alcançados deve ser um array' })
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