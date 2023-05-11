import { HttpStatus } from "../enums/httpStatus.enum"
import ProdutoTempModel from "../models/produtoTemp.model"
import { NextFunction, Request, Response } from 'express'
import ProdutoModel from "../models/produto.model"
import CategoriaProdutoModel from "../models/categoriaProduto.model"
import UnidadeProdutoModel from "../models/unidadeProduto.model"

export default class ProdutoTempController {

  constructor (
    private produtoTempModel: ProdutoTempModel,
    private produtoModel: ProdutoModel,
    private categoriaProdutoModel: CategoriaProdutoModel,
    private unidadeProdutoModel: UnidadeProdutoModel
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

      if (!produtoTemp.nome || !produtoTemp.categoriaId || !produtoTemp.unidadeId) {
        return next('Não foram passados todos os dados necessários para o cadastro do produto')
      }

      const newCategoriaId = parseInt(produtoTemp.categoriaId)
      const newUnidadeId = parseInt(produtoTemp.unidadeId)
      const newNome = produtoTemp.nome.toString()

      const existsCategoria = await this.categoriaProdutoModel.getAll({ where: { id: newCategoriaId } })
      const existsUnidade = await this.unidadeProdutoModel.getAll({ where: { id: newUnidadeId } })
      const existsQtd = await this.produtoTempModel.count({ where: { nome: {contains: newNome } } })
      const existsNome = await this.produtoModel.getAll({ where: { nome: {contains: newNome } } })

      if (!existsCategoria) {
        return next('A categoria informada não existe.')
      } 

      if (!existsUnidade) {
        return next('A unidade informada não existe.')
      }

      if (existsNome.length > 0) {
        return next('Esse produto já está cadastrado no sistema.')
      }

      if (existsQtd > 0) {
        produtoTemp.qtdInclusao = existsQtd + 1
      } else {
        produtoTemp.qtdInclusao = 1
      }

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