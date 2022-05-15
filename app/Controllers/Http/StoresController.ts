import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Store from 'App/Models/Store'
import CreateStoreValidator from 'App/Validators/CreateStoreValidator'

export default class StoresController {
  public async store({ request, response }: HttpContextContract) {
		const payload = await request.validate(CreateStoreValidator)

		const store = await Store.create(payload)
    response.created(store)
  }
}
