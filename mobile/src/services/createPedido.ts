// Arquivo criado: 24/05/2023 às 21:53

import IProdutos from "../interfaces/IProduto"
import backEnd from "../utils/backEnd"

interface IPedido {
  prazoEntrega: Date,
  observacoes: string | null,
  produtos: IProdutos[]
  produtosTemp: IProdutos[] | null
}

const createPedido = async (pedido: IPedido, token: string | null) => {

  const body = { pedido }

  try {
    const data = await backEnd('POST', `pedido`, token, body)

    return data

  } catch (error: any) {
    throw new Error(error)
  }
}

export default createPedido