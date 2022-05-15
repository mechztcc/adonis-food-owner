import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OpenStoreValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    opened: schema.boolean([rules.required()])
  })

  public messages = {}
}
