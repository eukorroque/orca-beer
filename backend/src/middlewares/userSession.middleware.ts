import { PrismaSessionStore } from '@quixo3/prisma-session-store'
import session from 'express-session'
import prisma from '../config/prisma'

const secret = process.env.SESSION_SECRET as string

const userSessionInterceptor = session({
  secret,
  resave: false,
  saveUninitialized: false,
  store: new PrismaSessionStore(prisma, {
    checkPeriod: 2 * 60 * 1000, // Verifica a expiração da sessão a cada 2 minutos
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: undefined,
  }),
})

export default userSessionInterceptor