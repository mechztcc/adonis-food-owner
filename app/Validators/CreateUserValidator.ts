import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [rules.required()]),
    email: schema.string({}, [rules.email()]),
    password: schema.string({}, [rules.minLength(6)])
  })

  public messages = {}
}
