const validate = require('../../utils/validate')
/* Add: */ const { User } = require('../../data')

/**
 * Authenticates a user by its credentials.
 * 
 * @param {string} email 
 * @param {string} password 
 * 
 * @returns {Promise}
 */
module.exports = function (email, password) {
    validate.string(email, 'username')
    validate.email(email, 'username')
    validate.string(password, 'password')

    // this.__users__.findOne --> User.findOne
    return User.findOne({ email })
        .then(user => {
            if (!user) throw new Error(`wrong credentials`)

            if (user.password !== password) throw new Error('wrong credentials')

            // remove toString() method
            return user._id.toString()
        })
}