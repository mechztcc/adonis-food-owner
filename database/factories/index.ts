import Factory from '@ioc:Adonis/Lucid/Factory'
import Address from 'App/Models/Address'
import Category from 'App/Models/Category'
import Product from 'App/Models/Product'
import Store from 'App/Models/Store'
import User from 'App/Models/User'

export const UserFactory = Factory.define(User, ({ faker }) => {
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }
}).build()

export const StoreFactory = Factory.define(Store, ({ faker }) => {
  return {
    name: faker.company.companyName(),
    description: faker.company.catchPhraseDescriptor(),
    active: true,
    opened: false,
  }
})
  .relation('user', () => UserFactory)
  .build()

export const AddressFactory = Factory.define(Address, ({ faker }) => {
  return {
    zip: faker.address.zipCode(),
    street: faker.address.streetAddress(),
    number: faker.address.buildingNumber(),
    city: faker.address.city(),
    complement: faker.address.cityPrefix(),
    state: faker.address.state(),
  }
})
  .relation('user', () => UserFactory)
  .build()

export const CategoryFactory = Factory.define(Category, ({ faker }) => {
  return {
    name: faker.commerce.product(),
  }
})
  .relation('store', () => StoreFactory)
  .build()


