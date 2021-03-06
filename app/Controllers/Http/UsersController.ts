import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BadRequestException from 'App/Exceptions/BadRequestException'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import UpdateUserPasswordValidator from 'App/Validators/UpdateUserPasswordValidator'


export default class UsersController {
  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateUserValidator)

    const userExists = await User.findBy('email', payload.email)
    if (userExists) {
      throw new BadRequestException('Email already in use', 409)
    }

    const user = await User.create(payload)

    return response.created(user)
  }

  public async find({ request, response }: HttpContextContract) {
    const id = await request.param('id')

    const user = await User.findBy('id', id)

    return response.accepted(user)
  }

  public async update({ request, response }: HttpContextContract) {
    const id = await request.param('id')
    const payload = await request.validate(UpdateUserPasswordValidator)

    const user = await User.findByOrFail('id', id)

    user.password = payload.password
    await user.save()

    return response.accepted({ message: 'User updated!'})
  }
}
