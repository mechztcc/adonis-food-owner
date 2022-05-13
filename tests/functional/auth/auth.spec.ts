import { test } from '@japa/runner'
import { UserFactory } from 'Database/factories'

test.group('Auth auth', () => {
  test('It should be auth a valid user', async ({ client, assert }) => {
    const defaultPassword = '123456'
    const user = await UserFactory.merge({ password: defaultPassword }).create()

    const response = await client.post('/auth').json({ email: user.email, password: defaultPassword })
    const body = response.body()

    response.assertBodyContains({ type: 'bearer' })
    assert.exists(body.token, 'Token not generated')
    assert.exists(body.expires_at, 'Expires date not generated')
  })
})
