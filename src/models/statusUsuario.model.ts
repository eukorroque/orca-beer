import { Status, Prisma } from "@prisma/client"
import prisma from "../config/prisma"
import prismaErros from "../utils/prismaErros.util"

export default class StatusUsuarioModel {

  async getAll(params?: {
    skip?: number
    take?: number
    cursor?: Prisma.StatusWhereUniqueInput
    where?: Prisma.StatusWhereInput
    orderBy?: Prisma.StatusOrderByWithRelationInput
    include?: Prisma.StatusInclude
    select?: Prisma.StatusSelect
  }
  ): Promise<Status[]> {
    try {

      const status = await prisma.status.findMany({
        ...params
      })

      return status

    } catch (error: any) {
      throw new Error(prismaErros(error))

    }
  }

  async getOne(params: {
    include?: Prisma.StatusInclude
    select?: Prisma.StatusSelect
    where: Prisma.StatusWhereUniqueInput
  }): Promise<Status | null> {
    try {

      const status = await prisma.status.findUnique({
        ...params
      })

      return status

    } catch (error: any) {
      throw new Error(prismaErros(error))

    }
  }

}
