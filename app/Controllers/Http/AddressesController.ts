import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Address from 'App/Models/Address'
import User from 'App/Models/User'
import CreateAddressValidator from 'App/Validators/CreateAddressValidator'

export default class AddressesController {
  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateAddressValidator)

    const userExists = await User.findByOrFail('id', payload.user_id)

    const address = await Address.create(payload)

    return response.created(address)
  }

  public async findByUser({ request, response }: HttpContextContract) {
    const id = await request.param('id')

    const address = await Address.query()
      .select('*')
      .whereHas('user', (query) => {
        query.where('user_id', id)
      })

    return response.accepted(address)
  }
}
