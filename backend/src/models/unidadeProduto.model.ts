import { unidadeProduto, Prisma } from "@prisma/client"
import prisma from "../config/prisma"
import prismaErros from "../utils/prismaErros.util"
import { IsNotEmpty, Length, IsString, Matches } from "class-validator"
import ALPHANUMERIC_REGEX from "../utils/regex/alphanumericRegex"

export default class UnidadeProdutoModel {

  id!: number

  @IsNotEmpty({ message: 'A unidade deve ser informada' })
  @IsString({ message: 'A unidade está em um formato incorreto' })
  @Length(3, 255, { message: 'A unidade deve conter entre 3 e 255 caracteres' })
  @Matches(ALPHANUMERIC_REGEX, { message: 'A unidade deve conter apenas caracteres alfanuméricos' })
  unidade!: string

  criadoEm!: Date

  atualizadoEm!: Date

  async getAll(params?: {
    skip?: number
    take?: number
    cursor?: Prisma.unidadeProdutoWhereUniqueInput
    where?: Prisma.unidadeProdutoWhereInput
    orderBy?: Prisma.unidadeProdutoOrderByWithRelationInput
    include?: Prisma.unidadeProdutoInclude
  }
  ): Promise<unidadeProduto[]> {
    try {

      const unidades = await prisma.unidadeProduto.findMany({
        ...params
      })

      return unidades

    } catch (error: any) {
      throw new Error(prismaErros(error))

    }
  }

  async getOne(params: {
    where: Prisma.unidadeProdutoWhereUniqueInput
    include?: Prisma.unidadeProdutoInclude
  }): Promise<unidadeProduto | null> {
    try {

      const unidadeProduto = await prisma.unidadeProduto.findUnique({
        ...params
      })

      return unidadeProduto

    } catch (error: any) {
      throw new Error(prismaErros(error))

    }
  }


  async create(
    unidadeData: Prisma.unidadeProdutoCreateInput
  ): Promise<number> {
    try {
      const unidade = await prisma.unidadeProduto.create({
        data: {
          ...unidadeData
        }
      })

      return unidade.id

    } catch (error: any) {

      throw new Error(prismaErros(error))
    }
  }

  async update(params: {
    where: Prisma.unidadeProdutoWhereUniqueInput
    data: Prisma.unidadeProdutoUpdateInput
  }): Promise<unidadeProduto | null> {
    try {
      const nomeUnidade = await prisma.unidadeProduto.update({
        ...params
      })

      return nomeUnidade

    } catch (error: any) {

      throw new Error(prismaErros(error))
    }
  }

}
