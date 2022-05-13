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

    const body = response.body()

    response.assertStatus(201)
    assert.exists(body.id, 'User not created')
    
  })

  test('It should be return 409 when try to create a user with email already in use', async ({
    client,
  }) => {
    const { email } = await UserFactory.create()

    const user = { name: 'Alberto paiva', email: email, password: '123456' }

    const response = await client.post('/users').json(user)

    response.assertBody({ code: 'BAD_REQUEST', message: 'Email already in use', status: 409 })
  })

  test('It should be find a user by id', async ({ client, assert }) => {
    const user = await UserFactory.create()

    const response = await client.get(`/users/${user.id}`)
    console.log(response.body())

    const body = response.body()
    response.assertBodyContains({ id: user.id })
    assert.exists(body.status, 'User status has not created')
  })
})
