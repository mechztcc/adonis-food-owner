import { test } from '@japa/runner'
import { StoreFactory, UserFactory } from 'Database/factories'

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

    const store = await StoreFactory.merge({ userId: user.id }).create()

    const response = await client.get('/stores?page=1')

    const body = response.body()

    response.assertStatus(202)
    assert.exists(body.meta)
    assert.exists(body.data)
  })

  test('It should be OPEN store', async ({ client, assert }) => {
    const user = await UserFactory.create()

    const store = await StoreFactory.merge({ userId: user.id }).create()

    const response = await client.patch(`/stores/${store.id}`).json({ opened: true })

    response.assertStatus(204)
  })

  test('It should  be return 404 when store has not found', async ({ client, assert }) => {
    const user = await UserFactory.create()

    const store = await StoreFactory.merge({ userId: user.id }).create()

    const response = await client.patch(`/stores/999`).json({ opened: true })

    response.assertStatus(404)
    response.assertBodyContains({ code: 'BAD_REQUEST', message: 'Resource not found', status: 404 })
  })

  test('It should be return all stores by user_id', async ({ client, assert }) => {
    const user = await UserFactory.create()
    const anotherUser = await UserFactory.create()

    const store = await StoreFactory.merge({ userId: user.id }).create()
    const anotherStore = await StoreFactory.merge({ userId: anotherUser.id }).create()

    const response = await client.get(`/stores/users/${user.id}`)

    const body = response.body()

    response.assertStatus(202)
    assert.exists(body.meta)
    assert.exists(body.data)
  })
})
