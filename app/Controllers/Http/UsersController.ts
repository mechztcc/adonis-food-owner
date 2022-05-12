import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BadRequestException from 'App/Exceptions/BadRequestException'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'

export default class UsersController {
  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateUserValidator)


    const userExists = await User.findBy('email', payload.email)
    if(userExists) {
      throw new BadRequestException('Email already in use', 409)
    }

    const user = await User.create(payload)

    return response.created(user)
  }

  public async find({ request, response}: HttpContextContract) {
    
  }
}
