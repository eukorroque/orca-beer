import { Usuario, Prisma } from "@prisma/client"
import prisma from "../config/prisma"
import prismaErros from "../utils/prismaErros.util"
import { IsNumber, IsNotEmpty, Length, IsString, IsEmail, Min, Matches } from "class-validator"
import NAME_REGEX from "../utils/nameRegex"
import NUMBER_REGEX from "../utils/numberRegex"

export default class UsuarioModel implements Usuario {

  id!: number

  @IsNotEmpty({ message: 'O CNPJ deve ser informado' })
  @Length(14, 14, { message: 'O CNPJ deve conter 14 dígitos' })
  @Matches(NUMBER_REGEX, { message: 'O CNPJ deve conter apenas números' })
  cnpj!: string


  @IsNotEmpty({ message: 'O nome fantasia deve ser informado' })
  @IsString({ message: 'O nome fantasia deve ser uma string' })
  @Length(3, 255, { message: 'O nome fantasia deve conter entre 3 e 255 caracteres' })
  @Matches(NAME_REGEX, { message: 'O nome fantasia deve conter apenas caracteres alfanuméricos' })
  nomeFantasia!: string


  @IsNotEmpty({ message: 'A razão social deve ser informada' })
  @IsString({ message: 'A razão social deve ser uma string' })
  @Length(3, 255, { message: 'A razão social deve conter entre 3 e 255 caracteres' })
  @Matches(NAME_REGEX, { message: 'O nome fantasia deve conter apenas caracteres alfanuméricos' })
  razaoSocial!: string


  @IsNotEmpty({ message: 'O e-mail deve ser informado' })
  @IsEmail({}, { message: 'O e-mail informado é inválido' })
  @Length(10, 100, { message: 'O e-mail deve conter entre 10 e 255 caracteres' })
  email!: string


  @IsNotEmpty({ message: 'O CPF do responsável deve ser informado' })
  @Length(11, 11, { message: 'O CPF do responsável deve conter 11 dígitos' })
  @Matches(NUMBER_REGEX, { message: 'O CPF do responsável deve conter apenas números' })
  cpfResponsavel!: string


  @IsNotEmpty({ message: 'O nome do responsável deve ser informado' })
  @IsString({ message: 'O nome do responsável deve ser uma string' })
  @Length(3, 255, { message: 'O nome do responsável deve conter entre 3 e 255 caracteres' })
  @Matches(NAME_REGEX, { message: 'O nome fantasia deve conter apenas caracteres alfanuméricos' })
  nomeResponsavel!: string


  @IsNotEmpty({ message: 'A senha deve ser informada' })
  senha!: string


  @IsNotEmpty({ message: 'O telefone deve ser informado' })
  @Length(11, 11, { message: 'O telefone deve conter entre 11 e 11 dígitos' })
  @Matches(NUMBER_REGEX, { message: 'O telefone deve conter apenas números' })
  telefone!: string


  ultimaValidacaoTelefone!: Date



  @IsNotEmpty({ message: 'A avaliação deve ser informada' })
  @IsNumber({}, { message: 'A avaliação deve ser um número' })
  @Min(0, { message: 'A avaliação deve ser maior ou igual a 0' })
  avaliacao = 0


  @IsNotEmpty({ message: 'O valor de cashback devem ser informados' })
  @IsNumber({}, { message: 'O valor de cashback devem ser um número' })
  @Min(0, { message: 'O valor de cashback deve ser maior ou igual a 0' })
  cashback = 0


  @IsNumber({}, { message: 'O rádio de atendimento deve ser um número' })
  @Min(0, { message: 'O rádio de atendimento deve ser maior ou igual a 0' })
  alcance = 0


  @IsNumber({}, { message: 'A quantidade de vezes indicadas deve ser um número' })
  @Min(0, { message: 'A quantidade de vezes indicadas deve ser maior ou igual a 0' })
  vezesIndicou = 0


  @IsNumber({}, { message: 'A quantidade de pedidos restantes deve ser um número' })
  @Min(0, { message: 'A quantidade de pedidos restantes deve ser maior ou igual a 0' })
  qtdPedidosRestantes = 1

  @IsString({ message: 'O código de convite deve ser uma string' })
  codigoConvite = ''

  @IsNumber({}, { message: 'O ID de status deve ser um número' })
  statusId!: number

  @IsNumber({}, { message: 'O tipo de conta deve ser um número' })
  tpConta!: number

  ultimoLogin!: Date

  criadoEm!: Date

  atualizadoEm!: Date


  async getAll(params?: {
    skip?: number
    take?: number
    cursor?: Prisma.UsuarioWhereUniqueInput
    where?: Prisma.UsuarioWhereInput
    orderBy?: Prisma.UsuarioOrderByWithRelationInput
    include?: Prisma.UsuarioInclude
    select?: Prisma.UsuarioSelect
  }
  ): Promise<Usuario[]> {
    try {

      const usuarios = await prisma.usuario.findMany({
        ...params
      })

      return usuarios

    } catch (error: any) {
      throw new Error(prismaErros(error))

    }
  }

  async getOne(params: {
    where: Prisma.UsuarioWhereUniqueInput
    include?: Prisma.UsuarioInclude
    select?: Prisma.UsuarioSelect
  }): Promise<Usuario | null> {
    try {

      const usuario = await prisma.usuario.findUnique({
        ...params
      })

      return usuario

    } catch (error: any) {
      throw new Error(prismaErros(error))

    }
  }


  async create(
    usuarioData: Prisma.UsuarioCreateInput,
    enderecoData?: Prisma.EnderecoCreateInput
  ): Promise<number> {
    try {
      const usuario = await prisma.usuario.create({
        data: {
          ...usuarioData,
          ...enderecoData && {
            Endereco: {
              create: {
                ...enderecoData
              }
            }
          }
        }
      })


      return usuario.id

    } catch (error: any) {

      throw new Error(prismaErros(error))
    }
  }

  async update(params: {
    where: Prisma.UsuarioWhereUniqueInput
    data: Prisma.UsuarioUpdateInput
  }): Promise<Usuario | null> {
    try {
      const usuario = await prisma.usuario.update({
        ...params
      })

      return usuario

    } catch (error: any) {

      throw new Error(prismaErros(error))
    }
  }
}