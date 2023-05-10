import { HttpStatus } from "../enums/httpStatus.enum";
import CategoriaProdutoModel from "../models/categoriaProduto.model";
import { NextFunction, Request, Response } from 'express'

export default class CategoriaProdutoController {

  constructor(
    private categoriaProdutoModel: CategoriaProdutoModel
    ) { 
    }
 
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

      const categorias = await this.categoriaProdutoModel.getAll()

      if (categorias.length <= 0) {
        return next('Ainda não há categorias cadastradas')
      }

      res.status(HttpStatus.OK).json({
        ok: true,
        data: categorias
      })

    } catch (error) {
      return next('Ocorreu um erro ao tentar listar as categorias.')
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

      const { categoria } = req.body

      if (!categoria) {
        return next('Não foram passados todos os dados necessários para o cadastro')
      }

      
      const idCategoria = await this.categoriaProdutoModel.create({
        ...categoria
      })

      res.status(HttpStatus.CREATED).json({
        ok: true,
        id: idCategoria
      })

    } catch (error: any) {
      return next(error.message)
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id, categoria } = req.params

      if (!id || !Number.isInteger(parseInt(id))) {
        return next('Informe o id da categoria que deseja atualizar no sistema.')
      }

      const idCategoria = parseInt(id)
      const existsCategoria = await this.categoriaProdutoModel.getAll({ where: { id: idCategoria } })

      if (!existsCategoria) {
        return next('A categoria informada não existe.')
      }

      if (!categoria) {
        return next('Informe a nova categoria.')
      }

      const newCategoria = categoria.toString()
      const updatedCategoria = await this.categoriaProdutoModel.update({
        where: { id: idCategoria },
        data: {
          categoria: {
              set: newCategoria
          }
        }
      })

      if (!updatedCategoria) {
        return next('Não foi possível atualizar a unidade. Tente novamente mais tarde.')
      }

      res.status(HttpStatus.OK).json({
        ok: true,
        msg: 'A unidade foi atualizada com sucesso.',
      })

    } catch (error: any) {
      return next(error.message)
    }
  } 
}
