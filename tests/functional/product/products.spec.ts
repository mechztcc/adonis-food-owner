import { test } from '@japa/runner'
import { CategoryFactory, ProductFactory, StoreFactory } from 'Database/factories'

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

  test('It should be return 404 when try to create a product with invalid store', async ({
    client,
  }) => {
    const store = await StoreFactory.with('user').create()

    const category = await CategoryFactory.merge({ storeId: store.$attributes.id }).create()

    const response = await client.post('/products').json({
      name: 'Mussarela P',
      price: 22.0,
      description: 'Alot of cheese',
      available: false,
      category_id: 99,
    })

    response.assertBodyContains({ code: 'BAD_REQUEST', message: 'Category not found', status: 404 })
  })

  test('It should be delete a product by id', async ({ client }) => {
    const store = await StoreFactory.with('user').create()

    const category = await CategoryFactory.merge({ storeId: store.$attributes.id }).create()

    const data = await client.post('/products').json({
      name: 'Mussarela P',
      price: 22.0,
      description: 'Alot of cheese',
      available: false,
      category_id: category.$attributes.id,
    })

    const body = data.body()
    const response = await client.delete(`/products/${body.id}`)

    response.assertStatus(202)
  })

  test('It should be return 404 when try to delete a nonexists product', async ({ client }) => {
    const response = await client.delete('products/99')

    response.assertBodyContains({ code: 'BAD_REQUEST', message: 'Product not found', status: 404 })
  })

  test('It should be update a product', async ({ client }) => {
    const store = await StoreFactory.with('user').create()

    const category = await CategoryFactory.merge({ storeId: store.$attributes.id }).create()

    const data = await client.post('/products').json({
      name: 'Mussarela P',
      price: 22.0,
      description: 'Alot of cheese',
      available: false,
      category_id: category.$attributes.id,
    })

    const body = data.body()

    const response = await client.put(`products/${body.id}`).json({
      name: 'Mussarela G',
      price: 32.0,
      description: 'Alot alot of cheese',
      available: true,
      category_id: category.$attributes.id,
    })

    response.assertStatus(204)
  })

  test('It should be find a product by id', async ({ client, assert }) => {
    const store = await StoreFactory.with('user').create()

    const category = await CategoryFactory.merge({ storeId: store.$attributes.id }).create()

    const product = await ProductFactory.merge({ categoryId: category.$attributes.id }).create()

    const response = await client.get(`/products/${product.$attributes.id}`)

    const body = response.body()

    response.assertStatus(202)
    response.assertBodyContains({
      id: product.$attributes.id,
    })
  })

  test('It should be return 404 when try to find a nonexists product', async ({
    client,
    assert,
  }) => {
    const response = await client.get(`/products/100`)

    response.assertStatus(404)

    response.assertBodyContains({
      code: 'BAD_REQUEST',
      message: 'Product not found',
      status: 404,
    })
  })

  test('It should be return all products by store_id', async ({ client }) => {
    const store = await StoreFactory.with('user').create()

    console.log(store);
    
    // const response = await client.get()
  })
})
