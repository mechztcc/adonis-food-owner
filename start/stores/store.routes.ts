import Route from '@ioc:Adonis/Core/Route'

Route.post('/stores', 'StoresController.store')
Route.get('/stores', 'StoresController.index')

