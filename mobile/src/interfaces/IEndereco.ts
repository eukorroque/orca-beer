export default interface IEndereco {
  id: number
  numero: number | null
  cep: string
  rua: string
  complemento: string | null
  bairro: string
  cidade: string
  estado: string
  responsavelId: number
  deletado: boolean
  criadoEm: Date
  atualizadoEm: Date
  label: string | null
}