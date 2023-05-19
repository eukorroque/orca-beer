import classValidatorErros from "../utils/classValidatorErros.util"
import { validate } from "class-validator"
import ProdutoTempModel from "../models/produtoTemp.model"
import CategoriaProdutoModel from "../models/categoriaProduto.model"
import ProdutoModel from "../models/produto.model"
import { ProdutoTemp } from "@prisma/client"

interface IResponse {
  ok: boolean
  data?: ProdutoTemp | null
  id?: number

}


export default class ProdutoTempService {

  constructor (
    private produtoTempModel: ProdutoTempModel,
    private categoriaProdutoModel: CategoriaProdutoModel,
    private produtoModel: ProdutoModel
  ) { }

  async create(produtoTemp: any): Promise<IResponse> {
    try {


      const errors = await validate(Object.assign(new ProdutoTempModel(), produtoTemp))

      if (errors.length > 0) {
        const newError = classValidatorErros(errors)
        throw new Error(newError)
      }

      produtoTemp.categoriaId = parseInt(produtoTemp.categoriaId)

      const existsCategoria = await this.categoriaProdutoModel.getOne({ where: { id: produtoTemp.categoriaId } })


      if (!existsCategoria) {
        throw new Error('A categoria informada não existe.')
      }

      const produtoAlreadyExists = await this.produtoModel.getOne({
        where: {
          nome: produtoTemp.nome
        }
      })

      if (produtoAlreadyExists) {
        return {
          ok: true
        }
      }

      const existsNome = await this.produtoTempModel.getOne({
        where: {
          nome: produtoTemp.nome
        }
      })

      if (existsNome) {

        const updateProdutoTemp = await this.produtoTempModel.update({
          where: { nome: produtoTemp.nome },
          data: {
            qtdInclusao: {
              increment: 1
            }
          }
        })

        if (!updateProdutoTemp) {
          throw new Error('Ocorreu um erro ao tentar adicionar o produto em nossa base de dados.')
        }

        return {
          ok: true,
          data: updateProdutoTemp
        }
      }

      produtoTemp.qtdInclusao = 1

      const idProdutoTemp = await this.produtoTempModel.create({
        ...produtoTemp
      })


      return {
        ok: true,
        id: idProdutoTemp
      }

    } catch (error: any) {
      throw new Error(error.message)
    }
  }

}