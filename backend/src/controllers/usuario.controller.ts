import { HttpStatus } from "../enums/httpStatus.enum"
import UsuarioModel from "../models/usuario.model"
import { NextFunction, Request, Response } from 'express'
import { Prisma } from "@prisma/client"
import createToken from "../utils/createToken"
import UsuarioService from "../services/usuario.service"
import SessionModel from "../models/session.model"

export default class UsuarioController {

  constructor (
    private usuarioModel: UsuarioModel,
    private usuarioService: UsuarioService,
    private sessionModel: SessionModel
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

      if (!type || !Number.isInteger(parseInt(type))) {
        return next('Informe o tipo de usuário que deseja criar')
      }

      const newType = parseInt(type)

      if (!usuario || !endereco) {
        return next('Não foram passados todos os dados necessários para o cadastro')
      }

      usuario.tpConta = newType
      const idUsuario = await this.usuarioService.createUsuarioComEndereco(usuario, endereco)

      res.status(HttpStatus.CREATED).json({
        ok: true,
        msg: newType === 1 ?
          'Fornecedor adicionado com sucesso. Agora só aguardar nosso time validar seus dados :)' :
          'Lojista adicionado com sucesso. Aproveite nossos serviços :)',
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

      if (!status || !Number.isInteger(parseInt(status))) {
        return next('Informe o status que deseja atualizar o usuário.')
      }


      const newIdUser = parseInt(id)
      const newStatus = parseInt(status)


      const newUser = await this.usuarioService.updateStatusUsuario(newIdUser, newStatus)


      if (!newUser) {
        return next('Não foi possível atualizar o status do usuário. Tente novamente mais tarde.')
      }


      res.status(HttpStatus.OK).json({
        ok: true,
        msg: `Status do usuário '${newUser.nomeResponsavel}' atualizado com sucesso.`
      })

    } catch (error: any) {
      return next(error.message)
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { cpfOrCnpj, senha } = req.body

      if (!cpfOrCnpj || !senha) {
        return next('Informe o cpf/Cnpj e a senha para realizar o login.')
      }

      if (cpfOrCnpj.length < 11 || cpfOrCnpj.length > 14) {
        return next('O cpf/Cnpj informado é inválido.')
      }

      const isCnpj = cpfOrCnpj.length === 14 ? true : false

      const select: Prisma.UsuarioSelect = {
        id: true,
        statusId: true,
        tpConta: true,
        senha: true,
        ...isCnpj ?
          { nomeFantasia: true } :
          { nomeResponsavel: true }
      }

      // se for cpf, é necessário buscar pelo cpf do responsável.
      let user = isCnpj ?

        await this.usuarioModel.getOne({
          where: { cnpj: cpfOrCnpj },
          select
        }) :

        await this.usuarioModel.getAll({
          where: {
            cpfResponsavel: cpfOrCnpj,
            AND: [
              // o tipo de conta não pode ser 1 pois pode ocorrer algum caso de algum fornecedor ter o mesmo cpf do responsável.
              { tpConta: { not: 1 } },
              { statusId: { not: 7 } }
            ]

          },
          select
        })

      if (Array.isArray(user)) user = user[0]

      if (!user || user.statusId === 7) {
        return next('Usuário não encontrado.')
      }


      switch (user.statusId) {
        case 1:
          return next('Sua conta ja foi criada com sucesso. Porém, nosso time ainda está validando seus dados. Ja já você poderá acessar nossa plataforma :)')

        case 2:
          return next('já iniciamos a analise dos seus dados. Em breve você poderá acessar nossa plataforma :)')

        case 3:
          return next('Seus dados foram reprovados. Entre em contato com nosso time para mais informações.')

        case 4:
          return next('Sua conta foi banida. Entre em contato com nosso time para mais informações.')

        case 5:
          return next('Sua conta foi bloqueada. Entre em contato com nosso time para mais informações.')

        default:
          break
      }

      //TODO: validar se a senha bate. quando tiver o bcrypt
      if (user.senha !== senha) {
        return next('Senha incorreta.')
      }

      // dados necessários para fazer o token:
      const token = createToken({
        id: user.id,
        statusId: user.statusId,
        tpConta: user.tpConta,
        nome: user.nomeFantasia || user.nomeResponsavel
      }, '7d')

      const session = await this.sessionModel.create({
        token,
        expiraEm: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        usuario: {
          connect: {
            id: user.id
          }
        }
      })

      if (!session) {
        return next('Não foi possível criar a sessão. Tente novamente mais tarde.')
      }

      // criando cookie e salvando no navegador do usuário:
      res.setHeader('Set-Cookie', `token=${token}; path=/; HttpOnly; SameSite=Strict; ${process.env.NODE_ENV === 'production' ? 'Secure;' : ''}`)

      res.status(HttpStatus.OK).json({
        ok: true,
        data: {
          id: user.id,
          nome: user.nomeFantasia || user.nomeResponsavel
        }
      })

    } catch (error: any) {
      return next(error.message)
    }
  }



}
