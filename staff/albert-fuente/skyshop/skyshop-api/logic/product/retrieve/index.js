const {validate} = require('skyshop-utils')
const { models:{Product} } = require('skyshop-data')
/**
 * Retrieves one product
 *  
 * @param {*} productId 
 * @returns {Promise}
 * 
*/

module.exports = function ( productId) {
    validate.string(productId, 'Product ID')
    return (async () => {

        const product = await Product.findOne({_id:productId}, { _id: 0, password: 0 })
        if (!product) throw Error(`Product with id ${productId} does not exist.`)
        return product
    })()
}