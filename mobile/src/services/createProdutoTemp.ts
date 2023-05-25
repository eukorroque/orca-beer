// Arquivo criado: 24/05/2023 às 21:24

import backEnd from "../utils/backEnd"

interface IProdutoTemp {
  nome: string
  categoriaId: string
}

const createProdutoTemp = async (produtoTemp: IProdutoTemp, token: string | null) => {

  const body = { produtoTemp }

  try {
    return await backEnd('POST', `produto-temp`, token, body)

  } catch (error: any) {
    throw new Error(error)
  }
}

export default createProdutoTemp