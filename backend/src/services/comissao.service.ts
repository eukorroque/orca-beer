import { Comissao } from "@prisma/client"
import ComissaoModel from "../models/comissao.model"

export default class ComissaoService {

  constructor (
    private comissaoModel: ComissaoModel,
  ) { }

  async create(comissao: Comissao): Promise<number> {
    try {

      return 1

    } catch (error: any) {
      throw new Error(error.message)
    }
  }

}