import { validate } from "class-validator"
import { HttpStatus } from "../enums/httpStatus.enum"
import UsuarioModel from "../models/usuario.model"
import { NextFunction, Request, Response } from 'express'
import classValidatorErros from "../utils/classValidatorErros.util"
import StatusUsuarioModel from "../models/statusUsuario.model"

export default class UsuarioController {

  constructor (
    private usuarioModel: UsuarioModel,
    private statusModel: StatusUsuarioModel
  ) {
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

      const { type } = req.params

      if (!type || !Number.isInteger(parseInt(type))) {
        return next('Informe o tipo de usuário que deseja ver')
      }

      const newType = parseInt(type)

      const usuarios = await this.usuarioModel.getAll({
        where: {
          tpConta: newType
        },
        include: {
          Endereco: true
        }
      })

      if (usuarios.length <= 0) {
        return next('Ainda não há usuários cadastrados')
      }

      res.status(HttpStatus.OK).json({
        ok: true,
        data: usuarios
      })

    } catch (error) {
      return next('Ocorreu um erro ao tentar listar os usuários selecionados')
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { type } = req.params
      const { usuario, endereco } = req.body
      let msgResponse = ''


      if (!type || !Number.isInteger(parseInt(type))) {
        return next('Informe o tipo de usuário que deseja criar')
      }

      const newType = parseInt(type)

      if (!usuario || !endereco) {
        return next('Não foram passados todos os dados necessários para o cadastro')
      }

      switch (newType) {

        // 1: fornecedor
        case 1:
          // pendente
          usuario.statusId = 1
          msgResponse = 'Fornecedor adicionado com sucesso. Agora só aguardar nosso time validar seus dados :)'

          break

        // 2: lojista
        case 2:
          //aprovado
          usuario.statusId = 8
          usuario.codigoConvite = await this.GenerateUniqueInviteCode()
          msgResponse = 'Lojista adicionado com sucesso. Aproveite nossos serviços :)'

          break

        // 3: admin
        case 3:
          // a principio será o id do admin

          // aprovado
          usuario.statusId = 8
          msgResponse = 'Admin adicionado com sucesso. Bom trabalho :D'
          break
        default:
          return next('Tipo de usuário inválido')
      }

      usuario.tpConta = newType
      const errors = await validate(Object.assign(new UsuarioModel(), usuario))

      if (errors.length > 0) {
        const newError = classValidatorErros(errors)

        if (newType !== 3) {
          return next(newError)
        }

        // só passar aqui nesse if os campos que não serão necessários para cadastrar um admin
        if (
          !newError.cnpj &&
          !newError.nomeFantasia &&
          !newError.razaoSocial
        ) {
          return next(newError)
        }



      }

      const idUsuario = await this.usuarioModel.create({
        ...usuario,
        Endereco: {
          create: {
            ...endereco
          }
        }
      })

      res.status(HttpStatus.CREATED).json({
        ok: true,
        msg: msgResponse,
        id: idUsuario
      })

    } catch (error: any) {
      return next(error.message)
    }

  }


  async updateStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id, status } = req.params



      if (!id || !Number.isInteger(parseInt(id))) {
        return next('Informe o id do usuario que deseja atualizar o status.')
      }

      const newIdUser = parseInt(id)
      const existsUser = await this.usuarioModel.getOne({ where: { id: newIdUser } })

      if (!existsUser) {
        return next('O usuário informado não existe.')
      }




      if (!status || !Number.isInteger(parseInt(status))) {
        return next('Informe o status que deseja atualizar o usuário.')
      }

      const newStatus = parseInt(status)
      const statusExists = await this.statusModel.getOne({ where: { id: newStatus } })

      if (!statusExists) {
        return next('O status informado não existe.')
      }




      const newUser = await this.usuarioModel.update({
        where: { id: newIdUser },
        data: {
          status: {
            update: {
              id: newStatus
            }
          }
        }
      })

      if (!newUser) {
        return next('Não foi possível atualizar o status do usuário. Tente novamente mais tarde.')
      }


      res.status(HttpStatus.OK).json({
        ok: true,
        msg: 'O status do usuário foi atualizado com sucesso.',
      })

    } catch (error: any) {
      return next(error.message)
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
