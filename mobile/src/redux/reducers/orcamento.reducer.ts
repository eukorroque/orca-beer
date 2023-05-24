// Arquivo criado: 24/05/2023 às 00:30

import IProdutos from "../../interfaces/IProduto"
import { SetNovoOrcamentoAction } from "../actions/orcamento.action"


interface State {
  novoOrcamento: {
    produtos: IProdutos[]
  } | null
}



const initialState: State = {
  novoOrcamento: null
}


const orcamentoReducer = (
  state = initialState,
  action: SetNovoOrcamentoAction
): State => {
  switch (action.type) {
    case 'SET_NOVO_ORCAMENTO':
      return {
        ...state,
        novoOrcamento: {
          produtos: action.payload.produtos
        }
      }
    default:
      return state
  }
}

export default orcamentoReducer