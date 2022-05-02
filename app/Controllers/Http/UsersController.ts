import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateUserValidator from 'App/Validators/CreateUserValidator'

export default class UsersController {
    public async store({ request, response }: HttpContextContract) {
			const payload = request.validate(CreateUserValidator)
		}
}
