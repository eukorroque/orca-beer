// Arquivo criado: 23/05/2023 às 19:13

import IUsuario from "../../interfaces/IUsuario"
import { setLoginUsuario, SetUsuarioAction } from "../actions/usuario.action"

interface State {
  perfil: IUsuario
  isLogged: boolean
  token: string | null
}

const initialState: State = {
  perfil: {
    nome: null,
    statusId: null,
    tpConta: null,
    id: null,
    imgPerfil: null
  },
  isLogged: false,
  token: null
}

const usuarioReducer = (
  state = initialState,
  action: SetUsuarioAction | setLoginUsuario
): State => {
  switch (action.type) {
    case 'SET_USUARIO':
      return {
        ...state,
        perfil: action.payload
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
