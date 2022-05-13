import { test } from '@japa/runner'
import { UserFactory } from 'Database/factories'

test.group('Auth auth', () => {
  test('It should be auth a valid user', async ({ client, assert }) => {
    const user = await UserFactory.create()

    const response = await client.post('/auth')
    console.log(response.body())

    response.assertBodyContains({ token: '', user: {} })
  })
})
