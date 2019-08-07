logic.retrieveTrack = (idUser, tokenUser, idTrack) => {
    let favorites

    if(idUser != undefined && tokenUser != undefined) {
        if(typeof idUser !== 'string') throw new Error(`id user with value ${idUser} is not a string`)
        if(typeof tokenUser !== 'string') throw new Error(`token user with value ${tokenUser} is not a string`)
        if(typeof idTrack !== 'string') throw new Error(`song with value ${idTrack} is not a string`)

        return call(`https://skylabcoders.herokuapp.com/api/user/${idUser}`, 'get', { 'authorization': `bearer ${tokenUser}` }, undefined)
            .then(response => {
                if (response.status === 'KO') throw new Error(response.error)

                favorites = response.data.favorites

                return call(`http://skylabcoders.herokuapp.com/proxy?url=https://accounts.spotify.com/api/token`, 'post',
                {
                    'Authorization': `Basic NTQ3N2NhOWQ5NmY2NDZhMmI4NjQ0M2M0MDBmY2FlZDA6OTA4YmI2MGJlMTIyNGJkOTkzZmZjZDY2NWVmNDU5ZDk=`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }, 'grant_type=client_credentials')
            })
            .then(response => {
                checkToken(response.access_token)
                return call(`https://api.spotify.com/v1/tracks/${idTrack}`, 'get', { 'Authorization': `Bearer ${response.access_token}` }, undefined)
            })
            .then(response => {
                                            
                const { album: { 
                            images:[{ url }], 
                            external_urls:{ spotify: linkAlbum }, 
                            name: nameAlbum, 
                            release_date: releaseDate },
                        artists: [{ 
                            external_urls:{ spotify: linkkArtist }, 
                            name: nameArtist}],
                        explicit, 
                        external_urls:{spotify: linkTrack}, 
                        id: idTrack,
                        name: nameTrack, 
                        popularity, 
                        preview_url: previewUrl
                } = response

                if(favorites) response.favorite = favorites.includes(idTrack)

                return { 
                    // album
                        url, 
                        linkAlbum, 
                        nameAlbum,
                        releaseDate,
                    // artist
                        linkkArtist,
                        nameArtist,
                        explicit,
                    // track
                        linkTrack,
                        idTrack,
                        nameTrack,
                        popularity,
                        previewUrl
                }
            })
    } else {
        if(typeof idTrack !== 'string') throw new Error(`song with value ${idTrack} is not a string`)

        return call(`http://skylabcoders.herokuapp.com/proxy?url=https://accounts.spotify.com/api/token`, 'post',
            {
                'Authorization': `Basic NTQ3N2NhOWQ5NmY2NDZhMmI4NjQ0M2M0MDBmY2FlZDA6OTA4YmI2MGJlMTIyNGJkOTkzZmZjZDY2NWVmNDU5ZDk=`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }, 'grant_type=client_credentials')
            .then(response => {
                checkToken(response.access_token)
                return call(`https://api.spotify.com/v1/tracks/${idTrack}`, 'get', { 'Authorization': `Bearer ${response.access_token}` }, undefined)
            })
            .then(response => {
                                            
                const { album: { 
                            images:[{ url }], 
                            external_urls:{ spotify: linkAlbum }, 
                            name: nameAlbum, 
                            release_date: releaseDate },
                        artists: [{ 
                            external_urls:{ spotify: linkkArtist }, 
                            name: nameArtist}],
                        explicit, 
                        external_urls:{spotify: linkTrack}, 
                        id: idTrack,
                        name: nameTrack, 
                        popularity, 
                        preview_url: previewUrl
                } = response
    
                if(favorites) response.favorite = favorites.includes(idTrack)
    
                return { 
                    // album
                        url, 
                        linkAlbum, 
                        nameAlbum,
                        releaseDate,
                    // artist
                        linkkArtist,
                        nameArtist,
                        explicit,
                    // track
                        linkTrack,
                        idTrack,
                        nameTrack,
                        popularity,
                        previewUrl
                }
            })
    }
}