import { validate } from "class-validator";
import { HttpStatus } from "../enums/httpStatus.enum";
import UsuarioModel from "../models/usuario.model";
import { NextFunction, Request, Response } from 'express'
import classValidatorErros from "../utils/classValidatorErros.util";

export default class UsuarioController {

  private _usuarioModel: UsuarioModel


  constructor(usuarioModel: UsuarioModel) {
    this._usuarioModel = usuarioModel
  }

  // TODO: fazer metodo para evitar ficar repetindo a validação do type.

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

      const { type } = req.params

      if (!type || !Number.isInteger(parseInt(type))) {
        return next('Informe o tipo de usuário que deseja ver')
      }

      const newType = parseInt(type)

      const usuarios = await this._usuarioModel.getAll({
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

      const idUsuario = await this._usuarioModel.create({
        ...usuario,
        ...newType !== 3 && {
          Endereco: {
            create: {
              ...endereco
            }
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

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params
      const { data } = req.body

      // adendo: não deixar atualizar certos campos. Como por exemplo: cnpj

      if (!id || !Number.isInteger(parseInt(id))) {
        return next('Informe o id do lojista que deseja atualizar os campos.')
      }

      if (!data) {
        return next('Não foi passado nenhum dado para atualização do cadastro do Lojista')
      }

      const updated = await this._usuarioModel.update({
        where: { id: Number(id) },
        data
      })

      if (!updated) {
        return next('Ocorreu um erro interno ao tentar atualizar os dados do Lojista. Tente novamente mais tarde :(')
      }

      res.status(HttpStatus.OK).json({
        ok: true,
        msg: 'Lojista atualizado com sucesso.',
      })

    } catch (error: any) {
      return next(error.message)
    }
  }

}
