// Arquivo criado: 24/05/2023 às 00:30


import IEndereco from "../../interfaces/IEndereco"
import { SetEnderecosAction } from "../actions/enderecoUsuario.action"


interface State {
  endereco: IEndereco[]
}



const initialState: State = {
  endereco: [],
}


const enderecoUsuarioReducer = (
  state = initialState,
  action: SetEnderecosAction
): State => {
  switch (action.type) {
    case 'SET_ENDERECOS':
      return {
        ...state,
        endereco: action.payload
      }
    default:
      return state
  }
}

export default enderecoUsuarioReducer