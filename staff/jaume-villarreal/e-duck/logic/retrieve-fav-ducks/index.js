logic.retrieveFavDucks = function(id, token) {
    validate.string(id, 'id')
    validate.string(token, 'token')

    return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get', { 'authorization': `bearer ${token}` } , undefined )
        .then(response => {
            if (response.status === 'KO') throw new Error (response.error)

            else {
                const favorites = response.data.favorites

                if (!favorites.length)  return []

                else{
                    const ducks = []
                    favorites.forEach( duckId => {
                        call('http://duckling-api.herokuapp.com/api/ducks/' + duckId, undefined, undefined, undefined)
                            .then(duck => {
                                        if (response.status === 'KO'){ throw new Error (response.error)
                                        } else {
                                            duck.favorite = true
                                            ducks.push(duck)
                                            console.log(ducks)
                                        }
                                })
                            })
                            return ducks
                        }
                    }
           })
           catch(error => error)
        }