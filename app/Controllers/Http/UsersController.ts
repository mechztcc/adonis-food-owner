import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'

export default class UsersController {
  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateUserValidator)


    const userExists = await User.findBy('email', payload.email)
    if(userExists) {
      
    }

    const user = await User.create(payload)

    return response.created(user)
  }
}
