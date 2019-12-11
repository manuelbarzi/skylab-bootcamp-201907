const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User } = require('../../../models')

describe('logic - authenticate user', () => {
    
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let name, surname, email, password, id

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        return User.deleteMany()
            .then(() => User.create({ name, surname, email, password })
                .then(user => id = user.id))
    })

    it('should succeed on correct data', () =>
        logic.user.authenticate(email, password)
            .then(_id => {
                expect(_id).to.exist
                expect(_id).to.be.a('string')
                expect(_id).to.equal(id)
            })
    )

    it('should fail on wrong email', () =>      
    logic.user.authenticate('Jhon@email.com', password)
    .then(_id => {
        expect(_id).to.be.undefined
    })
    .catch(error => {
        expect(error).to.exist
        expect(error.message).to.equal('wrong credentials')
    })
    )

    it('should fail on wrong password', () => logic.user.authenticate(email, '12345')
    .then(data => {
        expect(data).to.be.undefined
    })
    .catch(error => {
        expect(error).to.exist
        expect(error.message).to.equal('wrong credentials')
    })
    )

    after(() => mongoose.disconnect())
})