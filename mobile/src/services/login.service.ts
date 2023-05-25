// Arquivo criado: 23/05/2023 às 22:33
import backEnd from '../utils/backEnd'

const loginService = async (body: any) => {

  try {
    const data = await backEnd('POST', 'usuario/login', null, body)

    return data

  } catch (error: any) {
    throw new Error(error)
  }
}

export default loginService
