import Route from '@ioc:Adonis/Core/Route'

Route.post('/products', 'ProductsController.store')
Route.delete('/products/:id', 'ProductsController.delete')
