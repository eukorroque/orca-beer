import { Lojista, Prisma } from "@prisma/client";
import prisma from "../config/prisma";
import prismaErros from "../utils/prismaErros.util";

export default class LojistaModel {

  async getAll(params?: {
    skip?: number
    take?: number
    cursor?: Prisma.LojistaWhereUniqueInput
    where?: Prisma.LojistaWhereInput
    orderBy?: Prisma.LojistaOrderByWithRelationInput
  }
  ): Promise<Lojista[]> {
    try {

      const lojistas = await prisma.lojista.findMany({
        ...params
      })

      return lojistas

    } catch (error: any) {
      throw new Error(prismaErros(error))

    }
  }

  async create(
    lojistaData: Prisma.LojistaCreateInput,
    enderecoData?: Prisma.EnderecoCreateInput
  ): Promise<number> {
    try {
      const lojista = await prisma.lojista.create({
        data: {
          ...lojistaData,
          ...enderecoData && {
            Endereco: {
              create: {
                ...enderecoData
              }
            }
          }
        }
      })


      return lojista.id

    } catch (error: any) {

      throw new Error(prismaErros(error))
    }
  }

  async update(params: {
    where: Prisma.LojistaWhereUniqueInput
    data: Prisma.LojistaUpdateInput
  }): Promise<boolean> {
    try {
      const lojista = await prisma.lojista.update({
        ...params
      })

      if (lojista) return true

      return false

    } catch (error: any) {

      throw new Error(prismaErros(error))
    }
  }
}