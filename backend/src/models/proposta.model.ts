import { Prisma, Proposta } from "@prisma/client"
import prisma from "../config/prisma"
import prismaErros from "../utils/prismaErros.util"
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, Min } from "class-validator"

export default class PropostaModel implements Proposta {
  id!: number

  @Min(1, { message: 'O id do pedido deve ser maior que 0' })
  @IsNumber({}, { message: 'O id do pedido deve ser um número válido' })
  @IsNotEmpty({ message: 'O id do pedido deve ser informado' })
  pedidoId!: number


  @Min(1, { message: 'O id do fornecedor deve ser maior que 0' })
  @IsNumber({}, { message: 'O id do fornecedor deve ser um número válido' })
  @IsNotEmpty({ message: 'O id do fornecedor deve ser informado' })
  fornecedorId!: number


  @Min(1, { message: 'O id do lojista deve ser maior que 0' })
  @IsNumber({}, { message: 'O id do lojista deve ser um número válido' })
  @IsNotEmpty({ message: 'O id do lojista deve ser informado' })
  lojistaId!: number


  @IsOptional()
  @Min(0, { message: 'O frete deve ser maior ou igual a 0' })
  @IsNumber({}, { message: 'O frete deve ser um número válido' })
  frete!: number | null

  @Min(0, { message: 'O valor deve ser maior que 0' })
  @IsNumber({}, { message: 'O valor deve ser um número válido' })
  @IsNotEmpty({ message: 'O valor deve ser informado' })
  valor!: number


  @Min(1, { message: 'O id do status deve ser maior que 0' })
  @IsNumber({}, { message: 'O id do status deve ser um número válido' })
  @IsNotEmpty({ message: 'O id do status deve ser informado' })
  statusId!: number


  @IsOptional()
  @IsBoolean({ message: 'O campo lojistaAceitou deve ser um booleano válido' })
  lojistaAceitou!: boolean | null


  @IsArray({ message: 'O array de produtos deve ser um array válido' })
  @IsNotEmpty({ message: 'O array de produtos deve ser informado' })
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

  async create(
    propostaData: Prisma.PropostaCreateInput
  ): Promise<number> {
    try {
      const proposta = await prisma.proposta.create({
        data: {
          ...propostaData,
        }
      })


      return proposta.id

    } catch (error: any) {

      throw new Error(prismaErros(error))
    }
  }


  async update(params: {
    where: Prisma.PropostaWhereUniqueInput
    data: Prisma.PropostaUpdateInput
  }): Promise<Proposta | null> {
    try {
      const proposta = await prisma.proposta.update({
        ...params
      })

      return proposta

    } catch (error: any) {

      throw new Error(prismaErros(error))
    }
  }

}
