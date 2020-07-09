const { API_URL } = require("../../config")
require("gluttony-commons/polyfills/string")
const { utils: { Email } } = require("gluttony-commons")
const context = require("./context")

/**
 * @param  {string} name
 * @param  {string} surname
 * @param  {string} email
 * @param  {string} password
 * @returns Promise
 */
module.exports = async function(name, surname, email, password) {
    try {
        String.validate.notVoid(name)
    } catch(error) {
        throw new Error("Name is empty")
    }
    try {
        String.validate.notVoid(surname)
    } catch(error) {
        throw new Error("Surname is empty")
    }
    Email.validate(email)
    try {
        String.validate.lengthGreaterEqualThan(password, 8)
    } catch(error) {
        throw new Error("Password should be at least 8 characters long")
    }

    return await this.httpClient.post(`${API_URL}/users`, {
            name,
            surname,
            email,
            password
        })
        .then(({ status, data }) => {
            if (status === 201) return
            throw new Error(data.error)
        })
        .catch(() => {throw new Error("Could not register user")})
}.bind(context)