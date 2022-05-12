import { test } from '@japa/runner'
import { UserFactory } from 'Database/factories'


test.group('User user', () => {
  test('It should be create a user ', async ({ client, assert }) => {
    const user = {
      name: 'Alberto',
      email: 'email@email.com',
      password: '123456'
    }
    const response = await client.post('/users').json(user);
    console.log(response.body());
    
    response.assertStatus(201)
    response.assertBodyContains({ ...user});
  })
})
