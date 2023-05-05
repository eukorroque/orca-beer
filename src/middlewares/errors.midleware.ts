import { NextFunction, Request, Response } from 'express'

const errorInterceptor = (err: any, _req: Request, res: Response, _next: NextFunction) => {

  res.status(500).json({
    ok: false,
    msg: err
  });
}

export default errorInterceptor