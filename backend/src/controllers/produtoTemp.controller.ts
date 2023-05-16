import { HttpStatus } from "../enums/httpStatus.enum"
import ProdutoTempModel from "../models/produtoTemp.model"
import { NextFunction, Request, Response } from 'express'
// eslint-disable-next-line import/namespace, import/default, import/no-named-as-default, import/no-named-as-default-member
import CategoriaProdutoModel from "../models/categoriaProduto.model"
import { validate } from "class-validator"
import classValidatorErros from "../utils/classValidatorErros.util"
import ProdutoModel from "../models/produto.model"

export default class ProdutoTempController {

  constructor (
    private produtoTempModel: ProdutoTempModel,
    private categoriaProdutoModel: CategoriaProdutoModel,
    private produtoModel: ProdutoModel
  ) {
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
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
      const msgResponse = 'Produto incluído com sucesso!'

      const errors = await validate(Object.assign(new ProdutoTempModel(), produtoTemp))

      if (errors.length > 0) {
        const newError = classValidatorErros(errors)
        return next(newError)
      }

      produtoTemp.categoriaId = parseInt(produtoTemp.categoriaId)

      const existsCategoria = await this.categoriaProdutoModel.getOne({ where: { id: produtoTemp.categoriaId } })


      if (!existsCategoria) {
        return next('A categoria informada não existe.')
      }

      const produtoAlreadyExists = await this.produtoModel.getOne({
        where: {
          nome: produtoTemp.nome
        }
      })

      if (produtoAlreadyExists) {
        res.status(HttpStatus.OK).json({
          ok: true,
          msg: 'Produto já cadastrado em nossa base de dados.',
        })

        return
      }

      const existsNome = await this.produtoTempModel.getOne({
        where: {
          nome: produtoTemp.nome
        }
      })

      if (existsNome) {

        const updateProdutoTemp = await this.produtoTempModel.update({
          where: { nome: `${produtoTemp.nome}` },
          data: {
            qtdInclusao: {
              increment: 1
            }
          }
        })

        if (!updateProdutoTemp) {
          return next('Ocorreu um erro ao tentar adicionar o produto em nossa base de dados.')
        }

        res.status(HttpStatus.OK).json({
          ok: true,
          msg: msgResponse,
          data: updateProdutoTemp
        })
        return
      }

      produtoTemp.qtdInclusao = 1

      const idProdutoTemp = await this.produtoTempModel.create({
        ...produtoTemp
      })

      res.status(HttpStatus.CREATED).json({
        ok: true,
        msg: msgResponse,
        id: idProdutoTemp
      })

    } catch (error: any) {
      return next(error.message)
    }

  }

}
