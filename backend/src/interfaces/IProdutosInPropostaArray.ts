// Arquivo criado: 19/05/2023 às 18:26

import { IProdutoInPedidoArray } from "./IProdutoInPedidoArray"

export default interface IProdutosInPropostaArray extends IProdutoInPedidoArray {
  valor: number
  idProdutoAntigo?: number
}
