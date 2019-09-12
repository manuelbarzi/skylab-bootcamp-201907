import validate from '../../utils/validate'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (id, token, body) {

    validate.string(id, 'id')
    validate.string(token, 'token')

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/users/${id}`, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json','authorization': `bearer ${token}` },
            body: JSON.stringify(body)
        })
        
        if (response.status !== 200) {
            const { error } = await response.json()
            throw Error(error)
        }
        else {
            return await response.json()
        }
    })()
}