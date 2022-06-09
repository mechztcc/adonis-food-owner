import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BadRequestException from 'App/Exceptions/BadRequestException'
import Category from 'App/Models/Category'
import Product from 'App/Models/Product'
import CreateProductValidator from 'App/Validators/CreateProductValidator'

export default class ProductsController {
  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateProductValidator)

    const categoryExists = await Category.findBy('id', payload.category_id)
    if (!categoryExists) {
      throw new BadRequestException('Category not found', 404)
    }

    const product = await Product.create(payload)
    return response.created(product)
  }

  public async delete({ request, response }: HttpContextContract) {
    const id = request.param('id')

    const productExists = await Product.findBy('id', id)
    if (!productExists) {
      throw new BadRequestException('Product not found', 404)
    }

    return response.status(202).send({})
  }
}