import Route from '@ioc:Adonis/Core/Route'

Route.post('/users', 'UsersController.store')
Route.get('/users/:id', 'UsersController.find')
Route.put('/users/:id', 'UsersController.update')
