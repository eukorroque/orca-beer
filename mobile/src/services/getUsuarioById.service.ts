// Arquivo criado: 24/05/2023 às 00:40

import IEndereco from '../interfaces/IEndereco'
import backEnd from '../utils/backEnd'

// ATENÇÂO: essas tipagens podem mudar com o tempo. O ideial é sempre antes de usar, analisar para ver se os dados que estão vindo são os mesmos que estão sendo tipados aqui.
interface Response {
  ok?: boolean
  data?: Data
}

interface Data {
  id?: number
  cnpj?: null
  nomeFantasia?: string
  razaoSocial?: string
  email?: string
  cpfResponsavel?: string
  nomeResponsavel?: string
  senha?: string
  telefone?: string
  ultimaValidacaoTelefone?: Date
  avaliacao?: null
  cashback?: null
  alcance?: null
  vezesIndicou?: number
  qtdPedidosRestantes?: null
  codigoConvite?: string
  statusId?: number
  tpConta?: number
  ultimoLogin?: Date
  criadoEm?: Date
  atualizadoEm?: Date
  Endereco: IEndereco[]
}



const getUsuarioById = async (id: number, token: string | null): Promise<Response> => {

  try {
    const data = await backEnd('GET', `usuario/${id}`, token)

    return data

  } catch (error: any) {
    throw new Error(error)
  }
}

export default getUsuarioById
