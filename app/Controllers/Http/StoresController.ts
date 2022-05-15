import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Store from 'App/Models/Store'
import User from 'App/Models/User'
import CreateStoreValidator from 'App/Validators/CreateStoreValidator'
import BadRequestException from '../../Exceptions/BadRequestException'

export default class StoresController {
  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateStoreValidator)

    const userExists = await User.findBy('id', payload.user_id)
    if (!userExists) {
      throw new BadRequestException('User not found.', 409)
    }

    const store = await Store.create(payload)
    return response.created(store)
  }

  public async index({ request, response }: HttpContextContract) {
    const { page } = request.qs()
    const limit = 10

    const stores = await Store.query()
      .select('*')
      .limit(10)
      .offset(page * limit - limit)

    return response.accepted({ stores })
  }
}
