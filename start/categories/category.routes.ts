import Route from '@ioc:Adonis/Core/Route'

Route.post('/categories', 'CategoriesController.store')
Route.delete('/categories/:id', 'CategoriesController.delete')
