import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BadRequestException from 'App/Exceptions/BadRequestException'
import Address from 'App/Models/Address'
import User from 'App/Models/User'
import CreateAddressValidator from 'App/Validators/CreateAddressValidator'
import UpdateAddressValidator from 'App/Validators/UpdateAddressValidator'

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

  public async update({ request, response }: HttpContextContract) {
    const id = await request.param('id')
    const payload = await request.validate(UpdateAddressValidator)

    const address = await Address.findBy('id', id)
    if (!address) {
      throw new BadRequestException('Address not found', 404)
    }

    address.zip = payload.zip
    address.street = payload.street
    address.state = payload.state
    address.number = payload.number
    address.city = payload.city
    address.complement = payload.complement

    await address.save()

    return response.accepted(address)
  }
}
