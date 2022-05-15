import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoresController {
  public async store({ request, response }: HttpContextContract) {
    response.noContent()
  }
}
