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

  test('It should be return 404 when try to create an category with nonexist store', async ({
    client,
  }) => {
    const response = await client.post('/categories').json({ name: 'Pizzas', store_id: 99 })

    response.assertBodyContains({ code: 'BAD_REQUEST', message: 'Resource not found', status: 404 })
  })
})
