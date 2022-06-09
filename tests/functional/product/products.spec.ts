import { test } from '@japa/runner'
import { CategoryFactory, StoreFactory } from 'Database/factories'

test.group('Products products', () => {
  test('It should be create a product', async ({ client }) => {
    const store = await StoreFactory.with('user').create()

    const category = await CategoryFactory.merge({ storeId: store.$attributes.id }).create()

    const response = await client.post('/products').json({
      name: 'Mussarela P',
      price: 22.0,
      description: 'Alot of cheese',
      available: false,
      category_id: category.$attributes.id,
    })
    const body = response.body()

    response.assertBodyContains({
      id: body.id,
      name: 'Mussarela P',
      price: 22.0,
      description: 'Alot of cheese',
      available: false,
      category_id: category.$attributes.id,
    })
  })
})
