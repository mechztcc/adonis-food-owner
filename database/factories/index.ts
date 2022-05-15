import Factory from '@ioc:Adonis/Lucid/Factory'
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
}).build()
