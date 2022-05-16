import { test } from '@japa/runner'
import { UserFactory } from 'Database/factories'

test.group('Address address', () => {
  test('It should be create a address to valid user', async ({ client, assert }) => {
    const user = await UserFactory.create()

    const address = {
      zip: '000-00',
      street: 'Silent hills',
      number: '66',
      city: 'Another Hills',
      complement: 'Dont be afraid',
      state: 'Hills',
      user_id: user.id,
    }

    const response = await client.post('/addresses').json(address)

    const body = await response.body()

    assert.exists(body.id)
    assert.equal(body.user_id, user.id)
  })

  test('It should be return 404 when user has not found', async ({ client, assert }) => {
    const address = {
      zip: '000-00',
      street: 'Silent hills',
      number: '66',
      city: 'Another Hills',
      complement: 'Dont be afraid',
      state: 'Hills',
      user_id: 99,
    }

    const response = await client.post('/addresses').json(address)

    const body = await response.body()

    response.assertBodyContains({ code: 'BAD_REQUEST', message: 'Resource not found', status: 404 })
  })
})
