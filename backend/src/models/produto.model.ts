import { Produto, Prisma } from "@prisma/client";
import prisma from "../config/prisma";
import prismaErros from "../utils/prismaErros.util";

export default class ProdutoModel {

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