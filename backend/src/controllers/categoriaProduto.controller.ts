import { HttpStatus } from "../enums/httpStatus.enum"
import CategoriaProdutoModel from "../models/categoriaProduto.model"
import { NextFunction, Request, Response } from 'express'
import { validate } from "class-validator"
import classValidatorErros from "../utils/classValidatorErros.util"

/**
 * TODO: Validar os campos. quanto for atualizar. (não está validando)
 */

export default class CategoriaProdutoController {

  constructor (
    private categoriaProdutoModel: CategoriaProdutoModel
  ) {
  }

  async getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
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
        return next('Informe a categoria que deseja criar')
      }

      const errors = await validate(Object.assign(new CategoriaProdutoModel(), categoria))

      if (errors.length > 0) {
        const newError = classValidatorErros(errors)
        return next(newError)
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

      const { id } = req.params
      const { categoria } = req.body

      if (!id || !Number.isInteger(parseInt(id))) {
        return next('Informe o id da categoria que deseja atualizar.')
      }

      if (!categoria) {
        return next('Informe a nova categoria.')
      }

      const idCategoria = parseInt(id)
      const existsCategoria = await this.categoriaProdutoModel.getOne({ where: { id: idCategoria } })

      if (!existsCategoria) {
        return next('A categoria informada não existe.')
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
        return next('Não foi possível atualizar a categoria. Tente novamente mais tarde.')
      }

      res.status(HttpStatus.OK).json({
        ok: true,
        msg: 'A categoria foi atualizada com sucesso.',
      })

    } catch (error: any) {
      return next(error.message)
    }
  }
}
