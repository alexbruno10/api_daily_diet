import { randomUUID } from 'crypto'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'

export async function mealsTransactions(app: FastifyInstance) {
  app.get('/', async () => {
    const id = 2

    return id
  })

  app.post('/', async (request, response) => {
    const createMealsBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      isOnTheDiet: z.boolean().default(true),
    })

    const { name, description, isOnTheDiet } = createMealsBodySchema.parse(
      request.body,
    )

    return {
      id: randomUUID(),
      name,
      description,
      isOnTheDiet,
    }
  })
}
