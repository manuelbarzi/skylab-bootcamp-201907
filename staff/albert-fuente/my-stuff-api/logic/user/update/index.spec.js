const { expect } = require('chai')
const logic = require('../../.')
const { User } = require('../../../models')
const mongoose = require('mongoose')

describe('logic - update user', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let name, surname, email, password, id, body

    beforeEach(async() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        body = {
            name: `name-${Math.random()}`,
            surname: `surname-${Math.random()}`,
            email: `email-${Math.random()}@domain.com`,
            password: `password-${Math.random()}`,
            extra: `extra-${Math.random()}`
        }

        await User.deleteMany()
            const user=await User.create({ name, surname, email, password })
             id = user.id
    })

    it('should succeed on correct data', async() =>{
        const result=await logic.user.update(id, body)

            expect(result).not.to.exist

            const user=await User.findById(id)

            expect(user).to.exist
            expect(user.name).to.equal(body.name)
            expect(user.surname).to.equal(body.surname)
            expect(user.email).to.equal(body.email)
            expect(user.password).to.equal(body.password)
            expect(user.extra).not.to.exist
  
    }
        
    )

    it('should fail on non-existing user', async () => {
        id = '5d5d5530531d455f75da9fF9'
        try{
            await logic.user.update(id, body)
             throw new Error('should not reach this point') 

        }catch(error){
            expect(error.message).to.equal(`User with id ${id} does not exist.`)
        }
    })

    after(() => mongoose.disconnect())
})