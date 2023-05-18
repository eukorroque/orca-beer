import PropostaModel from "../models/proposta.model"

export default class PropostaService {

  constructor (
    private propostaModel: PropostaModel,
  ) { }

  async create(proposta: any): Promise<number> {
    try {

      return 1

    } catch (error: any) {
      throw new Error(error.message)
    }
  }

}