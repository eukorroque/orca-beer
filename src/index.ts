import express from 'express'
import routes from './routes'

const PORT = 3002

const app = express()

// app.use(cors({ origin: true }))

routes(app)

app.listen(PORT, () => {
  console.log('Server running... 🚀')
})

// https://www.prisma.io/docs/getting-started/quickstart#43-explore-relation-queries-with-prisma