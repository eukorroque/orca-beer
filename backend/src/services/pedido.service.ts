import classValidatorErros from "../utils/classValidatorErros.util"
import { validate } from "class-validator"
import PedidoModel from "../models/pedido.model"
import { IProdutoInPedidoArray } from "../interfaces/IProdutoInPedidoArray"
import ProdutoModel from "../models/produto.model"
import ProdutoTempModel from "../models/produtoTemp.model"
import UsuarioModel from "../models/usuario.model"
import { Pedido } from "@prisma/client"
import IFornecedoresInPedidoArray from "../interfaces/IFornecedoresInPedidoArray"

export default class PedidoService {

  constructor (
    private pedidoModel: PedidoModel,
    private produtoModel: ProdutoModel,
    private produtoTempModel: ProdutoTempModel,
    private usuarioModel: UsuarioModel
  ) { }

  async create(pedido: any): Promise<number> {
    try {

      const produtos: IProdutoInPedidoArray[] = pedido.produtos as any
      const produtosTemp: IProdutoInPedidoArray[] | undefined = pedido.produtosTemp as any


      const existsProdutos = await this.produtoModel.getMany({
        where: {
          id: {
            in: produtos.map(produto => produto.produtoId)
          }
        },
        select: {
          id: true,
          nome: true
        }

      })

      if (existsProdutos.length !== produtos.length) {
        throw new Error('Um ou mais produtos inseridos como produto existente, não existem na base de dados de produtos. Ele não seria um produto temporário ?')
      }


      // analisar se o produto temporário existe, caso não. Cadastra-lo atraves da service de produtoTemp.
      if (produtosTemp && produtosTemp.length > 0) {

        const existsProdutosTemp = await this.produtoTempModel.getMany({
          where: {
            id: {
              in: produtosTemp.map(produto => produto.produtoId)
            }
          },
          select: {
            id: true,
            nome: true
          }
        })

        if (existsProdutosTemp.length !== produtosTemp.length) {
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
        aceitou: false
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

  async aceitarPedido(idPedido: number, idFornecedor: number): Promise<Pedido | null> {
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

      if (hasFornecedor.aceitou) {
        throw new Error('Esse fornecedor já aceitou esse pedido')
      }

      const newArr = fornecedoresAlcancados.map(fornecedor => {
        if (fornecedor.id === idFornecedor) {
          return {
            ...fornecedor,
            aceitou: true
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

      return pedidoAtualizado


      //criar na tabela de orçamentos o orçamento do fornecedor


    } catch (error: any) {
      throw new Error(error.message)
    }
  }

}