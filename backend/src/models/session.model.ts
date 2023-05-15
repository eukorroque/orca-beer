import { Session, Prisma } from "@prisma/client"
import prisma from "../config/prisma"
import prismaErros from "../utils/prismaErros.util"

export default class SessionModel {

  async getAll(params?: {
    skip?: number
    take?: number
    cursor?: Prisma.SessionWhereUniqueInput
    where?: Prisma.SessionWhereInput
    orderBy?: Prisma.SessionOrderByWithRelationInput
    select?: Prisma.SessionSelect
  }
  ): Promise<Session[]> {
    try {

      const session = await prisma.session.findMany({
        ...params
      })

      return session

    } catch (error: any) {
      throw new Error(prismaErros(error))

    }
  }

  async getOne(params: {
    select?: Prisma.SessionSelect
    where: Prisma.SessionWhereUniqueInput
  }): Promise<Session | null> {
    try {

      const session = await prisma.session.findUnique({
        ...params
      })

      return session

    } catch (error: any) {
      throw new Error(prismaErros(error))

    }
  }

  async create(
    sessionData: Prisma.SessionCreateInput
  ): Promise<Session | null> {
    try {
      const session = await prisma.session.create({
        data: {
          ...sessionData,
        }
      })


      return session

    } catch (error: any) {

      throw new Error(prismaErros(error))
    }
  }

}
