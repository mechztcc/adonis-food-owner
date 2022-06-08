import { test } from '@japa/runner'
import { StoreFactory } from 'Database/factories'

test.group('Categories category', () => {
  test('It should  be create a category', async ({ client, assert }) => {
    const store = await StoreFactory.with('user').create()
    const attr = store.$attributes

    const response = await client.post('/categories').json({ name: 'Pizzas', store_id: attr.id })

    const body = response.body()

    response.assertStatus(201)
    response.assertBodyContains({ store_id: attr.id })
  })
})
