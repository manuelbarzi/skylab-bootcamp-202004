require('../utils/polyfills/string')
const { Email } = require('../utils')
const { mongo } = require('../data')
const { UnexistenceError, CredentialsError } = require('../errors')

module.exports = (email, password) => {
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

    return mongo.connect()
        .then(connection => {
            const users = connection.db().collection('users')

            return users.findOne({ email })
        })
        .then(user => {
            if (!user) throw new UnexistenceError(`user with e-mail ${email} does not exist`)

            if (user.password !== password) throw new CredentialsError('wrong password')

            return user._id.toString()
        })
} 