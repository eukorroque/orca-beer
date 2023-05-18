// Arquivo criado: 18/05/2023 às 18:06

import { tpConta } from "../enums/tpConta.enum"

export default interface IUserSession {
  id: number
  statusId: number
  tpConta: tpConta
  nome: string
  iat: number
  exp: number
}