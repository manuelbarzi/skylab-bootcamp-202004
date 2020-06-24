const {models: {Establishment, Dish}} = require('qrmenu-data')
const {errors: {UnexistenceError, CredentialsError}} = require('qrmenu-commons')
require('qrmenu-commons/polyfills/string')
require('qrmenu-commons/polyfills/array')

module.exports = (establishmentId, tableId, dishesIds) => {
    
    String.validate(establishmentId)
    String.validate(tableId)
    Array.validate(dishesIds)

    return (async() => {
        debugger
        const establishment = await Establishment.findById(establishmentId)

        if(!establishment) throw new UnexistenceError(`Establishment with id ${establishmentId} does not exist`)
        const {dishes} = establishment
        
        
        let _dishes = [];
        
        dishesIds.forEach(_dish => {
            const dish = dishes.find(element => element.id === _dish)
            if (typeof dish !== 'undefined') {
                const {name} = dish  
                _dishes.push(name)
            }
        });
        debugger
        if(!_dishes.length) throw new UnexistenceError('No dishes with this ids')
        
        debugger
        return _dishes
    })()
}