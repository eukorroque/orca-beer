import { NextFunction, Request, Response } from 'express'

// se remover o _next, o middleware não funciona. Precisa ter 4 parametros
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorInterceptor = (err: any, _req: Request, res: Response, _next: NextFunction) => {

  res.status(500).json({
    ok: false,
    msg: err
  });
}

export default errorInterceptor