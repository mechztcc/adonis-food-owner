import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BadRequestException from 'App/Exceptions/BadRequestException'
import Category from 'App/Models/Category'
import Store from 'App/Models/Store'
import CreateCategoryValidator from 'App/Validators/CreateCategoryValidator'
import UpdateCategoryValidator from 'App/Validators/UpdateCategoryValidator'

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

  public async delete({ request, response }: HttpContextContract) {
    const id = request.param('id')

    const category = await Category.findByOrFail('id', id)

    await category.delete()

    return response.status(202).send({})
  }

  public async update({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const payload = await request.validate(UpdateCategoryValidator)

    const category = await Category.findByOrFail('id', id)

    category.name = payload.name
    await category.save()

    return response.status(204)
  }
}
