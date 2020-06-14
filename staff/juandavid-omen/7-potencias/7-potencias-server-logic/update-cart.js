require('7-potencias-commons/polyfills/string')
require('7-potencias-commons/polyfills/json')
require('7-potencias-commons/polyfills/number')
const { errors: { UnexistenceError } } = require('7-potencias-commons')
const { models: { User, Product } } = require('7-potencias-data')

module.exports = (userId, productId, quantity) => {
  String.validate.notVoid(userId)
  String.validate.notVoid(productId)
  Number.validate.positive(quantity)

  return (async () => {
    const user = await User.findById(userId)

    if (!user) throw new UnexistenceError(`user with id ${userId} does not exist`)

    const product = await Product.findById(productId).lean()

    if (!product) throw new UnexistenceError(`product with id ${productId} does not exist`)

    const { cart = [] } = user

    const index = cart.findIndex(item => item.product.toString() === productId)

    if (quantity === 0) {
      if (index < 0) throw new UnexistenceError(`product with id ${productId} does not exist in cart for user with id ${userId}`)

      cart.splice(index, 1)
    } else {
      let productQuantity

      if (index < 0) {
        productQuantity = { product: productId }

        cart.push(productQuantity)
      } else productQuantity = cart[index]

      productQuantity.quantity = quantity
    }

    return user.save({ userId, $set: { cart } })
  })()
}
