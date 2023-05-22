import { validate } from "class-validator"
import PropostaModel from "../models/proposta.model"
import classValidatorErros from "../utils/classValidatorErros.util"
import IProdutosInProposta from "../interfaces/IProdutosInProposta"
import { Proposta } from "@prisma/client"
import IUserSession from "../interfaces/IUserSession"
import ComissaoModel from "../models/comissao.model"
import PedidoModel from "../models/pedido.model"

export default class PropostaService {

  constructor (
    private propostaModel: PropostaModel,
    private comissaoModel: ComissaoModel,
    private pedidoModel: PedidoModel
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

  async updateProdutosArr(idProposta: number, novoIndice: IProdutosInProposta): Promise<Proposta | null> {
    try {

      novoIndice.data = new Date()

      const proposta = await this.propostaModel.getOne({ where: { id: idProposta } })

      if (!proposta) {
        throw new Error('Proposta não encontrada')
      }

      if (novoIndice.responsavelId !== proposta.fornecedorId && novoIndice.responsavelId !== proposta.lojistaId) {
        throw new Error('Usuário não autorizado')
      }

      const produtos: IProdutosInProposta[] = proposta.produtos as any

      novoIndice.ordem = produtos.length + 1
      const errors = await validate(Object.assign(new IProdutosInProposta, novoIndice), {
        stopAtFirstError: true
      })

      if (errors.length > 0) {
        const newError = classValidatorErros(errors)

        throw new Error(newError)

      }


      /**
       * aqui seria legal fazer uma validação sobre determinados campos que estão vindo de dentro dos produtos.
       * Porém isso não será feito agora pois fica meio vago de definir os campos uma vez que precisamos ja ter isso em tela
       * para ter uma real noçao doque vai ser necessário.
       * 
       * Por hora esse método vai apenas validar se a proposta existe e vai seguir o baile
       */

      produtos.push(novoIndice)

      const atualizandoProposta = await this.propostaModel.update({
        where: { id: idProposta },
        data: {
          produtos: produtos as any
        }
      })

      if (!atualizandoProposta) {
        throw new Error('Erro ao atualizar produto')
      }

      return atualizandoProposta
    } catch (error: any) {
      throw new Error(error.message)
    }
  }


  async finalizarProposta(idProposta: number, user: IUserSession): Promise<string> {
    try {

      const proposta = await this.propostaModel.getOne({ where: { id: idProposta } })
      const isFornecedor = user.tpConta === 1

      if (!proposta) {
        throw new Error('Proposta não encontrada')
      }

      if (user.id !== proposta.fornecedorId && user.id !== proposta.lojistaId) {
        throw new Error('Usuário não autorizado')
      }


      if (!isFornecedor) {

        if (proposta.lojistaId !== user.id) {
          throw new Error('Você não é o lojista dessa proposta')

        }


        const newProposta = await this.propostaModel.update({
          where: { id: idProposta },
          data: {
            lojistaAceitou: true
          }
        })

        if (!newProposta) {
          throw new Error('Erro ao atualizar produto')
        }

        return 'Proposta aceita com sucesso. Aguarde a finalização do fornecedor'

      }

      if (proposta.fornecedorId !== user.id) {
        throw new Error('Você não é o fornecedor dessa proposta')
      }

      if (!proposta.lojistaAceitou) {
        throw new Error('O lojista ainda não aceitou a proposta. Aguarde a resposta do lojista')
      }

      const comissao = await this.comissaoModel.create({
        valor: proposta.valor,
        taxa: 0.1,
        pago: false,
        pedido: {
          connect: {
            id: proposta.pedidoId
          }
        },
        lojista: {
          connect: {
            id: proposta.lojistaId
          }
        },
        fornecedor: {
          connect: {
            id: proposta.fornecedorId
          }
        }
      })

      if (!comissao) {
        throw new Error('Erro ao criar comissão')
      }


      // após gerar a comissão é sinal que ambas as partes aceitaram a proposta. Logo podemos concluir a proposta e o pedido.
      await this.propostaModel.update({
        where: { id: idProposta },
        data: {
          status: {
            connect: {
              // a principio o status 2 é o status "Finalizado"
              id: 2
            }
          }
        }
      })

      await this.pedidoModel.update({
        where: { id: proposta.pedidoId },
        data: {
          status: {
            connect: {
              // a principio o status 2 é o status "Finalizado"
              id: 2
            }
          }
        }
      })


      return 'Proposta aceita com sucesso e comissão gerada.'

    } catch (error: any) {
      throw new Error(error.message)
    }
  }

}