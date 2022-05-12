import { test } from '@japa/runner'
import { UserFactory } from 'Database/factories'

test.group('User user', () => {
  test('It should be create a user ', async ({ client, assert }) => {
    const user = {
      name: 'Alberto',
      email: 'email@email.com',
      password: '123456',
    }
    const response = await client.post('/users').json(user)

    response.assertStatus(201)
    response.assertBodyContains({ ...user })
  })

  test('It should be return 409 when try to create a user with email already in use', async ({
    client,
  }) => {
    const { email } = await UserFactory.create()

    const user = { name: 'Alberto paiva', email: email, password: '123456' }

    const response = await client.post('/users').json(user)

    response.assertBody({ code: 'BAD_REQUEST', message: 'Email already in use', status: 409 })
  })
})
