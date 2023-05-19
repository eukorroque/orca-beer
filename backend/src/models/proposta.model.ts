import { Prisma, Proposta } from "@prisma/client"
import prisma from "../config/prisma"
import prismaErros from "../utils/prismaErros.util"

export default class PropostaModel implements Proposta {
  id!: number
  pedidoId!: number
  fornecedorId!: number
  lojistaId!: number
  frete!: number | null
  valor!: number
  statusId!: number
  produtos!: Prisma.JsonValue
  criadoEm!: Date
  atualizadoEm!: Date

  async getAll(params?: {
    skip?: number
    take?: number
    cursor?: Prisma.PropostaWhereUniqueInput
    where?: Prisma.PropostaWhereInput
    orderBy?: Prisma.PropostaOrderByWithRelationInput
    include?: Prisma.PropostaInclude
    select?: Prisma.PropostaSelect
  }
  ): Promise<Proposta[]> {
    try {

      const proposta = await prisma.proposta.findMany({
        ...params
      })

      return proposta

    } catch (error: any) {
      throw new Error(prismaErros(error))

    }
  }

  async getOne(params: {
    include?: Prisma.PropostaInclude
    select?: Prisma.PropostaSelect
    where: Prisma.PropostaWhereUniqueInput
  }): Promise<Proposta | null> {
    try {

      const proposta = await prisma.proposta.findUnique({
        ...params
      })

      return proposta

    } catch (error: any) {
      throw new Error(prismaErros(error))

    }
  }

}
