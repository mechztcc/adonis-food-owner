import { test } from '@japa/runner'
import { UserFactory, StoreFactory } from 'Database/factories'

test.group('Store store', () => {
  test('It should be create a store', async ({ client, assert }) => {
    const user = await UserFactory.create()

    const response = await client.post('/stores').json({
      name: 'Store 01',
      description: 'Description store',
      active: true,
      opened: false,
      user_id: user.id,
    })

    const body = response.body()

    response.assertStatus(201)
    assert.exists(body.id, 'Store has not created')
  })

  test('It should be return 409 when user has not found', async ({ client, assert }) => {
    const user = await UserFactory.create()

    const response = await client.post('/stores').json({
      name: 'Store 01',
      description: 'Description store',
      active: true,
      opened: false,
      user_id: 200,
    })

    const body = response.body()

    response.assertStatus(409)
    response.assertBodyContains({ code: 'BAD_REQUEST', message: 'User not found.', status: 409 })
  })

  test('It should be return a list of stores', async ({ client, assert }) => {
    const user = await UserFactory.create()

    const store = await StoreFactory.merge({ user_id: user.id }).create()

    const response = await client.get('/stores?page=1')

    const body = response.body()
    console.log(body)

    response.assertStatus(202)
    assert.exists(body.stores)
  })
})
