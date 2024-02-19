import fastify from 'fastify'
import { mealsTransactions } from './routes/meals'

export const app = fastify()

app.register(mealsTransactions, {
  prefix: 'meals',
})
