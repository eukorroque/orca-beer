import { Usuario, Prisma } from "@prisma/client"
import prisma from "../config/prisma"
import prismaErros from "../utils/prismaErros.util"
import { IsNumber, IsNotEmpty, Length, IsString, IsEmail, Min } from "class-validator"

export default class UsuarioModel implements Usuario {

  id!: number

  @IsNotEmpty({ message: 'O CNPJ deve ser informado' })
  @Length(14, 14, { message: 'O CNPJ deve conter 14 dígitos' })
  cnpj!: string

  @IsNotEmpty({ message: 'O nome fantasia deve ser informado' })
  @IsString({ message: 'O nome fantasia está em um formato incorreto' })
  @Length(3, 255, { message: 'O nome fantasia deve conter entre 3 e 255 caracteres' })
  nomeFantasia!: string

  @IsNotEmpty({ message: 'A razão social deve ser informada' })
  @IsString({ message: 'A razão social está em um formato incorreto' })
  @Length(3, 255, { message: 'A razão social deve conter entre 3 e 255 caracteres' })
  razaoSocial!: string

  @IsNotEmpty({ message: 'O e-mail deve ser informado' })
  @IsEmail({}, { message: 'O e-mail informado é inválido' })
  @Length(10, 100, { message: 'O e-mail deve conter entre 10 e 255 caracteres' })
  email!: string

  @IsNotEmpty({ message: 'O CPF do responsável deve ser informado' })
  @Length(11, 11, { message: 'O CPF do responsável deve conter 11 dígitos' })
  cpfResponsavel!: string

  @IsNotEmpty({ message: 'O nome do responsável deve ser informado' })
  @IsString({ message: 'O nome do responsável está em um formato incorreto' })
  @Length(3, 255, { message: 'O nome do responsável deve conter entre 3 e 255 caracteres' })
  nomeResponsavel!: string

  @IsNotEmpty({ message: 'A senha deve ser informada' })
  senha!: string

  @IsNotEmpty({ message: 'O telefone deve ser informado' })
  @Length(11, 11, { message: 'O telefone deve conter 11 dígitos' })
  telefone!: string

  @IsNotEmpty({ message: 'A avaliação deve ser informada' })
  @IsNumber({}, { message: 'A avaliação deve ser um número' })
  @Min(0, { message: 'A avaliação deve ser maior ou igual a 0' })
  avaliacao = 0

  @IsNotEmpty({ message: 'Os créditos devem ser informados' })
  @IsNumber({}, { message: 'Os créditos devem ser um número' })
  @Min(0, { message: 'Os créditos devem ser maior ou igual a 0' })
  cashback = 0

  @IsNumber({}, { message: 'O rádio de atendimento deve ser um número' })
  @Min(0, { message: 'O rádio de atendimento deve ser maior ou igual a 0' })
  radioAtendimento = 0

  @IsNumber({}, { message: 'A quantidade de vezes indicadas deve ser um número' })
  @Min(0, { message: 'A quantidade de vezes indicadas deve ser maior ou igual a 0' })
  vezesIndicou = 0

  @IsNumber({}, { message: 'A quantidade de pedidos restantes deve ser um número' })
  @Min(0, { message: 'A quantidade de pedidos restantes deve ser maior ou igual a 0' })
  qtdPedidosRestantes = 1

  @IsString({ message: 'O código de convite está em um formato incorreto' })
  codigoConvite = ''

  @IsNumber({}, { message: 'O ID de status deve ser um número' })
  statusId!: number

  @IsNumber({}, { message: 'O tipo de conta deve ser um número' })
  tpConta!: number

  criadoEm!: Date

  atualizadoEm!: Date


  async getAll(params?: {
    skip?: number
    take?: number
    cursor?: Prisma.UsuarioWhereUniqueInput
    where?: Prisma.UsuarioWhereInput
    orderBy?: Prisma.UsuarioOrderByWithRelationInput
    include?: Prisma.UsuarioInclude
  }
  ): Promise<Usuario[]> {
    try {

      const usuarios = await prisma.usuario.findMany({
        ...params,
      })

      return usuarios

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
  }): Promise<boolean> {
    try {
      const usuario = await prisma.usuario.update({
        ...params
      })

      if (usuario) return true

      return false

    } catch (error: any) {

      throw new Error(prismaErros(error))
    }
  }
}