require('misc-commons/polyfills/string')
require('misc-commons/polyfills/number')
const { mongo } = require('misc-data')

module.exports = (name, description, price, url ) => {
    String.validate.notVoid(name)
    String.validate.notVoid(description)
    Number.validate(price)
    String.validate.notVoid(url)

    return mongo.connect()
        .then(connection => {
            const products = connection.db().collection('products')
            return products.insertOne({ name, description, price, url })
        })
}