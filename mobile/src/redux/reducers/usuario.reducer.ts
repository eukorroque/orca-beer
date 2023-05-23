// Arquivo criado: 23/05/2023 às 19:13

import IUsuario from "../../interfaces/IUsuario"
import { LoginUsuarioAction, SetUsuarioAction } from "../actions/usuario.action"

interface State {
  usuario: IUsuario
  isLogged: boolean
}

const initialState: State = {
  usuario: {
    nome: null
  },
  isLogged: false
}

const usuarioReducer = (
  state = initialState,
  action: SetUsuarioAction | LoginUsuarioAction
): State => {
  switch (action.type) {
    case 'SET_USUARIO':
      return {
        ...state,
        usuario: action.payload
      }
    case 'LOGIN_USUARIO':
      return {
        ...state,
        isLogged: action.payload
      }
    default:
      return state
  }
}

export default usuarioReducer
