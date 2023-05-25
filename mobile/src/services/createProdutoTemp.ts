// Arquivo criado: 24/05/2023 às 21:24

import backEnd from "../utils/backEnd"

interface IProdutoTemp {
  nome: string
  categoriaId: string
}

const createProdutoTemp = async (produtoTemp: IProdutoTemp, token: string | null) => {

  const body = { produtoTemp }

  try {
    const data = await backEnd('POST', `produto-temp`, token, body)

    return data

  } catch (error: any) {
    throw new Error(error)
  }
}

export default createProdutoTemp