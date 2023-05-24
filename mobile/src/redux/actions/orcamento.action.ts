import { Action } from "redux"
import IProdutos from "../../interfaces/IProduto"


export const SET_NOVO_ORCAMENTO = 'SET_NOVO_ORCAMENTO'


export interface SetNovoOrcamentoAction extends Action<typeof SET_NOVO_ORCAMENTO> {
  payload: {
    produtos: IProdutos[]
  }
}

export const SetNovoOrcamentoAction = (payload: { produtos: IProdutos[] }): SetNovoOrcamentoAction => ({
  type: SET_NOVO_ORCAMENTO,
  payload
})