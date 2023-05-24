
// import encrypt from "./encrypt"
import vars from "../config/vars"



const backEnd = async (method: 'GET' | 'POST' | 'PUT' | 'DELETE', route: string, token: string | null, bodyInfo?: any): Promise<any> => {

  try {
    const url = vars.host
    const isLogin = route === 'usuario/login'

    if (!token && !isLogin) throw new Error('Token não encontrado')

    const response = await fetch(`${url}/${route}`, {
      method,
      body: bodyInfo ? JSON.stringify(bodyInfo) : undefined,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

    const data = await response.json()

    return data

  } catch (error) {
    return error
  }

}

export default backEnd