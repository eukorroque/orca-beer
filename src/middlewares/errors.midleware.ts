import { NextFunction, Request, Response } from 'express'
import { HttpStatus } from '../enums/httpStatus.enum'

// se remover o _next, o middleware não funciona. Precisa ter 4 parametros
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorInterceptor = (err: any, _req: Request, res: Response, _next: NextFunction) => {


  let msg = err
  let status = HttpStatus.INTERNAL_SERVER_ERROR

  // até o momento nunca vai cair aqui. Não temos middleware para isso. Porém a função ja está pronta até mesmo se precisar tratar outros tipos de erro através desse switch
  switch (err.code) {
    case 'ETIMEDOUT':
      msg = 'Parece que o servidor está demorando para responder. Tente novamente mais tarde.'
      status = HttpStatus.REQUEST_TIMEOUT
      break

    default:
      break
  }

  res.status(status).json({
    ok: false,
    msg
  })

  return
}

export default errorInterceptor