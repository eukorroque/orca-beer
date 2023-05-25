import { Prisma, Admin } from "@prisma/client"
import prisma from "../config/prisma"
import prismaErros from "../utils/prismaErros.util"
import { IsNotEmpty, Length, IsString, IsEmail, Matches, IsOptional } from "class-validator"
import ALPHANUMERIC_REGEX from "../utils/regex/alphanumericRegex"
import NUMBER_REGEX from "../utils/regex/numberRegex"

export default class AdminModel implements Admin {

  id!: number

  @IsNotEmpty({ message: 'O nome deve ser informado' })
  @IsString({ message: 'O nome deve ser uma string' })
  @Length(2, 255, { message: 'O nome deve conter entre 2 e 255 caracteres' })
  @Matches(ALPHANUMERIC_REGEX, { message: 'O nome deve conter apenas caracteres alfanuméricos' })
  nome!: string


  @IsNotEmpty({ message: 'O e-mail deve ser informado' })
  @IsEmail({}, { message: 'O e-mail informado é inválido' })
  @Length(10, 100, { message: 'O e-mail deve conter entre 10 e 255 caracteres' })
  email!: string

  @IsNotEmpty({ message: 'A senha deve ser informada' })
  senha!: string


  @IsOptional()
  @Length(11, 11, { message: 'O telefone deve conter entre 11 e 11 dígitos' })
  @Matches(NUMBER_REGEX, { message: 'O telefone deve conter apenas números' })
  telefone = null

  @IsOptional()
  @Length(11, 11, { message: 'O CPF deve conter 11 dígitos' })
  @Matches(NUMBER_REGEX, { message: 'O CPF deve conter apenas números' })
  cpf = null


  @Matches(NUMBER_REGEX, { message: 'O tipo de conta deve conter apenas números' })
  tpAdmin!: number


  ultimoLogin!: Date

  criadoEm!: Date

  atualizadoEm!: Date


  async getAll(params?: {
    skip?: number
    take?: number
    cursor?: Prisma.AdminWhereUniqueInput
    where?: Prisma.AdminWhereInput
    orderBy?: Prisma.AdminOrderByWithRelationInput
    include?: Prisma.AdminInclude
    select?: Prisma.AdminSelect
  }
  ): Promise<Admin[]> {
    try {

      const data = await prisma.admin.findMany({
        ...params
      })

      return data

    } catch (error: any) {
      throw new Error(prismaErros(error))

    }
  }

  async getOne(params: {
    where: Prisma.AdminWhereUniqueInput
    include?: Prisma.AdminInclude
    select?: Prisma.AdminSelect
  }): Promise<Admin | null> {
    try {

      const data = await prisma.admin.findUnique({
        ...params
      })

      return data

    } catch (error: any) {
      throw new Error(prismaErros(error))

    }
  }


  async create(
    usuarioData: Prisma.AdminCreateInput
  ): Promise<number> {
    try {
      const admin = await prisma.admin.create({
        data: {
          ...usuarioData
        }
      })


      return admin.id

    } catch (error: any) {

      throw new Error(prismaErros(error))
    }
  }

  async update(params: {
    where: Prisma.AdminWhereUniqueInput
    data: Prisma.AdminUpdateInput
  }): Promise<Admin | null> {
    try {
      const admin = await prisma.admin.update({
        ...params
      })

      return admin

    } catch (error: any) {

      throw new Error(prismaErros(error))
    }
  }
}