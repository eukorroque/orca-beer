// Arquivo criado: 24/05/2023 às 16:01

import backEnd from "../utils/backEnd"


const getPedidosEmAndamentoLojista = async (token: string | null) => {

  try {
    const data = await backEnd('GET', `proposta-by-lojista-id`, token)

    return data

  } catch (error: any) {
    throw new Error(error)
  }

}

export default getPedidosEmAndamentoLojista
