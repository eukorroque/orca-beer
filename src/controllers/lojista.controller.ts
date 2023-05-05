import { HttpStatus } from "../enums/httpStatus.enum";
import LojistaModel from "../models/lojista.model";
import { NextFunction, Request, Response } from 'express'

export default class LojistaController {

  private _lojistaModel: LojistaModel


  constructor(lojistaModel: LojistaModel) {
    this._lojistaModel = lojistaModel
  }


  async getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const lojistas = await this._lojistaModel.getAll()

      if (lojistas.length <= 0) {
        return next('Ainda não há Lojistas cadastrados')
      }

      res.status(HttpStatus.OK).json({
        ok: true,
        data: lojistas
      })

    } catch (error) {
      return next('Ocorreu um erro ao tentar listar os lojistas')
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

      const { lojista } = req.body

      if (!lojista) {
        return next('Não foram passados todos os dados necessários para o cadastro do Lojista')
      }

      // por padrão o status será 8 (Aprovado)
      lojista.statusId = 8

      const idLojista = await this._lojistaModel.create(lojista)

      res.status(HttpStatus.CREATED).json({
        ok: true,
        msg: 'Lojista adicionado com sucesso. Agora só aguardar nosso time validar seus dados :)',
        id: idLojista
      })

    } catch (error: any) {
      return next(error.message)
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params
      const { data } = req.body

      // adendo: não deixar atualizar certos campos. Como por exemplo: cnpj

      if (!id || !Number.isInteger(parseInt(id))) {
        return next('Informe o id do lojista que deseja atualizar os campos.')
      }

      if (!data) {
        return next('Não foi passado nenhum dado para atualização do cadastro do Lojista')
      }

      const updated = await this._lojistaModel.update({
        where: { id: Number(id) },
        data
      })

      if (!updated) {
        return next('Ocorreu um erro interno ao tentar atualizar os dados do Lojista. Tente novamente mais tarde :(')
      }

      res.status(HttpStatus.OK).json({
        ok: true,
        msg: 'Lojista atualizado com sucesso.',
      })

    } catch (error: any) {
      return next(error.message)
    }
  }

}
