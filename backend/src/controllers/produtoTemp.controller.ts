import { HttpStatus } from "../enums/httpStatus.enum"
import ProdutoTempModel from "../models/produtoTemp.model"
import { NextFunction, Request, Response } from 'express'
import CategoriaProdutoModel from "../models/categoriaProduto.model"
import { validate } from "class-validator"
import classValidatorErros from "../utils/classValidatorErros.util"

export default class ProdutoTempController {

  constructor (
    private produtoTempModel: ProdutoTempModel,
    private categoriaProdutoModel: CategoriaProdutoModel
  ) {
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

      const produtosTemp = await this.produtoTempModel.getAll()

      if (produtosTemp.length <= 0) {
        return next('Ainda não foram cadastrados produtos pelos lojistas')
      }

      res.status(HttpStatus.OK).json({
        ok: true,
        data: produtosTemp
      })

    } catch (error) {
      return next('Ocorreu um erro ao tentar listar os produtos selecionados')
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

      const { produtoTemp } = req.body
      const msgResponse = 'Produto incluído com sucesso!'

      if (!produtoTemp.nome) {
        return next('Informe o produto que deseja incluir em seu orçamento')
      }

      if (!produtoTemp.categoriaId || !Number.isInteger(parseInt(produtoTemp.categoriaId))) {
        return next('Informe a categoria do produto')
      }
      
      const errors = await validate(Object.assign(new ProdutoTempModel(), produtoTemp))
      
      if (errors.length > 0) {
        const newError = classValidatorErros(errors)        
        return next(newError)
      }
      
      produtoTemp.categoriaId = parseInt(produtoTemp.categoriaId) 
      
      const existsCategoria = await this.categoriaProdutoModel.getOne({ where: { id: parseInt(produtoTemp.categoriaId) } })
      const existsNome = await this.produtoTempModel.getOne({ where: { nome: `${produtoTemp.nome}` } })
      
      if (!existsCategoria) {
        return next('A categoria informada não existe.')
      } 
      
      if (existsNome) {

        const updateProdutoTemp = await this.produtoTempModel.update({
          where: { nome: `${produtoTemp.nome}` },
          data: {
            qtdInclusao: {
                increment: 1
            }
          }
        })
        
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