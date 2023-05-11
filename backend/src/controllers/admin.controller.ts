import { validate } from "class-validator"
import { HttpStatus } from "../enums/httpStatus.enum"
import { NextFunction, Request, Response } from 'express'
import classValidatorErros from "../utils/classValidatorErros.util"
import AdminModel from "../models/admin.model"
// import createToken from "../utils/createToken"

export default class AdminController {

  constructor (
    private adminModel: AdminModel
  ) {
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { usuario } = req.body


      if (!usuario) {
        return next('Não foram passados todos os dados necessários para o cadastro')
      }

      const errors = await validate(Object.assign(new AdminModel(), usuario))

      if (errors.length > 0) {
        const newError = classValidatorErros(errors)

        return next(newError)

      }

      const idUsuario = await this.adminModel.create({
        ...usuario
      })

      res.status(HttpStatus.CREATED).json({
        ok: true,
        msg: 'Usuário cadastrado com sucesso.',
        id: idUsuario
      })

    } catch (error: any) {
      return next(error.message)
    }

  }


  // async updateStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
  //   try {
  //     const { id, status } = req.params



  //     if (!id || !Number.isInteger(parseInt(id))) {
  //       return next('Informe o id do usuario que deseja atualizar o status.')
  //     }

  //     const newIdUser = parseInt(id)
  //     const existsUser = await this.usuarioModel.getOne({ where: { id: newIdUser } })

  //     if (!existsUser) {
  //       return next('O usuário informado não existe.')
  //     }




  //     if (!status || !Number.isInteger(parseInt(status))) {
  //       return next('Informe o status que deseja atualizar o usuário.')
  //     }

  //     const newStatus = parseInt(status)

  //     if (newStatus === 1) {
  //       return next('Não é possível atualizar o status para pendente.')
  //     }

  //     const statusExists = await this.statusModel.getOne({ where: { id: newStatus } })

  //     if (!statusExists) {
  //       return next('O status informado não existe.')
  //     }


  //     const newUser = await this.usuarioModel.update({
  //       where: { id: newIdUser },
  //       data: {
  //         status: {
  //           connect: {
  //             id: newStatus
  //           }
  //         }
  //       }
  //     })

  //     if (!newUser) {
  //       return next('Não foi possível atualizar o status do usuário. Tente novamente mais tarde.')
  //     }


  //     res.status(HttpStatus.OK).json({
  //       ok: true,
  //       msg: `Status do usuário '${newUser.nomeResponsavel}' atualizado com sucesso.`
  //     })

  //   } catch (error: any) {
  //     return next(error.message)
  //   }
  // }

  // async login(req: Request, res: Response, next: NextFunction): Promise<void> {
  //   try {
  //     const { cpfOrCnpj, senha } = req.body

  //     if (!cpfOrCnpj || !senha) {
  //       return next('Informe o cpf/Cnpj e a senha para realizar o login.')
  //     }

  //     if (cpfOrCnpj.length < 11 || cpfOrCnpj.length > 14) {
  //       return next('O cpf/Cnpj informado é inválido.')
  //     }

  //     const isCnpj = cpfOrCnpj.length === 14 ? true : false

  //     const select: Prisma.UsuarioSelect = {
  //       id: true,
  //       statusId: true,
  //       tpConta: true,
  //       senha: true,
  //       ...isCnpj ?
  //         { nomeFantasia: true } :
  //         { nomeResponsavel: true }
  //     }

  //     let user = isCnpj ?
  //       await this.usuarioModel.getOne({
  //         where: { cnpj: cpfOrCnpj },
  //         select
  //       }) :
  //       await this.usuarioModel.getAll({
  //         where: {
  //           cpfResponsavel: cpfOrCnpj,
  //           AND: [
  //             { tpConta: { not: 1 } },
  //             { statusId: { not: 7 } }
  //           ]

  //         },
  //         select
  //       })

  //     // TODO: Perguntar referente a se o usuário vai ter q ter uma senha diferente para cada tipo de conta ou não.
  //     if (Array.isArray(user)) user = user[0]

  //     if (!user || user.statusId === 7) {
  //       return next('Usuário não encontrado.')
  //     }


  //     switch (user.statusId) {
  //       case 1:
  //         return next('Sua conta ja foi criada com sucesso. Porém, nosso time ainda está validando seus dados. Ja já você poderá acessar nossa plataforma :)')

  //       case 2:
  //         return next('já iniciamos a analise dos seus dados. Em breve você poderá acessar nossa plataforma :)')

  //       case 3:
  //         return next('Seus dados foram reprovados. Entre em contato com nosso time para mais informações.')

  //       case 4:
  //         return next('Sua conta foi banida. Entre em contato com nosso time para mais informações.')

  //       case 5:
  //         return next('Sua conta foi bloqueada. Entre em contato com nosso time para mais informações.')

  //       default:
  //         break
  //     }

  //     //todo: validar se a senha bate.


  //     // const token = createToken(user[0])

  //     // salvando token

  //     res.status(HttpStatus.OK).json({
  //       ok: true,
  //       // token,
  //       data: user
  //     })

  //   } catch (error: any) {
  //     return next(error.message)
  //   }
  // }


}
