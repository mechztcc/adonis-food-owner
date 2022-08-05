import Route from '@ioc:Adonis/Core/Route'

Route.post('/addresses', 'AddressesController.store')
Route.get('/addresses/users/:id', 'AddressesController.findByUser')
Route.put('/addresses/:id', 'AddressesController.update')
Route.get('/addresses', 'AddressesController.findByLoggedUser').middleware('auth')
