import { Usuario, Prisma } from "@prisma/client";
import prisma from "../config/prisma";
import prismaErros from "../utils/prismaErros.util";
import { IsNumber, IsNotEmpty, Length, IsString, IsEmail } from "class-validator";

export default class UsuarioModel implements Usuario {

  /**
   * A ideia do class validator aqui é que alguns campos possuam suas validações basicas.
   * 
   * Ainda irei testar isso pois campos como "codigoConvite" aqui nn estou validando pois ele n é criado na hora do post de createUser. Porém
   * ele eventualmente terá que ser validado. Logo ainda nn sei se vou utilizar essa abordagem.
   */

  id!: number;

  @IsNotEmpty()
  @Length(14)
  cnpj!: string;

  @IsNotEmpty()
  @IsString()
  nomeFantasia!: string;

  @IsNotEmpty()
  @IsString()
  razaoSocial!: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Email inválido' })
  email!: string;

  @IsNotEmpty()
  @Length(11)
  cpfResponsavel!: string;

  @IsNotEmpty()
  @IsString()
  nomeResponsavel!: string;

  @IsNotEmpty()
  senha!: string;

  @IsNotEmpty()
  @Length(10, 11)
  telefone!: string;

  avaliacao!: number;

  creditos!: number;

  @IsNumber()
  radioAtendimento!: number;

  vezesIndicou!: number;

  qtdPedidosRestantes!: number;

  codigoConvite!: string;

  @IsNumber()
  statusId!: number;

  @IsNumber()
  tpConta!: number;

  criadoEm!: Date;

  atualizadoEm!: Date;


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