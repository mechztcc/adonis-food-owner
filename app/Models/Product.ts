import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Category from './Category'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public price: number

  @column()
  public description: string

  @column()
  public available: boolean

  @column()
  public categoryId: number

  @hasOne(() => Category, {
    foreignKey: 'categoryId',
  })
  public category: HasOne<typeof Category>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
