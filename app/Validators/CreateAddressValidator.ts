import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateAddressValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    zip: schema.string({}, [rules.required()]),
    street: schema.string({}, [rules.required()]),
    number: schema.string({}, []),
    city: schema.string({}, [rules.required()]),
    complement: schema.string({}, []),
    state: schema.string({}, [rules.maxLength(10)]),
    user_id: schema.number([rules.required()])
  })

  public messages = {}
}
