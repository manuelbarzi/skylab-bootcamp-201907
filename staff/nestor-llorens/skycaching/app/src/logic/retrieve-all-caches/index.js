const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * retrieves all caches on the db
 */

export default function () {
    
    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/caches`, {
            method: 'GET',
            headers: { authorization: `bearer ${this.__token__}` }
        })

        if (response.status !== 200) {
            const { error } = await response.json()

            throw Error(error)
        }

        const { caches } = await response.json()

        return caches
    })()
}