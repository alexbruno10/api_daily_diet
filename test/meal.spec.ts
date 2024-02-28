import { it, beforeAll, afterAll, describe, expect, beforeEach } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'
import { execSync } from 'child_process'

describe('Meals routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  it('should be able to create a new meals', async () => {
    await request(app.server)
      .post('/meals')
      .send({
        name: 'New Meals',
        description: 'New Meals Description',
        isOnTheDiet: true,
      })
      .expect(201)
  })

  it('should be able to list all meals', async () => {
    const createMealsResponse = await request(app.server)
    .post('/meals')
    .send({
        name: 'New Meals',
        description: 'New Meals Description',
        isOnTheDiet: true,
      })

    const cookies = createMealsResponse.get('Set-Cookie')

    const listMealsResponse = await request(app.server)
    .get('/meals')
    .set('Cookie', cookies)
    .expect(200)

    expect(listMealsResponse.body.meals).toEqual([
        expect.objectContaining({
            name: 'New Meals',
            description: 'New Meals Description',
            isOnTheDiet: true,
        })
    ])
})

it('should be able to a get specific meal', async () => {
    const createMealsResponse = await request(app.server)
    .post('/meals')
    .send({
        name: 'New Meals',
        description: 'New Meals Description',
        isOnTheDiet: true,
      })

    const cookies = createMealsResponse.get('Set-Cookie')

    const listMealsResponse = await request(app.server)
    .get('/meals')
    .set('Cookie', cookies)
    .expect(200)

    const mealId = listMealsResponse.body.meals[0].id

    const getMealResponse = await request(app.server)
    .get(`/meals/${mealId}`)
    .set('Cookie', cookies)
    .expect(200)

    expect(listMealsResponse.body.meals).toEqual([
        expect.objectContaining({
            name: 'New Meals',
            description: 'New Meals Description',
            isOnTheDiet: true,
        })
    ])
})

it('should be able to a get the summary', async () => {
    const createMealsResponse = await request(app.server)
    .post('/meals')
    .send({
        name: 'New Meals',
        description: 'New Meals Description',
        isOnTheDiet: true,
      })

    const cookies = createMealsResponse.get('Set-Cookie')
      
      await request(app.server)
      .post('/meals')
      .send({
        name: 'New Meals 2',
        description: 'New Meals Description 2',
        isOnTheDiet: false,
      }).set('Cookie', cookies)
      
    const summaryResponse = await request(app.server)
    .get(`/meals/summary`)
    .set('Cookie', cookies)
    .expect(200)

    // console.log(summaryResponse);

    expect(summaryResponse.body).toEqual(
        expect.objectContaining({
            mealsQtd: 2,
            mealsInDiet: 1,
            mealsOffDiet: 1,
        })
    )
})

it('should be able to edit a meal', async () => {
  const createMealsResponse = await request(app.server)
  .post('/meals')
  .send({
      name: 'New Meals',
      description: 'New Meals Description',
      isOnTheDiet: true,
    })

  const cookies = createMealsResponse.get('Set-Cookie')

  const listMealsResponse = await request(app.server)
    .get('/meals')
    .set('Cookie', cookies)
    .expect(200)

    const mealId = listMealsResponse.body.meals[0].id
    
  await request(app.server)
  .put(`/meals/${mealId}`)
  .send({
    name: 'New Meals2',
    description: 'New Meals Description2',
    isOnTheDiet: false,
  })
  .set('Cookie', cookies)
  .expect(200)
})

it('should be able to delete a meal', async () => {
  const createMealsResponse = await request(app.server)
  .post('/meals')
  .send({
      name: 'New Meals',
      description: 'New Meals Description',
      isOnTheDiet: true,
    })

  const cookies = createMealsResponse.get('Set-Cookie')

  const listMealsResponse = await request(app.server)
    .get('/meals')
    .set('Cookie', cookies)
    .expect(200)

    const mealId = listMealsResponse.body.meals[0].id
    
  await request(app.server)
  .delete(`/meals/${mealId}`)
  .set('Cookie', cookies)
  .expect(200)
})
  
})
