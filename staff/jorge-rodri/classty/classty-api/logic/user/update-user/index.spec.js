require('dotenv').config()

const { expect } = require('chai')
const updateUser = require('.')
const { database, models: { User } } = require('data')

const { env: { DB_URL_TEST }} = process

describe('logic - update user', () => {
    before(() => database.connect(DB_URL_TEST))

    let name, surname, email, password, id, body

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        body = {
            name: `jorge-${Math.random()}`,
            surname: `surname-${Math.random()}`,
            email: `email-${Math.random()}@domain.com`,
            password: `password-${Math.random()}`,
            extra: `extra-${Math.random()}`
        }

        await User.deleteMany()
        const user = await User.create({ name, surname, email, password })

        id = user.id
    })


    it('should succeed on correct data', async () => {

        await updateUser(id, body)
       

        const user = await User.findById(id)
        expect(user).to.exist
        expect(user.name).to.equal(body.name)
        expect(user.surname).to.equal(body.surname)
        expect(user.email).to.equal(body.email)
        expect(user.password).to.equal(body.password)
        expect(user.extra).not.to.exist

    })


    it('should fail on non-existing user', async () => {
        const _id = '5d5d5530531d455f757a8fF9'
        try{
            debugger
        await updateUser(_id, body)

        }catch(error){
            debugger
        expect(error.message).to.equal(`user with id ${_id} does not exist`)
        
        }

    })

    after(() => database.disconnect())
})