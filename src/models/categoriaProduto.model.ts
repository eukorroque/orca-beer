import { categoriaProduto, Prisma } from "@prisma/client";
import prisma from "../config/prisma";
import prismaErros from "../utils/prismaErros.util";

export default class CategoriaProdutoModel {

  async getAll(params?: {
    skip?: number
    take?: number
    cursor?: Prisma.categoriaProdutoWhereUniqueInput
    where?: Prisma.categoriaProdutoWhereInput
    orderBy?: Prisma.categoriaProdutoOrderByWithRelationInput
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

}
