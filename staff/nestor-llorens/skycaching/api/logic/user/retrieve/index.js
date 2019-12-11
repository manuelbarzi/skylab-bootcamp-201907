const validate = require('utils/validate')
const { models: { User } } = require('data')

/**
 * retrieves user's info
 * @param {*} id 
 */

function retrieveUser (id) {

    validate.string(id, 'id')

    return (async () => {
    const user = await User.findOne({ _id: id }, { _id: 0, password: 0 }).lean()

    if (!user) throw new Error(`user with id ${id} not found`)

    user.id = id
    delete user._id

    return user
    })()
}

module.exports = retrieveUser