import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateProductValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [rules.required()]),
    price: schema.number([rules.required()]),
    description: schema.string({}),
    available: schema.boolean(),
    category_id: schema.number([rules.required()]),
  })

  public messages = {}
}
