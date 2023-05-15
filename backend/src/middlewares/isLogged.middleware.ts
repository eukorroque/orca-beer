import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import SessionModel from '../models/session.model'


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isLoggedInterceptor = (type: Array<'admin' | 'lojista' | 'fornecedor'>) => (req: Request, res: Response, next: NextFunction) => {

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
      next('Usuário não autenticado')
      return
    }

    jwt.verify(token, secretToken, async (err, decoded) => {
      if (err) {

        if (err.name === 'TokenExpiredError') {
          next('Token expirado')
          return
        }

        next('Usuário não autenticado')
        return
      }

      const sessaoAtual = await sessionModel.getOne({
        where: {
          sid: token
        }
      })

      if (!sessaoAtual || new Date() > sessaoAtual.expiresAt) {
        next('Sua sessão foi expirada')
        return
      }

      req.session = decoded as any

      next()
    })
  } catch (err: any) {
    next(err.message)
  }
}

export default isLoggedInterceptor