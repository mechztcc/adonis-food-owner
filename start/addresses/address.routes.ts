import Route from '@ioc:Adonis/Core/Route'

Route.post('/addresses', 'AddressesController.store')
Route.get('/addresses/users/:id', 'AddressesController.findByUser')




