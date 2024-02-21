import { randomUUID } from 'crypto'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { checkSessionIdExist } from '../middleware/check-session-id-exist'

export async function mealsTransactions(app: FastifyInstance) {
  app.get('/', { preHandler: [checkSessionIdExist] }, async (request) => {
    const { sessionId } = request.cookies

    const meals = await knex('meals').where('session_id', sessionId).select()

    return {
      meals,
    }
  })

  app.get(
    '/summary',
    { preHandler: [checkSessionIdExist] },
    async (request) => {
      const { sessionId } = request.cookies

      const meals = await knex('meals').where('session_id', sessionId).select()

      const mealsQtd = meals.length

      const mealsInDiet = meals.filter((meals) => meals.isOnTheDiet).length

      const mealsOffDiet = meals.filter(
        (meals) => meals.isOnTheDiet !== true,
      ).length

      return {
        mealsQtd,
        mealsInDiet,
        mealsOffDiet,
      }
    },
  )

  app.get('/:id', { preHandler: [checkSessionIdExist] }, async (request) => {
    const getMealsParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getMealsParamsSchema.parse(request.params)

    const { sessionId } = request.cookies

    const meal = await knex('meals')
      .where({
        session_id: sessionId,
        id,
      })
      .first()

    return {
      meal,
    }
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

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      response.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
    }

    await knex('meals').insert({
      id: randomUUID(),
      session_id: sessionId,
      name,
      description,
      isOnTheDiet,
    })

    return response.status(201).send()
  })

  app.put(
    '/:id',
    { preHandler: [checkSessionIdExist] },
    async (request, response) => {
      const createMealsBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        isOnTheDiet: z.boolean().default(true),
      })

      const getMealsParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { name, description, isOnTheDiet } = createMealsBodySchema.parse(
        request.body,
      )
      const { sessionId } = request.cookies

      const { id } = getMealsParamsSchema.parse(request.params)

      const now = knex.fn.now()

      await knex('meals')
        .update({ name, description, isOnTheDiet, updated_at: now })
        .where({
          session_id: sessionId,
          id,
        })

      return response.status(200).send()
    },
  )

  app.delete(
    '/:id',
    { preHandler: [checkSessionIdExist] },
    async (request, response) => {
      const getMealsParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { sessionId } = request.cookies

      const { id } = getMealsParamsSchema.parse(request.params)

      await knex('meals').delete().where({
        session_id: sessionId,
        id,
      })

      return response.status(200).send()
    },
  )
}
