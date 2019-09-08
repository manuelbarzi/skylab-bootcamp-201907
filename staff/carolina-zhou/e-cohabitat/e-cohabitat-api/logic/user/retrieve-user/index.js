const { validate } = require('../../../../e-cohabitat-utils')
const { models: { User } } = require('../../../../e-cohabitat-data')

/**
 * Retrieves a user by its id.
 * 
 * @param {string} id 
 * 
 * @returns {Promise}
 */

module.exports = function (id) {
    
    validate.string(id, 'user id')

    return ( async() => {
        const user = await User.findOne({ _id: id }, { _id: 0, password: 0 }).lean()
        if (!user) throw new Error(`user with id ${id} not found`)

        user.id = id
        return user
    })()
}