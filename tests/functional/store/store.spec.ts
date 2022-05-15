import { test } from '@japa/runner'
import { StoreFactory, UserFactory } from 'Database/factories'

test.group('Store store', () => {
  test('It should be create a store', async ({ client }) => {
    const user = await UserFactory.create()

    const response = await client
      .post('/stores')
      .json({
        name: 'Store 01',
        description: 'Description store',
        active: true,
        opened: false,
        user_id: user.id,
      })

    response.assertStatus(201)
  })
})
