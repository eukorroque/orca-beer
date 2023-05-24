// Arquivo criado: 23/05/2023 às 19:13

import IUsuario from "../../interfaces/IUsuario"
import { LoginUsuarioAction, SetUsuarioAction } from "../actions/usuario.action"

interface State {
  data: IUsuario
  isLogged: boolean
  token: string | null
}

const initialState: State = {
  data: {
    nome: null
  },
  isLogged: false,
  token: null
}

const usuarioReducer = (
  state = initialState,
  action: SetUsuarioAction | LoginUsuarioAction
): State => {
  switch (action.type) {
    case 'SET_USUARIO':
      return {
        ...state,
        data: action.payload
      }
    case 'LOGIN_USUARIO':
      return {
        ...state,
        isLogged: action.payload.isLogged,
        token: action.payload.token
      }
    default:
      return state
  }
}

export default usuarioReducer
