import { Usuario, Prisma } from "@prisma/client"
import prisma from "../config/prisma"
import prismaErros from "../utils/prismaErros.util"
import { IsNumber, IsNotEmpty, Length, IsString, IsEmail, Min, Matches, IsOptional } from "class-validator"
import ALPHANUMERIC_REGEX from "../utils/regex/alphanumericRegex"
import NUMBER_REGEX from "../utils/regex/numberRegex"
import NAME_REGEX from "../utils/regex/nameRegex"

export default class UsuarioModel implements Usuario {

  // 1: Fornecedor
  // 2: Lojista

  id!: number

  @IsOptional({ groups: ['2'] })
  @IsNotEmpty({ message: 'O CNPJ deve ser informado', groups: ['1'] })
  @Length(14, 14, { message: 'O CNPJ deve conter 14 dígitos', groups: ['1', '2'] })
  @Matches(NUMBER_REGEX, { message: 'O CNPJ deve conter apenas números', groups: ['1', '2'] })
  cnpj = null


  @IsNotEmpty({ message: 'O nome fantasia deve ser informado', groups: ['1', '2'] })
  @IsString({ message: 'O nome fantasia deve ser uma string', groups: ['1', '2'] })
  @Length(3, 255, { message: 'O nome fantasia deve conter entre 3 e 255 caracteres', groups: ['1', '2'] })
  @Matches(ALPHANUMERIC_REGEX, { message: 'O nome fantasia deve conter apenas caracteres alfanuméricos', groups: ['1', '2'] })
  nomeFantasia!: string


  @IsNotEmpty({ message: 'A razão social deve ser informada', groups: ['1', '2'] })
  @IsString({ message: 'A razão social deve ser uma string', groups: ['1', '2'] })
  @Length(3, 255, { message: 'A razão social deve conter entre 3 e 255 caracteres', groups: ['1', '2'] })
  @Matches(ALPHANUMERIC_REGEX, { message: 'O nome fantasia deve conter apenas caracteres alfanuméricos', groups: ['1', '2'] })
  razaoSocial!: string


  @IsNotEmpty({ message: 'O e-mail deve ser informado', groups: ['1', '2'] })
  @IsEmail({}, { message: 'O e-mail informado é inválido', groups: ['1', '2'] })
  @Length(10, 100, { message: 'O e-mail deve conter entre 10 e 255 caracteres', groups: ['1', '2'] })
  email!: string


  @IsNotEmpty({ message: 'O CPF do responsável deve ser informado', groups: ['1', '2'] })
  @Length(11, 11, { message: 'O CPF do responsável deve conter 11 dígitos', groups: ['1', '2'] })
  @Matches(NUMBER_REGEX, { message: 'O CPF do responsável deve conter apenas números', groups: ['1', '2'] })
  cpfResponsavel!: string


  @IsNotEmpty({ message: 'O nome do responsável deve ser informado', groups: ['1', '2'] })
  @IsString({ message: 'O nome do responsável deve ser uma string', groups: ['1', '2'] })
  @Length(3, 255, { message: 'O nome do responsável deve conter entre 3 e 255 caracteres', groups: ['1', '2'] })
  @Matches(NAME_REGEX, { message: 'O nome fantasia não pode conter números/caracteres especiais', groups: ['1', '2'] })
  nomeResponsavel!: string


  @IsNotEmpty({ message: 'A senha deve ser informada', groups: ['1', '2'] })
  senha!: string


  @IsNotEmpty({ message: 'O telefone deve ser informado', groups: ['1', '2'] })
  @Length(11, 11, { message: 'O telefone deve conter entre 11 e 11 dígitos', groups: ['1', '2'] })
  @Matches(NUMBER_REGEX, { message: 'O telefone deve conter apenas números', groups: ['1', '2'] })
  telefone!: string


  ultimaValidacaoTelefone!: Date


  @IsOptional({ groups: ['1', '2'] })
  @IsNumber({}, { message: 'A avaliação deve ser um número', groups: ['1', '2'] })
  @Min(0, { message: 'A avaliação deve ser maior ou igual a 0', groups: ['1', '2'] })
  avaliacao = 0


  @IsOptional({ groups: ['1', '2'] })
  @IsNumber({}, { message: 'O valor de cashback devem ser um número', groups: ['1', '2'] })
  @Min(0, { message: 'O valor de cashback deve ser maior ou igual a 0', groups: ['1', '2'] })
  cashback!: number | null



  @IsOptional({ groups: ['1'] })
  @IsNumber({}, { message: 'O rádio de atendimento deve ser um número', groups: ['1'] })
  @Min(0, { message: 'O rádio de atendimento deve ser maior ou igual a 0', groups: ['1'] })
  alcance!: number | null



  @IsOptional({ groups: ['2'] })
  @IsNumber({}, { message: 'A quantidade de vezes indicadas deve ser um número', groups: ['2'] })
  @Min(0, { message: 'A quantidade de vezes indicadas deve ser maior ou igual a 0', groups: ['2'] })
  vezesIndicou!: number /// o proprio banco vai setar como default esse valor como 0


  @IsOptional({ groups: ['2'] })
  @IsNumber({}, { message: 'A quantidade de pedidos restantes deve ser um número', groups: ['2'] })
  @Min(0, { message: 'A quantidade de pedidos restantes deve ser maior ou igual a 0', groups: ['2'] })
  qtdPedidosRestantes!: number | null


  @IsOptional({ groups: ['2'] })
  @IsString({ message: 'O código de convite deve ser uma string', groups: ['2'] })
  @Length(6, 6, { message: 'O código de convite deve conter 6 caracteres', groups: ['2'] })
  codigoConvite!: string | null



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