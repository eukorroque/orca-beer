import { Action } from "redux"
import IEndereco from "../../interfaces/IEndereco"


export const SET_ENDERECOS = 'SET_ENDERECOS'


export interface SetEnderecosAction extends Action<typeof SET_ENDERECOS> {
  payload: IEndereco[]
}

export const setEnderecosAction = (enderecos: IEndereco[]): SetEnderecosAction => ({
  type: SET_ENDERECOS,
  payload: enderecos
})