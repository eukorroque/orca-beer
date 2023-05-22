import { Comissao, Prisma } from "@prisma/client"
import prisma from "../config/prisma"
import prismaErros from "../utils/prismaErros.util"

export default class ComissaoModel implements Comissao {

  // TODO: passar as validações do class-validator

  id!: number
  pedidoId!: number
  fornecedorId!: number
  lojistaId!: number
  valor!: number
  taxa!: number
  pago!: boolean
  criadoEm!: Date
  atualizadoEm!: Date



  async getAll(params?: {
    skip?: number
    take?: number
    cursor?: Prisma.ComissaoWhereUniqueInput
    where?: Prisma.ComissaoWhereInput
    orderBy?: Prisma.ComissaoOrderByWithRelationInput
    include?: Prisma.ComissaoInclude
    select?: Prisma.ComissaoSelect
  }
  ): Promise<Comissao[]> {
    try {

      const comissao = await prisma.comissao.findMany({
        ...params
      })

      return comissao

    } catch (error: any) {
      throw new Error(prismaErros(error))

    }
  }

  async getOne(params: {
    include?: Prisma.ComissaoInclude
    select?: Prisma.ComissaoSelect
    where: Prisma.ComissaoWhereUniqueInput
  }): Promise<Comissao | null> {
    try {

      const comissao = await prisma.comissao.findUnique({
        ...params
      })

      return comissao

    } catch (error: any) {
      throw new Error(prismaErros(error))

    }
  }

  async create(
    comissaoData: Prisma.ComissaoCreateInput
  ): Promise<number> {
    try {
      const comissao = await prisma.comissao.create({
        data: {
          ...comissaoData,
        }
      })


      return comissao.id

    } catch (error: any) {

      throw new Error(prismaErros(error))
    }
  }


  async update(params: {
    where: Prisma.ComissaoWhereUniqueInput
    data: Prisma.ComissaoUpdateInput
  }): Promise<Comissao | null> {
    try {
      const comissao = await prisma.comissao.update({
        ...params
      })

      return comissao

    } catch (error: any) {

      throw new Error(prismaErros(error))
    }
  }

}
