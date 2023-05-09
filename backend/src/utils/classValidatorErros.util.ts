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
 */
const classValidatorErros = (erros: Errors[]) => {

  const errosRetorno: any = {}

  erros.forEach(erro => {
    const propriedade = erro.property
    const constraints = erro.constraints

    return errosRetorno[propriedade] = constraints
  })

  return errosRetorno
}

export default classValidatorErros
