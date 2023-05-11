import { unidadeProduto, Prisma } from "@prisma/client";
import prisma from "../config/prisma";
import prismaErros from "../utils/prismaErros.util";

export default class UnidadeProdutoModel {

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
      const unidade = await prisma.unidadeProduto.update({
        ...params
      })

      return unidade

    } catch (error: any) {

      throw new Error(prismaErros(error))
    }
  }

}
