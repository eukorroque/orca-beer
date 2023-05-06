interface Error {
  code: string
  message: string
  meta: {
    target: string[]
  }
}

const prismaErros = (error: Error): string => {

  switch (error.code) {
    case 'P1000':
      return 'Não foi possível conectar ao banco de dados.'

    case 'P1001':
      return 'Não foi possível selecionar o banco de dados.'

    case 'P1002':
      return 'Não foi possível autenticar com o banco de dados.'

    case 'P2000':
      return 'A consulta ao banco de dados falhou.'

    case 'P2001':
      return 'A consulta ao banco de dados retornou um resultado vazio.'

    case 'P2002':
      const fieldName = error.meta.target[0]
      return `O valor fornecido para o campo ${fieldName} viola a restrição de unicidade na coluna especificada.`
      
    case 'P2010':
      return 'O registro que você está tentando modificar não existe.'

    case 'P2023':
      return 'O valor fornecido para um campo de chave primária já existe na tabela.'

    case 'P2025':
      return 'O registro que você está tentando criar já existe.'

    case 'P3000':
      return 'O modelo fornecido contém um erro de definição.'

    case 'P3001':
      return 'O campo obrigatório está faltando.'

    case 'P3002':
      return 'O modelo fornecido contém um campo com um tipo de dados inválido.'

    case 'P3003':
      return 'O modelo fornecido contém um campo com uma diretiva inválida.'

    case 'P3010':
      return 'A relação fornecida em um campo de relacionamento não corresponde a nenhuma tabela no banco de dados.'

    default:
      return 'Ocorreu um erro desconhecido ao acessar o banco de dados.'

  }
}

export default prismaErros
