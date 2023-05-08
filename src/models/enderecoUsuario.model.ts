import { Prisma, Endereco } from "@prisma/client"
import prisma from "../config/prisma"
import prismaErros from "../utils/prismaErros.util"
import { IsNumber, IsNotEmpty, Length, IsString } from "class-validator"

export default class EnderecoUsuarioModel implements Endereco {
  id!: number

  @IsNumber({}, { message: 'O número deve conter apenas caracteres numéricos' })
  numero!: number | null

  @IsNotEmpty({ message: 'O CEP deve ser informado' })
  @Length(8, 8, { message: 'O CEP deve conter 8 dígitos' })
  @IsNumber({}, { message: 'O CEP deve conter apenas caracteres numéricos' })
  cep!: string

  @IsNotEmpty({ message: 'A rua deve ser informada' })
  @IsString({ message: 'A rua está em um formato incorreto' })
  @Length(3, 100, { message: 'A rua deve conter entre 3 e 100 caracteres' })
  rua!: string

  @IsString({ message: 'O complemento está em um formato incorreto' })
  complemento!: string | null

  @IsNotEmpty({ message: 'O bairro deve ser informado' })
  @IsString({ message: 'O bairro está em um formato incorreto' })
  @Length(3, 100, { message: 'O bairro deve conter entre 3 e 100 caracteres' })
  bairro!: string

  @IsNotEmpty({ message: 'A cidade deve ser informada' })
  @IsString({ message: 'A cidade está em um formato incorreto' })
  @Length(3, 100, { message: 'A cidade deve conter entre 3 e 100 caracteres' })
  cidade!: string

  @IsNotEmpty({ message: 'O estado deve ser informado' })
  @IsString({ message: 'O estado está em um formato incorreto' })
  @Length(2, 2, { message: 'O estado deve conter 2 caracteres' })
  estado!: string

  @IsNumber({}, { message: 'O ID do responsável deve ser um número' })
  responsavelId!: number

  criadoEm!: Date

  atualizadoEm!: Date



  async create(
    data: Prisma.EnderecoCreateInput
  ): Promise<number> {
    try {
      const endereco = await prisma.endereco.create({ data })

      return endereco.id

    } catch (error: any) {

      throw new Error(prismaErros(error))
    }
  }

  async update(params: {
    where: Prisma.EnderecoWhereUniqueInput
    data: Prisma.EnderecoUpdateInput
  }): Promise<Endereco | null> {
    try {
      const endereco = await prisma.endereco.update({
        ...params
      })

      return endereco

    } catch (error: any) {

      throw new Error(prismaErros(error))
    }
  }
}