import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateStoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [rules.minLength(3), rules.required()]),
    description: schema.string({}, [rules.minLength(10), rules.required()]),
    active: schema.boolean(),
    opened: schema.boolean(),
    user_id: schema.number([rules.required()])
  })

  public messages = {}
}
