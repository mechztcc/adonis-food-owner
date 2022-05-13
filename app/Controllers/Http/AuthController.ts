import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AuthUserValidator from 'App/Validators/AuthUserValidator'

export default class AuthController {
  public async store({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(AuthUserValidator)

    const token = await auth
      .use('api')
      .attempt(payload.email, payload.password, { expiresIn: '2hours' })
    return response.accepted(token)
  }
}
