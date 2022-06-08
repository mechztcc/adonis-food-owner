import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BadRequestException from 'App/Exceptions/BadRequestException'
import Category from 'App/Models/Category'
import Store from 'App/Models/Store'
import CreateCategoryValidator from 'App/Validators/CreateCategoryValidator'

export default class CategoriesController {
  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateCategoryValidator)

    const storeExists = await Store.findByOrFail('id', payload.store_id)
    if (!storeExists) {
      throw new BadRequestException('Store not found', 404)
    }

    const category = await Category.create(payload)

    return response.created(category)
  }
}
