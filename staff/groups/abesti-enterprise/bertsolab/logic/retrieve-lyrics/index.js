logic.retrieveLyrics = function (id, token, track_id){
    //let favorites

    if(id != undefined && token != undefined) {
        validate.string(id, 'id')
        validate.string(token, 'token')
        validate.string(track_id, 'track_id')

        return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get', { 'authorization': `bearer ${token}` }, undefined)
        .then(res => {
            if(res.status === 'KO') throw new Error (response.error)

            favorites = response.data.favorites

            return call(`http://skylabcoders.herokuapp.com/proxy?url=https://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=e492562d27469098b0922d5d580837eb&track_id=${track_id}`, 'get', undefined, undefined)
            .then(res => {

                if(res.message.header.status_code === 401) {
                    throw new Error("there's something wrong with the current track_id")
                } else if (res.message.header.status_code === 404){
                    throw new Error("track_id doesn't exist on Musixmatch database")
                } else {
                    if (res.message.body.length === 0){
                        throw new Error("Musixmatch API has not available lyrics for that song")
                    } else {
                        lyrics = res.message.body.lyrics.lyrics_body
                        //favorites && track_id.favorite.includes() --> Verlo con Oihane
                        //favorites && (duck.favorite = favorites.includes(duckId))
                    }
                    return lyrics
                }
            })
        })
    } else {
        validate.string(track_id, 'track_id')

        return call(`http://skylabcoders.herokuapp.com/proxy?url=https://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=e492562d27469098b0922d5d580837eb&track_id=${track_id}`, 'get', undefined, undefined)
        .then(res => {
            if(res.message.header.status_code === 401) {
                throw new Error("there's something wrong with the current track_id")
            } else if (res.message.header.status_code === 404){
                throw new Error("track_id doesn't exist on Musixmatch database")
            } else {
                if (res.message.body.length === 0){
                    throw new Error("Musixmatch API has not available lyrics for that song")
                } else {
                    lyrics = res.message.body.lyrics.lyrics_body
                }
                return lyrics
            }
        })
    }
}