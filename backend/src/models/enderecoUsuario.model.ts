import { Prisma, Endereco } from "@prisma/client"
import prisma from "../config/prisma"
import prismaErros from "../utils/prismaErros.util"
import { IsNumber, IsNotEmpty, Length, IsString, IsOptional, Matches } from "class-validator"
import NUMBER_REGEX from "../utils/regex/numberRegex"
import ALPHANUMERIC_REGEX from "../utils/regex/alphanumericRegex"
import LETTERS_REGEX from "../utils/regex/lettersRegex"

/**
 * Se passar o grupo 1, o responsavelId é obrigatório. Se passar o grupo 2, o responsavelId é opcional.
 */
export default class EnderecoUsuarioModel implements Endereco {
  id!: number

  @IsOptional({ groups: ['1', '2'] })
  @Matches(NUMBER_REGEX, { message: 'O numero deve conter apenas caracteres numéricos', groups: ['1', '2'] })
  numero!: number | null


  @Length(8, 8, { message: 'O CEP deve conter 8 dígitos', groups: ['1', '2'] })
  @Matches(NUMBER_REGEX, { message: 'O CEP deve conter apenas caracteres numéricos', groups: ['1', '2'] })
  @IsNotEmpty({ message: 'O CEP deve ser informado', groups: ['1', '2'] })
  cep!: string


  @Length(3, 100, { message: 'A rua deve conter entre 3 e 100 caracteres', groups: ['1', '2'] })
  @Matches(ALPHANUMERIC_REGEX, { message: 'A rua deve conter apenas caracteres alfanuméricos', groups: ['1', '2'] })
  @IsNotEmpty({ message: 'A rua deve ser informada', groups: ['1', '2'] })
  rua!: string


  @IsOptional({ groups: ['1', '2'] })
  @Matches(ALPHANUMERIC_REGEX, { message: 'O complemento deve conter apenas caracteres alfanuméricos', groups: ['1', '2'] })
  complemento!: string | null


  @Length(3, 100, { message: 'O bairro deve conter entre 3 e 100 caracteres', groups: ['1', '2'] })
  @Matches(ALPHANUMERIC_REGEX, { message: 'O bairro deve conter apenas caracteres alfanuméricos', groups: ['1', '2'] })
  @IsNotEmpty({ message: 'O bairro deve ser informado', groups: ['1', '2'] })
  bairro!: string

  @Length(3, 100, { message: 'A cidade deve conter entre 3 e 100 caracteres', groups: ['1', '2'] })
  @Matches(ALPHANUMERIC_REGEX, { message: 'A cidade deve conter apenas caracteres alfanuméricos', groups: ['1', '2'] })
  @IsNotEmpty({ message: 'A cidade deve ser informada', groups: ['1', '2'] })
  cidade!: string

  @Length(2, 2, { message: 'O estado deve conter 2 caracteres', groups: ['1', '2'] })
  @Matches(LETTERS_REGEX, { message: 'O estado deve conter apenas letras', groups: ['1', '2'] })
  @IsNotEmpty({ message: 'O estado deve ser informado', groups: ['1', '2'] })
  estado!: string

  @IsNumber({}, { message: 'O ID do responsável deve ser um número', groups: ['1'] })
  @IsNotEmpty({ message: 'O ID do responsável deve ser informado', groups: ['1'] })
  responsavelId!: number

  @IsOptional({ groups: ['1', '2'] })
  @IsString({ message: 'O titulo do endereço está em um formato incorreto', groups: ['1', '2'] })
  @Length(2, 100, { message: 'O titulo do endereço deve conter entre 2 e 100 caracteres', groups: ['1', '2'] })
  label = null

  deletado = false

  criadoEm!: Date

  atualizadoEm!: Date



  async create(
    data: Prisma.EnderecoCreateInput
  ): Promise<number> {
    try {
      const endereco = await prisma.endereco.create({ data })

      return endereco.id

    } catch (error: any) {

      throw new Error(prismaErros(error))
    }
  }

  async update(params: {
    where: Prisma.EnderecoWhereUniqueInput
    data: Prisma.EnderecoUpdateInput
  }): Promise<Endereco | null> {
    try {
      const endereco = await prisma.endereco.update({
        ...params
      })

      return endereco

    } catch (error: any) {

      throw new Error(prismaErros(error))
    }
  }
}