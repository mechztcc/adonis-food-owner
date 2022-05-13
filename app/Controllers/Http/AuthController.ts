import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthUserValidator from 'App/Validators/AuthUserValidator'

export default class AuthController {
  public async store({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(AuthUserValidator)

    const token = await auth.use('api').authenticate()
    return response.accepted(token)
  }
}
