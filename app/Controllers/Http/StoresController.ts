import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Store from 'App/Models/Store'
import User from 'App/Models/User'
import CreateStoreByLoggedUserValidator from 'App/Validators/CreateStoreByLoggedUserValidator'
import CreateStoreValidator from 'App/Validators/CreateStoreValidator'
import OpenStoreValidator from 'App/Validators/OpenStoreValidator'
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

    const stores = await Store.query().select('*').paginate(page, 10)

    return response.accepted(stores)
  }

  public async openOrClose({ request, response }: HttpContextContract) {
    const payload = await request.validate(OpenStoreValidator)

    const id = request.param('id')

    const store = await Store.findByOrFail('id', id)
    store.opened = payload.opened

    store.save()

    return response.noContent()
  }

  public async findAllByUser({ request, response }: HttpContextContract) {
    const id = await request.param('id')
    const { page } = request.qs()

    const stores = await Store.query()
      .select('*')
      .whereHas('user', (query) => {
        query.where('id', id)
      })
      .paginate(page, 10)

    return response.accepted(stores)
  }

  public async update({ request, response }: HttpContextContract) {
    const id = await request.param('id')
    const payload = await request.only(['name', 'description'])

    const store = await Store.findByOrFail('id', id)

    store.name = payload.name
    store.description = payload.description
    await store.save()

    return response.accepted(store)
  }

  public async findByLoggedUser({ request, response, auth }: HttpContextContract) {
    const user = await auth.authenticate()

    const store = await Store.findByOrFail('user_id', user.id)

    return response.accepted(store)
  }

  public async createByLoggedUser({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(CreateStoreByLoggedUserValidator)
    const user = await auth.authenticate()

    const store = await Store.create({
      name: payload.name,
      description: payload.description,
      active: true,
      opened: false,
      userId: user.id,
    })

    return response.created()
  }
}
