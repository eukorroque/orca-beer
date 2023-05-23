import classValidatorErros from "../utils/classValidatorErros.util"
import { validate } from "class-validator"
import PedidoModel from "../models/pedido.model"
import { IProdutoInPedidoArray } from "../interfaces/IProdutoInPedidoArray"
import ProdutoModel from "../models/produto.model"
import ProdutoTempModel from "../models/produtoTemp.model"
import UsuarioModel from "../models/usuario.model"
import { Pedido } from "@prisma/client"
import IFornecedoresInPedidoArray from "../interfaces/IFornecedoresInPedidoArray"
import PropostaService from "./proposta.service"

export default class PedidoService {

  constructor (
    private pedidoModel: PedidoModel,
    private produtoModel: ProdutoModel,
    private produtoTempModel: ProdutoTempModel,
    private usuarioModel: UsuarioModel,
    private propostaService: PropostaService
  ) { }

  async create(pedido: any): Promise<number> {
    try {

      const produtos: IProdutoInPedidoArray[] = pedido.produtos as any
      const produtosTemp: IProdutoInPedidoArray[] | undefined = pedido.produtosTemp as any

      if (new Date(pedido.prazoEntrega) < new Date()) {
        throw new Error('O prazo de entrega não pode ser menor que a data atual')
      }

      const produtosToValidate = this.ignoreRepeatedValues(produtos, 'produtoId', true)
      const existsProdutos = await this.produtoModel.getAll({
        where: {
          id: {
            in: produtosToValidate
          }
        },
        select: {
          id: true,
          nome: true
        }

      })

      if (existsProdutos.length !== produtosToValidate.length) {
        throw new Error('Um ou mais produtos inseridos como produto existente, não existem na base de dados de produtos. Ele não seria um produto temporário ?')
      }


      // analisar se o produto temporário existe, caso não. Cadastra-lo atraves da service de produtoTemp.
      if (produtosTemp && produtosTemp.length > 0) {

        const produtosTempToValidate = this.ignoreRepeatedValues(produtosTemp, 'produtoId', true)
        const existsProdutosTemp = await this.produtoTempModel.getMany({
          where: {
            id: {
              in: produtosTempToValidate
            }
          },
          select: {
            id: true,
            nome: true
          }
        })

        if (existsProdutosTemp.length !== produtosTempToValidate.length) {
          throw new Error('Um ou mais produtos inseridos como produto temporário, não existem na base de dados de produtos temporários. Ele não seria um produto existente ?')
        }
      }

      const idFornecedores = await this.usuarioModel.getAll({
        where: {
          tpConta: 1
        },
        select: {
          id: true
        }
      })

      const fornecedoresArray = idFornecedores.map(fornecedor => ({
        id: fornecedor.id,
        aceitou: null
      }))

      // passando os valores necessários para o objeto de pedido para que ele seja validado pelo class-validator
      pedido.fornecedoresAlcancados = fornecedoresArray
      pedido.statusId = 1
      pedido.prazoEntrega = new Date(pedido.prazoEntrega)

      const errors = await validate(Object.assign(new PedidoModel(), pedido), {
        stopAtFirstError: true
      })

      if (errors.length > 0) {
        const newError = classValidatorErros(errors)

        throw new Error(newError)

      }

      const { statusId, lojistaId, ...pedidoData } = pedido


      const idPedido = await this.pedidoModel.create({
        ...pedidoData,
        status: {
          connect: {
            id: statusId
          }
        },
        lojista: {
          connect: {
            id: lojistaId
          }
        }
      })


      return idPedido

    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async getByIdFornecedor(idFornecedor: number): Promise<Pedido[]> {
    try {

      const pedidos = await this.pedidoModel.getMany({
        where: {
          fornecedoresAlcancados: {
            array_contains: {
              id: idFornecedor
            }
          },
          // TODO: a principio o id 1 será o default quando o pedido é criado. Ver sobre isso futuramente
          statusId: 1
        }

      })

      return pedidos

    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async fornecedorFeedback(idPedido: number, idFornecedor: number, feedback: number): Promise<Pedido | null> {
    try {

      const pedido = await this.pedidoModel.getOne({ where: { id: idPedido } })

      if (!pedido) {
        throw new Error('Pedido não encontrado')
      }


      const fornecedoresAlcancados: IFornecedoresInPedidoArray[] = pedido.fornecedoresAlcancados as any

      const hasFornecedor = fornecedoresAlcancados.find(fornecedor => fornecedor.id === idFornecedor)

      if (!hasFornecedor) {
        throw new Error('Esse fornecedor não faz parte dos fornecedores selecionados para esse pedido')
      }

      if (hasFornecedor.aceitou === true && feedback) {
        throw new Error('Esse fornecedor já aceitou esse pedido')
      }

      if (hasFornecedor.aceitou === false && !feedback) {
        throw new Error('Esse fornecedor já recusou esse pedido')
      }

      const newArr = fornecedoresAlcancados.map(fornecedor => {
        if (fornecedor.id === idFornecedor) {
          return {
            ...fornecedor,
            aceitou: feedback ? true : false
          }
        }

        return fornecedor
      })

      const pedidoAtualizado = await this.pedidoModel.update({
        where: {
          id: idPedido
        },
        data: {
          fornecedoresAlcancados: newArr as any
        }
      })

      //criar na tabela de propostas a proposta do fornecedor caso ele aceite o pedido



      if (feedback) {

        const arrNegocia = [
          {
            ordem: 1,
            data: pedido.criadoEm,
            responsavelId: pedido.lojistaId,
            produtos: [
              ...pedido.produtos as any,
              ...pedido.produtosTemp as any
            ]
          }
        ]

        const idProposta = await this.propostaService.create({
          pedidoId: idPedido,
          fornecedorId: idFornecedor,
          lojistaId: pedido.lojistaId,
          statusId: pedido.statusId,
          produtos: arrNegocia
        })

        if (!idProposta) {
          throw new Error('Erro ao criar proposta')
        }
      }

      return pedidoAtualizado




    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  /**
   * Esse método vai ignorar os objetos que tiverem o mesmo valor da propriedade do objeto passado como segundo parametro
   * 
   * @param array Array de objetos que será filtrado
   * @param propriety Propriedade que será usada para filtrar os objetos
   * @param onlyProperties Se true, retorna apenas um array com os valores da propriedade passada como parametro
   */
  private ignoreRepeatedValues(array: any[], propriety: string, onlyProperties = false) {
    const properties: any[] = []

    const newArr = array.filter(item => !properties.includes(item[propriety]) && properties.push(item[propriety]))

    return onlyProperties ? properties : newArr
  }

}