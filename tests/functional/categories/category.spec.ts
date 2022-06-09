import { test } from '@japa/runner'
import { CategoryFactory, StoreFactory } from 'Database/factories'

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

  test('It should be delete an category by id', async ({ client }) => {
    const store = await StoreFactory.with('user').create()
    const attr = store.$attributes

    const category = await CategoryFactory.merge({ storeId: attr.id }).create()
    const categoryAttr = category.$attributes

    const response = await client.delete(`/categories/${categoryAttr.id}`)
    response.assertStatus(202)
  })

  test('It should be return 404 when try to delete an nonexist category', async ({ client }) => {
    const response = await client.delete('/categories/99')

    response.assertBodyContains({ code: 'BAD_REQUEST', message: 'Resource not found', status: 404 })
  })
})
