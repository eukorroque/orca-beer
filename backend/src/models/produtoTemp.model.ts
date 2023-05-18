import { ProdutoTemp, Prisma } from "@prisma/client"
import prisma from "../config/prisma"
import prismaErros from "../utils/prismaErros.util"
import { IsNotEmpty, Length, IsString, Matches, IsOptional } from "class-validator"
import NUMBER_REGEX from "../utils/regex/numberRegex"
import ALPHANUMERIC_REGEX from "../utils/regex/alphanumericRegex"

export default class ProdutoTempModel implements ProdutoTemp {

  id!: number

  @Matches(NUMBER_REGEX, { message: 'O ID da categoria deve ser um número' })
  categoriaId!: number

  @IsNotEmpty({ message: 'O nome do produto deve ser informado' })
  @IsString({ message: 'O nome do produto está em um formato incorreto' })
  @Length(3, 255, { message: 'O nome do produto deve conter entre 3 e 255 caracteres' })
  @Matches(ALPHANUMERIC_REGEX, { message: 'O nome do produto deve conter apenas caracteres alfanuméricos' })
  nome!: string


  @IsOptional()
  @Matches(NUMBER_REGEX, { message: 'O ID do produto deve ser um número' })
  produtoId!: number | null

  qtdInclusao = 1

  criadoEm!: Date

  atualizadoEm!: Date


  async getAll(params?: {
    skip?: number
    take?: number
    cursor?: Prisma.ProdutoTempWhereUniqueInput
    where?: Prisma.ProdutoTempWhereInput
    orderBy?: Prisma.ProdutoTempOrderByWithRelationInput
    include?: Prisma.ProdutoTempInclude
    select?: Prisma.ProdutoTempSelect
  }
  ): Promise<ProdutoTemp[]> {
    try {

      const produtosTemp = await prisma.produtoTemp.findMany({
        ...params
      })

      return produtosTemp

    } catch (error: any) {
      throw new Error(prismaErros(error))

    }
  }

  async getOne(params: {
    where: Prisma.ProdutoTempWhereUniqueInput
    include?: Prisma.ProdutoTempInclude
  }): Promise<ProdutoTemp | null> {
    try {

      const produtoTemp = await prisma.produtoTemp.findUnique({
        ...params
      })

      return produtoTemp

    } catch (error: any) {
      throw new Error(prismaErros(error))

    }
  }

  async count(params: {
    where?: Prisma.ProdutoTempWhereInput
  }): Promise<number> {
    try {

      const produtoTemp = await prisma.produtoTemp.count({
        ...params
      })

      return produtoTemp

    } catch (error: any) {
      throw new Error(prismaErros(error))

    }
  }

  async create(
    produtoTempData: Prisma.ProdutoTempCreateInput
  ): Promise<number> {
    try {
      const produtoTemp = await prisma.produtoTemp.create({
        data: {
          ...produtoTempData
        }
      })

      return produtoTemp.id

    } catch (error: any) {

      throw new Error(prismaErros(error))
    }
  }

  async update(params: {
    where: Prisma.ProdutoTempWhereUniqueInput
    data: Prisma.ProdutoTempUpdateInput
  }): Promise<ProdutoTemp | null> {
    try {
      const produtoTemp = await prisma.produtoTemp.update({
        ...params
      })

      return produtoTemp

    } catch (error: any) {

      throw new Error(prismaErros(error))
    }
  }

  async getMany(params: {
    skip?: number
    take?: number
    cursor?: Prisma.ProdutoTempWhereUniqueInput
    where?: Prisma.ProdutoTempWhereInput
    orderBy?: Prisma.ProdutoTempOrderByWithRelationInput
    include?: Prisma.ProdutoTempInclude
    select?: Prisma.ProdutoTempSelect
  }): Promise<ProdutoTemp[]> {
    try {

      const produtosTemp = await prisma.produtoTemp.findMany({
        ...params
      })

      return produtosTemp

    } catch (error: any) {
      throw new Error(prismaErros(error))

    }
  }
}