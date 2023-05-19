import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import SessionModel from '../models/session.model'


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isLoggedInterceptor = (type?: Array<'admin' | 'lojista' | 'fornecedor'>) => (req: Request, res: Response, next: NextFunction) => {

  try {
    const authHeader = req.headers.authorization
    const secretToken = process.env.JWT_TOKEN as string
    const sessionModel = new SessionModel


    if (!authHeader) {
      next('Token não informado')
      return
    }

    const [bearer, token] = authHeader.split(' ')

    if (bearer !== 'Bearer' || !token) {
      next('Token não informado')
      return
    }

    jwt.verify(token, secretToken, { ignoreExpiration: true }, async (err, decoded) => {
      if (err) {
        next('Token inválido')
        return
      }

      const sessaoAtual = await sessionModel.getOne({
        where: {
          token
        }
      })

      if (!sessaoAtual) {
        next('Sessão não encontrada. Faça login novamente')
        return
      }

      if (sessaoAtual.interceptado) {
        next(`Sessão interceptada. Motivo: ${sessaoAtual.motivoInterceptacao}`)
        return
      }

      if (sessaoAtual.expiraEm < new Date()) {

        await sessionModel.delete({ token })

        res.clearCookie('token')

        next('Sessão expirada. Faça login novamente')
        return
      }


      req.body.userSession = decoded

      next()
    })
  } catch (err: any) {
    next(err.message)
  }
}

export default isLoggedInterceptor