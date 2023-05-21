import { Endereco, Usuario } from "@prisma/client"
import StatusUsuarioModel from "../models/statusUsuario.model"
import UsuarioModel from "../models/usuario.model"
import classValidatorErros from "../utils/classValidatorErros.util"
import { validate } from "class-validator"
import EnderecoUsuarioModel from "../models/enderecoUsuario.model"

export default class UsuarioService {

  constructor (
    private usuarioModel: UsuarioModel,
    private statusModel: StatusUsuarioModel
  ) { }

  async updateStatusUsuario(id: number, status: number): Promise<Usuario | null> {
    try {

      if (status === 1) {
        throw new Error('Não é possível atualizar o status para pendente.')
      }


      const existsUser = await this.usuarioModel.getOne({ where: { id } })

      if (!existsUser) {
        throw new Error('O usuário informado não existe.')
      }


      const statusExists = await this.statusModel.getOne({ where: { id: status } })

      if (!statusExists) {
        throw new Error('O status informado não existe.')
      }




      const newUser = await this.usuarioModel.update({
        where: { id },
        data: {
          status: {
            connect: {
              id: status
            }
          }
        }
      })

      return newUser

    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async createUsuarioComEndereco(usuario: Usuario, endereco: Endereco): Promise<number> {
    try {

      switch (usuario.tpConta) {

        // 1: fornecedor
        case 1:
          // pendente
          usuario.statusId = 1

          break

        // 2: lojista
        case 2:
          //aprovado
          usuario.statusId = 8
          usuario.codigoConvite = await this.GenerateUniqueInviteCode()

          break

        default:
          throw new Error('Tipo de usuário inválido')
      }

      const errors = await validate(Object.assign(new UsuarioModel(), usuario), {
        groups: [usuario.tpConta.toString()],
        stopAtFirstError: true
      })

      if (errors.length > 0) {
        const newError = classValidatorErros(errors)

        throw new Error(newError)

      }

      // validando os dados do endereço:
      const errorsEndereco = await validate(
        Object.assign(new EnderecoUsuarioModel(), endereco), {
        stopAtFirstError: true,
        groups: ['2']
      }
      )

      if (errorsEndereco.length > 0) {
        const newError = classValidatorErros(errorsEndereco)

        throw new Error(newError)
      }


      const data: any = {
        ...usuario,
      }

      const idUsuario = await this.usuarioModel.create({
        ...data,
        Endereco: {
          create: endereco
        }
      })


      return idUsuario

    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async GenerateUniqueInviteCode(): Promise<string> {

    // Considerando que o código deve ter 6 caracteres.
    // Gera um total de  36^6 = 2.176.782.336 possibilidades unicas.

    const qtdCaracteres = 6
    const code = Math.random().toString(36).substring(2, qtdCaracteres + 2)

    const alreadyExists = await this.usuarioModel.getOne({ where: { codigoConvite: code } })

    if (alreadyExists) {
      return this.GenerateUniqueInviteCode()
    }

    return code
  }
}