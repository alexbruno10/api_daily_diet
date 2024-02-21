import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    meals: {
      id: string
      session_id?: string
      name: string
      description: string
      isOnTheDiet: boolean
      created_at: string
      updated_at: string
    }
  }
}
