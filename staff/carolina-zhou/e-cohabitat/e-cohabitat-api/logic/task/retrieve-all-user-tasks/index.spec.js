require('dotenv').config()

const { expect } = require('chai')
const logic = require('../..')
const { database, models: { User, Space, Task } } = require('data')

const { env: { DB_URL_TEST }} = process

describe('logic - retrieve all user tasks', () => {

    before(() => database.connect(DB_URL_TEST))

    let taskName, taskType, description, date, taskSpace, companions, taskId
    let title, type, picture, address, passcode, cousers, spaceId
    let username, name, surname, email, password, spaces, tasks, userId   

    beforeEach(async() => {
        const taskTypeArray = ['particular', 'collective', 'maintenance']
        const spaceTypeArray = ['kitchen', 'bathroom', 'living room', 'coworking', 'garden', 'rooftop', 'other']
        
        taskName = `taskName-${Math.random()}`
        taskType =  `${taskTypeArray[Math.floor(Math.random() * taskTypeArray.length)]}`
        picture = `picture-${Math.random()}`
        description = `description-${Math.random()}`
        date = new Date

        await Task.deleteMany()
        username = `username-${Math.random()}`
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `123-${Math.random()}`

        title = `name-${Math.random()}`
        type = `${spaceTypeArray[Math.floor(Math.random() * spaceTypeArray.length)]}`
        address = `address-${Math.random()}`
        passcode = `123-${Math.random()}`

        const user = await User.create({ username, name, surname, email, password, spaces, tasks })
        userId = user._id.toString()

        const space = await Space.create({ title, type, picture, address, passcode, cousers })
        spaceId = space._id.toString()

        const task = await Task.create({ taskName, taskType, description, date, taskSpace: space._id, companions })
        taskId = task._id.toString()

        user.spaces.push(spaceId)
        user.tasks.push(taskId)
        await user.save()

        space.cousers.push(userId)
        await space.save()

        task.companions.push(userId)
        await task.save()
    })

    it('should succeed on correct data', async() => {
        const tasks = await logic.retrieveAllUserTasks(userId)
        expect(tasks).to.exist
        expect(tasks).not.to.be.empty

        expect(tasks[0].taskName).to.equal(taskName)
        expect(tasks[0].taskType).to.equal(taskType)
        expect(tasks[0].description).to.equal(description)
        expect(tasks[0].date).to.deep.equal(date)
        expect(tasks[0].taskSpace.toString()).to.equal(spaceId)
        expect(tasks[0].companions).to.include(userId)
        expect(tasks[0].id).to.equal(taskId)
    })

    it('should fail on empty id', async () => {
        try{
            await logic.retrieveAllUserTasks(' ')
        } catch({ message }) {
            expect(message).to.equal('user id is empty or blank')
        }
    })

    it('should fail on undefined id', async () => {
          try{
            await logic.retrieveAllUserTasks(undefined)
        } catch({ message }) {
            expect(message).to.equal("user id with value undefined is not a string")
        }
    })
     
    it('should fail on wrong id data type', async() => {
         try{
            await logic.retrieveAllUserTasks(123)
        } catch({ message }) {
                expect(message).to.equal("user id with value 123 is not a string")
        }
    })

    after(() => database.disconnect())
})