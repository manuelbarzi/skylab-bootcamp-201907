require('dotenv').config()

const { expect } = require('chai')
const removePost = require('.')
const { database, models: { User, Subject, Message, Post } } = require('classty-data')

const { env: { DB_URL_TEST }} = process

describe('logic - remove post', () => {

    before(() => database.connect(DB_URL_TEST))

    let student1, student2, teacher1, teacher2, subject, idS11,idS22, idT11, idT22, post, idSub, message, idP

    beforeEach(async () => {
        student1 = {
            name: `name-${Math.random()}`,
            surname: `surname-${Math.random()}`,
            email: `email-${Math.random()}@domain.com`,
            password: `password-${Math.random()}`,
            type: 'student'
        }
        student2 = {
            name: `name-${Math.random()}`,
            surname: `surname-${Math.random()}`,
            email: `email-${Math.random()}@domain.com`,
            password: `password-${Math.random()}`,
            type: 'student'
        }
        teacher1 = {
            name: `name-${Math.random()}`,
            surname: `surname-${Math.random()}`,
            email: `email-${Math.random()}@domain.com`,
            password: `password-${Math.random()}`,
            type: 'teacher'
        }
        teacher2 = {
            name: `name-${Math.random()}`,
            surname: `surname-${Math.random()}`,
            email: `email-${Math.random()}@domain.com`,
            password: `password-${Math.random()}`,
            type: 'teacher'
        }

        await User.deleteMany()

        const student11 = await User.create(student1)
        idS11 = student11.id
        const student22 = await User.create(student2)
        idS22 = student22.id
        const teacher11 = await User.create(teacher1)
        idT11 = teacher11.id
        const teacher22 = await User.create(teacher2)
        idT22 = teacher22.id

        message = {
            title: `title-${Math.random()}`,
            body: `comment-${Math.random()}-comment-${Math.random()}-comment-${Math.random()}-comment-${Math.random()}` 
        }

        const _message = new Message(message)

        post = {
            user: idS11,
            message: [_message]
        }

        const _post = new Post(post)
        idP = _post.id

        subject = {
            name: `name-${Math.random()}`,
            students:[idS11, idS22],
            teachers: [idT11, idT22],
            post: [_post]
        }

        const subject1 = await Subject.create(subject)
        idSub = subject1.id
    })

    it('should succeed on correct data', async () => {

        const _subject = await removePost(idSub, idP)

        expect(_subject).to.exist
        expect(_subject.post.length).to.equal(0)

    })

    after(() => database.disconnect())
})