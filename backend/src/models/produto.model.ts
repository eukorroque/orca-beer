import { Produto, Prisma } from "@prisma/client";
import prisma from "../config/prisma";
import prismaErros from "../utils/prismaErros.util";
import { IsNumber, IsNotEmpty, Length, IsString } from "class-validator"

export default class ProdutoModel {

  id!: number

  @IsNumber({}, { message: 'O ID da categoria deve ser um número' })
  categoriaId!: number

  @IsNumber({}, { message: 'O ID dea unidade deve ser um número' })
  unidadeId!: number

  @IsNotEmpty({ message: 'O nome do produto deve ser informado' })
  @IsString({ message: 'O nome do produto está em um formato incorreto' })
  @Length(3, 255, { message: 'O nome do produto deve conter entre 3 e 255 caracteres' })
  nome!: string

  criadoEm!: Date

  atualizadoEm!: Date

  async getAll(params?: {
    skip?: number
    take?: number
    cursor?: Prisma.ProdutoWhereUniqueInput
    where?: Prisma.ProdutoWhereInput
    orderBy?: Prisma.ProdutoOrderByWithRelationInput
    include?: Prisma.ProdutoInclude
  }
  ): Promise<Produto[]> {
    try {

      const produtos = await prisma.produto.findMany({
        ...params,
      })

      return produtos

    } catch (error: any) {
      throw new Error(prismaErros(error))

    }
  }

}