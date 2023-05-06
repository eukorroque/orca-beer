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

}
