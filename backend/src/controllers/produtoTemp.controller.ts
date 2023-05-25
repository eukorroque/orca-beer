import { HttpStatus } from "../enums/httpStatus.enum"
import ProdutoTempModel from "../models/produtoTemp.model"
import { NextFunction, Request, Response } from 'express'
import ProdutoTempService from "../services/produtoTemp.service"

export default class ProdutoTempController {

  constructor (
    private produtoTempModel: ProdutoTempModel,
    private produtoTempService: ProdutoTempService
  ) {
  }

  async getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

      const produtosTemp = await this.produtoTempModel.getAll()

      if (produtosTemp.length <= 0) {
        return next('Não há produtos para validação')
      }

      res.status(HttpStatus.OK).json({
        ok: true,
        data: produtosTemp
      })

    } catch (error) {
      return next('Ocorreu um erro ao tentar listar os produtos.')
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

      const { produtoTemp } = req.body

      const resultProdutoTemp = await this.produtoTempService.create(produtoTemp)


      // switch (resultProdutoTemp) {
      //   case 1:
      //     res.status(HttpStatus.OK).json({
      //       ok: true,
      //       msg: 'Produto já cadastrado em nossa base de dados.',
      //     })
      //     break
      //   case 2:
      //     res.status(HttpStatus.OK).json({
      //       ok: true,
      //       msg: msgResponse,
      //       data: updateProdutoTemp
      //     })
      //     break
      // }

      // res.status(HttpStatus.CREATED).json({
      //   ok: true,
      //   msg: msgResponse,
      //   id: idProdutoTemp
      // })

      const status = resultProdutoTemp.updated ? HttpStatus.CREATED : HttpStatus.OK

      res.status(status).json({
        msg: 'Produto temporário incluído com sucesso!',
        ...resultProdutoTemp
      })


    } catch (error: any) {
      return next(error.message)
    }

  }

}
