import { Usuario, Prisma } from "@prisma/client";
import prisma from "../config/prisma";
import prismaErros from "../utils/prismaErros.util";

export default class UsuarioModel {

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