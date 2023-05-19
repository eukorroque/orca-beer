import { validate } from "class-validator"
import PropostaModel from "../models/proposta.model"
import classValidatorErros from "../utils/classValidatorErros.util"

export default class PropostaService {

  constructor (
    private propostaModel: PropostaModel,
  ) { }

  async create(proposta: any): Promise<number> {
    try {

      proposta.valor = 0
      const errors = await validate(Object.assign(new PropostaModel(), proposta), {
        stopAtFirstError: true
      })

      if (errors.length > 0) {
        const newError = classValidatorErros(errors)

        throw new Error(newError)

      }

      const idProposta = await this.propostaModel.create(proposta)

      return idProposta

    } catch (error: any) {
      throw new Error(error.message)
    }
  }

}