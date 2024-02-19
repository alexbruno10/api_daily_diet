import fastify from 'fastify'
import { mealsTransactions } from './routes/meals'
import cookie from '@fastify/cookie'

export const app = fastify()

app.register(cookie)

app.register(mealsTransactions, {
  prefix: 'meals',
})
