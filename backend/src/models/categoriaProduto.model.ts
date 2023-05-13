import { categoriaProduto, Prisma } from "@prisma/client";
import prisma from "../config/prisma";
import prismaErros from "../utils/prismaErros.util";
import { IsNotEmpty, Length, IsString } from "class-validator"

export default class CategoriaProdutoModel {

  id!: number

  @Length(3, 255, { message: 'A categoria deve conter entre 3 e 255 caracteres' })
  @IsNotEmpty({ message: 'A categoria deve ser informada' })
  @IsString({ message: 'A categoria deve ser uma string' })
categoria!: string


  async getAll(params?: {
    skip?: number
    take?: number
    cursor?: Prisma.categoriaProdutoWhereUniqueInput
    where?: Prisma.categoriaProdutoWhereInput
    orderBy?: Prisma.categoriaProdutoOrderByWithRelationInput
    include?: Prisma.categoriaProdutoInclude
  }
  ): Promise<categoriaProduto[]> {
    try {

      const categorias = await prisma.categoriaProduto.findMany({
        ...params
      })

      return categorias

    } catch (error: any) {
      throw new Error(prismaErros(error))

    }
  }

  async getOne(params: {
    where: Prisma.categoriaProdutoWhereUniqueInput
    include?: Prisma.categoriaProdutoInclude
  }): Promise<categoriaProduto | null> {
    try {

      const categoriaProduto = await prisma.categoriaProduto.findUnique({
        ...params
      })

      return categoriaProduto

    } catch (error: any) {
      throw new Error(prismaErros(error))

    }
  }

  async create(
    categoriaData: Prisma.categoriaProdutoCreateInput
  ): Promise<number> {
    try {
      const categoria = await prisma.categoriaProduto.create({
        data: {
          ...categoriaData,
        }
      })
      
      return categoria.id

    } catch (error: any) {

      throw new Error(prismaErros(error))
    }
  }

  async update(params: {
    where: Prisma.categoriaProdutoWhereUniqueInput
    data: Prisma.categoriaProdutoUpdateInput
  }): Promise<categoriaProduto | null> {
    try {
      const nomeCategoria = await prisma.categoriaProduto.update({
        ...params
      })

      return nomeCategoria

    } catch (error: any) {

      throw new Error(prismaErros(error))
    }
  }

}
