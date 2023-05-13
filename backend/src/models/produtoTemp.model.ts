import { ProdutoTemp, Prisma } from "@prisma/client"
import prisma from "../config/prisma"
import prismaErros from "../utils/prismaErros.util"
import { IsNumber, IsNotEmpty, Length, IsString, Min } from "class-validator"

export default class ProdutoTempModel implements ProdutoTemp {

  id!: number

  @IsNumber({}, { message: 'O ID da categoria deve ser um número' })
  categoriaId!: number

  @IsNotEmpty({ message: 'O nome do produto deve ser informado' })
  @IsString({ message: 'O nome do produto está em um formato incorreto' })
  @Length(3, 255, { message: 'O nome do produto deve conter entre 3 e 255 caracteres' })
  nome!: string

  @IsNumber({}, { message: 'A quantidade de vezes que este produto foi incluído deve ser um número' })
  @Min(0, { message: 'A quantidade de vezes que este produto foi incluído deve ser maior ou igual a 0' })
  qtdInclusao = 0


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
}