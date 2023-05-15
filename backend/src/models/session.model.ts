import { SessoesUsuario, Prisma } from "@prisma/client"
import prisma from "../config/prisma"
import prismaErros from "../utils/prismaErros.util"

export default class SessoesUsuarioModel {

  async getAll(params?: {
    skip?: number
    take?: number
    cursor?: Prisma.SessoesUsuarioWhereUniqueInput
    where?: Prisma.SessoesUsuarioWhereInput
    orderBy?: Prisma.SessoesUsuarioOrderByWithRelationInput
    select?: Prisma.SessoesUsuarioSelect
  }
  ): Promise<SessoesUsuario[]> {
    try {

      const sessoes = await prisma.sessoesUsuario.findMany({
        ...params
      })

      return sessoes

    } catch (error: any) {
      throw new Error(prismaErros(error))

    }
  }

  async getOne(params: {
    select?: Prisma.SessoesUsuarioSelect
    where: Prisma.SessoesUsuarioWhereUniqueInput
  }): Promise<SessoesUsuario | null> {
    try {

      const sessoes = await prisma.sessoesUsuario.findUnique({
        ...params
      })

      return sessoes

    } catch (error: any) {
      throw new Error(prismaErros(error))

    }
  }

  async create(
    sessoesData: Prisma.SessoesUsuarioCreateInput
  ): Promise<SessoesUsuario | null> {
    try {
      const sessoes = await prisma.sessoesUsuario.create({
        data: {
          ...sessoesData,
        }
      })


      return sessoes

    } catch (error: any) {

      throw new Error(prismaErros(error))
    }
  }

  async delete(
    where: Prisma.SessoesUsuarioWhereUniqueInput
  ): Promise<SessoesUsuario | null> {
    try {

      const sessoes = await prisma.sessoesUsuario.delete({
        where
      })

      return sessoes

    } catch (error: any) {
      throw new Error(prismaErros(error))

    }

  }

}
