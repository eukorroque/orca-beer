import ComissaoModel from "../models/comissao.model"
import { validate } from "class-validator"
import classValidatorErros from "../utils/classValidatorErros.util"

export default class ComissaoService {

  constructor (
    private comissaoModel: ComissaoModel,
  ) { }

  async create(comissao: any): Promise<number> {
    try {


      const errors = await validate(Object.assign(new ComissaoModel, comissao), {
        stopAtFirstError: true
      })

      if (errors.length > 0) {
        const newError = classValidatorErros(errors)

        throw new Error(newError)

      }

      const idComissao = await this.comissaoModel.create(comissao)

      return idComissao

    } catch (error: any) {
      throw new Error(error.message)
    }
  }

}