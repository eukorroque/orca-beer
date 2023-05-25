// Arquivo criado: 07/05/2023 às 13:50

interface Errors {
  property: string
  children?: any[]
  constraints?: Constraints
}

interface Constraints {
  isLength?: string
  isNotEmpty?: string
}

/**
 *  Função que retorna os erros de validação do class-validator de forma mais amigável
 * ATENÇÂO: Por mais que seja passado um array, para melhorar a experiencia do usuário, será retornado apenas o primeiro erro.
 */
const classValidatorErros = (erros: Errors[]) => {

  // const errosRetorno: any = {}

  // erros.forEach(erro => {
  //   const propriedade = erro.property
  //   const constraints = erro.constraints

  //   return errosRetorno[propriedade] = constraints
  // })

  if (!erros[0].constraints) return null

  return Object.values(erros[0].constraints)[0]
}

export default classValidatorErros
