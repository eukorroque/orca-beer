// Arquivo criado: 24/05/2023 às 00:30

import IProdutoOrcamento from "../../interfaces/IProdutoOrcamento"
import { SetNovoOrcamentoAction } from "../actions/orcamento.action"


interface State {
  novoOrcamento: {
    produtos: IProdutoOrcamento[]
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
        novoOrcamento: action.payload
      }
    default:
      return state
  }
}

export default orcamentoReducer