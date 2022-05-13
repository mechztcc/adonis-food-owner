import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthUserValidator from 'App/Validators/AuthUserValidator'

export default class AuthController {
  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(AuthUserValidator)
  }
}
