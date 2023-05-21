// Arquivo criado: 19/05/2023 às 16:53

import { IsArray, IsDate, IsNotEmpty, IsNumber, Min } from "class-validator"
import IProdutosInPropostaArray from "./IProdutosInPropostaArray"

export default class IProdutosInProposta {

  @Min(1, { message: 'A ordem deve ser um número maior ou igual a 1' })
  @IsNumber({}, { message: 'A ordem deve ser um número válido' })
  @IsNotEmpty({ message: 'Informe o número da ordem' })
  ordem!: number


  @IsDate({ message: 'A data deve ser uma data válida' })
  @IsNotEmpty({ message: 'Informe a data' })
  data!: Date


  @Min(1, { message: 'O id do responsável deve ser um número maior ou igual a 1' })
  @IsNumber({}, { message: 'O id do responsável deve ser um número válido' })
  @IsNotEmpty({ message: 'Informe o id do responsável' })
  responsavelId!: number

  @IsArray({ message: 'Informe os produtos' })
  @IsNotEmpty({ message: 'Informe os produtos' })
  produtos!: IProdutosInPropostaArray[]
}