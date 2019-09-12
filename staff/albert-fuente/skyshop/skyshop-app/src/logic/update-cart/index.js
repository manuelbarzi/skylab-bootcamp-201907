import validate from '../../utils/validate'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (id, token, productId) {

    validate.string(id, 'id')
    validate.string(token, 'token')

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/users/${id}/cart/deleteItem`, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json','authorization': `bearer ${token}` },
            body: JSON.stringify({productId})
        })
        
        if (response.status !== 201) {
            const { error } = await response.json()
            throw Error(error)
        }
        else {
            return await response.json()
        }
    })()
}