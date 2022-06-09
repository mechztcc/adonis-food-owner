import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Product from './Product'
import Store from './Store'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public storeId: number

  @belongsTo(() => Store, {
    localKey: 'id',
  })
  public store: BelongsTo<typeof Store>

  @belongsTo(() => Product, {
    localKey: 'id',
  })
  public product: BelongsTo<typeof Product>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
