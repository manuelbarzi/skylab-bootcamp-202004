require('misc-commons/polyfills/string')
const { utils: { Email }, errors: { UnexistenceError, CredentialsError } } = require('misc-commons')
const {models: { User } } = require('misc-data')

module.exports = (email, password) => {
    String.validate.notVoid(email)
    Email.validate(email)
    String.validate.notVoid(password)

    return User.findOne({email})
        .then(user => {
            if (!user) throw new UnexistenceError(`user with e-mail ${email} does not exist`)

            if (user.password !== password) throw new CredentialsError('wrong password')

            user.id=user._id.toString()

            delete user._id

            return user.id
        })
} 