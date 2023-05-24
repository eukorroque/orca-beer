// Arquivo criado: 23/05/2023 às 19:10

import { Action } from "redux"
import IUsuario from "../../interfaces/IUsuario"

export const SET_USUARIO = 'SET_USUARIO'
export const LOGIN_USUARIO = 'LOGIN_USUARIO'

export interface SetUsuarioAction extends Action<typeof SET_USUARIO> {
  payload: IUsuario
}

export interface setLoginUsuario extends Action<typeof LOGIN_USUARIO> {
  payload: {
    isLogged: boolean
    token: string | null
  }
}


export const setUsuario = (usuario: IUsuario): SetUsuarioAction => ({
  type: SET_USUARIO,
  payload: usuario
})

export const setLoginUsuario = (data: { isLogged: boolean, token: string | null }): setLoginUsuario => ({
  type: LOGIN_USUARIO,
  payload: data
})



