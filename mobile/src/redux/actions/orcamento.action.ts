import { Action } from "redux"
import IProdutoOrcamento from "../../interfaces/IProdutoOrcamento"



export const SET_NOVO_ORCAMENTO = 'SET_NOVO_ORCAMENTO'


export interface SetNovoOrcamentoAction extends Action<typeof SET_NOVO_ORCAMENTO> {
  payload: {
    produtos: IProdutoOrcamento[]
  } | null
}

export const SetNovoOrcamentoAction = (payload: { produtos: IProdutoOrcamento[] } | null): SetNovoOrcamentoAction => ({
  type: SET_NOVO_ORCAMENTO,
  payload
})