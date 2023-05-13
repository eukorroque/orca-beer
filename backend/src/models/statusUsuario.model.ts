import { StatusUsuario, Prisma } from "@prisma/client"
import prisma from "../config/prisma"
import prismaErros from "../utils/prismaErros.util"

export default class StatusUsuarioModel {

  async getAll(params?: {
    skip?: number
    take?: number
    cursor?: Prisma.StatusUsuarioWhereUniqueInput
    where?: Prisma.StatusUsuarioWhereInput
    orderBy?: Prisma.StatusUsuarioOrderByWithRelationInput
    include?: Prisma.StatusUsuarioInclude
    select?: Prisma.StatusUsuarioSelect
  }
  ): Promise<StatusUsuario[]> {
    try {

      const status = await prisma.statusUsuario.findMany({
        ...params
      })

      return status

    } catch (error: any) {
      throw new Error(prismaErros(error))

    }
  }

  async getOne(params: {
    include?: Prisma.StatusUsuarioInclude
    select?: Prisma.StatusUsuarioSelect
    where: Prisma.StatusUsuarioWhereUniqueInput
  }): Promise<StatusUsuario | null> {
    try {

      const status = await prisma.statusUsuario.findUnique({
        ...params
      })

      return status

    } catch (error: any) {
      throw new Error(prismaErros(error))

    }
  }

}
