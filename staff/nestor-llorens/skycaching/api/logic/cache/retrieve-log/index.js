const validate = require('utils/validate')
const { models: { User } } = require('data')

/**
 * retrieves caches found by user
 * @param {string} userId 
 */

function retrieveLog(userId) {
    
    validate.string(userId, 'user id')

    return (async () => {

        const user = await User.findById(userId)
        if (!user) throw new Error(`user with id ${userId} not found`)
        
        return user.found

    })()
}

module.exports = retrieveLog