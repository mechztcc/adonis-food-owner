import { test } from '@japa/runner'


test.group('User user', () => {
  test('It should be create a user ', async ({ client, assert }) => {
    const response = await client.post('/users').json({})

    response.assertBodyContains({ User: {} })
  })
})
