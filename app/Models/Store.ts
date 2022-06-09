import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Category from './Category'
import User from './User'

export default class Store extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public active: boolean

  @column()
  public opened: boolean

  @column()
  public userId: number

  @belongsTo(() => User, {
    localKey: 'id',
  })
  public user: BelongsTo<typeof User>

  @hasMany(() => Category, {
    foreignKey: 'storeId',
  })
  public store: HasMany<typeof Category>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
