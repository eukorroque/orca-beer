import jwt from 'jsonwebtoken'

const secret = process.env.JWT_TOKEN as string

const createToken = (obj: any, expiresIn = '1d') => {

  const options = {
    expiresIn
  }

  return jwt.sign(obj, secret, options)
}

export default createToken