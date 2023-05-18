import classValidatorErros from "../utils/classValidatorErros.util"
import { validate } from "class-validator"
import PedidoModel from "../models/pedido.model"
import { IProdutoInPedidoArray } from "../interfaces/IProdutoInPedidoArray"
import ProdutoModel from "../models/produto.model"
import ProdutoTempModel from "../models/produtoTemp.model"
import UsuarioModel from "../models/usuario.model"
import { Pedido } from "@prisma/client"

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

      // o lojistaId está vindo do body porém ele virá pelo token futuramente.
      pedido.lojistaId = parseInt(pedido.lojistaId)


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
          statusId: 1
        }

      })

      return pedidos

    } catch (error: any) {
      throw new Error(error.message)
    }
  }

}