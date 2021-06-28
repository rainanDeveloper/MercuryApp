import faker from 'faker'
import { factory } from "factory-girl"
import { User } from "@models/user"


factory.define('User', User, {
	login: faker.internet.avatar(),
	email: faker.internet.email(),
	password: faker.internet.password()
})

export {
	factory
}